import { cargarAdminPanel } from "./admin.js";

export function cargarGestionGrados() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "admin-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Gestión de Grados";
  cont.appendChild(h2);

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "➕ Agregar Grado";
  btnAgregar.className = "btn-agregar";
  btnAgregar.onclick = agregarGrado;
  cont.appendChild(btnAgregar);

  const lista = document.createElement("ul");
  lista.className = "lista-maestros";

  const grados = JSON.parse(localStorage.getItem("grados") || "[]");
  if (grados.length === 0) {
    lista.innerHTML = "<p>No hay grados registrados.</p>";
  } else {
    grados.forEach((grado) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${grado.nombre}</strong>
        <button class="btn-ver-estudiantes">👀 Ver Alumnos</button>
        <button class="btn-eliminar">🗑️</button>
      `;
      li.querySelector(".btn-ver-estudiantes").onclick = () => verAlumnosDeGrado(grado.nombre);
      li.querySelector(".btn-eliminar").onclick = () => eliminarGrado(grado.nombre);
      lista.appendChild(li);
    });
  }

  cont.appendChild(lista);

  const volver = document.createElement("button");
  volver.textContent = "Volver";
  volver.className = "btn-volver";
  volver.onclick = () => {
    cargarAdminPanel();
  };
  cont.appendChild(volver);

  root.appendChild(cont);

  function agregarGrado() {
    const nombre = prompt("Nombre del grado:");
    if (!nombre) return;

    const grados = JSON.parse(localStorage.getItem("grados") || "[]");
    grados.push({ nombre });
    localStorage.setItem("grados", JSON.stringify(grados));
    cargarGestionGrados();
  }

  function eliminarGrado(nombre) {
    if (!confirm("¿Eliminar este grado?")) return;
    let grados = JSON.parse(localStorage.getItem("grados") || "[]");
    grados = grados.filter(g => g.nombre !== nombre);
    localStorage.setItem("grados", JSON.stringify(grados));
    cargarGestionGrados();
  }

  function verAlumnosDeGrado(nombreGrado) {
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
    const encontrados = estudiantes.filter(e => e.grado === nombreGrado);

    alert(`Alumnos en "${nombreGrado}":\n\n` + (encontrados.length > 0
      ? encontrados.map(e => `- ${e.nombre}`).join("\n")
      : "No hay alumnos en este grado."));
  }
}
