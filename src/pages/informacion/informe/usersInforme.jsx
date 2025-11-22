import menuPrincipalImg from "/CapturasPantalla/menuPrincipal.png";
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
      <ul>
        <li>
          <strong>Tabla de usuarios:</strong> Muestra todos los usuarios con
          nombre, email, rol y estado premium
        </li>
        <li>
          <strong>Estadísticas superiores:</strong> Tarjetas con totales
          (usuarios totales, premium activos/inactivos, administradores)
        </li>
        <li>
          <strong>Barra de búsqueda:</strong> Filtra usuarios por nombre, email
          o rol (búsqueda inteligente sin acentos)
        </li>
        <li>
          <strong>Paginación:</strong> 5 usuarios por página con botones
          "Anterior" y "Siguiente"
        </li>
      </ul>

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
      <p>
        <strong>Crear usuario:</strong> Botón "+ Añadir Usuario" abre ventana
        modal. Rellenas nombre, email, rol (admin/user) y premium
        (activo/inactivo). Al guardar, aparece inmediatamente en la tabla.
      </p>
      <p>
        <strong>Editar usuario:</strong> Icono de lápiz en cada fila. Abre
        ventana con datos actuales, modificas lo que necesites y guardas.
      </p>
      <p>
        <strong>Eliminar usuario:</strong> Icono de papelera. Pide confirmación
        antes de borrar definitivamente.
      </p>

      <h4>Roles y permisos</h4>
      <ul>
        <li>
          <strong>Admin</strong> (rojo): Administradores con permisos completos
        </li>
        <li>
          <strong>User</strong> (verde): Usuarios normales con permisos
          limitados
        </li>
      </ul>

      <h4>Comunicación con la API</h4>
      <ul>
        <li>
          <strong>POST:</strong> Crear usuario
        </li>
        <li>
          <strong>PATCH:</strong> Editar usuario
        </li>
        <li>
          <strong>DELETE:</strong> Eliminar usuario
        </li>
        <li>
          <strong>GET:</strong> Cargar lista de usuarios
        </li>
      </ul>
      <p>
        Todo se guarda en MongoDB y la tabla se recarga automáticamente después
        de cada cambio.
      </p>
    </div>
  );
};

export default UsersInforme;
