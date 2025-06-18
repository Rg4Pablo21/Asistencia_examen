export function crearModal(titulo, contenido, acciones = []) {
    const modal = document.createElement("div");
    modal.className = "modal-overlay";
  
    const modalContent = document.createElement("div");
    modalContent.className = "modal-content";
  
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `<h3>${titulo}</h3>`;
  
    const modalBody = document.createElement("div");
    modalBody.className = "modal-body";
    modalBody.appendChild(contenido);
  
    const modalFooter = document.createElement("div");
    modalFooter.className = "modal-footer";
  
    acciones.forEach(accion => {
      const btn = document.createElement("button");
      btn.textContent = accion.texto;
      btn.className = accion.estilo || "btn-modal";
      btn.onclick = () => {
        accion.onClick();
        if (accion.cerrar !== false) {
          document.body.removeChild(modal);
        }
      };
      modalFooter.appendChild(btn);
    });
  
    // Botón de cierre por defecto
    const btnCerrar = document.createElement("button");
    btnCerrar.className = "btn-modal-cerrar";
    btnCerrar.innerHTML = "&times;";
    btnCerrar.onclick = () => document.body.removeChild(modal);
    modalHeader.appendChild(btnCerrar);
  
    modalContent.append(modalHeader, modalBody, modalFooter);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  
    return modal;
  }
  
  // Estilos para el modal (añadir a index.css)
  export const modalStyles = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .modal-content {
    background: #1e1e1e;
    border: 2px solid #00c3ff;
    border-radius: 10px;
    width: 90%;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.2);
  }
  
  .modal-header {
    padding: 15px 20px;
    border-bottom: 1px solid #444;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .modal-header h3 {
    margin: 0;
    color: #00c3ff;
  }
  
  .modal-body {
    padding: 20px;
  }
  
  .modal-footer {
    padding: 15px 20px;
    border-top: 1px solid #444;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  
  .btn-modal {
    padding: 8px 16px;
    background: #00c3ff;
    color: #000;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .btn-modal:hover {
    background: #0099cc;
  }
  
  .btn-modal-cerrar {
    background: none;
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 0 0 0 15px;
    line-height: 1;
  }
  
  .btn-modal-cerrar:hover {
    color: #00c3ff;
  }
  `;