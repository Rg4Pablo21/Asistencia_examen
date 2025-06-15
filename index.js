import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarNiveles } from "./componentes/levels/level.js";
import { cargarEstudiantes } from "./componentes/estudiante/estudiante.js";

/** Punto de entrada principal de la aplicación */
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
    // Guardar selección en localStorage
    localStorage.setItem("nivelSeleccionado", nivel);
    localStorage.setItem("gradoSeleccionado", grado);
    localStorage.setItem("seccionSeleccionado", seccion);

    root.innerHTML = "";
    cargarEstudiantes(); // Mostrar lista de estudiantes directamente
  });

  root.appendChild(selector);
}

// Navegación del header
document.addEventListener("click", (e) => {
  if (!e.target.matches(".nav-btn")) return;

  // Marcar botón activo
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
      cargarEstudiantes(); // Muestra la lista de asistencia
    } else {
      mostrarSelectorNiveles();
    }
  } else if (e.target.id === "reportes-btn") {
    root.innerHTML = "<h2 style='text-align:center;margin-top:40px'>Módulo de reportes próximamente 🚧</h2>";
  }
});
