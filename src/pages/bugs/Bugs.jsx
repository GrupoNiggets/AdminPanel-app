import React, { useState } from 'react';
import './Bugs.css';
import AddBugsModal from './AddBugsModal';

const STATUS_COLORS = {
  abierto: '#f87171',        // rojo
  'en progreso': '#fbbf24',  // amarillo
  resuelto: '#34d399',       // verde
};

const PRIORITY_COLORS = {
  alta: '#ef4444',
  media: '#f59e0b',
  baja: '#3b82f6',
};

export default function BugsDashboard() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [bugs, setBugs] = useState([
    { id: 1, title: 'Error en login con email', status: 'abierto', priority: 'alta', reporter: 'Andoni' },
    { id: 2, title: 'Botón de guardar no responde', status: 'en progreso', priority: 'media', reporter: 'Iñigo' },
    { id: 3, title: 'Carga lenta en dashboard', status: 'resuelto', priority: 'baja', reporter: 'Igor' },
    { id: 4, title: 'Error 404 en módulo usuarios', status: 'abierto', priority: 'alta', reporter: 'Alejandro' },
  ]);

  const filteredBugs = bugs.filter(bug =>
    (filter === "todos" || bug.status === filter) &&
    bug.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddBug = (newBug) => {
    setBugs(prev => [...prev, { id: prev.length + 1, ...newBug }]);
  };

  const statusCounts = {
    abierto: bugs.filter(b => b.status === 'abierto').length,
    'en progreso': bugs.filter(b => b.status === 'en progreso').length,
    resuelto: bugs.filter(b => b.status === 'resuelto').length,
  };

  const priorityCounts = {
    alta: bugs.filter(b => b.priority === 'alta').length,
    media: bugs.filter(b => b.priority === 'media').length,
    baja: bugs.filter(b => b.priority === 'baja').length,
  };

  return (
    <div className="dashboard-layout">

      {/* COLUMNA IZQUIERDA */}
      <div className="left-column">
        <div className="bugs-header">
          <h3>Dashboard de Bugs</h3>
          <div className="bugs-controls">
          </div>
        </div>

        <div className="bug-filters">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="todos">Todos</option>
            <option value="abierto">Abiertos</option>
            <option value="en progreso">En progreso</option>
            <option value="resuelto">Resueltos</option>
          </select>

          <input
            type="text"
            placeholder="Buscar bug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bugs-list">
          {filteredBugs.map(bug => (
            <div
              key={bug.id}
              className={`bug-card estado-${bug.status.replace(' ', '-')}`}
            >
              <span className="bug-status">{bug.status}</span>
              <span className="bug-priority" style={{ color: PRIORITY_COLORS[bug.priority] }}>
                {bug.priority}
              </span>
              <div className="bug-title">{bug.title}</div>
              <div className="bug-footer">Reportado por: <strong>{bug.reporter}</strong></div>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="right-column">
        <h3>Resumen de Bugs</h3>
        <div>Abiertos: {statusCounts.abierto}</div>
        <div>En progreso: {statusCounts['en progreso']}</div>
        <div>Resueltos: {statusCounts.resuelto}</div>
        <hr style={{ margin: '10px 0' }} />
        <div>Alta prioridad: {priorityCounts.alta}</div>
        <div>Media prioridad: {priorityCounts.media}</div>
        <div>Baja prioridad: {priorityCounts.baja}</div>
      </div>

      {isModalOpen && (
        <AddBugsModal onClose={() => setIsModalOpen(false)} onSave={handleAddBug} />
      )}
    </div>
  );
}
