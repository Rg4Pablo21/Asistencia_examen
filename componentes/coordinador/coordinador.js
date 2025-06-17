export function cargarPanelCoordinador() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "coordinador-container";
  
    const title = document.createElement("h1");
    title.textContent = "Panel de Coordinación";
    container.appendChild(title);
  
    // Sección de asistencia
    const asistenciaSection = document.createElement("section");
    asistenciaSection.className = "coordinador-section";
    
    const asistenciaTitle = document.createElement("h2");
    asistenciaTitle.textContent = "Asistencia";
    asistenciaSection.appendChild(asistenciaTitle);
  
    const btnAsistenciaNiveles = document.createElement("button");
    btnAsistenciaNiveles.className = "coordinador-btn";
    btnAsistenciaNiveles.textContent = "Asistencia por Niveles";
    btnAsistenciaNiveles.addEventListener("click", mostrarAsistenciaNiveles);
  
    const btnAsistenciaProfesores = document.createElement("button");
    btnAsistenciaProfesores.className = "coordinador-btn";
    btnAsistenciaProfesores.textContent = "Asistencia por Profesores";
    btnAsistenciaProfesores.addEventListener("click", mostrarAsistenciaProfesores);
  
    asistenciaSection.append(btnAsistenciaNiveles, btnAsistenciaProfesores);
    container.appendChild(asistenciaSection);
  
    // Sección de profesores
    const profesoresSection = document.createElement("section");
    profesoresSection.className = "coordinador-section";
    
    const profesoresTitle = document.createElement("h2");
    profesoresTitle.textContent = "Gestión de Profesores";
    profesoresSection.appendChild(profesoresTitle);
  
    const btnAgregarProfesor = document.createElement("button");
    btnAgregarProfesor.className = "coordinador-btn";
    btnAgregarProfesor.textContent = "Agregar Profesor";
    btnAgregarProfesor.addEventListener("click", mostrarFormularioProfesor);
  
    const btnEliminarProfesor = document.createElement("button");
    btnEliminarProfesor.className = "coordinador-btn";
    btnEliminarProfesor.textContent = "Eliminar Profesor";
    btnEliminarProfesor.addEventListener("click", mostrarListaProfesores);
  
    profesoresSection.append(btnAgregarProfesor, btnEliminarProfesor);
    container.appendChild(profesoresSection);
  
    root.appendChild(container);
  }
  
  function mostrarAsistenciaNiveles() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "coordinador-container";
  
    const title = document.createElement("h1");
    title.textContent = "Asistencia por Niveles";
    container.appendChild(title);
  
    // Datos de ejemplo
    const niveles = [
      { nombre: "Preprimaria", asistencia: "85%", faltas: "15%" },
      { nombre: "Primaria", asistencia: "78%", faltas: "22%" },
      { nombre: "Básicos", asistencia: "82%", faltas: "18%" },
      { nombre: "Diversificado", asistencia: "90%", faltas: "10%" }
    ];
  
    const table = document.createElement("table");
    table.className = "coordinador-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Nivel</th>
        <th>Asistencia</th>
        <th>Faltas</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
    niveles.forEach(nivel => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${nivel.nombre}</td>
        <td>${nivel.asistencia}</td>
        <td>${nivel.faltas}</td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "coordinador-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelCoordinador);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  }
  
  function mostrarAsistenciaProfesores() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "coordinador-container";
  
    const title = document.createElement("h1");
    title.textContent = "Asistencia por Profesores";
    container.appendChild(title);
  
    // Datos de ejemplo
    const profesores = [
      { nombre: "Profesor Uno", nivel: "Primaria", asistencia: "95%", faltas: "5%" },
      { nombre: "Profesor Dos", nivel: "Básicos", asistencia: "88%", faltas: "12%" },
      { nombre: "Profesor Tres", nivel: "Diversificado", asistencia: "92%", faltas: "8%" }
    ];
  
    const table = document.createElement("table");
    table.className = "coordinador-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>Profesor</th>
        <th>Nivel</th>
        <th>Asistencia</th>
        <th>Faltas</th>
      </tr>
    `;
  
    const tbody = document.createElement("tbody");
    profesores.forEach(profesor => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${profesor.nombre}</td>
        <td>${profesor.nivel}</td>
        <td>${profesor.asistencia}</td>
        <td>${profesor.faltas}</td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "coordinador-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelCoordinador);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  }
  
  function mostrarFormularioProfesor() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const form = document.createElement("form");
    form.className = "coordinador-form";
  
    form.innerHTML = `
      <h2>Agregar Nuevo Profesor</h2>
      <label for="nombre">Nombre Completo:</label>
      <input type="text" id="nombre" required>
      
      <label for="email">Correo Electrónico:</label>
      <input type="email" id="email" required>
      
      <label for="password">Contraseña:</label>
      <input type="password" id="password" required>
      
      <label for="nivel">Nivel Asignado:</label>
      <select id="nivel" required>
        <option value="">Seleccione un nivel</option>
        <option value="Preprimaria">Preprimaria</option>
        <option value="Primaria">Primaria</option>
        <option value="Básicos">Básicos</option>
        <option value="Diversificado">Diversificado</option>
      </select>
      
      <button type="submit">Guardar</button>
      <button type="button" id="cancelar">Cancelar</button>
    `;
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Aquí iría la lógica para guardar el nuevo profesor
      alert("Profesor agregado (demo)");
      cargarPanelCoordinador();
    });
  
    document.getElementById("cancelar").addEventListener("click", cargarPanelCoordinador);
    root.appendChild(form);
  }
  
  function mostrarListaProfesores() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const container = document.createElement("div");
    container.className = "coordinador-container";
  
    const title = document.createElement("h1");
    title.textContent = "Listado de Profesores";
    container.appendChild(title);
  
    // Datos de ejemplo
    const profesores = [
      { id: 1, nombre: "Profesor Uno", email: "prof1@escuela.com", nivel: "Primaria" },
      { id: 2, nombre: "Profesor Dos", email: "prof2@escuela.com", nivel: "Básicos" },
      { id: 3, nombre: "Profesor Tres", email: "prof3@escuela.com", nivel: "Diversificado" }
    ];
  
    const table = document.createElement("table");
    table.className = "coordinador-table";
  
    const thead = document.createElement("thead");
    thead.innerHTML = `
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Correo</th>
        <th>Nivel</th>
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
        <td>${profesor.nivel}</td>
        <td>
          <button class="btn-eliminar" data-id="${profesor.id}">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  
    table.append(thead, tbody);
    container.appendChild(table);
  
    const btnVolver = document.createElement("button");
    btnVolver.className = "coordinador-btn";
    btnVolver.textContent = "Volver al Panel";
    btnVolver.addEventListener("click", cargarPanelCoordinador);
    container.appendChild(btnVolver);
  
    root.appendChild(container);
  
    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".btn-eliminar").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        if (confirm(`¿Está seguro de eliminar al profesor con ID ${id}?`)) {
          // Aquí iría la lógica para eliminar el profesor
          alert(`Profesor ${id} eliminado (demo)`);
          mostrarListaProfesores();
        }
      });
    });
  }