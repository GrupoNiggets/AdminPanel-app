import "./HowToGuide.css";

const HowToGuide = () => {
  return (
    <div className="informe-container">
      <header className="informe-header">
        <h1>How-To Guide - ERP Radius</h1>
      </header>

      <section className="informe-section">
        <h2>CÓMO USAR ESTA GUÍA</h2>

        <div className="subsection">
          <h3>Objetivo</h3>
          <p>
            Esta guía está diseñada para resolver dudas específicas y ayudarte a
            completar tareas concretas en el proyecto ERP Radius. No es un curso
            de aprendizaje, sino una referencia rápida para cuando necesites
            saber "cómo se hace algo".
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO ENTENDER EL PROYECTO</h2>

        <div className="subsection">
          <h3>¿Qué es este sistema?</h3>
          <p>
            Es una <strong>ERP (Enterprise Resource Planning)</strong> para
            gestionar la red social Radius. Permite administrar usuarios, posts,
            chats, bugs y monitorear servidores.
          </p>
        </div>

        <div className="subsection">
          <h3>¿Qué tecnologías utiliza?</h3>
          <ul className="estructura-lista">
            <li>
              <strong>Frontend:</strong> Electron + React + Vite (Escritorio)
            </li>
            <li>
              <strong>Backend:</strong> Node.js + Express (API REST)
            </li>
            <li>
              <strong>Base de datos:</strong> MongoDB Atlas (Nube)
            </li>
            <li>
              <strong>UI:</strong> Material-UI (MUI)
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO ESTÁ ESTRUCTURADO EL CÓDIGO</h2>

        <div className="subsection">
          <h3>¿Dónde está cada parte?</h3>
          <ul>
            <li>
              <strong>AdminPanel-app:</strong> Contiene todo el código de la
              interfaz gráfica (React).
            </li>
            <li>
              <strong>AdminPanel-api:</strong> Contiene la lógica del servidor y
              la conexión a base de datos.
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>¿Cómo fluyen los datos?</h3>
          <p>
            1. <strong>Usuario</strong> realiza acción en la App.
            <br />
            2. <strong>App</strong> envía petición HTTP (GET, POST, etc.) a la
            API.
            <br />
            3. <strong>API</strong> procesa y consulta <strong>MongoDB</strong>.
            <br />
            4. <strong>API</strong> devuelve respuesta JSON.
            <br />
            5. <strong>App</strong> actualiza la pantalla.
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO NAVEGAR POR LA APP</h2>

        <div className="subsection">
          <h3>¿Qué opciones tengo en el menú?</h3>
          <ul>
            <li>
              <strong>Inicio:</strong> Dashboard principal.
            </li>
            <li>
              <strong>Módulos:</strong> Acceso a las herramientas de gestión
              (Bugs, Chat, Posts, Status, Usuarios).
            </li>
            <li>
              <strong>Información:</strong> Documentación (este archivo,
              Tutorial, Swagger).
            </li>
            <li>
              <strong>Repositorios:</strong> Enlaces a GitHub.
            </li>
            <li>
              <strong>Salir:</strong> Cerrar programa.
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO REALIZAR TAREAS COMUNES</h2>

        <div className="subsection">
          <h3>¿Cómo crear un nuevo elemento?</h3>
          <p>
            En casi todos los módulos (Usuarios, Posts, Bugs), busca el botón
            con el símbolo <strong>"+"</strong> (ej. "+ Añadir Usuario"). Se
            abrirá un modal para ingresar los datos.
          </p>
        </div>

        <div className="subsection">
          <h3>¿Cómo editar información existente?</h3>
          <p>
            Busca el icono de <strong>lápiz</strong> en la fila o tarjeta del
            elemento que quieres modificar. Haz tus cambios y guarda.
          </p>
        </div>

        <div className="subsection">
          <h3>¿Cómo eliminar un elemento?</h3>
          <p>
            Busca el icono de <strong>papelera</strong>. Siempre te pedirá
            confirmación antes de borrar algo permanentemente.
          </p>
        </div>

        <div className="subsection">
          <h3>¿Cómo comprobar si el servidor funciona?</h3>
          <p>
            Ve a <strong>Módulos → Status</strong> y pulsa "Comprobar Ping".
            Verde = OK, Rojo = Error.
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>CÓMO SOLUCIONAR PROBLEMAS Y DUDAS</h2>

        <div className="subsection">
          <h3>¿Cómo filtrar y buscar datos?</h3>
          <p>
            En módulos como <strong>Usuarios</strong> y <strong>Bugs</strong>,
            encontrarás barras de búsqueda y selectores en la parte superior.
            Úsalos para encontrar rápidamente lo que necesitas sin tener que
            hacer scroll por toda la lista.
          </p>
        </div>

        <div className="subsection">
          <h3>¿Cómo interpretar los roles de usuario?</h3>
          <p>
            En la tabla de usuarios y en el chat, verás etiquetas de colores:
          </p>
          <ul>
            <li>
              <strong>Admin (Rojo):</strong> Usuarios con permisos totales de
              gestión.
            </li>
            <li>
              <strong>User (Verde):</strong> Usuarios estándar de la red social.
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>¿Qué hacer si la API no responde?</h3>
          <p>
            Si ves mensajes de error o los datos no cargan:
            <br />
            1. Ve al módulo <strong>Status</strong>.
            <br />
            2. Haz clic en "Comprobar Ping".
            <br />
            3. Si falla, verifica que el servidor (AdminPanel-api) esté
            ejecutándose en tu terminal.
            <br />
            4. Revisa tu conexión a internet (necesaria para MongoDB).
          </p>
        </div>
      </section>

      <section className="informe-section conclusion">
        <h2>RESUMEN TÉCNICO</h2>
        <div className="subsection">
          <h3>Endpoints de la API</h3>
          <p>
            Todas las peticiones van a <strong>http://localhost:3000</strong>.
            <br />
            Prefijo: <strong>/api/v1/[módulo]</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowToGuide;
