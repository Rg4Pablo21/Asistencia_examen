import { cargarMainApp } from "../../index.js";

export function cargarLogin() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "login-container";

  const box = document.createElement("div");
  box.className = "form-box";

  const title = document.createElement("h2");
  title.textContent = "Iniciar sesión";

  const email = crearInput("email", "Correo electrónico", "loginEmail");
  const pass = crearInput("password", "Contraseña", "loginPassword");

  const btnLogin = crearBoton("Iniciar sesión", "loginBtn");
  const btnForgot = crearLink("¿Olvidaste tu contraseña?", "forgotPasswordBtn");
  const btnRegister = crearLink("¿No tienes cuenta? Regístrate", "registerBtn");

  const error = document.createElement("p");
  error.id = "loginError";
  error.className = "error-message hidden";

  box.append(title, email, pass, btnLogin, btnForgot, btnRegister, error);
  container.appendChild(box);
  root.appendChild(container);

  btnLogin.addEventListener("click", login);
  btnForgot.addEventListener("click", cargarRecuperarClave);
  btnRegister.addEventListener("click", cargarRegistro);
}

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

function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    showError("Completa ambos campos");
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      correo: email,
      contraseña: password
    })
  })
    .then(res => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      cargarMainApp();
    })
    .catch(async err => {
      let msg = "Error al iniciar sesión";
      if (err.json) {
        const errData = await err.json();
        msg = errData.mensaje || msg;
      }
      showError(msg);
    });
}

function showError(msg) {
  const p = document.getElementById("loginError");
  p.textContent = msg;
  p.classList.remove("hidden");
}

/* ---------------- Recuperar contraseña ---------------- */
function cargarRecuperarClave(e) {
  e.preventDefault();
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "login-container";

  const box = document.createElement("div");
  box.className = "form-box";

  const title = document.createElement("h2");
  title.textContent = "Restablecer contraseña";

  const email = crearInput("email", "Correo electrónico", "recoveryEmail");
  const pass1 = crearInput("password", "Nueva contraseña", "recoveryPass1");
  const pass2 = crearInput("password", "Repite la contraseña", "recoveryPass2");

  const btn = crearBoton("Restablecer");
  const back = crearBoton("Volver");
  back.style.marginTop = "8px";

  box.append(title, email, pass1, pass2, btn, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);

  btn.addEventListener("click", () => {
    const emailValue = email.value.trim();
    const p1 = pass1.value.trim();
    const p2 = pass2.value.trim();

    if (!emailValue || !p1 || !p2) return alert("Por favor completa todos los campos");
    if (p1 !== p2) return alert("Las contraseñas no coinciden");

    alert("Se enviará una solicitud de cambio al correo: " + emailValue);
    cargarLogin();
  });
}

/* ---------------- Registro ---------------- */
function cargarRegistro(e) {
  e.preventDefault();
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "login-container";

  const box = document.createElement("div");
  box.className = "form-box";

  const title = document.createElement("h2");
  title.textContent = "Crear cuenta";

  const email = crearInput("email", "Correo electrónico");
  const pass1 = crearInput("password", "Contraseña");
  const pass2 = crearInput("password", "Repite la contraseña");
  const btnRegister = crearBoton("Registrar");
  const back = crearBoton("Volver");
  back.style.marginTop = "8px";

  box.append(title, email, pass1, pass2, btnRegister, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);

  btnRegister.addEventListener("click", () => {
    const emailValue = email.value.trim();
    const passValue = pass1.value.trim();
    const passConfirm = pass2.value.trim();

    if (!emailValue || !passValue || !passConfirm)
      return alert("Por favor completa todos los campos");
    if (passValue !== passConfirm)
      return alert("Las contraseñas no coinciden");

    const user = { email: emailValue, password: passValue };

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Usuario registrado con éxito");
          cargarLogin();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch(err => {
        alert("Hubo un error al registrar el usuario: " + err.message);
      });
  });
}
