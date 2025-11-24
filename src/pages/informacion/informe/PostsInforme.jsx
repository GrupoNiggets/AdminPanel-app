import postsCapturaImg from "/CapturasPantalla/postsCaptura.png";

const PostsInforme = () => {
  return (
    <div className="subsection">
      <div className="module-title-highlight">
        <h4>Explicación del Módulo de Posts</h4>
      </div>

      <p>
        Este módulo gestiona todas las publicaciones que los usuarios crean en
        Radius. Es como el feed de una red social, pero visto desde el panel de
        administración.
      </p>

      <h4>Visualización</h4>
      <div className="screenshot-item2">
        <img src={postsCapturaImg} alt="Módulo de Posts - Vista completa" />
        <p className="screenshot-caption">Interfaz del módulo de posts</p>
      </div>
      <ul>
        <li>
          <strong>Tarjetas en cuadrícula:</strong> Cada post se muestra en una
          tarjeta individual
        </li>
        <li>
          <strong>Diseño responsive:</strong> 3 posts por fila (pantallas
          grandes), 2 (medianas), 1 (pequeñas)
        </li>
        <li>
          <strong>Información mostrada:</strong> Contenido del mensaje, ID del
          usuario, coordenadas geográficas
        </li>
        <li>
          <strong>Contador:</strong> Total de posts en la cabecera
        </li>
      </ul>

      <h4>Sistema de notificaciones</h4>
      <ul>
        <li>
          <strong>Verde:</strong> "Post creado exitosamente" / "Post actualizado
          exitosamente"
        </li>
        <li>
          <strong>Rojo:</strong> Mensajes de error si algo falla
        </li>
        <li>
          <strong>Duración:</strong> Desaparecen automáticamente después de unos
          segundos
        </li>
      </ul>

      <h4>Coordenadas geográficas</h4>
      <p>
        Se guardan en formato GeoJSON estándar: <strong>type: "Point"</strong> y
        <strong> coordinates: [longitud, latitud]</strong>. Esto permite
        almacenar la ubicación exacta donde se creó el post.
      </p>
    </div>
  );
};

export default PostsInforme;
