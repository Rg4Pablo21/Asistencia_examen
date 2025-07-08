export function cargarNiveles(callbackSeleccion) {
  const container = document.createElement("div");
  container.className = "niveles-container";

  // Datos completos de niveles, grados, secciones y estudiantes con IDs
  const datosCompletos = {
    Preprimaria: {
      grados: ["Prepa", "Pre-Kinder", "Nursery"],
      estudiantes: {
        "Prepa": {
          "A": [
            { id: 101, nombre: "Ana López", correo: "ana@preprimaria.com" },
            { id: 102, nombre: "Carlos Ruiz", correo: "carlos@preprimaria.com" }
          ],
          "B": [
            { id: 103, nombre: "Sofía Martínez", correo: "sofia@preprimaria.com" },
            { id: 104, nombre: "Diego García", correo: "diego@preprimaria.com" }
          ]
        },
        "Pre-Kinder": {
          "A": [
            { id: 105, nombre: "Lucía Hernández", correo: "lucia@preprimaria.com" },
            { id: 106, nombre: "Javier Díaz", correo: "javier@preprimaria.com" }
          ],
          "B": [
            { id: 107, nombre: "Valentina Castro", correo: "valentina@preprimaria.com" },
            { id: 108, nombre: "Miguel Ángel", correo: "miguel@preprimaria.com" }
          ]
        }
      }
    },
    Primaria: {
      grados: ["1ro Primaria", "2do Primaria", "3ro Primaria"],
      estudiantes: {
        "1ro Primaria": {
          "A": [
            { id: 201, nombre: "María González", correo: "maria@primaria.com" },
            { id: 202, nombre: "Pedro Martínez", correo: "pedro@primaria.com" }
          ],
          "B": [
            { id: 203, nombre: "Isabel Ramírez", correo: "isabel@primaria.com" },
            { id: 204, nombre: "Fernando López", correo: "fernando@primaria.com" }
          ]
        },
        "2do Primaria": {
          "A": [
            { id: 205, nombre: "Adriana Sánchez", correo: "adriana@primaria.com" },
            { id: 206, nombre: "Roberto Jiménez", correo: "roberto@primaria.com" }
          ],
          "B": [
            { id: 207, nombre: "Patricia Núñez", correo: "patricia@primaria.com" },
            { id: 208, nombre: "Ricardo Vargas", correo: "ricardo@primaria.com" }
          ]
        }
      }
    },
    Básicos: {
      grados: ["1ro Básico", "2do Básico", "3ro Básico"],
      estudiantes: {
        "1ro Básico": {
          "A": [
            { id: 301, nombre: "Gabriela Morales", correo: "gabriela@basicos.com" },
            { id: 302, nombre: "Oscar Cordero", correo: "oscar@basicos.com" }
          ],
          "B": [
            { id: 303, nombre: "Daniela Ortiz", correo: "daniela@basicos.com" },
            { id: 304, nombre: "José Pérez", correo: "jose@basicos.com" }
          ]
        },
        "2do Básico": {
          "A": [
            { id: 305, nombre: "Andrea Castro", correo: "andrea@basicos.com" },
            { id: 306, nombre: "Manuel Rodríguez", correo: "manuel@basicos.com" }
          ],
          "B": [
            { id: 307, nombre: "Camila Flores", correo: "camila@basicos.com" },
            { id: 308, nombre: "Juan Carlos", correo: "juanc@basicos.com" }
          ]
        }
      }
    },
    Diversificado: {
      grados: ["IV Computación", "V Computación", "IV Diseño", "V Diseño", "IV Biológicas", "V Biológicas"],
      estudiantes: {
        "IV Computación": {
          "A": [
            { id: 401, nombre: "Luisa Fernández", correo: "luisa@diversificado.com" },
            { id: 402, nombre: "Jorge Herrera", correo: "jorge@diversificado.com" }
          ],
          "B": [
            { id: 403, nombre: "Karla Méndez", correo: "karla@diversificado.com" },
            { id: 404, nombre: "Luis Navarro", correo: "luisn@diversificado.com" }
          ]
        },
        "V Biológicas": {
          "A": [
            { id: 405, nombre: "Mariana Solís", correo: "mariana@diversificado.com" },
            { id: 406, nombre: "Raúl Gómez", correo: "raul@diversificado.com" }
          ],
          "B": [
            { id: 407, nombre: "Carolina Rivas", correo: "carolina@diversificado.com" },
            { id: 408, nombre: "Arturo Sandoval", correo: "arturo@diversificado.com" }
          ]
        }
      }
    }
  };

  // Elementos del formulario
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

  const confirmBtn = document.createElement("button");
  confirmBtn.className = "btn-confirmar";
  confirmBtn.textContent = "Cargar Lista de Asistencia";
  confirmBtn.disabled = true;

  // Llenar select de niveles
  Object.keys(datosCompletos).forEach(nivel => {
    const option = document.createElement("option");
    option.value = nivel;
    option.textContent = nivel;
    nivelSelect.appendChild(option);
  });

  // Eventos
  nivelSelect.addEventListener("change", (e) => {
    gradoSelect.innerHTML = '<option value="">Seleccione un grado</option>';
    gradoSelect.disabled = !e.target.value;
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    seccionSelect.disabled = true;
    confirmBtn.disabled = true;

    if (e.target.value) {
      datosCompletos[e.target.value].grados.forEach(grado => {
        const option = document.createElement("option");
        option.value = grado;
        option.textContent = grado;
        gradoSelect.appendChild(option);
      });
    }
  });

  gradoSelect.addEventListener("change", () => {
    seccionSelect.innerHTML = '<option value="">Seleccione una sección</option>';
    seccionSelect.disabled = !gradoSelect.value;
    confirmBtn.disabled = true;

    if (gradoSelect.value) {
      ["A", "B"].forEach(seccion => {
        const option = document.createElement("option");
        option.value = seccion;
        option.textContent = `Sección ${seccion}`;
        seccionSelect.appendChild(option);
      });
    }
  });

  seccionSelect.addEventListener("change", () => {
    confirmBtn.disabled = !seccionSelect.value;
  });

  confirmBtn.addEventListener("click", () => {
    const nivel = nivelSelect.value;
    const grado = gradoSelect.value;
    const seccion = seccionSelect.value;
    
    // Obtener estudiantes para el grado/sección seleccionado
    const estudiantes = datosCompletos[nivel]?.estudiantes[grado]?.[seccion] || [];
    
    // Pasar todos los datos necesarios al callback
    callbackSeleccion({
      nivel,
      grado,
      seccion,
      estudiantes
    });
  });

  // Estilos inline para mejor visualización
  container.style.maxWidth = "600px";
  container.style.margin = "0 auto";
  container.style.padding = "20px";
  container.style.backgroundColor = "#f5f5f5";
  container.style.borderRadius = "8px";
  container.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";

  confirmBtn.style.marginTop = "20px";
  confirmBtn.style.padding = "10px 20px";
  confirmBtn.style.backgroundColor = "#4CAF50";
  confirmBtn.style.color = "white";
  confirmBtn.style.border = "none";
  confirmBtn.style.borderRadius = "4px";
  confirmBtn.style.cursor = "pointer";
  confirmBtn.style.fontSize = "16px";

  confirmBtn.addEventListener("mouseenter", () => {
    confirmBtn.style.backgroundColor = "#45a049";
  });

  confirmBtn.addEventListener("mouseleave", () => {
    confirmBtn.style.backgroundColor = "#4CAF50";
  });

  container.append(
    nivelSelect, 
    document.createElement("br"),
    gradoSelect,
    document.createElement("br"), 
    seccionSelect,
    document.createElement("br"),
    confirmBtn
  );

  return container;
}