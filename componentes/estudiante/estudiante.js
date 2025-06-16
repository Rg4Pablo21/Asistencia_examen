export function cargarEstudiantes() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Lista de Asistencia";
  cont.appendChild(h2);

  const tabla = document.createElement("table");
  tabla.className = "tabla-estudiantes";
  tabla.innerHTML = `
    <thead>
      <tr><th>#</th><th>Nombre</th><th>Sección</th><th>Asistencia</th></tr>
    </thead>
    <tbody></tbody>`;
  const tbody = tabla.querySelector("tbody");

  const estudiantes = [
    { nombre: "Carlos Pérez", grado: "10A" },
    { nombre: "Ana López", grado: "10B" },
    { nombre: "Luis Gómez", grado: "11A" },
    { nombre: "María Torres", grado: "11B" },
    { nombre: "Pedro Martínez", grado: "12A" },
    { nombre: "Sofía Ramírez", grado: "12B" },
    { nombre: "Diego Hernández", grado: "10A" },
    { nombre: "Valeria Ruiz", grado: "11A" },
    { nombre: "Javier Castro", grado: "12A" },
    { nombre: "Lucía Morales", grado: "10B" }
  ];

  const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
  const uniformes = JSON.parse(localStorage.getItem("uniformes") || "{}");

  estudiantes.forEach((estudiante, i) => {
    const tr = document.createElement("tr");

    const tdNum = document.createElement("td");
    tdNum.textContent = i + 1;

    const tdNom = document.createElement("td");
    tdNom.textContent = estudiante.nombre;

    const tdGrado = document.createElement("td");
    tdGrado.textContent = estudiante.grado;

    const tdBtns = document.createElement("td");
    tdBtns.className = "asistencia-botones";

    const bOk = crearBtn("✔", "btn-check");
    const bNo = crearBtn("✘", "btn-x");
    const bUni = crearBtn("👕", "btn-uniforme");
    const bCorreo = crearBtn("📧", "btn-correo");

    if (motivos[estudiante.nombre]) {
      bCorreo.style.backgroundColor = "#ffcc00";
    }

    bOk.onclick = () => marcar(bOk, bNo);
    bNo.onclick = () => marcar(bNo, bOk);
    bUni.onclick = () => cargarUniforme(estudiante.nombre);

    bCorreo.onclick = () => {
      root.innerHTML = "";
      const cont = document.createElement("div");
      cont.className = "motivo-container";

      const h3 = document.createElement("h3");
      h3.textContent = `Motivo de: ${estudiante.nombre}`;
      cont.appendChild(h3);

      const txtMot = document.createElement("textarea");
      txtMot.placeholder = "Motivo...";
      txtMot.value = motivos[estudiante.nombre] || "";

      const btnGuardar = document.createElement("button");
      btnGuardar.textContent = "Guardar Motivo";
      btnGuardar.onclick = () => {
        motivos[estudiante.nombre] = txtMot.value;
        localStorage.setItem("motivos", JSON.stringify(motivos));
        alert("Motivo guardado");
        cargarEstudiantes();
      };

      const btnVolver = document.createElement("button");
      btnVolver.textContent = "Volver";
      btnVolver.onclick = cargarEstudiantes;

      cont.append(txtMot, btnGuardar, btnVolver);
      root.appendChild(cont);
    };

    tdBtns.append(bOk, bNo, bUni, bCorreo);

    const tdRopa = document.createElement("td");
    const uni = uniformes[estudiante.nombre];
    tdRopa.textContent = uni
      ? uni.completo ? "✔" : "✘"
      : "";
    tdRopa.style.color = uni
      ? uni.completo ? "green" : "red"
      : "#000";

    const tdMot = document.createElement("td");
    tdMot.textContent = motivos[estudiante.nombre] ? "✔" : "";

    tr.append(tdNum, tdNom, tdGrado, tdBtns, tdRopa, tdMot);
    tbody.appendChild(tr);
  });

  cont.appendChild(tabla);

  const barra = document.createElement("div");
  barra.className = "botones-container";

  const bTodosOk = crearBtnTexto("Marcar Todos Presentes");
  const bTodosNo = crearBtnTexto("Marcar Todos Ausentes");
  const bGuardar = crearBtnTexto("Guardar Asistencia", "btn-guardar");
  const bAgregar = crearBtnTexto("Agregar Alumno", "btn-agregar");

  bTodosOk.onclick = () =>
    document.querySelectorAll(".btn-check").forEach((b) => b.click());
  bTodosNo.onclick = () =>
    document.querySelectorAll(".btn-x").forEach((b) => b.click());
  bGuardar.onclick = () => alert("Asistencia guardada (demo)");
  bAgregar.onclick = () => agregarAlumno();

  barra.append(bTodosOk, bTodosNo, bGuardar, bAgregar);
  cont.appendChild(barra);
  root.appendChild(cont);

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

  function marcar(act, inac) {
    act.classList.add("activo");
    inac.classList.remove("activo");
  }
}
