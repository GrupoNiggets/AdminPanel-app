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
      <ul>
        <li>
          <strong>Columna izquierda:</strong> Tarjetas de bugs con filtros y
          búsqueda
        </li>
        <li>
          <strong>Columna derecha:</strong> Resumen estadístico (por estado y
          prioridad)
        </li>
      </ul>

      <h4>Visualización de bugs</h4>
      <p>Cada bug se muestra en una tarjeta con:</p>
      <ul>
        <li>
          <strong>Borde de color:</strong> Rojo (ALTA), Naranja (MEDIA), Verde
          (BAJA)
        </li>
        <li>
          <strong>Badge de estado:</strong> ABIERTO, EN PROGRESO, RESUELTO
        </li>
        <li>
          <strong>Título del bug</strong>
        </li>
        <li>
          <strong>Nombre del reportador</strong>
        </li>
        <li>
          <strong>Estilo especial:</strong> Los bugs resueltos se ven diferentes
        </li>
      </ul>

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

      <h4>Operaciones disponibles</h4>
      <p>
        <strong>Reportar bug:</strong> Botón "+ Nuevo Bug". Rellenas título,
        descripción, estado, prioridad y tu nombre. Aparece inmediatamente en la
        lista.
      </p>
      <p>
        <strong>Editar bug:</strong> Icono de lápiz. Útil para cambiar estado
        (ABIERTO → EN PROGRESO → RESUELTO) o actualizar prioridad/descripción.
      </p>
      <p>
        <strong>Filtrar:</strong> Selector desplegable (Todos, Abiertos, En
        progreso, Resueltos) + barra de búsqueda por título. Se pueden usar
        ambos a la vez.
      </p>

      <h4>Flujo de trabajo típico</h4>
      <p>
        1. Reportar como ABIERTO → 2. Asignar prioridad → 3. Cambiar a EN
        PROGRESO al empezar → 4. Marcar como RESUELTO al terminar
      </p>

      <h4>Comunicación con la API</h4>
      <ul>
        <li>
          <strong>POST:</strong> Crear bug
        </li>
        <li>
          <strong>PATCH:</strong> Editar bug
        </li>
        <li>
          <strong>GET:</strong> Cargar bugs
        </li>
        <li>
          <strong>Nota:</strong> No hay DELETE (se mantiene registro histórico)
        </li>
      </ul>
    </div>
  );
};

export default BugsInforme;
