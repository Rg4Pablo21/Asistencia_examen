export function cargarPanelAdmin() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "admin-container";
  
    const title = document.createElement("h1");
    title.textContent = "Panel de Administración";
    container.appendChild(title);
  
    // Sección de gestión de usuarios
    const usuariosSection = document.createElement("section");
    usuariosSection.className = "admin-section";
    
    const usuariosTitle = document.createElement("h2");
    usuariosTitle.textContent = "Gestión de Usuarios";
    usuariosSection.appendChild(usuariosTitle);
  
    const btnAgregarProfesor = document.createElement("button");
    btnAgregarProfesor.className = "admin-btn";
    btnAgregarProfesor.textContent = "Agregar Profesor";
    btnAgregarProfesor.addEventListener("click", mostrarFormularioProfesor);
  
    const btnListarProfesores = document.createElement("button");
    btnListarProfesores.className = "admin-btn";
    btnListarProfesores.textContent = "Listar Profesores";
    btnListarProfesores.addEventListener("click", listarProfesores);
  
    usuariosSection.append(btnAgregarProfesor, btnListarProfesores);
    container.appendChild(usuariosSection);
  
    // Sección de gestión del sistema
    const sistemaSection = document.createElement("section");
    sistemaSection.className = "admin-section";
    
    const sistemaTitle = document.createElement("h2");
    sistemaTitle.textContent = "Configuración del Sistema";
    sistemaSection.appendChild(sistemaTitle);
  
    const btnAgregarNivel = document.createElement("button");
    btnAgregarNivel.className = "admin-btn";
    btnAgregarNivel.textContent = "Agregar Nivel/Grado";
    btnAgregarNivel.addEventListener("click", mostrarFormularioNivel);
  
    const btnHorarioAsistencia = document.createElement("button");
    btnHorarioAsistencia.className = "admin-btn";
    btnHorarioAsistencia.textContent = "Establecer Horario de Asistencia";
    btnHorarioAsistencia.addEventListener("click", mostrarFormularioHorario);
  
    sistemaSection.append(btnAgregarNivel, btnHorarioAsistencia);
    container.appendChild(sistemaSection);
  
    // Sección de reportes
    const reportesSection = document.createElement("section");
    reportesSection.className = "admin-section";
    
    const reportesTitle = document.createElement("h2");
    reportesTitle.textContent = "Reportes y Estadísticas";
    reportesSection.appendChild(reportesTitle);
  
    const btnReporteAsistencia = document.createElement("button");
    btnReporteAsistencia.className = "admin-btn";
    btnReporteAsistencia.textContent = "Reporte General de Asistencia";
    btnReporteAsistencia.addEventListener("click", generarReporteAsistencia);
  
    const btnReporteProfesores = document.createElement("button");
    btnReporteProfesores.className = "admin-btn";
    btnReporteProfesores.textContent = "Desempeño de Profesores";
    btnReporteProfesores.addEventListener("click", generarReporteProfesores);
  
    reportesSection.append(btnReporteAsistencia, btnReporteProfesores);
    container.appendChild(reportesSection);
  
    root.appendChild(container);
  }
  
  function mostrarFormularioProfesor() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const form = document.createElement("form");
    form.className = "admin-form";
  
    form.innerHTML = `
      <h2>Agregar Nuevo Profesor</h2>
      <label for="nombre">Nombre Completo:</label>
      <input type="text" id="nombre" required>
      
      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" required>
      
      <label for="password">Contraseña:</label>
      <input type="password" id="password" required>
      
      <label for="rol">Rol:</label>
      <select id="rol" required>
        <option value="">Seleccione un rol</option>
        <option value="profesor">Profesor</option>
        <option value="coordinador">Coordinador</option>
      </select>
      
      <button type="submit">Guardar</button>
      <button type="button" id="cancelar">Cancelar</button>
    `;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí iría la lógica para guardar el nuevo profesor
      alert("Profesor agregado (demo)");
      cargarPanelAdmin();
    });
  
    document.getElementById("cancelar").addEventListener("click", cargarPanelAdmin);
    root.appendChild(form);
  }
  
  function listarProfesores() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "admin-container";
  
    const title = document.createElement("h1");
    title.textContent = "Listado de Profesores";
    container.appendChild(title);
  
    // Datos de ejemplo (en un caso real, estos vendrían de una API)
    const profesores = [
      { id: 1, nombre: "Profesor Uno", email: "prof1@escuela.com", rol: "profesor" },
      { id: 2, nombre: "Profesor Dos", email: "prof2@escuela.com", rol: "profesor" },
      { id: 3, nombre: "Coordinador Uno", email: "coord1@escuela.com", rol: "coordinador" }
    ];
  
    const table = document.createElement("table");
    table.className = "admin-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Rol</th>
        <th>Acciones</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
    profesores.forEach(profesor => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${profesor.id}</td>
        <td>${profesor.nombre}</td>
        <td>${profesor.email}</td>
        <td>${profesor.rol}</td>
        <td>
          <button class="btn-eliminar" data-id="${profesor.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "admin-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelAdmin);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm(`¿Está seguro de eliminar al profesor con ID ${id}?`)) {
          // Aquí iría la lógica para eliminar el profesor
          alert(`Profesor ${id} eliminado (demo)`);
          listarProfesores();
        }
      });
    });
  }
  
  function mostrarFormularioNivel() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const form = document.createElement("form");
    form.className = "admin-form";
  
    form.innerHTML = `
      <h2>Agregar Nivel/Grado</h2>
      <label for="tipo">Tipo:</label>
      <select id="tipo" required>
        <option value="">Seleccione un tipo</option>
        <option value="nivel">Nivel</option>
        <option value="grado">Grado</option>
      </select>
      
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" required>
      
      <button type="submit">Guardar</button>
      <button type="button" id="cancelar">Cancelar</button>
    `;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí iría la lógica para guardar el nuevo nivel/grado
      alert("Nivel/Grado agregado (demo)");
      cargarPanelAdmin();
    });
  
    document.getElementById("cancelar").addEventListener("click", cargarPanelAdmin);
    root.appendChild(form);
  }
  
  function mostrarFormularioHorario() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const form = document.createElement("form");
    form.className = "admin-form";
  
    form.innerHTML = `
      <h2>Establecer Horario de Asistencia</h2>
      <label for="horaInicio">Hora de Inicio:</label>
      <input type="time" id="horaInicio" required>
      
      <label for="horaFin">Hora de Fin:</label>
      <input type="time" id="horaFin" required>
      
      <button type="submit">Guardar</button>
      <button type="button" id="cancelar">Cancelar</button>
    `;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí iría la lógica para guardar el horario
      alert("Horario establecido (demo)");
      cargarPanelAdmin();
    });
  
    document.getElementById("cancelar").addEventListener("click", cargarPanelAdmin);
    root.appendChild(form);
  }
  
  function generarReporteAsistencia() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "admin-container";
  
    const title = document.createElement("h1");
    title.textContent = "Reporte General de Asistencia";
    container.appendChild(title);
  
    // Datos de ejemplo
    const datos = [
      { nivel: "Preprimaria", asistencia: "85%", faltas: "15%" },
      { nivel: "Primaria", asistencia: "78%", faltas: "22%" },
      { nivel: "Básicos", asistencia: "82%", faltas: "18%" },
      { nivel: "Diversificado", asistencia: "90%", faltas: "10%" }
    ];
  
    const table = document.createElement("table");
    table.className = "admin-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Nivel</th>
        <th>Asistencia</th>
        <th>Faltas</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
    datos.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.nivel}</td>
        <td>${item.asistencia}</td>
        <td>${item.faltas}</td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "admin-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelAdmin);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  }
  
  function generarReporteProfesores() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "admin-container";
  
    const title = document.createElement("h1");
    title.textContent = "Reporte de Desempeño de Profesores";
    container.appendChild(title);
  
    // Datos de ejemplo
    const datos = [
      { profesor: "Profesor Uno", asistencia: "95%", reportes: 3 },
      { profesor: "Profesor Dos", asistencia: "88%", reportes: 1 },
      { profesor: "Profesor Tres", asistencia: "92%", reportes: 0 }
    ];
  
    const table = document.createElement("table");
    table.className = "admin-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Profesor</th>
        <th>Asistencia Promedio</th>
        <th>Reportes Enviados</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
    datos.forEach(item => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${item.profesor}</td>
        <td>${item.asistencia}</td>
        <td>${item.reportes}</td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "admin-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelAdmin);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  }