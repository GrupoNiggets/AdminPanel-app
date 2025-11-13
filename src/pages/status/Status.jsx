import React from 'react'
import './Status.css'

export default function Status() {
  const metrics = [
    { label: 'CPU', value: '23%', status: 'normal', icon: '⚡' },
    { label: 'Memoria', value: '1.8GB / 8GB', status: 'normal', icon: '💾' },
    { label: 'Disco', value: '45GB / 256GB', status: 'normal', icon: '💿' },
    { label: 'Red', value: '125 Mbps', status: 'bueno', icon: '🌐' }
  ]

  const services = [
    { name: 'Base de datos', status: 'activo', uptime: '99.9%' },
    { name: 'API REST', status: 'activo', uptime: '99.7%' },
    { name: 'Cache Redis', status: 'activo', uptime: '100%' },
    { name: 'CDN', status: 'activo', uptime: '99.5%' }
  ]

  return (
    <div className="status-container">
      <div className="status-header">
        <h3>📊 Estado del Sistema</h3>
        <span className="status-time">Actualizado: {new Date().toLocaleTimeString('es-ES')}</span>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, i) => (
          <div key={i} className="metric-card">
            <div className="metric-icon">{metric.icon}</div>
            <div className="metric-info">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
              <div className="metric-status" data-status={metric.status}>● {metric.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="services-section">
        <h4>Servicios activos</h4>
        <div className="services-list">
          {services.map((service, i) => (
            <div key={i} className="service-item">
              <div>
                <div className="service-name">{service.name}</div>
                <div className="service-uptime">Uptime: {service.uptime}</div>
              </div>
              <span className="service-status">● {service.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
