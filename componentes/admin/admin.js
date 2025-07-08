// admin.js
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
  document.getElementById('gestion-maestros').addEventListener('click', () => {
    // Lógica para cargar la gestión de maestros
    window.location.href = "gestion-maestros.html";
  });

  // Botón: Gestionar Alumnos
  document.getElementById('gestion-alumnos').addEventListener('click', () => {
    // Lógica para cargar la gestión de alumnos
    window.location.href = "gestion-alumnos.html";
  });

  // Botón: Gestionar Grados
  document.getElementById('gestion-grados').addEventListener('click', () => {
    // Lógica para cargar la gestión de grados
    window.location.href = "gestion-grados.html";
  });

  // Botón: Reportes Completos
  document.getElementById('reportes-admin').addEventListener('click', () => {
    // Lógica para mostrar reportes completos
    window.location.href = "reportes-admin.html";
  });
}
