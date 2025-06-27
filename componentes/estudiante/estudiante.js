export function cargarEstudiantes() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Lista de Asistencia";
  cont.appendChild(h2);

  // Verificación de asistencia ya tomada
  const hoy = new Date().toLocaleDateString();
  const asistenciaTomada = localStorage.getItem(`asistencia-${hoy}`) === 'true';
  if (asistenciaTomada) {
    const alerta = document.createElement("div");
    alerta.className = "asistencia-alerta";
    alerta.textContent = "✔ Asistencia ya registrada hoy";
    cont.appendChild(alerta);
  }

  // Botón para agregar nuevo alumno
  const btnAgregar = document.createElement("button");
  btnAgregar.className = "btn-agregar";
  btnAgregar.textContent = "➕ Añadir Alumno";
  btnAgregar.onclick = agregarAlumno;
  cont.appendChild(btnAgregar);

  // Creación de la tabla
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
    <tbody></tbody>
  `;

  const tbody = tabla.querySelector("tbody");

  const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
  const asistencias = JSON.parse(localStorage.getItem("asistencias") || "{}");
  const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");

  estudiantes.forEach((estudiante, i) => {
    const tr = document.createElement("tr");
    const asistenciaHoy = asistencias[estudiante.id]?.[hoy] || { estado: null, tarde: false };

    tr.innerHTML = `
      <td>${i + 1}</td>
      <td>${estudiante.nombre}</td>
      <td>
        <button class="btn-check ${asistenciaHoy.estado === 'presente' ? 'activo' : ''}">✔</button>
        <button class="btn-x ${asistenciaHoy.estado === 'ausente' ? 'activo' : ''}">✘</button>
        <button class="btn-tarde ${asistenciaHoy.tarde ? 'activo' : ''}">⌚</button>
      </td>
      <td><button class="btn-uniforme ${uniformes[estudiante.id]?.[hoy]?.completo === false ? 'incompleto' : ''}">👕</button></td>
      <td>
        <button class="btn-correo">📧</button>
        <button class="btn-eliminar">🗑️</button>
      </td>
    `;

    tr.querySelector(".btn-check").onclick = () => actualizarAsistencia(estudiante.id, "presente", false);
    tr.querySelector(".btn-x").onclick = () => actualizarAsistencia(estudiante.id, "ausente", false);
    tr.querySelector(".btn-tarde").onclick = () => marcarTarde(estudiante);
    tr.querySelector(".btn-uniforme").onclick = () => cargarUniforme(estudiante);
    tr.querySelector(".btn-correo").onclick = () => enviarCorreo(estudiante);
    tr.querySelector(".btn-eliminar").onclick = () => confirmarEliminacion(estudiante);

    tbody.appendChild(tr);
  });

  cont.appendChild(tabla);

  const barra = document.createElement("div");
  barra.className = "botones-container";
  barra.innerHTML = `
    <button class="btn-todos">Marcar Todos Presentes</button>
    <button class="btn-todos">Marcar Todos Ausentes</button>
    <button class="btn-correos">Enviar Correos</button>
    <button class="btn-guardar">Guardar Asistencia</button>
  `;

  barra.querySelectorAll(".btn-todos")[0].onclick = () => marcarTodos("presente");
  barra.querySelectorAll(".btn-todos")[1].onclick = () => marcarTodos("ausente");
  barra.querySelector(".btn-correos").onclick = enviarCorreosGrupo;
  barra.querySelector(".btn-guardar").onclick = guardarAsistencia;

  cont.appendChild(barra);

  const btnVolver = document.createElement("button");
  btnVolver.className = "btn-volver";
  btnVolver.textContent = "← Volver al Panel";
  btnVolver.onclick = () => {
    import("../admin/admin.js").then(mod => mod.cargarAdminPanel());
  };
  cont.appendChild(btnVolver);

  root.appendChild(cont);

  function actualizarAsistencia(id, estado, tarde) {
    const hoy = new Date().toLocaleDateString();
    const asistencias = JSON.parse(localStorage.getItem("asistencias") || "{}");
    if (!asistencias[id]) asistencias[id] = {};
    asistencias[id][hoy] = { estado, tarde };
    localStorage.setItem("asistencias", JSON.stringify(asistencias));
    cargarEstudiantes();
  }

  function marcarTarde(estudiante) {
    const motivo = prompt(`Motivo de tardanza para ${estudiante.nombre}:`);
    if (motivo) {
      actualizarAsistencia(estudiante.id, "presente", true);
      const reportes = JSON.parse(localStorage.getItem("reportes") || "{}");
      if (!reportes[estudiante.id]) reportes[estudiante.id] = [];
      reportes[estudiante.id].push({ fecha: new Date().toISOString(), tipo: "tardanza", motivo });
      localStorage.setItem("reportes", JSON.stringify(reportes));
    }
  }

  function marcarTodos(estado) {
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
    estudiantes.forEach(est => actualizarAsistencia(est.id, estado, false));
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
      const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
      const nuevoId = estudiantes.length > 0 ? Math.max(...estudiantes.map(e => e.id)) + 1 : 1;
      estudiantes.push({ id: nuevoId, nombre, correo });
      localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
      cargarEstudiantes();
    }
  }

  function confirmarEliminacion(estudiante) {
    if (confirm(`¿Eliminar a ${estudiante.nombre} permanentemente?`)) {
      const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
      const nuevos = estudiantes.filter(e => e.id !== estudiante.id);
      localStorage.setItem("estudiantes", JSON.stringify(nuevos));
      cargarEstudiantes();
    }
  }

  function enviarCorreo(estudiante) {
    const motivo = prompt(`Motivo del correo a ${estudiante.nombre}:`);
    if (motivo) {
      alert(`Correo enviado a ${estudiante.nombre}\nMotivo: ${motivo}`);
      const reportes = JSON.parse(localStorage.getItem("reportes") || "{}");
      if (!reportes[estudiante.id]) reportes[estudiante.id] = [];
      reportes[estudiante.id].push({ fecha: new Date().toISOString(), tipo: "correo", motivo });
      localStorage.setItem("reportes", JSON.stringify(reportes));
    }
  }

  function enviarCorreosGrupo() {
    const motivo = prompt("Motivo del correo grupal:");
    if (motivo && confirm("¿Enviar correo a TODOS los alumnos?")) {
      alert(`Correos enviados a todos los alumnos\nMotivo: ${motivo}`);
    }
  }
}
function cargarUniforme(estudiante) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const hoy = new Date().toLocaleDateString();
  const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");

  if (!uniformes[estudiante.id]) uniformes[estudiante.id] = {};
  let uniformeActual = uniformes[estudiante.id][hoy];

  if (!uniformeActual || typeof uniformeActual !== "object" || !uniformeActual.partes) {
    uniformeActual = {
      completo: false,
      detalles: "",
      partes: {
        playera: false,
        pantalon: false,
        zapatos: false,
        sueter: false,
        corte_pelo: false
      }
    };
  }

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  cont.innerHTML = `
    <h2>Uniforme de ${estudiante.nombre}</h2>
    <div class="uniforme-grid">
      ${Object.entries({
        playera: "Playera",
        pantalon: "Pantalón",
        zapatos: "Zapatos",
        sueter: "Súeter",
        corte_pelo: "Corte de pelo"
      }).map(([id, label]) => `
        <div class="uniforme-item">
          <input type="checkbox" id="uniforme-${id}" ${uniformeActual.partes[id] ? "checked" : ""}>
          <label for="uniforme-${id}">${label}</label>
        </div>
      `).join("")}
    </div>

    <label class="uniforme-label">Detalles adicionales:</label>
    <textarea class="uniforme-detalles" placeholder="Detalles sobre el uniforme...">${uniformeActual.detalles}</textarea>

    <div class="uniforme-botones">
      <button class="btn-guardar">Guardar Uniforme</button>
      <button class="btn-volver">← Volver</button>
    </div>
  `;

  cont.querySelector(".btn-guardar").onclick = () => {
    const detalles = cont.querySelector(".uniforme-detalles").value;
    const partes = {
      playera: cont.querySelector("#uniforme-playera").checked,
      pantalon: cont.querySelector("#uniforme-pantalon").checked,
      zapatos: cont.querySelector("#uniforme-zapatos").checked,
      sueter: cont.querySelector("#uniforme-sueter").checked,
      corte_pelo: cont.querySelector("#uniforme-corte_pelo").checked
    };

    if (!uniformes[estudiante.id]) uniformes[estudiante.id] = {};
    uniformes[estudiante.id][hoy] = {
      completo: Object.values(partes).every(v => v),
      detalles,
      partes
    };

    localStorage.setItem("uniformes", JSON.stringify(uniformes));
    alert("Uniforme registrado correctamente");
    cargarEstudiantes();
  };

  cont.querySelector(".btn-volver").onclick = cargarEstudiantes;

  root.appendChild(cont);
}
