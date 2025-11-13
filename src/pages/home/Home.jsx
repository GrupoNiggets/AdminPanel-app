import React from 'react'
import './Home.css'

export default function Home() {
  const stats = [
    { label: 'Módulos', value: '5', icon: '📦', color: '#3b82f6' },
    { label: 'Usuarios', value: '24', icon: '👥', color: '#8b5cf6' },
    { label: 'Posts', value: '156', icon: '📝', color: '#06b6d4' },
    { label: 'Bugs', value: '8', icon: '🐛', color: '#f59e0b' }
  ]

  const recentActivity = [
    { action: 'Nuevo usuario registrado', user: 'María García', time: 'Hace 5 min', icon: '👤' },
    { action: 'Bug #23 resuelto', user: 'Juan Pérez', time: 'Hace 12 min', icon: '✅' },
    { action: 'Post publicado', user: 'Admin', time: 'Hace 1 hora', icon: '📄' },
    { action: 'Chat iniciado', user: 'Carlos López', time: 'Hace 2 horas', icon: '💬' }
  ]

  const quickLinks = [
    { name: 'Ver módulos', url: '#/modules', icon: '📦', color: '#3b82f6' },
    { name: 'Gestionar usuarios', url: '#/modules/users', icon: '👥', color: '#8b5cf6' },
    { name: 'Revisar bugs', url: '#/modules/bugs', icon: '🐛', color: '#f59e0b' },
    { name: 'Estado del sistema', url: '#/modules/status', icon: '📊', color: '#10b981' }
  ]

  return (
    <div className="home-container">
      <div className="welcome-section">
        <h1>👋 Bienvenido al Panel de Administración</h1>
        <p>Gestiona tus módulos, usuarios y contenido desde un solo lugar</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card" style={{'--card-color': stat.color}}>
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-info">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-grid">
        <div className="quick-links-section">
          <h3>🚀 Accesos rápidos</h3>
          <div className="quick-links">
            {quickLinks.map((link, i) => (
              <a key={i} href={link.url} className="quick-link" style={{'--link-color': link.color}}>
                <span className="link-icon">{link.icon}</span>
                <span className="link-name">{link.name}</span>
                <span className="link-arrow">→</span>
              </a>
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h3>📋 Actividad reciente</h3>
          <div className="activity-list">
            {recentActivity.map((activity, i) => (
              <div key={i} className="activity-item">
                <div className="activity-icon">{activity.icon}</div>
                <div className="activity-info">
                  <div className="activity-action">{activity.action}</div>
                  <div className="activity-meta">
                    <span>{activity.user}</span>
                    <span className="activity-time">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-section">
        <p>💡 <strong>Tip del día:</strong> Puedes instalar o desinstalar módulos desde la sección de Módulos</p>
      </div>
    </div>
  )
}
