import "./informe.css";
import codigoImg from "/CapturasPantalla/codigo.png";
import coleccionesImg from "/CapturasPantalla/colecciones.png";
import componenteImg from "/CapturasPantalla/componente.png";
import restapiImg from "/CapturasPantalla/restapi.png";
import UsersInforme from "./usersInforme";
import PostsInforme from "./postsInforme";
import ChatInforme from "./chatInforme";
import BugsInforme from "./bugsInforme";
import StatusInforme from "./statusInforme";

const Informe = () => {
  return (
    <div className="informe-container">
      <header className="informe-header">
        <h1>Informe del Proyecto ERP - Radius</h1>
      </header>

      <section className="informe-section">
        <h2>INTRODUCCIÓN</h2>

        <div className="subsection">
          <h3>Contexto</h3>
          <p>
            Este proyecto consiste en desarrollar una ERP de escritorio nativo
            desde cero, usando los conocimientos previos que hemos adquirido.
            Esta ERP deberá ser completamente funcional para una empresa, en
            nuestro caso, Radius. Es decir, crearemos nuestro propio Odoo.
          </p>
          <p>
            Para llevar esto a cabo, utilizaremos <strong>Electron</strong> y{" "}
            <strong>React</strong> para el frontend, <strong>Node.js</strong>{" "}
            para el backend y <strong>MongoDB en la nube (Atlas)</strong> para
            utilizar como base de datos. En este sistema se gestionarán
            operaciones para los módulos específicos de nuestra aplicación
            Radius. Esto será estructurado de forma que más adelante se podrá
            escalar y expandir al mercado móvil.
          </p>
        </div>

        <div className="subsection">
          <h3>Problema</h3>
          <p>
            Nosotros con Radius no tenemos capacidad de tener un ERP que lleve
            un registro de productos y ventas, y sus respectivas gestiones. Esto
            es porque nuestra aplicación es una red social, por lo que no
            vendemos un producto, sino que "comerciamos" con las relaciones de
            nuestros usuarios.
          </p>
          <p>
            Por esto hemos tenido que adaptar el proyecto para que nuestra ERP
            fuese para gestionar a los{" "}
            <strong>
              usuarios, posts, chats, bugs y el estado de los servidores
            </strong>
            .
          </p>
        </div>

        <div className="subsection">
          <h3>Objetivo principal</h3>
          <p>
            Adaptar los conceptos de nuestra idea para crear una ERP y poder
            completar el proyecto. Encontrar módulos que veamos que son útiles e
            implementables en la ERP que se nos pide crear en este proyecto.
          </p>
        </div>
      </section>

      <section className="informe-section">
        <h2>DETALLES DEL PROYECTO</h2>

        <div className="subsection">
          <h3>Descripción técnica del proyecto</h3>
          <p>
            El primer día lo primero que hicimos fue tanto definir el tech stack
            dentro de la flexibilidad que se nos había dejado y organizar la
            estructura de la api y la app.
          </p>
          <p>
            Para la API, hemos usado <strong>Express</strong> y{" "}
            <strong>Mongoose</strong> entre otras, express para manejar
            peticiones http y mongoose para comunicación con la base de datos de
            mongo. Para el frontend, hemos usado{" "}
            <strong>Electron, React con Vite, MUI y Librerías de Charts</strong>
            . Electron para hacer la aplicación de escritorio, Vite para
            trabajar con React, MUI para poder crear un UI de manera más
            sencilla y las librerías de Charts para mostrar gráficos.
          </p>
        </div>

        <div className="subsection">
          <h3>Estructura de la API</h3>
          <p>
            La estructura de la api es la siguiente, en la raíz, dentro del src,
            tenemos carpetas de:
          </p>
          <ul className="estructura-lista">
            <li>
              <strong>Config:</strong> Configuración interna de la API
              (Configuraciones que no tienen que ir en el .ENV)
            </li>
            <li>
              <strong>Docs:</strong> Documentación adicional para Swagger
            </li>
            <li>
              <strong>Loaders:</strong> Lógica para iniciar servicios; Servidor
              express, Conexión Mongo y Inicio Documentación
            </li>
            <li>
              <strong>Middlewares:</strong> Interceptores de petición, código
              conjunto para asincronía, lógica para errores y respuesta 404
            </li>
            <li>
              <strong>Modules:</strong> Nuestros módulos del erp
            </li>
            <li>
              <strong>Routes:</strong> Rutas para acceder a los módulos
            </li>
            <li>
              <strong>Utils:</strong> Útiles de respuesta y errores
            </li>
          </ul>
          <p>
            En <strong>modules</strong> hay el index, el mongoose y el
            validador. En el index están el repositorio de datos y el service
            (Toda la lógica de respuesta para las peticiones). En el mongoose,
            están las schemas de las colecciones. Y en el validator está el
            validador para los datos.
          </p>
          <p>
            La base de datos la hemos tenido que hacer en{" "}
            <strong>MongoDB Atlas</strong>.
          </p>
        </div>

        <div className="subsection">
          <h3>Capturas de pantalla</h3>
          <div className="screenshots-grid">
            <div className="screenshot-item">
              <img src={restapiImg} alt="REST API" />
              <p className="screenshot-caption">REST API</p>
            </div>
            <div className="screenshot-item">
              <img src={coleccionesImg} alt="Colecciones MongoDB" />
              <p className="screenshot-caption">Colecciones MongoDB</p>
            </div>
            <div className="screenshot-item">
              <img src={componenteImg} alt="Componente" />
              <p className="screenshot-caption">Componente</p>
            </div>
            <div className="screenshot-item">
              <img src={codigoImg} alt="Código" />
              <p className="screenshot-caption">Código</p>
            </div>
          </div>
        </div>

        <div className="subsection">
          <h3>Uso de la IA y dónde</h3>
          <ul>
            <li>
              Estructura básica de la API y estructura básica del frontend.
              Después de esto, cada uno hizo sus respectivos módulos con sus
              respectivos métodos HTTP (GET, POST, PUT, PATCH y DELETE)
              correspondientes.
            </li>
            <li>Ha sido utilizado para el CSS</li>
            <li>
              Para buscar complementos MUI que fueran útiles para nuestro
              proyecto y luego los implementamos nosotros mismos a partir de las
              explicaciones
            </li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Dificultades técnicas y resolución de estas</h3>
          <ul>
            <li>
              Dificultades a la hora de instalar Mongo en la máquina virtual,
              solventando este problema preguntándole a la IA
            </li>
            <li>
              Hash Router no estaba implementado correctamente y lo solucionamos
              con la ayuda del docente
            </li>
          </ul>
        </div>
      </section>

      <section className="informe-section">
        <h2>REFLEXIÓN PERSONAL</h2>

        <div className="subsection">
          <h3>Resultados obtenidos</h3>
          <p>
            Durante el reto hemos podido hacer una ERP funcional, pero se podría
            quedar ahí, ya que no hemos podido poner nuestro toque único por
            falta de tiempo. Creemos que por nuestra parte hemos conseguido un
            buen producto, y nos encontramos satisfechos.
          </p>
          <p>
            No obstante, un par de semanas más hubieran bastado para poder
            personalizar nuestra ERP de forma que no solo estuviéramos
            satisfechos con el trabajo realizado, sino que estaríamos
            orgullosos.
          </p>
        </div>

        <div className="subsection">
          <h3>Trabajo en equipo</h3>
          <p>
            Para el trabajo en equipo decidimos hacer diversas cosas que nos
            beneficiaran a todos. Entre ellas está la elección de módulos, ya
            que cada uno se encargaba de uno; primero pensamos en los módulos
            que creíamos que eran necesarios para la ERP y los sorteamos.
          </p>
          <div className="team-members">
            <div className="member">
              Alejandro trabajó con <strong>Bugs</strong>
            </div>
            <div className="member">
              Andoni trabajó con <strong>Posts</strong>
            </div>
            <div className="member">
              Igor trabajó con <strong>Chats</strong>
            </div>
            <div className="member">
              Gonzalo trabajó con <strong>Status</strong>
            </div>
            <div className="member">
              Íñigo trabajó con <strong>Usuarios</strong>
            </div>
          </div>
          <p>
            A pesar de cada uno encargarse de un módulo, nos ayudamos mutuamente
            porque había momentos en los que uno se estancaba y otro le ayudaba
            a salir de esa situación. Por suerte tenemos buena dinámica de grupo
            y una mejor química, por lo que el trabajar juntos es muy sencillo y
            natural para nosotros.
          </p>
        </div>

        <div className="subsection">
          <h3>Aprendido durante el proceso</h3>
          <ul>
            <li>Montar una máquina virtual con MongoDB</li>
            <li>Uso de componentes MUI en nuestro ERP</li>
            <li>Uso de Express, Electron, React y MongoDB</li>
          </ul>
        </div>

        <div className="subsection">
          <h3>Posibles mejoras</h3>
          <ul>
            <li>
              Mejoras en la UI/UX, ya que no ha sido el foco de nuestro proyecto
            </li>
            <li>Orden del código, porque podría haber sido más modular</li>
          </ul>
        </div>
        <div className="subsection">
          <h3>Informes de módulos</h3>
          <BugsInforme />
          <ChatInforme />
          <PostsInforme />
          <StatusInforme />
          <UsersInforme />
        </div>
      </section>

      <section className="informe-section conclusion">
        <h2>CONCLUSIÓN</h2>
        <div className="subsection">
          <h3>Conclusión grupal</h3>
          <p>
            Hemos hecho un buen trabajo del que hemos acabado satisfechos, pero
            no orgullosos. Creemos que ha habido muy poco tiempo para un
            proyecto tan entretenido y, de algún modo, divertido.
          </p>
          <p>
            De todas formas, hemos aprendido mucho más de lo que pensamos en un
            principio.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Informe;
