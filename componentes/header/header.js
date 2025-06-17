export function createHeader(rol) {
  const header = document.createElement("header");
  header.className = "app-header";

  const logo = document.createElement("div");
  logo.className = "logo";
  logo.textContent = "Sistema de Asistencia";

  const nav = document.createElement("nav");
  nav.className = "nav-main";

  const homeBtn = document.createElement("button");
  homeBtn.className = "nav-btn active";
  homeBtn.id = "home-btn";
  homeBtn.textContent = "Inicio";

  const asistenciaBtn = document.createElement("button");
  asistenciaBtn.className = "nav-btn";
  asistenciaBtn.id = "asistencia-btn";
  asistenciaBtn.textContent = "Asistencia";

  const reportesBtn = document.createElement("button");
  reportesBtn.className = "nav-btn";
  reportesBtn.id = "reportes-btn";
  reportesBtn.textContent = "Reportes";

  nav.append(homeBtn, asistenciaBtn, reportesBtn);

  // Botones específicos por rol
  if (rol === "admin") {
    const adminBtn = document.createElement("button");
    adminBtn.className = "nav-btn";
    adminBtn.id = "admin-btn";
    adminBtn.textContent = "Administración";
    nav.appendChild(adminBtn);
  }

  if (rol === "coordinador") {
    const coordinadorBtn = document.createElement("button");
    coordinadorBtn.className = "nav-btn";
    coordinadorBtn.id = "coordinador-btn";
    coordinadorBtn.textContent = "Coordinación";
    nav.appendChild(coordinadorBtn);
  }

  const userSection = document.createElement("div");
  userSection.className = "user-section";

  const userName = document.createElement("span");
  userName.className = "user-name";
  userName.textContent = localStorage.getItem("nombre");

  const logoutBtn = document.createElement("button");
  logoutBtn.className = "logout-btn";
  logoutBtn.textContent = "Cerrar sesión";

  userSection.append(userName, logoutBtn);
  header.append(logo, nav, userSection);

  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
  });

  return header;
}