import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarNiveles } from "./componentes/levels/level.js";
import { cargarEstudiantes } from "./componentes/estudiante/estudiante.js";
import { cargarPanelAdmin } from "./componentes/admin/admin.js";
import { cargarPanelCoordinador } from "./componentes/coordinador/coordinador.js";

document.addEventListener("DOMContentLoaded", startApp);

function startApp() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("rol");
  
  if (token && rol) {
    cargarMainApp(rol);
  } else {
    cargarLogin();
  }
}

export function cargarMainApp(rol) {
  if (!document.querySelector(".app-header")) {
    const header = createHeader(rol);
    document.body.prepend(header);
  }

  // Cargar el panel según el rol
  switch(rol) {
    case "admin":
      cargarPanelAdmin();
      break;
    case "coordinador":
      cargarPanelCoordinador();
      break;
    case "profesor":
      mostrarSelectorNiveles();
      break;
    default:
      console.error("Rol no reconocido");
      cargarLogin();
  }
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
  const rol = localStorage.getItem("rol");

  if (e.target.id === "home-btn") {
    if (rol === "profesor") {
      mostrarSelectorNiveles();
    } else if (rol === "coordinador") {
      cargarPanelCoordinador();
    } else if (rol === "admin") {
      cargarPanelAdmin();
    }
  } else if (e.target.id === "asistencia-btn") {
    if (rol === "profesor") {
      const grado = localStorage.getItem("gradoSeleccionado");
      const seccion = localStorage.getItem("seccionSeleccionado");
      const nivel = localStorage.getItem("nivelSeleccionado");

      if (grado && seccion && nivel) {
        root.innerHTML = "";
        cargarEstudiantes();
      } else {
        mostrarSelectorNiveles();
      }
    }
  } else if (e.target.id === "reportes-btn") {
    root.innerHTML = "<h2 style='text-align:center;margin-top:40px'>Módulo de reportes próximamente 🚧</h2>";
  } else if (e.target.id === "admin-btn") {
    if (rol === "admin") {
      cargarPanelAdmin();
    }
  } else if (e.target.id === "coordinador-btn") {
    if (rol === "coordinador") {
      cargarPanelCoordinador();
    }
  }
});