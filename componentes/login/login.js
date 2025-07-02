import { cargarMainApp } from "../../index.js";
import { mostrarSelectorRol } from "../auth/role-selector.js";

export function cargarLogin(rol) {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "login-container";

  const box = document.createElement("div");
  box.className = "form-box";

  const title = document.createElement("h2");
  title.textContent = `Iniciar sesión como ${rol === 'admin' ? 'Administrador' : 'Maestro'}`;

  const email = crearInput("email", "Correo electrónico", "loginEmail");
  const pass = crearInput("password", "Contraseña", "loginPassword");

  const btnLogin = crearBoton("Iniciar sesión", "loginBtn");
  const btnForgot = crearLink("¿Olvidaste tu contraseña?", "forgotPasswordBtn");
  const btnBack = crearLink("Volver a selección de rol", "backToRolesBtn");

  const error = document.createElement("p");
  error.id = "loginError";
  error.className = "error-message hidden";

  box.append(title, email, pass, btnLogin, btnForgot, btnBack, error);
  container.appendChild(box);
  root.appendChild(container);

  btnLogin.addEventListener("click", () => login(rol));
  btnForgot.addEventListener("click", cargarRecuperarClave);
  btnBack.addEventListener("click", mostrarSelectorRol);

  function crearInput(type, placeholder, id) {
    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    if (id) input.id = id;
    return input;
  }

  function crearBoton(text, id) {
    const btn = document.createElement("button");
    btn.textContent = text;
    if (id) btn.id = id;
    return btn;
  }

  function crearLink(text, id) {
    const link = document.createElement("a");
    link.textContent = text;
    link.href = "#";
    if (id) link.id = id;
    return link;
  }

  function login(rol) {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    if (!email || !password) {
      showError("Completa ambos campos");
      return;
    }

    localStorage.setItem("token", "simulated-token");
    localStorage.setItem("userRol", rol);
    localStorage.setItem("userEmail", email);
    cargarMainApp(rol);
  }

  function showError(msg) {
    const p = document.getElementById("loginError");
    p.textContent = msg;
    p.classList.remove("hidden");
  }

  function cargarRecuperarClave(e) {
    e.preventDefault();
    root.innerHTML = "";

    const container = document.createElement("div");
    container.className = "login-container";

    const box = document.createElement("div");
    box.className = "form-box";

    const title = document.createElement("h2");
    title.textContent = "Restablecer contraseña";

    const email = crearInput("email", "Correo electrónico", "recoveryEmail");
    const nuevaPass = crearInput("password", "Nueva contraseña", "recoveryPass");
    const confirmarPass = crearInput("password", "Confirmar contraseña", "recoveryPass2");

    const error = document.createElement("p");
    error.id = "recoveryError";
    error.className = "error-message hidden";

    const btn = crearBoton("Restablecer");
    const back = crearLink("Volver al login");

    box.append(title, email, nuevaPass, confirmarPass, btn, back, error);
    container.appendChild(box);
    root.appendChild(container);

    back.addEventListener("click", () => cargarLogin(rol));

    btn.addEventListener("click", () => {
      const correo = email.value.trim();
      const nueva = nuevaPass.value.trim();
      const confirm = confirmarPass.value.trim();

      if (!correo || !nueva || !confirm) {
        mostrarErrorRecovery("Completa todos los campos");
        return;
      }

      if (nueva.length < 6) {
        mostrarErrorRecovery("La contraseña debe tener al menos 6 caracteres");
        return;
      }

      if (nueva !== confirm) {
        mostrarErrorRecovery("Las contraseñas no coinciden");
        return;
      }

      alert(`Se ha restablecido la contraseña para ${correo}`);
      cargarLogin(rol);
    });

    function mostrarErrorRecovery(msg) {
      const p = document.getElementById("recoveryError");
      p.textContent = msg;
      p.classList.remove("hidden");
    }
  }
}
