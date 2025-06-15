export function cargarNiveles(callbackSeleccion) {
    const container = document.createElement("div");
    container.className = "niveles-container";
  
    const niveles = {
      Preprimaria: ["Párvulos 1", "Párvulos 2", "Párvulos 3"],
      Primaria: ["Primero", "Segundo", "Tercero", "Cuarto", "Quinto", "Sexto"],
      Básicos: ["Primero Básico", "Segundo Básico", "Tercero Básico"],
      "Bachillerato Computación": ["IV Computación", "V Computación"],
    };
  
    // Selects
    const nivelSelect = buildSelect("nivel-select", "Seleccione un nivel");
    const gradoSelect = buildSelect("grado-select", "Seleccione un grado", true);
    const seccionSelect = buildSelect(
      "seccion-select",
      "Seleccione una sección",
      true
    );
  
    Object.keys(niveles).forEach((nivel) => {
      const option = document.createElement("option");
      option.value = nivel;
      option.textContent = nivel;
      nivelSelect.append(option);
    });
  
    nivelSelect.addEventListener("change", (e) => {
      gradoSelect.innerHTML = "<option value=''>Seleccione un grado</option>";
      seccionSelect.innerHTML =
        "<option value=''>Seleccione una sección</option>";
      seccionSelect.disabled = true;
  
      const nivel = e.target.value;
      if (nivel) {
        niveles[nivel].forEach((grado) => {
          const opt = document.createElement("option");
          opt.value = grado;
          opt.textContent = grado;
          gradoSelect.append(opt);
        });
        gradoSelect.disabled = false;
      } else {
        gradoSelect.disabled = true;
      }
    });
  
    gradoSelect.addEventListener("change", () => {
      seccionSelect.innerHTML = "<option value=''>Seleccione una sección</option>";
      if (gradoSelect.value) {
        ["A", "B", "C"].forEach((s) => {
          const opt = document.createElement("option");
          opt.value = s;
          opt.textContent = `Sección ${s}`;
          seccionSelect.append(opt);
        });
        seccionSelect.disabled = false;
      } else {
        seccionSelect.disabled = true;
      }
    });
  
    const confirmBtn = document.createElement("button");
    confirmBtn.id = "confirmar-seleccion";
    confirmBtn.className = "btn-gradient";
    confirmBtn.textContent = "Confirmar selección";
    confirmBtn.disabled = true;
  
    seccionSelect.addEventListener(
      "change",
      () => (confirmBtn.disabled = !seccionSelect.value)
    );
  
    confirmBtn.addEventListener("click", () => {
      callbackSeleccion(nivelSelect.value, gradoSelect.value, seccionSelect.value);
    });
  
    container.append(nivelSelect, gradoSelect, seccionSelect, confirmBtn);
    return container;
  }
  
  // Helper
  function buildSelect(id, placeholder, disabled = false) {
    const select = document.createElement("select");
    select.id = id;
    select.disabled = disabled;
    select.innerHTML = `<option value="">${placeholder}</option>`;
    return select;
  }