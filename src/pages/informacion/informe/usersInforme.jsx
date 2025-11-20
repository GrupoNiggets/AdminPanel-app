import React from 'react';

const UsersInforme = () => {
  return (
    <div className="subsection">
      <h3>Explicación del Módulo de Usuarios</h3>
      
      <p>
        El módulo de usuarios es uno de los componentes principales de nuestra ERP. Está construido con 
        <strong> React</strong> y utiliza <strong>Material-UI (MUI)</strong> para la interfaz de usuario. 
        A continuación se explica su funcionamiento y arquitectura.
      </p>

      <h4 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px', color: '#444' }}>
        Componente Principal: Users.jsx
      </h4>
      
      <p>
        El archivo <strong>Users.jsx</strong> es el componente principal que gestiona toda la lógica del módulo de usuarios. 
        Sus responsabilidades incluyen:
      </p>

      <ul>
        <li><strong>Gestión del estado:</strong> Utiliza hooks de React (useState, useEffect, useMemo, useCallback) para manejar 
        el estado de los usuarios, la paginación, los filtros de búsqueda y los diálogos de edición/creación/eliminación.</li>
        
        <li><strong>Carga de datos:</strong> Implementa la función <code>loadUsers()</code> que obtiene los usuarios desde la API 
        mediante el servicio <code>listUsers()</code> del archivo dataUsers.js.</li>
        
        <li><strong>Búsqueda y filtrado:</strong> Incluye un sistema de búsqueda que normaliza texto (elimina acentos) y filtra 
        usuarios por nombre, email, rol o estado premium. El filtrado se realiza de forma reactiva usando <code>useMemo</code>.</li>
        
        <li><strong>Paginación:</strong> Divide los usuarios en páginas de 5 elementos cada una. Cuando se realiza una búsqueda, 
        automáticamente resetea a la página 1 para mostrar los resultados correctamente.</li>
        
        <li><strong>Operaciones CRUD:</strong> Permite crear, editar y eliminar usuarios mediante diálogos modales que se comunican 
        con la API a través de las funciones <code>createUser()</code>, <code>updateUser()</code> y <code>deleteUser()</code>.</li>
      </ul>

      <h4 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px', color: '#444' }}>
        Componentes Hijos
      </h4>

      <p>
        El módulo de usuarios está compuesto por varios componentes especializados que trabajan en conjunto:
      </p>

      <ul>
        <li><strong>UserStats:</strong> Muestra estadísticas generales de los usuarios en tarjetas informativas. Incluye: 
        total de usuarios, usuarios premium, usuarios sin premium, administradores y usuarios sin permisos. También contiene 
        la barra de búsqueda y el botón para añadir nuevos usuarios.</li>
        
        <li><strong>UserTable:</strong> Renderiza la tabla principal con la lista de usuarios paginados. Muestra información 
        de cada usuario (avatar, nombre, ID, email, rol, estado premium) y botones de acción (editar, eliminar, ver perfil). 
        Incluye los controles de paginación (anterior/siguiente) y el contador de páginas.</li>
        
        <li><strong>EditUserDialog:</strong> Diálogo modal para editar la información de un usuario existente. Contiene un 
        formulario con campos para nombre, email, rol (admin/user) y estado premium (activo/inactivo).</li>
        
        <li><strong>DeleteUserDialog:</strong> Diálogo de confirmación para eliminar un usuario. Muestra el nombre del usuario 
        a eliminar y solicita confirmación antes de proceder con la eliminación.</li>
        
        <li><strong>CreateUserDialog:</strong> Diálogo modal para crear un nuevo usuario. Similar al de edición, pero con 
        campos vacíos y validaciones para asegurar que se ingresen todos los datos necesarios.</li>
      </ul>

      <h4 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px', color: '#444' }}>
        Funciones Auxiliares
      </h4>

      <ul>
        <li><strong>toPremiumBoolean():</strong> Convierte diferentes formatos de entrada (string, boolean) al formato booleano 
        correcto para el estado premium. Acepta valores como "activo", "active", "true", "1" y los normaliza a true/false.</li>
        
        <li><strong>getPremiumLabel():</strong> Convierte el valor booleano de premium en una etiqueta legible ("Activo" o "Inactivo") 
        para mostrar en la interfaz.</li>
        
        <li><strong>normalizeText():</strong> Elimina acentos y convierte el texto a minúsculas para realizar búsquedas más flexibles 
        y tolerantes a errores de escritura.</li>
      </ul>

      <h4 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px', color: '#444' }}>
        Flujo de Trabajo
      </h4>

      <p>
        El flujo típico de trabajo en el módulo de usuarios es el siguiente:
      </p>

      <ol style={{ marginLeft: '25px', marginTop: '12px' }}>
        <li style={{ marginBottom: '10px' }}>Al cargar el componente, se ejecuta <code>loadUsers()</code> que obtiene todos los usuarios de la API.</li>
        <li style={{ marginBottom: '10px' }}>Los usuarios se muestran en <code>UserStats</code> (estadísticas) y <code>UserTable</code> (tabla paginada).</li>
        <li style={{ marginBottom: '10px' }}>El usuario puede buscar mediante la barra de búsqueda, lo que filtra la lista y resetea la paginación.</li>
        <li style={{ marginBottom: '10px' }}>Para editar, se hace clic en el botón de editar, abriendo <code>EditUserDialog</code> con los datos del usuario.</li>
        <li style={{ marginBottom: '10px' }}>Para eliminar, se abre <code>DeleteUserDialog</code> solicitando confirmación.</li>
        <li style={{ marginBottom: '10px' }}>Para crear, se abre <code>CreateUserDialog</code> con un formulario vacío.</li>
        <li style={{ marginBottom: '10px' }}>Tras cualquier operación CRUD, se vuelve a ejecutar <code>loadUsers()</code> para actualizar la lista.</li>
      </ol>

      <h4 style={{ fontSize: '1.1rem', marginTop: '20px', marginBottom: '10px', color: '#444' }}>
        Tecnologías Utilizadas
      </h4>

      <ul>
        <li><strong>React Hooks:</strong> useState, useEffect, useMemo, useCallback para gestión de estado y optimización.</li>
        <li><strong>Material-UI (MUI):</strong> Componentes como Box, Paper, Typography, Button, Avatar, Chip, IconButton para la UI.</li>
        <li><strong>React Router:</strong> Para navegación al perfil detallado de cada usuario.</li>
        <li><strong>API REST:</strong> Comunicación con el backend mediante funciones asíncronas (async/await).</li>
      </ul>
    </div>
  );
};

export default UsersInforme;
