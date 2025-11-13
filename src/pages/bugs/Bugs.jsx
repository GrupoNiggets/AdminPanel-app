import React, { useState } from 'react'
import './Bugs.css'

export default function Bugs() {
  const [bugs] = useState([
    { id: 1, title: 'Error en login con email', status: 'abierto', priority: 'alta', reporter: 'Juan' },
    { id: 2, title: 'Botón de guardar no responde', status: 'en progreso', priority: 'media', reporter: 'Ana' },
    { id: 3, title: 'Carga lenta en dashboard', status: 'resuelto', priority: 'baja', reporter: 'Carlos' },
    { id: 4, title: 'Error 404 en módulo usuarios', status: 'abierto', priority: 'alta', reporter: 'María' }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'abierto': return '#ef4444'
      case 'en progreso': return '#f59e0b'
      case 'resuelto': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return '#dc2626'
      case 'media': return '#f59e0b'
      case 'baja': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  return (
    <div className="bugs-container">
      <div className="bugs-header">
        <h3>🐛 Reportes de Bugs</h3>
        <div className="bugs-stats">
          <span className="stat-item">Total: {bugs.length}</span>
          <span className="stat-item">Abiertos: {bugs.filter(b => b.status === 'abierto').length}</span>
        </div>
      </div>

      <div className="bugs-list">
        {bugs.map(bug => (
          <div key={bug.id} className="bug-card">
            <div className="bug-header-row">
              <span className="bug-id">#{bug.id}</span>
              <span className="bug-status" style={{background: getStatusColor(bug.status)}}>{bug.status}</span>
              <span className="bug-priority" style={{color: getPriorityColor(bug.priority)}}>{bug.priority.toUpperCase()}</span>
            </div>
            <div className="bug-title">{bug.title}</div>
            <div className="bug-footer">
              <span>Reportado por: <strong>{bug.reporter}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
