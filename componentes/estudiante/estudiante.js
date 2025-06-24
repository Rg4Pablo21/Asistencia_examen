export function cargarEstudiantes() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Lista de Asistencia";
  cont.appendChild(h2);

  const hoy = new Date().toLocaleDateString();
  const asistenciaTomada = localStorage.getItem(`asistencia-${hoy}`) === 'true';
  if (asistenciaTomada) {
    const alerta = document.createElement("div");
    alerta.className = "asistencia-alerta";
    alerta.textContent = "✔ Asistencia ya registrada hoy";
    cont.appendChild(alerta);
  }

  const btnAgregar = document.createElement("button");
  btnAgregar.className = "btn-agregar";
  btnAgregar.textContent = "➕ Añadir Alumno";
  btnAgregar.onclick = agregarAlumno;
  cont.appendChild(btnAgregar);

  const tabla = document.createElement("table");
  tabla.className = "tabla-estudiantes";
  tabla.innerHTML = `
    <thead>
      <tr>
        <th>#</th>
        <th>Nombre</th>
        <th>Asistencia</th>
        <th>Uniforme</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody></tbody>`;
  const tbody = tabla.querySelector("tbody");

  const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
  const asistencias = JSON.parse(localStorage.getItem("asistencias") || '{}');
  const uniformes = JSON.parse(localStorage.getItem("uniformes") || '{}');

  estudiantes.forEach((estudiante, i) => {
    const tr = document.createElement("tr");
    const asistenciaHoy = asistencias[estudiante.id]?.[hoy] || { estado: null, tarde: false };

    const tdNum = document.createElement("td");
    tdNum.textContent = i + 1;

    const tdNom = document.createElement("td");
    tdNom.textContent = estudiante.nombre;

    const tdAsist = document.createElement("td");
    const btnPresente = crearBtn("✔", "btn-check");
    const btnAusente = crearBtn("✘", "btn-x");
    const btnTarde = crearBtnTarde();

    if (asistenciaHoy.estado === "presente") btnPresente.classList.add("activo");
    if (asistenciaHoy.estado === "ausente") btnAusente.classList.add("activo");
    if (asistenciaHoy.tarde) btnTarde.classList.add("activo");

    btnPresente.onclick = () => actualizarAsistencia(estudiante.id, "presente", false);
    btnAusente.onclick = () => actualizarAsistencia(estudiante.id, "ausente", false);
    btnTarde.onclick = () => marcarEntradaTarde(estudiante.nombre);

    tdAsist.append(btnPresente, btnAusente, btnTarde);

    const tdUni = document.createElement("td");
    const btnUniforme = crearBtn("👕", "btn-uniforme");
    const uniformeHoy = uniformes[estudiante.id]?.[hoy] || { completo: true, detalles: "" };

    if (!uniformeHoy.completo) btnUniforme.classList.add("incompleto");
    btnUniforme.onclick = () => cargarUniforme(estudiante);
    tdUni.appendChild(btnUniforme);

    const tdAcc = document.createElement("td");
    const btnCorreo = crearBtn("📧", "btn-correo");
    const btnEliminar = crearBtn("🗑️", "btn-eliminar");

    btnCorreo.onclick = () => enviarCorreo(estudiante);
    btnEliminar.onclick = () => confirmarEliminacion(estudiante);
    tdAcc.append(btnCorreo, btnEliminar);

    tr.append(tdNum, tdNom, tdAsist, tdUni, tdAcc);
    tbody.appendChild(tr);
  });

  cont.appendChild(tabla);

  const barra = document.createElement("div");
  barra.className = "botones-container";

  const btnTodosPresente = crearBtnTexto("Marcar Todos Presentes");
  const btnTodosAusente = crearBtnTexto("Marcar Todos Ausentes");
  const btnEnviarCorreos = crearBtnTexto("Enviar Correos", "btn-correos");
  const btnGuardar = crearBtnTexto("Guardar Asistencia", "btn-guardar");

  btnTodosPresente.onclick = () => marcarTodos("presente");
  btnTodosAusente.onclick = () => marcarTodos("ausente");
  btnEnviarCorreos.onclick = enviarCorreosGrupo;
  btnGuardar.onclick = guardarAsistencia;

  barra.append(btnTodosPresente, btnTodosAusente, btnEnviarCorreos, btnGuardar);
  cont.appendChild(barra);
  root.appendChild(cont);

  // ================= FUNCIONES AUXILIARES =================

  function crearBtn(txt, cls) {
    const b = document.createElement("button");
    b.textContent = txt;
    b.className = cls;
    return b;
  }

  function crearBtnTexto(txt, cls = "btn-todos") {
    const b = document.createElement("button");
    b.textContent = txt;
    b.className = cls;
    return b;
  }

  function crearBtnTarde() {
    const btn = document.createElement('button');
    btn.innerHTML = '⌚';
    btn.className = 'btn-tarde';
    btn.title = 'Marcar entrada tarde';
    return btn;
  }

  function marcarEntradaTarde(nombreAlumno) {
    const modal = document.createElement('div');
    modal.className = 'modal-tarde';

    modal.innerHTML = `
      <div class="modal-contenido">
        <h3>Registrar entrada tarde</h3>
        <p>Alumno: ${nombreAlumno}</p>
        <div class="campo-modal">
          <label>Minutos de retardo:</label>
          <input type="number" min="1" value="15">
        </div>
        <div class="campo-modal">
          <label>Motivo:</label>
          <textarea placeholder="Ingrese el motivo del retardo..."></textarea>
        </div>
        <div class="modal-botones">
          <button class="btn-confirmar">Confirmar</button>
          <button class="btn-cancelar">Cancelar</button>
        </div>
      </div>
    `;

    modal.querySelector('.btn-cancelar').addEventListener('click', () => modal.remove());

    modal.querySelector('.btn-confirmar').addEventListener('click', () => {
      const minutos = modal.querySelector('input').value;
      const motivo = modal.querySelector('textarea').value;
      alert(`Entrada tarde registrada: ${minutos} minutos. Motivo: ${motivo}`);
      modal.remove();
    });

    document.body.appendChild(modal);
  }

  function actualizarAsistencia(id, estado, tarde) {
    const hoy = new Date().toLocaleDateString();
    const asistencias = JSON.parse(localStorage.getItem("asistencias") || '{}');

    if (!asistencias[id]) asistencias[id] = {};
    asistencias[id][hoy] = { estado, tarde };

    localStorage.setItem("asistencias", JSON.stringify(asistencias));
    cargarEstudiantes();
  }

  function confirmarEliminacion(estudiante) {
    const password = prompt(`Para eliminar a ${estudiante.nombre}, ingrese su contraseña:`);
    if (!password) return;

    try {
      const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
      const nuevos = estudiantes.filter(e => e.id !== estudiante.id);
      localStorage.setItem("estudiantes", JSON.stringify(nuevos));
      cargarEstudiantes();
    } catch (error) {
      alert("Error al eliminar: " + error.message);
    }
  }

  function marcarTodos(estado) {
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
    estudiantes.forEach(est => {
      actualizarAsistencia(est.id, estado, false);
    });
  }

  function guardarAsistencia() {
    const hoy = new Date().toLocaleDateString();
    localStorage.setItem(`asistencia-${hoy}`, 'true');
    alert("Asistencia guardada correctamente");
    cargarEstudiantes();
  }

  function agregarAlumno() {
    const nombre = prompt("Nombre completo del alumno:");
    const correo = prompt("Correo electrónico:");
    
    if (nombre && correo) {
      const estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
      const nuevoId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
      
      estudiantes.push({ id: nuevoId, nombre, correo });
      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
      cargarEstudiantes();
    }
  }

  async function enviarCorreo(estudiante) {
    const motivo = prompt(`Motivo del correo a ${estudiante.nombre}:`);
    if (!motivo) return;

    try {
      console.log(`Enviando correo a ${estudiante.correo} con motivo: ${motivo}`);
      alert(`Correo enviado a ${estudiante.nombre}`);
      const reportes = JSON.parse(localStorage.getItem("reportes") || "{}");
      if (!reportes[estudiante.id]) reportes[estudiante.id] = [];
      reportes[estudiante.id].push({
        fecha: new Date().toISOString(),
        tipo: "correo",
        motivo
      });
      localStorage.setItem("reportes", JSON.stringify(reportes));
    } catch (error) {
      alert("Error al enviar correo: " + error.message);
    }
  }

  async function enviarCorreosGrupo() {
    const motivo = prompt("Motivo del correo grupal:");
    if (!motivo) return;

    if (confirm(`¿Enviar correo a TODOS los alumnos?`)) {
      try {
        alert("Correos enviados a todos los alumnos");
      } catch (error) {
        alert("Error al enviar correos: " + error.message);
      }
    }
  }
}

export async function cargarUniforme(estudiante) {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "uniforme-container";

  const hoy = new Date().toLocaleDateString();
  const uniformes = JSON.parse(localStorage.getItem("uniformes") || {});
  const uniformeActual = uniformes[estudiante.id]?.[hoy] || {
    completo: true,
    detalles: "",
    partes: {
      playera: true,
      pantalon: true,
      zapatos: true,
      sueter: true,
      corte_pelo: true
    }
  };

  const h3 = document.createElement("h3");
  h3.textContent = `Uniforme de ${estudiante.nombre}`;
  cont.appendChild(h3);

  const partes = [
    { id: "playera", label: "Playera" },
    { id: "pantalon", label: "Pantalón" },
    { id: "zapatos", label: "Zapatos" },
    { id: "sueter", label: "Súeter" },
    { id: "corte_pelo", label: "Corte de pelo" }
  ];

  const grid = document.createElement("div");
  grid.className = "uniforme-grid";

  partes.forEach(parte => {
    const item = document.createElement("div");
    item.className = "uniforme-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `uniforme-${parte.id}`;
    checkbox.checked = uniformeActual.partes[parte.id];
    checkbox.onchange = () => {
      uniformeActual.partes[parte.id] = checkbox.checked;
      uniformeActual.completo = Object.values(uniformeActual.partes).every(v => v);
    };

    const label = document.createElement("label");
    label.htmlFor = `uniforme-${parte.id}`;
    label.textContent = parte.label;

    item.append(checkbox, label);
    grid.appendChild(item);
  });

  const detallesLabel = document.createElement("label");
  detallesLabel.textContent = "Detalles adicionales:";
  detallesLabel.style.marginTop = "20px";
  detallesLabel.style.display = "block";

  const detalles = document.createElement("textarea");
  detalles.placeholder = "Detalles sobre el uniforme...";
  detalles.value = uniformeActual.detalles;
  detalles.style.marginTop = "8px";

  const btnGuardar = document.createElement("button");
  btnGuardar.className = "btn-guardar";
  btnGuardar.textContent = "Guardar Uniforme";
  btnGuardar.onclick = () => {
    uniformeActual.detalles = detalles.value;
    if (!uniformes[estudiante.id]) uniformes[estudiante.id] = {};
    uniformes[estudiante.id][hoy] = uniformeActual;
    localStorage.setItem("uniformes", JSON.stringify(uniformes));
    alert("Uniforme registrado correctamente");
    cargarEstudiantes();
  };

  const btnVolver = document.createElement("button");
  btnVolver.className = "btn-volver";
  btnVolver.textContent = "Volver";
  btnVolver.onclick = cargarEstudiantes;

  cont.append(grid, detallesLabel, detalles, btnGuardar, btnVolver);
  root.appendChild(cont);
}
