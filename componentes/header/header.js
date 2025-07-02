export function createHeader(rol) {
  const header = document.createElement("header");
  header.className = "app-header";

  const logo = document.createElement("div");
  logo.className = "logo";
  logo.textContent = "Sistema de Asistencia";

  const nav = document.createElement("nav");

  const menuItems = rol === 'admin' 
    ? [
        { text: "Inicio", id: "home-btn" },
        { text: "Administración", id: "admin-btn" },
        { text: "Reportes", id: "reportes-btn" }
      ]
    : [
        { text: "Inicio", id: "home-btn" },
        { text: "Asistencia", id: "asistencia-btn" },
        { text: "Reportes", id: "reportes-btn" }
      ];

  menuItems.forEach((item) => {
    const btn = document.createElement("button");
    btn.textContent = item.text;
    btn.className = "nav-btn";
    btn.id = item.id;
    btn.addEventListener("click", () => {
      // Aquí poner navegación o llamada a función para cada sección
      alert(`Navegar a: ${item.text}`); // temporal para prueba
    });
    nav.appendChild(btn);
  });

  const userInfo = document.createElement("div");
  userInfo.className = "user-info";
  userInfo.textContent = `Rol: ${rol === 'admin' ? 'Administrador' : 'Maestro'}`;

  const logout = document.createElement("button");
  logout.id = "logout-btn";
  logout.textContent = "Cerrar sesión";
  logout.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  header.append(logo, nav, userInfo, logout);
  return header;
}
