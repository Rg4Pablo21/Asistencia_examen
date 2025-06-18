import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarNiveles } from "./componentes/levels/level.js";
import { cargarEstudiantes } from "./componentes/estudiante/estudiante.js";
import { cargarProyecciones } from "./componentes/proyecciones/proyecciones.js";
import { modalStyles } from "./componentes/utils/modal.js";

// Añadir estilos del modal
const styleElement = document.createElement("style");
styleElement.textContent = modalStyles;
document.head.appendChild(styleElement);

document.addEventListener("DOMContentLoaded", startApp);

function startApp() {
  const token = localStorage.getItem("token");
  if (token) {
    cargarMainApp();
  } else {
    cargarLogin();
  }
}

export function cargarMainApp() {
  if (!document.querySelector(".app-header")) {
    const header = createHeader();
    document.body.prepend(header);
  }

  mostrarSelectorNiveles();
}

function mostrarSelectorNiveles() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const selector = cargarNiveles((nivel, grado, seccion) => {
    localStorage.setItem("nivelSeleccionado", nivel);
    localStorage.setItem("gradoSeleccionado", grado);
    localStorage.setItem("seccionSeleccionado", seccion);

    root.innerHTML = "";
    cargarEstudiantes();
  });

  root.appendChild(selector);
}

document.addEventListener("click", (e) => {
  if (!e.target.matches(".nav-btn")) return;

  document.querySelectorAll(".nav-btn").forEach(btn => btn.classList.remove("active"));
  e.target.classList.add("active");

  const root = document.getElementById("root");

  if (e.target.id === "home-btn") {
    mostrarSelectorNiveles();
  } else if (e.target.id === "asistencia-btn") {
    const grado = localStorage.getItem("gradoSeleccionado");
    const seccion = localStorage.getItem("seccionSeleccionado");
    const nivel = localStorage.getItem("nivelSeleccionado");

    if (grado && seccion && nivel) {
      root.innerHTML = "";
      cargarEstudiantes();
    } else {
      mostrarSelectorNiveles();
    }
  } else if (e.target.id === "reportes-btn") {
    root.innerHTML = "";
    cargarProyecciones();
  }
});

// Función global para mostrar errores
window.mostrarError = (mensaje) => {
  const modal = document.createElement("div");
  modal.className = "error-modal";
  modal.innerHTML = `
    <div class="error-content">
      <h3>Error</h3>
      <p>${mensaje}</p>
      <button class="btn-aceptar">Aceptar</button>
    </div>
  `;
  
  modal.querySelector(".btn-aceptar").onclick = () => {
    document.body.removeChild(modal);
  };
  
  document.body.appendChild(modal);
};