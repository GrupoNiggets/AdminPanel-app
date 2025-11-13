import React, { useState } from 'react'
import './Users.css'

export default function Users() {
  const [users] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@panel.com', role: 'Administrador', status: 'activo' },
    { id: 2, name: 'Juan Pérez', email: 'juan@panel.com', role: 'Editor', status: 'activo' },
    { id: 3, name: 'María García', email: 'maria@panel.com', role: 'Moderador', status: 'activo' },
    { id: 4, name: 'Carlos López', email: 'carlos@panel.com', role: 'Usuario', status: 'inactivo' }
  ])

  const getRoleBadge = (role) => {
    const colors = {
      'Administrador': '#dc2626',
      'Editor': '#7c3aed',
      'Moderador': '#2563eb',
      'Usuario': '#059669'
    }
    return colors[role] || '#6b7280'
  }

  return (
    <div className="users-container">
      <div className="users-header">
        <h3>👥 Gestión de Usuarios</h3>
        <button className="btn-add-user">+ Agregar usuario</button>
      </div>

      <div className="users-table">
        <div className="table-header">
          <div>Nombre</div>
          <div>Email</div>
          <div>Rol</div>
          <div>Estado</div>
          <div>Acciones</div>
        </div>
        {users.map(user => (
          <div key={user.id} className="table-row">
            <div className="user-name">
              <div className="user-avatar">{user.name.charAt(0)}</div>
              <span>{user.name}</span>
            </div>
            <div className="user-email">{user.email}</div>
            <div>
              <span className="role-badge" style={{background: getRoleBadge(user.role)}}>{user.role}</span>
            </div>
            <div>
              <span className={`status-badge ${user.status}`}>
                {user.status === 'activo' ? '✓ Activo' : '○ Inactivo'}
              </span>
            </div>
            <div className="user-actions">
              <button className="btn-action">✏️</button>
              <button className="btn-action">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
