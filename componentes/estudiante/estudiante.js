export function cargarEstudiantes() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Lista de Asistencia";
  cont.appendChild(h2);

  /* ----------  Tabla  ---------- */
  const tabla = document.createElement("table");
  tabla.className = "tabla-estudiantes";
  tabla.innerHTML = `
    <thead>
      <tr><th>#</th><th>Nombre</th><th>Asistencia</th><th>Motivo</th></tr>
    </thead>
    <tbody></tbody>`;
  const tbody = tabla.querySelector("tbody");

  // Cargar estudiantes y grados desde un objeto
  const estudiantes = [
    { nombre: "Carlos Pérez", grado: "10A" },
    { nombre: "Ana López", grado: "10B" },
    { nombre: "Luis Gómez", grado: "11A" },
    { nombre: "María Torres", grado: "11B" },
    { nombre: "Pedro Martínez", grado: "12A" },
    { nombre: "Sofía Ramírez", grado: "12B" },
    { nombre: "Diego Hernández", grado: "10A" },
    { nombre: "Valeria Ruiz", grado: "11A" },
    { nombre: "Javier Castro", grado: "12A" },
    { nombre: "Lucía Morales", grado: "10B" }
  ];

  estudiantes.forEach((estudiante, i) => {
    const tr = document.createElement("tr");

    const tdNum = document.createElement("td");  tdNum.textContent = i + 1;
    const tdNom = document.createElement("td");  tdNom.textContent = estudiante.nombre;
    const tdGrado = document.createElement("td"); tdGrado.textContent = estudiante.grado;

    const tdBtns = document.createElement("td"); tdBtns.className = "asistencia-botones";
    const bOk  = crearBtn("✔","btn-check");
    const bNo  = crearBtn("✘","btn-x");
    const bUni = crearBtn("👕","btn-uniforme");
    tdBtns.append(bOk,bNo,bUni);

    const tdMot = document.createElement("td");
    const btnCorreo = crearBtn("📧", "btn-correo");
    
    // Cambiar color si ya hay motivo
    const motivos = JSON.parse(localStorage.getItem("motivos") || "{}");
    if (motivos[estudiante.nombre]) {
      btnCorreo.style.backgroundColor = "#ffcc00"; // Amarillo si ya tiene motivo
    }
    
    btnCorreo.onclick = () => {
      root.innerHTML = "";
    
      const cont = document.createElement("div");
      cont.className = "asistencia-container";
    
      const h3 = document.createElement("h3");
      h3.textContent = `Motivo de: ${estudiante.nombre}`;
      cont.appendChild(h3);
    
      const txtMot = document.createElement("textarea");
      txtMot.placeholder = "Motivo...";
      txtMot.value = motivos[estudiante.nombre] || "";
    
      const btnGuardar = document.createElement("button");
      btnGuardar.textContent = "Guardar Motivo";
      btnGuardar.onclick = () => {
        motivos[estudiante.nombre] = txtMot.value;
        localStorage.setItem("motivos", JSON.stringify(motivos));
        alert("Motivo guardado");
        cargarEstudiantes(); // Volver a la tabla
      };
    
      const btnVolver = document.createElement("button");
      btnVolver.textContent = "Volver";
      btnVolver.onclick = cargarEstudiantes;
    
      cont.append(txtMot, btnGuardar, btnVolver);
      root.appendChild(cont);
    };
    
    tdMot.appendChild(btnCorreo);
    

    bOk.onclick  = () => marcar(bOk,bNo);
    bNo.onclick  = () => marcar(bNo,bOk);
    bUni.onclick = () => cargarUniforme(estudiante.nombre);

    tr.append(tdNum,tdNom,tdGrado,tdBtns,tdMot);
    tbody.appendChild(tr);
  });

  cont.appendChild(tabla);

  /* ----------  Botones globales  ---------- */
  const barra = document.createElement("div");
  barra.className = "botones-container";

  const bTodosOk = crearBtnTexto("Marcar Todos Presentes");
  const bTodosNo = crearBtnTexto("Marcar Todos Ausentes");
  const bGuardar = crearBtnTexto("Guardar Asistencia","btn-guardar");
  const bAgregar = crearBtnTexto("Agregar Alumno","btn-agregar");

  bTodosOk.onclick = ()=>document.querySelectorAll(".btn-check").forEach(b=>b.click());
  bTodosNo.onclick = ()=>document.querySelectorAll(".btn-x").forEach(b=>b.click());
  bGuardar.onclick = ()=>alert("Asistencia guardada (demo)");
  bAgregar.onclick = () => agregarAlumno();

  barra.append(bTodosOk,bTodosNo,bGuardar,bAgregar);
  cont.appendChild(barra);
  root.appendChild(cont);

  /* ---------- Helpers ---------- */
  function crearBtn(txt,cls){const b=document.createElement("button");b.textContent=txt;b.className=cls;return b;}
  function crearBtnTexto(txt,cls="btn-todos"){const b=document.createElement("button");b.textContent=txt;b.className=cls;return b;}
  function marcar(act,inac){act.classList.add("activo");inac.classList.remove("activo");}
}

/* =========   AGREGAR ALUMNO  ========= */
function agregarAlumno() {
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "asistencia-container";

  const h2 = document.createElement("h2");
  h2.textContent = "Agregar Nuevo Alumno";
  cont.appendChild(h2);

  const form = document.createElement("form");
  const inputNombre = document.createElement("input");
  inputNombre.placeholder = "Nombre del Alumno";
  inputNombre.required = true;

  const inputGrado = document.createElement("input");
  inputGrado.placeholder = "Grado del Alumno";
  inputGrado.required = true;

  const btnAgregar = document.createElement("button");
  btnAgregar.textContent = "Agregar Alumno";
  btnAgregar.type = "submit";
  btnAgregar.onclick = (e) => {
    e.preventDefault();
    // Aquí debes agregar el alumno a la base de datos o al arreglo de alumnos
    alert(`Alumno ${inputNombre.value} del grado ${inputGrado.value} agregado`);
    cargarEstudiantes(); // Vuelve a cargar la lista de estudiantes
  };

  form.append(inputNombre, inputGrado, btnAgregar);
  cont.appendChild(form);
  root.appendChild(cont);
}

/* =========   VISTA DE UNIFORME  ========= */
export function cargarUniforme(nombreAlumno){
  const root = document.querySelector("#root");
  root.innerHTML = "";

  const cont = document.createElement("div");
  cont.className = "uniforme-container";

  const h3 = document.createElement("h3");
  h3.textContent = `Uniforme de: ${nombreAlumno}`;
  cont.appendChild(h3);

  const piezas = [
    {id:"camisa",   url:"https://st2.depositphotos.com/29688696/43853/v/450/depositphotos_438537390-stock-illustration-shirt-icon-vector-simple-flat.jpg"},
    {id:"pantalon", url:"https://www.shutterstock.com/image-vector/pants-icon-thin-line-art-260nw-2542676957.jpg"},
    {id:"zapatos",  url:"https://www.shutterstock.com/image-vector/sport-shoes-icon-logo-isolated-260nw-1843128061.jpg"}
  ];
  
  const grid = document.createElement("div");
  grid.className = "uniforme-opciones";

  // Recuperar datos del uniforme del localStorage
  const data = JSON.parse(localStorage.getItem("uniformes") || "{}");
  const estadosGuardados = data[nombreAlumno] || {camisa: "ninguno", pantalon: "ninguno", zapatos: "ninguno"};

  piezas.forEach(p => {
    const item = document.createElement("div");
    item.className = "uniforme-item"; 
    item.dataset.id = p.id;

    const img = document.createElement("img"); 
    img.src = p.url; 
    img.alt = p.id;

    const lbl = document.createElement("p");  
    lbl.textContent = p.id.charAt(0).toUpperCase() + p.id.slice(1);

    item.append(img, lbl);
    grid.appendChild(item);

    // Aplicar el estado guardado
    const estado = estadosGuardados[p.id];
    if(estado === "si") {
      item.style.borderColor = "green";
    } else if(estado === "no") {
      item.style.borderColor = "red";
    } else {
      item.style.borderColor = "#444";
    }

    item.onclick = () => {
      const id = item.dataset.id;
      let est = estadosGuardados[id];
      if(est === "ninguno") { 
        estadosGuardados[id] = "si"; 
        item.style.borderColor = "green";
      } else if(est === "si") { 
        estadosGuardados[id] = "no"; 
        item.style.borderColor = "red";
      } else { 
        estadosGuardados[id] = "ninguno"; 
        item.style.borderColor = "#444";
      }
    };
  });

  const txtMot = document.createElement("textarea");
  txtMot.placeholder = "Motivo si no vino con uniforme completo...";
  txtMot.value = estadosGuardados.motivo || ""; // Cargar motivo si existe

  const btnSave = document.createElement("button");
  btnSave.textContent = "Guardar Uniforme";
  btnSave.onclick = () => {
    guardarUniforme(nombreAlumno, estadosGuardados, txtMot.value);
    cargarEstudiantes(); // Volver a cargar la lista de estudiantes
  };

  const btnBack = document.createElement("button");
  btnBack.textContent = "Volver"; 
  btnBack.onclick = cargarEstudiantes;

  cont.append(grid, txtMot, btnSave, btnBack);
  root.appendChild(cont);
}

/* =========   PERSISTENCIA (localStorage demo)  ========= */
function guardarUniforme(alumno, estados, motivo){
  const data = JSON.parse(localStorage.getItem("uniformes") || "{}");
  data[alumno] = { ...estados, motivo }; // Guardar el estado de uniforme y el motivo
  localStorage.setItem("uniformes", JSON.stringify(data));
  console.log("Uniforme guardado:", data[alumno]);
}
