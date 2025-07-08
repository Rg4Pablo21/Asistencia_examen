export function cargarNiveles(callbackSeleccion) {
  const container = document.createElement("div");
  container.className = "niveles-container";

  const niveles = {
    Preprimaria: ["Prepa", "Pre-Kinder", "Nursery"],
    Primaria: ["1ro Primaria", "2do Primaria", "3ro Primaria"],
    Básicos: ["1ro Básico", "2do Básico", "3ro Básico"],
    Diversificado: ["IV Computación", "V Computación", "IV Diseño", "V Diseño", "IV Biológicas", "V Biológicas"]
  };

  // Selects
  const nivelSelect = document.createElement("select");
  nivelSelect.id = "nivel-select";
  nivelSelect.innerHTML = '<option value="">Seleccione un nivel</option>';

  const gradoSelect = document.createElement("select");
  gradoSelect.id = "grado-select";
  gradoSelect.innerHTML = '<option value="">Seleccione un grado</option>';
  gradoSelect.disabled = true;

  const seccionSelect = document.createElement("select");
  seccionSelect.id = "seccion-select";
  seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
  seccionSelect.disabled = true;

  // Llenar niveles desde el backend
  fetch('http://localhost:3000/api/niveles')
    .then(response => response.json())
    .then(data => {
      console.log("Niveles recibidos:", data);
      data.forEach(nivel => {
        const option = document.createElement("option");
        option.value = nivel.id; // Usamos el id del nivel
        option.textContent = nivel.nombre; // Mostramos el nombre del nivel
        nivelSelect.appendChild(option);
      });
    })
    .catch(err => console.error('Error al cargar los niveles:', err));

  // Event listeners
  nivelSelect.addEventListener("change", (e) => {
    gradoSelect.innerHTML = '<option value="">Seleccione un grado</option>';
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    seccionSelect.disabled = true;

    if (e.target.value) {
      // Cargar grados al seleccionar un nivel
      fetch(`http://localhost:3000/api/grados/${e.target.value}`)
        .then(response => response.json())
        .then(data => {
          console.log("Grados recibidos:", data);
          data.forEach(grado => {
            const option = document.createElement("option");
            option.value = grado.id; // Usamos el id del grado
            option.textContent = grado.nombre; // Mostramos el nombre del grado
            gradoSelect.appendChild(option);
          });
          gradoSelect.disabled = false;
        })
        .catch(err => console.error('Error al cargar los grados:', err));
    }
  });

  gradoSelect.addEventListener("change", () => {
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    if (gradoSelect.value) {
      // Cargar secciones al seleccionar un grado
      fetch(`http://localhost:3000/api/secciones/${gradoSelect.value}`)
        .then(response => response.json())
        .then(data => {
          console.log("Secciones recibidas:", data);
          data.forEach(seccion => {
            const option = document.createElement("option");
            option.value = seccion.id; // Usamos el id de la sección
            option.textContent = `Sección ${seccion.nombre}`; // Mostramos el nombre de la sección
            seccionSelect.appendChild(option);
          });
          seccionSelect.disabled = false;
        })
        .catch(err => console.error('Error al cargar las secciones:', err));
    }
  });

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn-gradient";
  confirmBtn.textContent = "Confirmar selección";
  confirmBtn.disabled = true;

  seccionSelect.addEventListener("change", () => {
    confirmBtn.disabled = !seccionSelect.value;
  });

  confirmBtn.addEventListener("click", () => {
    callbackSeleccion(nivelSelect.value, gradoSelect.value, seccionSelect.value);
  });

  container.append(nivelSelect, gradoSelect, seccionSelect, confirmBtn);
  return container;
}
