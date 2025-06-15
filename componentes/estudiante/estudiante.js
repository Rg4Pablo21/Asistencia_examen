export function cargarEstudiantes() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("asistencia-container");

  const titulo = document.createElement("h2");
  titulo.textContent = "Lista de Asistencia";
  container.appendChild(titulo);

  const tabla = document.createElement("table");
  tabla.classList.add("tabla-estudiantes");

  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>#</th>
      <th>Nombre</th>
      <th>Asistencia</th>
      <th>Motivo</th>
    </tr>
  `;

  const tbody = document.createElement("tbody");

  const alumnos = [
    "Carlos Pérez", "Ana López", "Luis Gómez", "María Torres", "Pedro Martínez",
    "Sofía Ramírez", "Diego Hernández", "Valeria Ruiz", "Javier Castro", "Lucía Morales"
  ];

  alumnos.forEach((nombre, index) => {
    const fila = document.createElement("tr");

    const celdaNum = document.createElement("td");
    celdaNum.textContent = index + 1;

    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = nombre;

    const celdaAsistencia = document.createElement("td");
    celdaAsistencia.classList.add("asistencia-botones");

    const btnCheck = document.createElement("button");
    btnCheck.textContent = "✔";
    btnCheck.classList.add("btn-check");

    const btnX = document.createElement("button");
    btnX.textContent = "✘";
    btnX.classList.add("btn-x");

    celdaAsistencia.append(btnCheck, btnX);

    const celdaMotivo = document.createElement("td");
    const inputMotivo = document.createElement("textarea");
    inputMotivo.placeholder = "Escribe el motivo...";
    celdaMotivo.appendChild(inputMotivo);

    btnCheck.addEventListener("click", () => {
      btnCheck.classList.add("activo");
      btnX.classList.remove("activo");
    });

    btnX.addEventListener("click", () => {
      btnX.classList.add("activo");
      btnCheck.classList.remove("activo");
    });

    fila.append(celdaNum, celdaNombre, celdaAsistencia, celdaMotivo);
    tbody.appendChild(fila);
  });

  tabla.append(thead, tbody);
  container.appendChild(tabla);
  root.appendChild(container);
}
