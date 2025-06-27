import { cargarAdminPanel } from "./admin.js";

export function cargarGestionMaestros() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "admin-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Gestión de Maestros";
  cont.appendChild(h2);

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "➕ Agregar Maestro";
  btnAgregar.className = "btn-agregar";
  btnAgregar.onclick = agregarMaestro;
  cont.appendChild(btnAgregar);

  const lista = document.createElement("ul");
  lista.className = "lista-maestros";

  const maestros = JSON.parse(localStorage.getItem("maestros") || "[]");
  if (maestros.length === 0) {
    lista.innerHTML = "<p>No hay maestros registrados.</p>";
  } else {
    maestros.forEach((maestro) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${maestro.nombre}</strong> (${maestro.correo})
        <button class="btn-eliminar">🗑️</button>
      `;
      li.querySelector(".btn-eliminar").onclick = () => eliminarMaestro(maestro.id);
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

  function agregarMaestro() {
    const nombre = prompt("Nombre del maestro:");
    const correo = prompt("Correo electrónico:");
    if (!nombre || !correo) return;

    const maestros = JSON.parse(localStorage.getItem("maestros") || "[]");
    const nuevo = {
      id: Date.now(),
      nombre,
      correo
    };
    maestros.push(nuevo);
    localStorage.setItem("maestros", JSON.stringify(maestros));
    cargarGestionMaestros();
  }

  function eliminarMaestro(id) {
    if (!confirm("¿Eliminar este maestro?")) return;
    const maestros = JSON.parse(localStorage.getItem("maestros") || "[]");
    const nuevos = maestros.filter(m => m.id !== id);
    localStorage.setItem("maestros", JSON.stringify(nuevos));
    cargarGestionMaestros();
  }
}
