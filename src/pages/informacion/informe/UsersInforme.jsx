import usersCaptura1Img from "/CapturasPantalla/usersCaptura1.png";
import usersCaptura2Img from "/CapturasPantalla/usersCaptura2.png";

const UsersInforme = () => {
  return (
    <div className="subsection">
      <div className="module-title-highlight">
        <h4>Explicación del Módulo de Usuarios</h4>
      </div>

      <p>
        Este módulo es donde gestionamos a todas las personas que usan nuestra
        red social Radius. Aquí podemos ver quién está registrado, crear nuevos
        usuarios, modificar su información y eliminarlos si es necesario.
      </p>

      <h4>Interfaz principal</h4>
      <div className="screenshot-item2">
        <img
          src={usersCaptura1Img}
          alt="Módulo de Usuarios - Vista principal"
        />
        <p className="screenshot-caption">
          Vista principal del módulo de usuarios
        </p>
      </div>

      <h4>Perfil de usuario</h4>
      <div className="screenshot-item2">
        <img
          src={usersCaptura2Img}
          alt="Módulo de Usuarios - Formulario de creación"
        />
        <p className="screenshot-caption">
          Formulario para crear/editar usuarios
        </p>
      </div>

      <h4>Roles y permisos</h4>
      <ul>
        <li>
          <strong>Admin (rojo):</strong> Administradores con permisos completos
        </li>
        <li>
          <strong>User (verde):</strong> Usuarios normales con permisos
          limitados
        </li>
      </ul>

      <h4>Usuarios con premium activo y premium inactivo</h4>
      <ul>
        <li>
          <strong>Premium: </strong> Usuarios que pagan una mensualidad para
          tener mejor experiencia en la aplicación y sin anuncios
        </li>
        <li>
          <strong>Sin Premium: </strong> Todos los usuarios empiezan aquí y
          tienen anuncios a cambio de no pagar una mensualidad premium
        </li>
      </ul>
    </div>
  );
};

export default UsersInforme;
