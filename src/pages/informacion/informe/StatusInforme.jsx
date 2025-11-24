import statusCapturaImg from "/CapturasPantalla/statusCaptura.png";

const StatusInforme = () => {
  return (
    <div className="subsection">
      <div className="module-title-highlight">
        <h4>Explicación del Módulo de Status</h4>
      </div>

      <p>
        Este módulo sirve para comprobar que el servidor y la API están
        funcionando bien. Es como un monitor de salud del sistema que nos avisa
        si algo no va como debería.
      </p>

      <h4>Elementos de la interfaz</h4>
      <div className="screenshot-item2">
        <img src={statusCapturaImg} alt="Módulo de Status - Vista completa" />
        <p className="screenshot-caption">Interfaz del módulo de status</p>
      </div>

      <h4>Códigos de error HTTP</h4>
      <ul>
        <li>
          <strong>500:</strong> Error interno del servidor
        </li>
        <li>
          <strong>404:</strong> Recurso no encontrado
        </li>
        <li>
          <strong>403:</strong> Acceso prohibido
        </li>
        <li>
          <strong>401:</strong> No autorizado
        </li>
        <li>
          <strong>400:</strong> Petición incorrecta
        </li>
      </ul>

      <h4>Simulación de errores</h4>
      <p>
        Botones de colores (404, 403, 500) simulan errores localmente.
        <strong>No afectan al servidor real</strong>, solo prueban que el
        sistema de monitoreo detecta correctamente los fallos.
      </p>

      <h4>Ping automático</h4>
      <ul>
        <li>
          <strong>Frecuencia:</strong> Cada 5 minutos
        </li>
        <li>
          <strong>Funcionamiento:</strong> Se ejecuta solo, sin intervención
          manual
        </li>
        <li>
          <strong>Registro:</strong> Cada ping automático se añade al historial
          visual
        </li>
      </ul>
    </div>
  );
};

export default StatusInforme;
