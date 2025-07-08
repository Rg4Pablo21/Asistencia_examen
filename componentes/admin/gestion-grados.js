// gestion-grados.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-grado");
  const lista = document.getElementById("lista-grados");

  const cargarGrados = () => {
    const grados = JSON.parse(localStorage.getItem("grados")) || [];
    lista.innerHTML = "";

    grados.forEach((grado, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${grado.nivel}</strong> - ${grado.grado} - ${grado.seccion}
        <button class="eliminar" data-index="${index}">❌</button>
      `;
      lista.appendChild(li);
    });
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nivel = form.nivel.value.trim();
    const grado = form.grado.value.trim();
    const seccion = form.seccion.value.trim();

    if (!nivel || !grado || !seccion) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const nuevoGrado = { nivel, grado, seccion };
    const grados = JSON.parse(localStorage.getItem("grados")) || [];

    grados.push(nuevoGrado);
    localStorage.setItem("grados", JSON.stringify(grados));
    form.reset();
    cargarGrados();
  });

  lista.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const index = e.target.dataset.index;
      const grados = JSON.parse(localStorage.getItem("grados")) || [];
      grados.splice(index, 1);
      localStorage.setItem("grados", JSON.stringify(grados));
      cargarGrados();
    }
  });

  cargarGrados();
});
