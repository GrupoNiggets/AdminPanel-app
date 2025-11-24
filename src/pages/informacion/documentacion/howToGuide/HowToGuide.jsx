import "./HowToGuide.css";

const HowToGuide = () => {
  return (
    <div className="informe-container">
      <header className="informe-header">
        <h1>How-To Guide - ERP Radius</h1>
      </header>

      <section className="informe-section">
        <h2>INTRODUCCIÓN AL PROYECTO</h2>

        <div className="subsection">
          <h3>¿Qué es este proyecto?</h3>
          <p>
            Este proyecto es una{" "}
            <strong>ERP (Enterprise Resource Planning)</strong> de escritorio
            diseñada específicamente para gestionar los recursos de Radius,
            nuestra red social. A diferencia de las ERPs tradicionales que
            gestionan productos y ventas, esta aplicación está adaptada para
            administrar usuarios, publicaciones, chats, bugs y el estado de los
            servidores.
          </p>
        </div>

        <div className="subsection">
          <h3>Tecnologías utilizadas</h3>
          <ul className="estructura-lista">
            <li>
              <strong>Frontend:</strong> Electron + React + Vite para crear una
              aplicación de escritorio nativa
            </li>
            <li>
              <strong>Backend:</strong> Node.js con Express para la API REST
            </li>
            <li>
              <strong>Base de datos:</strong> MongoDB Atlas (base de datos en la
              nube)
            </li>
            <li>
              <strong>UI/UX:</strong> Material-UI (MUI) para componentes
              visuales y librerías de Charts para gráficos
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>ESTRUCTURA DEL PROYECTO</h2>

        <div className="subsection">
          <h3>Arquitectura general</h3>
          <p>El proyecto está dividido en dos repositorios principales:</p>
          <ul>
            <li>
              <strong>AdminPanel-app:</strong> La aplicación de escritorio
              (frontend) construida con Electron y React
            </li>
            <li>
              <strong>AdminPanel-api:</strong> El servidor backend que gestiona
              las peticiones HTTP y se comunica con MongoDB
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>¿Cómo funciona el sistema?</h3>
          <p>
            El proyecto funciona con una arquitectura cliente-servidor. La
            aplicación de escritorio (<strong>AdminPanel-app </strong>) es lo
            que el usuario ve y utiliza. Cuando realizas una acción, como crear
            un usuario o enviar un mensaje, la aplicación envía una petición
            HTTP al servidor backend (<strong>AdminPanel-api</strong>). El
            servidor procesa esta petición, valida los datos y se comunica con{" "}
            <strong>MongoDB Atlas</strong>
            (nuestra base de datos en la nube) para guardar o recuperar
            información. Finalmente, el servidor responde a la aplicación con
            los datos solicitados, y la interfaz se actualiza para mostrar los
            cambios.
          </p>
          <p>
            Este flujo se repite para cada operación: cuando lees datos (GET),
            cuando creas algo nuevo (POST), cuando actualizas información
            (PUT/PATCH) o cuando eliminas elementos (DELETE). Todo está
            conectado a través de la API REST que corre en
            http://localhost:3000.
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>NAVEGACIÓN Y USO</h2>

        <div className="subsection">
          <h3>Menú principal</h3>
          <p>
            La aplicación utiliza un menú de Electron en la parte superior con
            las siguientes opciones:
          </p>
          <ul>
            <li>
              <strong>Inicio:</strong> Página principal con información general
              del proyecto
            </li>
            <li>
              <strong>Módulos:</strong> Acceso a los cinco módulos principales
              (Bugs, Chat, Posts, Status, Usuarios)
            </li>
            <li>
              <strong>Información:</strong> Contiene el informe del proyecto y
              la documentación (References, How-to-guide, Tutorial, Máquina
              Virtual)
            </li>
            <li>
              <strong>Repositorios:</strong> Enlaces directos a los repositorios
              de GitHub del proyecto
            </li>
            <li>
              <strong>Salir:</strong> Cierra la aplicación
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Operaciones CRUD</h3>
          <p>
            Todos los módulos principales (excepto Status) implementan
            operaciones CRUD completas:
          </p>
          <ul className="estructura-lista">
            <li>
              <strong>Create (Crear):</strong> Botones para añadir nuevos
              elementos que abren diálogos modales
            </li>
            <li>
              <strong>Read (Leer):</strong> Visualización de datos en tablas,
              tarjetas o listas
            </li>
            <li>
              <strong>Update (Actualizar):</strong> Botones de edición que
              permiten modificar información existente
            </li>
            <li>
              <strong>Delete (Eliminar):</strong> Botones de eliminación con
              confirmación para evitar borrados accidentales
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Comunicación con la API</h3>
          <p>
            La aplicación se comunica con el backend a través de peticiones
            HTTP:
          </p>
          <ul>
            <li>
              <strong>GET:</strong> Para obtener datos (listar usuarios, posts,
              mensajes, etc.)
            </li>
            <li>
              <strong>POST:</strong> Para crear nuevos elementos
            </li>
            <li>
              <strong>PATCH:</strong> Para actualizar elementos existentes
            </li>
            <li>
              <strong>DELETE:</strong> Para eliminar elementos
            </li>
          </ul>
          <p>
            La API está configurada para ejecutarse en{" "}
            <strong>http://localhost:3000</strong>y todas las rutas siguen el
            patrón <strong>/api/v1/[módulo]</strong>.
          </p>
        </div>
      </section>

      <section className="informe-section conclusion">
        <h2>RESUMEN</h2>
        <div className="subsection">
          <h3>Flujo de trabajo general</h3>
          <p>
            El usuario interactúa con la aplicación de escritorio (Electron +
            React), que envía peticiones HTTP a la API (Express + Node.js). La
            API procesa estas peticiones, valida los datos y se comunica con
            MongoDB Atlas para almacenar o recuperar información. Finalmente, la
            respuesta regresa a la aplicación y se actualiza la interfaz visual.
          </p>
          <p>
            Este sistema modular permite que cada parte del proyecto funcione de
            manera independiente pero coordinada, facilitando el mantenimiento y
            la escalabilidad futura de la aplicación.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HowToGuide;
