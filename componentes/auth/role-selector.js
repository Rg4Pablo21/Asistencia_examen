import { cargarLogin } from "../login/login.js";

export function mostrarSelectorRol() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "role-selector-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Selecciona tu rol";

  const btnAdmin = crearBoton("Administrador");
  const btnMaestro = crearBoton("Maestro");

  container.append(h2, btnAdmin, btnMaestro);
  root.appendChild(container);

  btnAdmin.addEventListener("click", () => cargarLogin("admin"));
  btnMaestro.addEventListener("click", () => cargarLogin("maestro"));

  function crearBoton(texto) {
    const btn = document.createElement("button");
    btn.textContent = texto;
    btn.className = "role-btn";
    return btn;
  }
}
