// gestion-maestros.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-maestro");
  const lista = document.getElementById("lista-maestros");

  const cargarMaestros = () => {
    const maestros = JSON.parse(localStorage.getItem("maestros")) || [];
    lista.innerHTML = "";

    maestros.forEach((maestro, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${maestro.nombre}</strong> - ${maestro.usuario} 
        <button class="eliminar" data-index="${index}">❌</button>
      `;
      lista.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = form.nombre.value.trim();
    const usuario = form.usuario.value.trim();
    const password = form.password.value.trim();

    if (!nombre || !usuario || !password) {
      alert("Por favor llena todos los campos.");
      return;
    }

    const nuevoMaestro = { nombre, usuario, password };

    fetch("http://localhost:3000/api/maestros/agregar", { // Endpoint para agregar maestro
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(nuevoMaestro)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Maestro agregado con éxito.");
        cargarMaestros();
      } else {
        alert("Error al agregar maestro.");
      }
    })
    .catch(error => console.error('Error al agregar maestro:', error));
  });

  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const index = e.target.dataset.index;
      const maestros = JSON.parse(localStorage.getItem("maestros")) || [];
      maestros.splice(index, 1);
      localStorage.setItem("maestros", JSON.stringify(maestros));
      cargarMaestros();
    }
  });

  cargarMaestros();
});
