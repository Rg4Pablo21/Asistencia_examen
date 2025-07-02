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

  // Llenar niveles
  Object.keys(niveles).forEach(nivel => {
    const option = document.createElement("option");
    option.value = nivel;
    option.textContent = nivel;
    nivelSelect.appendChild(option);
  });

  // Event listeners
  nivelSelect.addEventListener("change", (e) => {
    gradoSelect.innerHTML = '<option value="">Seleccione un grado</option>';
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    seccionSelect.disabled = true;

    if (e.target.value) {
      niveles[e.target.value].forEach(grado => {
        const option = document.createElement("option");
        option.value = grado;
        option.textContent = grado;
        gradoSelect.appendChild(option);
      });
      gradoSelect.disabled = false;
    }
  });

  gradoSelect.addEventListener("change", () => {
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    if (gradoSelect.value) {
      ["A", "B", "C"].forEach(seccion => {
        const option = document.createElement("option");
        option.value = seccion;
        option.textContent = `Sección ${seccion}`;
        seccionSelect.appendChild(option);
      });
      seccionSelect.disabled = false;
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