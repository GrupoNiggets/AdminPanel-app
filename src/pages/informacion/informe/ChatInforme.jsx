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
      <ul>
        <li>
          <strong>Cabecera negra:</strong> Título "Chat Empresarial" + selector
          de usuario activo
        </li>
        <li>
          <strong>Área central:</strong> Mensajes en orden cronológico con
          scroll automático
        </li>
        <li>
          <strong>Campo inferior:</strong> Input de texto + botón "Enviar"
        </li>
      </ul>

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

      <h4>Operaciones disponibles</h4>
      <p>
        <strong>Cambiar usuario:</strong> Selector en cabecera permite cambiar
        de identidad. Útil para probar el chat desde diferentes usuarios.
      </p>
      <p>
        <strong>Enviar mensaje:</strong> Escribes en el campo de abajo y
        presionas Enter o haces clic en "Enviar". Si falta algo (mensaje vacío o
        sin usuario), aparece error en rojo arriba.
      </p>
      <p>
        <strong>Editar mensaje:</strong> Solo tus propios mensajes. Icono de
        lápiz convierte el mensaje en campo editable. Modificas y guardas con
        icono verde.
      </p>
      <p>
        <strong>Eliminar mensaje:</strong> Solo tus propios mensajes. Icono de
        papelera borra inmediatamente.
      </p>

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

      <h4>Comunicación con la API</h4>
      <ul>
        <li>
          <strong>POST:</strong> Crear mensaje
        </li>
        <li>
          <strong>PATCH:</strong> Editar mensaje
        </li>
        <li>
          <strong>DELETE:</strong> Eliminar mensaje
        </li>
        <li>
          <strong>GET:</strong> Cargar mensajes (ordenados por fecha de
          creación)
        </li>
      </ul>
    </div>
  );
};

export default ChatInforme;
