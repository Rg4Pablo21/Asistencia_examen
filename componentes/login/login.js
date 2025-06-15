import { cargarMainApp } from "../../index.js";

// Vista de login
export function cargarLogin() {
  const root = document.getElementById("root");
  root.innerHTML = "";

  const container = document.createElement("div");
  container.className = "login-container";

  // ---------- Caja de login ----------
  const box = document.createElement("div");
  box.className = "form-box";

  const title = document.createElement("h2");
  title.textContent = "Iniciar sesión";

  const email = document.createElement("input");
  email.type = "email";
  email.id = "loginEmail";
  email.placeholder = "Correo electrónico";

  const pass = document.createElement("input");
  pass.type = "password";
  pass.id = "loginPassword";
  pass.placeholder = "Contraseña";

  const btnLogin = document.createElement("button");
  btnLogin.id = "loginBtn";
  btnLogin.textContent = "Iniciar sesión";

  const btnForgot = document.createElement("a");
  btnForgot.id = "forgotPasswordBtn";
  btnForgot.textContent = "¿Olvidaste tu contraseña?";
  btnForgot.href = "#";

  const btnRegister = document.createElement("a");
  btnRegister.id = "registerBtn";
  btnRegister.textContent = "¿No tienes cuenta? Regístrate";
  btnRegister.href = "#";

  const error = document.createElement("p");
  error.id = "loginError";
  error.className = "error-message hidden";

  box.append(title, email, pass, btnLogin, btnForgot, btnRegister, error);
  container.appendChild(box);
  root.appendChild(container);

  // Listeners
  btnLogin.addEventListener("click", login);
  btnForgot.addEventListener("click", cargarRecuperarClave);
  btnRegister.addEventListener("click", cargarRegistro);  // Nuevo listener para registro
}

// ----------------------- Lógica sin servidor -----------------------
function login() {
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!email || !password) {
    showError("Completa ambos campos");
    return;
  }

  // Simulación de login sin servidor
  localStorage.setItem("token", "demo-token-" + Date.now());
  cargarMainApp();
}

function showError(msg) {
  const p = document.getElementById("loginError");
  p.textContent = msg;
  p.classList.remove("hidden");
}

/* ---------- Recuperar contraseña (simulada) ---------- */
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

  const pass1 = document.createElement("input");
  pass1.type = "password";
  pass1.placeholder = "Nueva contraseña";

  const pass2 = document.createElement("input");
  pass2.type = "password";
  pass2.placeholder = "Repite la contraseña";

  const btn = document.createElement("button");
  btn.textContent = "Restablecer";

  const back = document.createElement("button");
  back.textContent = "Volver";
  back.style.marginTop = "8px";

  box.append(title, pass1, pass2, btn, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);
  btn.addEventListener("click", () => {
    if (pass1.value !== pass2.value || !pass1.value) {
      alert("Las contraseñas no coinciden");
      return;
    }
    alert("Contraseña cambiada (demo)");
    cargarLogin();
  });
}

/* ---------- Registrar nuevo usuario ---------- */
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

  const email = document.createElement("input");
  email.type = "email";
  email.placeholder = "Correo electrónico";

  const pass1 = document.createElement("input");
  pass1.type = "password";
  pass1.placeholder = "Contraseña";

  const pass2 = document.createElement("input");
  pass2.type = "password";
  pass2.placeholder = "Repite la contraseña";

  const btnRegister = document.createElement("button");
  btnRegister.textContent = "Registrar";

  const back = document.createElement("button");
  back.textContent = "Volver";
  back.style.marginTop = "8px";

  box.append(title, email, pass1, pass2, btnRegister, back);
  container.appendChild(box);
  root.appendChild(container);

  back.addEventListener("click", cargarLogin);

  btnRegister.addEventListener("click", () => {
    const emailValue = email.value.trim();
    const passValue = pass1.value.trim();
    const passConfirm = pass2.value.trim();

    if (!emailValue || !passValue || !passConfirm) {
      alert("Por favor completa todos los campos");
      return;
    }

    if (passValue !== passConfirm) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Enviar los datos de registro al servidor (requiere una API que reciba estos datos)
    const user = {
      email: emailValue,
      password: passValue,
    };

    fetch("http://localhost:3000/api/register", { // Cambia esta URL a la de tu API
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert("Usuario registrado con éxito");
          cargarLogin();
        } else {
          alert("Error al registrar usuario: " + data.message);
        }
      })
      .catch(error => {
        alert("Hubo un error al registrar el usuario: " + error.message);
      });
  });
}
