// admin.js
import { cargarEstudiantes } from "../estudiante/estudiante.js";
import { cargarGestionMaestros } from "./gestion-maestros.js";
import { cargarGestionGrados } from "./gestion-grados.js";
import { cargarProyecciones } from "../proyecciones/proyecciones.js";

export function cargarAdminPanel() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'admin-container';

  container.innerHTML = `
    <div class="admin-header">
      <h2>Panel de Administración</h2>
      <p>Bienvenido, administrador</p>
    </div>
    <div class="admin-actions">
      <button id="gestion-maestros" class="admin-btn">
        <span class="admin-btn-icon">👨‍🏫</span>
        <span>Gestionar Maestros</span>
      </button>
      <button id="gestion-alumnos" class="admin-btn">
        <span class="admin-btn-icon">🧑‍🎓</span>
        <span>Gestionar Alumnos</span>
      </button>
      <button id="gestion-grados" class="admin-btn">
        <span class="admin-btn-icon">🏫</span>
        <span>Gestionar Grados</span>
      </button>
      <button id="reportes-admin" class="admin-btn">
        <span class="admin-btn-icon">📊</span>
        <span>Reportes Completos</span>
      </button>
    </div>
  `;

  root.appendChild(container);

  // Botón: Gestionar Maestros
  document.getElementById('gestion-maestros').addEventListener('click', cargarGestionMaestros);

  // Botón: Gestionar Alumnos
  document.getElementById('gestion-alumnos').addEventListener('click', () => {
    root.innerHTML = '';
    cargarEstudiantes();

    const volver = document.createElement("button");
    volver.textContent = "Volver";
    volver.className = "btn-volver";
    volver.onclick = () => cargarAdminPanel();
    document.getElementById("root").appendChild(volver);
  });

  // Botón: Gestionar Grados
  document.getElementById('gestion-grados').addEventListener('click', cargarGestionGrados);

  // Botón: Reportes Completos
  document.getElementById('reportes-admin').addEventListener('click', () => {
    root.innerHTML = "";

    const section = document.createElement("section");
    section.className = "admin-container";

    const contenido = cargarProyecciones("alumnos", cargarAdminPanel);
    section.appendChild(contenido);

    root.appendChild(section);
  });
}



// Maestros
if (!localStorage.getItem("maestros")) {
  const maestros = [
    { id: 1, nombre: "Carlos García", correo: "carlos@escuela.com" },
    { id: 2, nombre: "María Pérez", correo: "maria@escuela.com" }
  ];
  localStorage.setItem("maestros", JSON.stringify(maestros));
}

// Grados
if (!localStorage.getItem("grados")) {
  const grados = [
    { nombre: "Primero Primaria" },
    { nombre: "Segundo Básico" }
  ];
  localStorage.setItem("grados", JSON.stringify(grados));
}

// Estudiantes
if (!localStorage.getItem("estudiantes")) {
  const estudiantes = [
    { nombre: "Juan López", grado: "Primero Primaria" },
    { nombre: "Sofía Méndez", grado: "Primero Primaria" },
    { nombre: "Luis Gómez", grado: "Segundo Básico" }
  ];
  localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
}
