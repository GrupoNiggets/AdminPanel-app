import React, { useState } from 'react';
import './Bugs.css';

const STATUS_COLORS = {
  abierto: '#f44336',
  'en progreso': '#ffff00ff',
  resuelto: '#4caf50',
};

const PRIORITY_COLORS = {
  alta: '#ef4444',
  media: '#f59e0b',
  baja: '#3b82f6',
};

export default function BugsDashboard() {
  const [bugs] = useState([
    { id: 1, title: 'Error en login con email', status: 'abierto', priority: 'alta', reporter: 'Juan' },
    { id: 2, title: 'Botón de guardar no responde', status: 'en progreso', priority: 'media', reporter: 'Ana' },
    { id: 3, title: 'Carga lenta en dashboard', status: 'resuelto', priority: 'baja', reporter: 'Carlos' },
    { id: 4, title: 'Error 404 en módulo usuarios', status: 'abierto', priority: 'alta', reporter: 'María' },
  ]);

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="bugs-container">
        <div className="bugs-header">
          <h3>Dashboard de Bugs</h3>
          <div className="bugs-stats">
            <div className="stat-item">Total: {bugs.length}</div>
            <div className="stat-item">Abiertos: {bugs.filter(b => b.status === 'abierto').length}</div>
          </div>
        </div>

        <div className="bugs-list">
          {bugs.map(bug => (
            <div
              key={bug.id}
              className="bug-card"
              style={{ borderLeftColor: PRIORITY_COLORS[bug.priority] }}
            >
              <div className="bug-header-row">
                <div className="bug-id">#{bug.id}</div>
                <div className="bug-status" style={{ backgroundColor: STATUS_COLORS[bug.status] }}>
                  {bug.status}
                </div>
                <div
                  className="bug-priority"
                  style={{
                    color: PRIORITY_COLORS[bug.priority],
                    border: `1px solid ${PRIORITY_COLORS[bug.priority]}`
                  }}
                >
                  {bug.priority}
                </div>
              </div>
              <div className="bug-title">{bug.title}</div>
              <div className="bug-footer">Reportado por: <strong>{bug.reporter}</strong></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
