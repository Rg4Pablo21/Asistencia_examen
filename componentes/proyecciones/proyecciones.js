export function cargarProyecciones(tipo) {
  const container = document.createElement('div');
  container.className = 'proyecciones-container';

  const datos = {
    niveles: [
      { nombre: 'Preprimaria', asistencia: 85, faltas: 15 },
      { nombre: 'Primaria', asistencia: 78, faltas: 22 },
      { nombre: 'Básicos', asistencia: 82, faltas: 18 },
      { nombre: 'Diversificado', asistencia: 90, faltas: 10 }
    ],
    profesores: [
      { nombre: 'Profesor 1', cumplimiento: 95 },
      { nombre: 'Profesor 2', cumplimiento: 88 },
      { nombre: 'Profesor 3', cumplimiento: 92 }
    ],
    alumnos: [
      { nombre: 'Carlos Pérez', asistencia: 90, faltas: 10 },
      { nombre: 'Ana López', asistencia: 85, faltas: 15 }
    ]
  };

  let titulo = '';
  let contenido = '';

  switch(tipo) {
    case 'niveles':
      titulo = 'Proyección por Niveles';
      contenido = generarTablaProyeccion(datos.niveles, ['Nivel', 'Asistencia (%)', 'Faltas (%)']);
      break;
    case 'profesores':
      titulo = 'Cumplimiento de Profesores';
      contenido = generarTablaProyeccion(datos.profesores, ['Profesor', 'Cumplimiento (%)']);
      break;
    case 'alumnos':
      titulo = 'Asistencia por Alumno';
      contenido = generarTablaProyeccion(datos.alumnos, ['Alumno', 'Asistencia (%)', 'Faltas (%)']);
      break;
    default:
      titulo = 'Proyecciones';
      contenido = '<p>Seleccione un tipo de proyección</p>';
  }

  container.innerHTML = `
    <h2>${titulo}</h2>
    ${contenido}
    <button class="btn-volver">Volver</button>
  `;

  container.querySelector('.btn-volver').addEventListener('click', () => {
    const event = new CustomEvent('cambiarVista', { detail: 'asistencia' });
    document.dispatchEvent(event);
  });

  return container;
}

function generarTablaProyeccion(datos, columnas) {
  return `
    <table class="tabla-proyecciones">
      <thead>
        <tr>
          ${columnas.map(col => `<th>${col}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${datos.map(item => `
          <tr>
            ${Object.values(item).map(val => `<td>${val}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}