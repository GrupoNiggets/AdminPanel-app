import bugsCapturaImg from "/CapturasPantalla/bugsCaptura.png";

const BugsInforme = () => {
  return (
    <div className="subsection">
      <div className="module-title-highlight">
        <h4>Explicación del Módulo de Bugs</h4>
      </div>

      <p>
        Este módulo es donde registramos todos los errores y problemas que
        encontramos en la aplicación. Es como una lista de tareas pendientes,
        pero específicamente para bugs que hay que arreglar.
      </p>

      <h4>Distribución de la pantalla</h4>
      <div className="screenshot-item2">
        <img src={bugsCapturaImg} alt="Módulo de Bugs - Vista completa" />
        <p className="screenshot-caption">
          Interfaz del módulo de bugs con resumen estadístico
        </p>
      </div>

      <h4>Estados disponibles</h4>
      <ul>
        <li>
          <strong>ABIERTO</strong> (rojo): Reportado pero sin empezar
        </li>
        <li>
          <strong>EN PROGRESO</strong> (amarillo): Se está trabajando en él
        </li>
        <li>
          <strong>RESUELTO</strong> (verde): Corregido y verificado
        </li>
      </ul>

      <h4>Niveles de prioridad</h4>
      <ul>
        <li>
          <strong>ALTA</strong> (rojo): Bugs críticos que bloquean
          funcionalidades
        </li>
        <li>
          <strong>MEDIA</strong> (naranja): Importantes pero no bloquean
        </li>
        <li>
          <strong>BAJA</strong> (verde): Bugs menores o mejoras
        </li>
      </ul>

      <h4>Flujo de trabajo típico</h4>
      <p>
        1. Reportar como ABIERTO → 2. Asignar prioridad → 3. Cambiar a EN
        PROGRESO al empezar → 4. Marcar como RESUELTO al terminar
      </p>
    </div>
  );
};

export default BugsInforme;
