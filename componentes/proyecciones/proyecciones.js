export function cargarProyecciones() {
    const root = document.getElementById("root");
    root.innerHTML = "";
  
    const cont = document.createElement("div");
    cont.className = "proyecciones-container";
  
    const titulo = document.createElement("h2");
    titulo.textContent = "Proyecciones y Reportes";
    cont.appendChild(titulo);
  
    // Obtener datos de localStorage
    const asistencias = JSON.parse(localStorage.getItem("asistencias") || "{}");
    const estudiantes = JSON.parse(localStorage.getItem("estudiantes") || "[]");
    const reportes = JSON.parse(localStorage.getItem("reportes") || "{}");
  
    // Tarjetas de resumen
    const resumenContainer = document.createElement("div");
    resumenContainer.className = "resumen-container";
  
    // Resumen por niveles
    const niveles = ["Preprimaria", "Primaria", "Básicos", "Diversificado"];
    niveles.forEach(nivel => {
      const card = crearCardResumen(nivel, estudiantes, asistencias);
      resumenContainer.appendChild(card);
    });
  
    cont.appendChild(resumenContainer);
  
    // Gráfico de asistencia general
    const graficoContainer = document.createElement("div");
    graficoContainer.className = "grafico-container";
    graficoContainer.innerHTML = `
      <h3>Asistencia General</h3>
      <div class="grafico-barras"></div>
    `;
    cont.appendChild(graficoContainer);
  
    // Tabla de reportes recientes
    const reportesContainer = document.createElement("div");
    reportesContainer.className = "reportes-container";
    reportesContainer.innerHTML = `
      <h3>Reportes Recientes</h3>
      <table class="tabla-reportes">
        <thead>
          <tr>
            <th>Alumno</th>
            <th>Tipo</th>
            <th>Fecha</th>
            <th>Detalles</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    `;
  
    const tbody = reportesContainer.querySelector("tbody");
    const reportesLista = [];
  
    estudiantes.forEach(est => {
      if (reportes[est.id]) {
        reportes[est.id].forEach(rep => {
          reportesLista.push({
            alumno: est.nombre,
            tipo: rep.tipo,
            fecha: new Date(rep.fecha).toLocaleDateString(),
            detalles: rep.motivo
          });
        });
      }
    });
  
    // Ordenar por fecha descendente
    reportesLista.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  
    // Mostrar solo los últimos 5
    reportesLista.slice(0, 5).forEach(rep => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${rep.alumno}</td>
        <td>${rep.tipo}</td>
        <td>${rep.fecha}</td>
        <td>${rep.detalles}</td>
      `;
      tbody.appendChild(tr);
    });
  
    cont.appendChild(reportesContainer);
    root.appendChild(cont);
  
    // Botón para exportar
    const btnExportar = document.createElement("button");
    btnExportar.className = "btn-exportar";
    btnExportar.textContent = "Exportar Reporte";
    btnExportar.onclick = exportarReporte;
    cont.appendChild(btnExportar);
  
    function crearCardResumen(nivel, estudiantes, asistencias) {
      const card = document.createElement("div");
      card.className = "resumen-card";
      
      const alumnosNivel = estudiantes.filter(e => 
        e.nombre.includes(nivel) || 
        (nivel === "Preprimaria" && (e.nombre.includes("Prepa") || e.nombre.includes("Pre-Kinder"))) ||
        (nivel === "Diversificado" && e.nombre.includes("IV"))
      );
      
      const total = alumnosNivel.length;
      const presentes = alumnosNivel.filter(e => {
        const hoy = new Date().toLocaleDateString();
        return asistencias[e.id]?.[hoy]?.estado === "presente";
      }).length;
      
      const porcentaje = total > 0 ? Math.round((presentes / total) * 100) : 0;
      
      card.innerHTML = `
        <h4>${nivel}</h4>
        <div class="resumen-datos">
          <span>${presentes}/${total}</span>
          <div class="resumen-bar">
            <div class="resumen-fill" style="width: ${porcentaje}%"></div>
          </div>
          <span>${porcentaje}%</span>
        </div>
      `;
      
      return card;
    }
  
    function exportarReporte() {
      // Simular exportación
      const blob = new Blob([JSON.stringify({asistencias, estudiantes, reportes}, null, 2)], {type: 'application/json'});
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte-asistencia-${new Date().toLocaleDateString()}.json`;
      a.click();
      
      URL.revokeObjectURL(url);
      alert("Reporte exportado correctamente");
    }
  }