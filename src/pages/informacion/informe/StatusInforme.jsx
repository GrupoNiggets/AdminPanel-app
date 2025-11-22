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
      <ul>
        <li>
          <strong>Cabecera:</strong> "Monitoreo del Sistema" + hora de última
          comprobación
        </li>
        <li>
          <strong>Botones de acción:</strong> Verde (ping normal),
          Amarillo/Morado/Rojo (simular errores)
        </li>
        <li>
          <strong>Historial visual:</strong> 10 cuadrados de colores en la parte
          inferior
        </li>
      </ul>

      <h4>Comprobación de ping</h4>
      <p>
        <strong>Botón "Comprobar Ping":</strong> Envía petición al servidor.
        Resultado inmediato:
      </p>
      <ul>
        <li>
          <strong>Verde:</strong> "API funcionando" (todo correcto)
        </li>
        <li>
          <strong>Rojo:</strong> "Ping fallido" + tipo de error
        </li>
      </ul>

      <h4>Historial de pings</h4>
      <p>10 cuadrados que representan los últimos pings:</p>
      <ul>
        <li>
          <strong>Verde:</strong> Ping exitoso
        </li>
        <li>
          <strong>Rojo:</strong> Ping fallido
        </li>
        <li>
          <strong>Gris:</strong> Sin datos todavía
        </li>
      </ul>
      <p>
        <strong>Tooltip:</strong> Pasa el ratón sobre cada cuadrado para ver
        hora exacta y resultado detallado.
      </p>

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

      <h4>Comunicación con la API</h4>
      <ul>
        <li>
          <strong>GET /status/ping:</strong> Único endpoint usado
        </li>
        <li>
          <strong>Nota:</strong> No guarda nada en base de datos, solo comprueba
          disponibilidad
        </li>
      </ul>
    </div>
  );
};

export default StatusInforme;
