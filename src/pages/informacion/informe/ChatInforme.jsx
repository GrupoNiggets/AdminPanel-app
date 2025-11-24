import chatCapturaImg from "/CapturasPantalla/chatCaptura.png";

const ChatInforme = () => {
  return (
    <div className="subsection">
      <div className="module-title-highlight">
        <h4>Explicación del Módulo de Chat</h4>
      </div>

      <p>
        Este módulo es un sistema de mensajería interna para el equipo. Funciona
        como cualquier chat: escribes mensajes, los envías, y aparecen en la
        pantalla para que todos los vean.
      </p>

      <h4>Estructura de la interfaz</h4>
      <div className="screenshot-item2">
        <img src={chatCapturaImg} alt="Módulo de Chat - Interfaz completa" />
        <p className="screenshot-caption">Interfaz del chat empresarial</p>
      </div>

      <h4>Información de cada mensaje</h4>
      <ul>
        <li>
          <strong>Nombre del usuario</strong> que lo escribió
        </li>
        <li>
          <strong>Chip de rol</strong> con color: Rojo (admin), Azul
          (moderador), Gris (user)
        </li>
        <li>
          <strong>Hora de envío</strong> en formato 24h (HH:MM)
        </li>
        <li>
          <strong>Contenido</strong> del mensaje
        </li>
      </ul>

      <h4>Sistema de permisos</h4>
      <ul>
        <li>
          <strong>Ver mensajes:</strong> Todos pueden ver todos los mensajes
        </li>
        <li>
          <strong>Editar/Eliminar:</strong> Solo los mensajes del usuario
          actualmente seleccionado
        </li>
      </ul>
    </div>
  );
};

export default ChatInforme;
