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

/* -------- utilidades -------- */
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

/* ---------------- Login ---------------- */
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    showError("Completa ambos campos");
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo: email, password: password }),
  })
    .then((res) => {
      if (!res.ok) throw res;
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("nombre", data.nombre);
      localStorage.setItem("rol", data.rol); // Guardar el rol del usuario
      cargarMainApp(data.rol);
    })
    .catch(async (err) => {
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

/* -------------- Recuperar contraseña -------------- */
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
  const btn = crearBoton("Enviar correo");
  const back = crearBoton("Volver");
  back.style.marginTop = "8px";

  box.append(title, email, btn, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);

  btn.addEventListener("click", () => {
    const correo = email.value.trim();
    if (!correo) return alert("Ingresa tu correo");

    fetch("http://localhost:3000/recover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correo }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Revisa tu correo para la nueva contraseña");
        cargarLogin();
      })
      .catch((err) => alert("Error al enviar solicitud: " + err.message));
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

  const nombre = crearInput("text", "Nombre completo", "nombre");
  const email = crearInput("email", "Correo electrónico", "correo");
  const pass1 = crearInput("password", "Contraseña", "password1");
  const pass2 = crearInput("password", "Repite la contraseña", "password2");
  const rolSelect = document.createElement("select");
  rolSelect.id = "rol-select";
  rolSelect.innerHTML = `
    <option value="">Seleccione un rol</option>
    <option value="profesor">Profesor</option>
    <option value="coordinador">Coordinador</option>
    <option value="admin">Administrador</option>
  `;

  const btnRegister = crearBoton("Registrar");
  const back = crearBoton("Volver");
  back.style.marginTop = "8px";

  box.append(title, nombre, email, pass1, pass2, rolSelect, btnRegister, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);

  btnRegister.addEventListener("click", () => {
    const nombreValue = nombre.value.trim();
    const correoValue = email.value.trim();
    const passValue = pass1.value.trim();
    const passConfirm = pass2.value.trim();
    const rolValue = rolSelect.value;

    if (!nombreValue || !correoValue || !passValue || !passConfirm || !rolValue)
      return alert("Por favor completa todos los campos");
    if (passValue !== passConfirm)
      return alert("Las contraseñas no coinciden");

    const user = {
      nombre: nombreValue,
      correo: correoValue,
      password: passValue,
      rol: rolValue
    };

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Usuario registrado con éxito");
          cargarLogin();
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((err) =>
        alert("Hubo un error al registrar el usuario: " + err.message)
      );
  });
}