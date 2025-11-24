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
          <h3>Su Primer Recorrido por la ERP Radius</h3>
          <p>
            Le damos la bienvenida. En este tutorial, recorreremos la aplicación
            de escritorio de Radius. El objetivo es que usted se familiarice con
            la interfaz y aprenda a navegar por ella con confianza. No es
            necesario preocuparse por los detalles técnicos en este momento;
            simplemente exploraremos las funcionalidades disponibles.
          </p>
        </div>

        <div className="subsection">
          <h3>Antes de empezar</h3>
          <p>
            Para realizar este recorrido sin inconvenientes, asegúrese de tener
            los siguientes elementos listos:
          </p>
          <ul>
            <li>
              <strong>La aplicación abierta:</strong> Debería estar visualizando
              esta pantalla en la aplicación de escritorio.
            </li>
            <li>
              <strong>El servidor funcionando:</strong> Se requiere que el
              backend esté activo en http://localhost:3000 para visualizar datos
              reales.
            </li>
            <li>
              <strong>Conexión a Internet:</strong> Necesaria para establecer
              conexión con la base de datos en la nube.
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>NAVEGACIÓN PRINCIPAL</h2>

        <div className="subsection">
          <h3>1. El Menú Principal</h3>
          <p>
            Lo primero que observará es el menú en la parte superior.
            Considérelo su centro de mando. Desde aquí podrá acceder a cualquier
            sección de la aplicación.
          </p>
          <div className="screenshot-item3">
            <img src={menuPrincipalImg} alt="Menú principal de la aplicación" />
            <p className="screenshot-caption">
              Vista del menú principal para la navegación.
            </p>
          </div>
        </div>

        <div className="subsection">
          <h3>2. Volver al Inicio</h3>
          <p>
            Si en algún momento necesita reorientarse, siempre puede hacer clic
            en <strong>Inicio</strong>. Esta acción le llevará de vuelta a la
            pantalla de bienvenida, donde encontrará un resumen general.
          </p>
        </div>

        <div className="subsection">
          <h3>3. Explorando los Módulos</h3>
          <p>
            Aquí reside la funcionalidad principal. En el menú{" "}
            <strong>Módulos</strong>, encontrará las herramientas para gestionar
            la red social. A continuación, se detalla el contenido de cada uno:
          </p>
          <ul className="estructura-lista">
            <li>
              <strong>Bugs:</strong> Sección para reportar y gestionar los
              errores detectados.
            </li>
            <li>
              <strong>Chat:</strong> Sistema para visualizar y enviar mensajes
              en tiempo real.
            </li>
            <li>
              <strong>Posts:</strong> Área de control para las publicaciones de
              los usuarios.
            </li>
            <li>
              <strong>Status:</strong> Panel para verificar el estado de salud
              del servidor.
            </li>
            <li>
              <strong>Usuarios:</strong> Listado completo de las personas
              registradas en Radius.
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>4. Dónde encontrar ayuda</h3>
          <p>
            La sección <strong>Información</strong> es donde se encuentra
            actualmente. Aquí se almacena toda la documentación útil, incluyendo
            este tutorial, guías técnicas y enlaces a herramientas de
            desarrollo.
          </p>
        </div>

        <div className="subsection">
          <h3>5. Acceso al Código</h3>
          <p>
            Finalmente, si requiere consultar el código fuente, la sección{" "}
            <strong>Repositorios</strong> le abrirá directamente las páginas de
            GitHub del proyecto.
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>APRENDIENDO A USAR LOS MÓDULOS</h2>
        <p>
          Una vez conocido el mapa general, procederemos a practicar con algunas
          tareas comunes.
        </p>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Gestionando Usuarios</h4>
          </div>
          <p>
            Suponga que necesita buscar a un usuario o registrar uno nuevo. El
            procedimiento es el siguiente:
          </p>
          <p>
            <strong>Paso 1:</strong> Diríjase a Módulos → Usuarios.
          </p>
          <p>
            <strong>Paso 2:</strong> Visualizará la lista completa. Puede
            utilizar el buscador superior para localizar a alguien por su
            nombre.
          </p>
          <p>
            <strong>Crear un usuario:</strong> Al pulsar "+ Añadir Usuario", se
            abrirá un formulario. Complételo y seleccione "Crear".
          </p>
          <p>
            <strong>Editar o Borrar:</strong> Observe los iconos a la derecha de
            cada usuario. El lápiz permite realizar modificaciones y la papelera
            eliminar el registro.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Moderando Posts</h4>
          </div>
          <p>Examinemos las publicaciones de los usuarios.</p>
          <p>
            <strong>Paso 1:</strong> Diríjase a Módulos → Posts.
          </p>
          <p>
            <strong>Paso 2:</strong> Los posts se presentan como tarjetas para
            facilitar su visualización. Puede editar el contenido de cualquier
            mensaje si lo considera inapropiado, o eliminarlo directamente.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Probando el Chat</h4>
          </div>
          <p>Probemos la funcionalidad de mensajería.</p>
          <p>
            <strong>Paso 1:</strong> Diríjase a Módulos → Chat.
          </p>
          <p>
            <strong>Paso 2:</strong> Esta sección permite simular diferentes
            identidades. Utilice el selector superior para elegir el usuario y
            escriba un mensaje en la parte inferior. Observará cómo aparece en
            la conversación.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Reportando un Bug</h4>
          </div>
          <p>Si detecta algún error, es importante reportarlo.</p>
          <p>
            <strong>Paso 1:</strong> Diríjase a Módulos → Bugs.
          </p>
          <p>
            <strong>Paso 2:</strong> Seleccione "+ Nuevo Bug". Describa la
            incidencia, indique su gravedad (Prioridad) y el estado actual. Al
            guardar, se añadirá a la lista para su revisión por parte del
            equipo.
          </p>
        </div>

        <div className="subsection">
          <div className="module-title-highlight">
            <h4>Verificando el Sistema</h4>
          </div>
          <p>
            Por último, verifiquemos el correcto funcionamiento del sistema.
          </p>
          <p>
            <strong>Paso 1:</strong> Diríjase a Módulos → Status.
          </p>
          <p>
            <strong>Paso 2:</strong> Pulse "Comprobar Ping". Un indicador verde
            señala un funcionamiento correcto. También puede interactuar con los
            botones de error para observar la reacción del sistema ante fallos.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Tutorial;
