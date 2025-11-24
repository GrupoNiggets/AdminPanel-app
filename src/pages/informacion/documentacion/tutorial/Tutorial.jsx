import "./Tutorial.css";
import menuPrincipalImg from "/CapturasPantalla/menuPrincipal.png";

const Tutorial = () => {
  return (
    <div className="informe-container">
      <header className="informe-header">
        <h1>Tutorial de Navegación - ERP Radius</h1>
      </header>

      <section className="informe-section">
        <h2>INTRODUCCIÓN</h2>

        <div className="subsection">
          <h3>Bienvenido a la ERP de Radius</h3>
          <p>
            Este tutorial te guiará paso a paso sobre cómo navegar y utilizar
            todas las funcionalidades de nuestra aplicación de escritorio. La
            ERP está diseñada para ser intuitiva y fácil de usar, con una
            interfaz clara y organizada.
          </p>
        </div>

        <div className="subsection">
          <h3>Requisitos previos</h3>
          <ul>
            <li>
              <strong>Aplicación instalada:</strong> Asegúrate de tener la
              aplicación de escritorio ejecutándose
            </li>
            <li>
              <strong>API activa:</strong> El servidor backend debe estar
              corriendo en http://localhost:3000
            </li>
            <li>
              <strong>Conexión a Internet:</strong> Necesaria para comunicarse
              con MongoDB Atlas
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>NAVEGACIÓN PRINCIPAL</h2>

        <div className="subsection">
          <h3>Menú de la aplicación</h3>
          <p>
            Al abrir la aplicación, verás un menú en la parte superior de la
            ventana. Este menú es tu punto de partida para acceder a todas las
            funcionalidades.
          </p>
          <div className="screenshot-item3">
            <img src={menuPrincipalImg} alt="Menú principal de la aplicación" />
            <p className="screenshot-caption">
              Menú principal de la ERP Radius
            </p>
          </div>
        </div>

        <div className="subsection">
          <h3>Sección "Inicio"</h3>
          <p>
            Haz clic en <strong>Inicio</strong> para volver a la página
            principal en cualquier momento. Esta página muestra una visión
            general del proyecto y tarjetas de acceso rápido a los módulos.
          </p>
        </div>

        <div className="subsection">
          <h3>Sección "Módulos"</h3>
          <p>
            El menú <strong>Módulos</strong> contiene cinco opciones
            principales:
          </p>
          <ul className="estructura-lista">
            <li>
              <strong>Bugs:</strong> Haz clic aquí para acceder al sistema de
              gestión de errores
            </li>
            <li>
              <strong>Chat:</strong> Abre el sistema de mensajería empresarial
            </li>
            <li>
              <strong>Posts:</strong> Gestiona las publicaciones de los usuarios
            </li>
            <li>
              <strong>Status:</strong> Monitorea el estado del servidor y la API
            </li>
            <li>
              <strong>Usuarios:</strong> Administra los usuarios de la
              plataforma
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Sección "Información"</h3>
          <p>Esta sección contiene documentación y recursos del proyecto:</p>
          <ul>
            <li>
              <strong>Informe:</strong> Documento completo del proyecto con toda
              la información técnica
            </li>
            <li>
              <strong>Documentación → References:</strong> Abre la documentación
              Swagger de la API
            </li>
            <li>
              <strong>Documentación → How-to-guide:</strong> Guía explicativa de
              cada parte del proyecto
            </li>
            <li>
              <strong>Documentación → Tutorial:</strong> Este tutorial de
              navegación
            </li>
            <li>
              <strong>Documentación → Máquina Virtual:</strong> Información
              sobre la configuración de la VM
            </li>
            <li>
              <strong>Herramientas de desarrollador:</strong> Abre las DevTools
              de Electron para debugging
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Sección "Repositorios"</h3>
          <p>Accede directamente a los repositorios de GitHub del proyecto:</p>
          <ul>
            <li>
              <strong>Github API:</strong> Abre el repositorio del backend en tu
              navegador
            </li>
            <li>
              <strong>Github APP:</strong> Abre el repositorio del frontend en
              tu navegador
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO USAR CADA MÓDULO</h2>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Módulo de Usuarios</h4>
          </div>
          <p>
            <strong>Paso 1:</strong> Haz clic en Módulos → Usuarios en el menú
            superior.
          </p>
          <p>
            <strong>Paso 2:</strong> Verás una tabla con todos los usuarios
            registrados. En la parte superior hay estadísticas (total de
            usuarios, premium activos/inactivos, roles).
          </p>
          <p>
            <strong>Para buscar un usuario:</strong> Usa la barra de búsqueda en
            la parte superior. Puedes buscar por nombre, email, rol o estado
            premium.
          </p>
          <p>
            <strong>Para crear un usuario:</strong> Haz clic en el botón "+
            Añadir Usuario". Rellena el formulario con nombre, email, rol
            (admin/user) y estado premium (activo/inactivo). Haz clic en "Crear"
            para guardar.
          </p>
          <p>
            <strong>Para editar un usuario:</strong> Haz clic en el icono de
            lápiz (✏️) en la fila del usuario. Modifica los campos que necesites
            y haz clic en "Guardar".
          </p>
          <p>
            <strong>Para eliminar un usuario:</strong> Haz clic en el icono de
            papelera (🗑️). Confirma la eliminación en el diálogo que aparece.
          </p>
          <p>
            <strong>Navegación por páginas:</strong> Usa los botones "Anterior"
            y "Siguiente" en la parte inferior de la tabla para ver más usuarios
            (5 por página).
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Módulo de Posts</h4>
          </div>
          <p>
            <strong>Paso 1:</strong> Haz clic en Módulos → Posts.
          </p>
          <p>
            <strong>Paso 2:</strong> Los posts se muestran en formato de
            tarjetas en una cuadrícula. Cada tarjeta muestra el contenido del
            post y el ID del usuario que lo creó.
          </p>
          <p>
            <strong>Para crear un post:</strong> Haz clic en el botón "+ Nueva
            Publicación". Rellena el ID del usuario, el contenido del mensaje y
            las coordenadas (longitud y latitud). Haz clic en "Crear".
          </p>
          <p>
            <strong>Para editar un post:</strong> Haz clic en el icono de editar
            en la tarjeta del post. Modifica el contenido o las coordenadas y
            haz clic en "Guardar".
          </p>
          <p>
            <strong>Para eliminar un post:</strong> Haz clic en el icono de
            eliminar en la tarjeta. Confirma la eliminación.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Módulo de Chat</h4>
          </div>
          <p>
            <strong>Paso 1:</strong> Haz clic en Módulos → Chat.
          </p>
          <p>
            <strong>Paso 2:</strong> Verás una interfaz de chat con mensajes
            anteriores. En la parte superior, hay un selector de usuario que te
            permite cambiar de identidad.
          </p>
          <p>
            <strong>Para cambiar de usuario:</strong> Haz clic en el selector
            "Usuario" en la cabecera y selecciona el usuario con el que quieres
            enviar mensajes.
          </p>
          <p>
            <strong>Para enviar un mensaje:</strong> Escribe tu mensaje en el
            campo de texto en la parte inferior. Presiona Enter o haz clic en el
            botón "Enviar".
          </p>
          <p>
            <strong>Para editar tu mensaje:</strong> Solo puedes editar tus
            propios mensajes. Haz clic en el icono de lápiz (✏️) junto al
            mensaje, modifica el texto y haz clic en el icono de guardar (💾).
          </p>
          <p>
            <strong>Para eliminar tu mensaje:</strong> Haz clic en el icono de
            papelera (🗑️) junto a tu mensaje. La eliminación es inmediata.
          </p>
          <p>
            <strong>Identificación de mensajes:</strong> Cada mensaje muestra el
            nombre del usuario, su rol con un color distintivo (rojo para admin,
            gris para user) y la hora de envío.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Módulo de Bugs</h4>
          </div>
          <p>
            <strong>Paso 1:</strong> Haz clic en Módulos → Bugs.
          </p>
          <p>
            <strong>Paso 2:</strong> Verás una lista de bugs en la columna
            izquierda y un resumen de estadísticas en la columna derecha.
          </p>
          <p>
            <strong>Para filtrar bugs:</strong> Usa el selector desplegable en
            la parte superior para filtrar por estado (Todos, Abiertos, En
            progreso, Resueltos).
          </p>
          <p>
            <strong>Para buscar un bug:</strong> Escribe en la barra de búsqueda
            para encontrar bugs por su título.
          </p>
          <p>
            <strong>Para reportar un nuevo bug:</strong> Haz clic en el botón "+
            Nuevo Bug". Rellena el título, descripción, estado (ABIERTO/EN
            PROGRESO/RESUELTO), prioridad (ALTA/MEDIA/BAJA) y tu nombre como
            reportador. Haz clic en "Guardar".
          </p>
          <p>
            <strong>Para editar un bug:</strong> Haz clic en el icono de lápiz
            (✏️) en la tarjeta del bug. Modifica los campos necesarios y guarda
            los cambios.
          </p>
          <p>
            <strong>Colores de las tarjetas:</strong> Las tarjetas tienen un
            borde de color según la prioridad (rojo = ALTA, naranja = MEDIA,
            verde = BAJA). Los bugs resueltos aparecen con un estilo diferente.
          </p>
          <p>
            <strong>Resumen de bugs:</strong> El panel derecho muestra cuántos
            bugs hay en cada estado y cuántos hay de cada prioridad.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Módulo de Status</h4>
          </div>
          <p>
            <strong>Paso 1:</strong> Haz clic en Módulos → Status.
          </p>
          <p>
            <strong>Paso 2:</strong> Verás una interfaz de monitoreo con botones
            de prueba y un historial visual.
          </p>
          <p>
            <strong>Para comprobar el estado de la API:</strong> Haz clic en el
            botón "Comprobar Ping". Si la API está funcionando correctamente,
            verás un mensaje "API funcionando ✅" en verde. Si hay un error,
            verás "Ping fallido ❌" en rojo.
          </p>
          <p>
            <strong>Para simular errores:</strong> Puedes hacer clic en los
            botones de prueba (Error 404, Error 403, Error 500) para ver cómo se
            comporta el sistema ante diferentes errores HTTP.
          </p>
          <p>
            <strong>Historial de pings:</strong> En la parte inferior verás 10
            cuadrados de colores. Verde indica un ping exitoso, rojo indica un
            error, y gris indica que no hay datos. Pasa el ratón sobre cada
            cuadrado para ver detalles del ping (hora y resultado).
          </p>
          <p>
            <strong>Ping automático:</strong> El sistema realiza un ping
            automático cada 5 minutos para monitorear continuamente el estado de
            la API.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Tutorial;
