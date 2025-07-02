import { mostrarSelectorRol } from "./componentes/auth/role-selector.js";
import { cargarLogin } from "./componentes/login/login.js";
import { createHeader } from "./componentes/header/header.js";
import { cargarNiveles } from "./componentes/levels/level.js";
import { cargarEstudiantes } from "./componentes/estudiante/estudiante.js";
import { cargarProyecciones } from "./componentes/proyecciones/proyecciones.js";
import { cargarAdminPanel } from "./componentes/admin/admin.js";

document.addEventListener("DOMContentLoaded", startApp);

function startApp() {
  const token = localStorage.getItem("token");
  const rol = localStorage.getItem("userRol");
  
  if (token && rol) {
    cargarMainApp(rol);
  } else {
    mostrarSelectorRol();
  }
}

export function cargarMainApp(rol) {
  if (!document.querySelector(".app-header")) {
    const header = createHeader(rol);
    document.body.prepend(header);
  }

  const root = document.getElementById("root");
  root.innerHTML = "";

  if (rol === 'admin') {
    cargarAdminPanel();
  } else {
    mostrarSelectorNiveles();
  }
}

function mostrarSelectorNiveles() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const selector = cargarNiveles((nivel, grado, seccion) => {
    localStorage.setItem("nivelSeleccionado", nivel);
    localStorage.setItem("gradoSeleccionado", grado);
    localStorage.setItem("seccionSeleccionado", seccion);
    cargarEstudiantes();
  });

  root.appendChild(selector);
}

// Event listeners para navegación (se mantienen igual).