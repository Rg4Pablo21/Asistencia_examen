export function crearModalCorreo(destinatario, tipo) {
  const modal = document.createElement('div');
  modal.className = 'modal-correo';
  
  let titulo = '';
  let camposAdicionales = '';
  
  switch(tipo) {
    case 'individual':
      titulo = `Enviar correo a ${destinatario}`;
      break;
    case 'uniforme':
      titulo = `Enviar reporte de uniforme a ${destinatario}`;
      camposAdicionales = `
        <div class="campo-modal">
          <label>Falta específica:</label>
          <select>
            <option value="playera">Playera</option>
            <option value="pantalon">Pantalón</option>
            <option value="zapatos">Zapatos</option>
            <option value="sueter">Suéter</option>
            <option value="corte">Corte de pelo</option>
          </select>
        </div>
      `;
      break;
    case 'grupal':
      titulo = 'Enviar correo a todos los alumnos';
      break;
  }

  modal.innerHTML = `
    <div class="modal-contenido">
      <h3>${titulo}</h3>
      ${camposAdicionales}
      <div class="campo-modal">
        <label>Asunto:</label>
        <input type="text" class="input-asunto">
      </div>
      <div class="campo-modal">
        <label>Mensaje:</label>
        <textarea class="input-mensaje"></textarea>
      </div>
      <div class="modal-botones">
        <button class="btn-enviar">Enviar</button>
        <button class="btn-cancelar">Cancelar</button>
      </div>
    </div>
  `;

  // Evento para cerrar el modal
  modal.querySelector('.btn-cancelar').addEventListener('click', () => {
    modal.remove();
  });

  // Evento para enviar el correo
  modal.querySelector('.btn-enviar').addEventListener('click', () => {
    alert(`Correo enviado a ${destinatario || 'todos los alumnos'}`);
    modal.remove();
  });

  // Cerrar al hacer clic fuera del contenido
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  });

  document.body.appendChild(modal);
  return modal;
}