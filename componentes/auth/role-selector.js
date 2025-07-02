import { cargarLogin } from "../login/login.js";

export function mostrarSelectorRol() {
  const root = document.getElementById('root');
  root.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'role-select-container';

  const title = document.createElement('h2');
  title.textContent = 'Seleccione su rol';
  container.appendChild(title);

  const btnMaestro = document.createElement('button');
  btnMaestro.className = 'btn-rol maestro';
  btnMaestro.innerHTML = `
    <div class="rol-icon">👨‍🏫</div>
    <div class="rol-title">Maestro</div>
    <div class="rol-desc">Tomar asistencia y gestionar alumnos</div>
  `;
  btnMaestro.onclick = () => cargarLogin('maestro');

  const btnAdmin = document.createElement('button');
  btnAdmin.className = 'btn-rol admin';
  btnAdmin.innerHTML = `
    <div class="rol-icon">👨‍💼</div>
    <div class="rol-title">Administrador</div>
    <div class="rol-desc">Gestionar todo el sistema</div>
  `;
  btnAdmin.onclick = () => cargarLogin('admin');

  container.append(btnMaestro, btnAdmin);
  root.appendChild(container);
}