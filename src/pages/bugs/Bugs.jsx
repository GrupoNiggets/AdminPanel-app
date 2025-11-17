import React, { useState } from 'react';
import './Bugs.css';
import AddBugsModal from './AddBugsModal';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const STATUS_COLORS = {
  abierto: '#f44336',
  'en progreso': '#facc15',
  resuelto: '#4caf50',
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
    setBugs(prev => [
      ...prev,
      { id: prev.length + 1, ...newBug }
    ]);
  };

  // Datos para el gráfico
  const statusCounts = {
    abierto: bugs.filter(b => b.status === 'abierto').length,
    'en progreso': bugs.filter(b => b.status === 'en progreso').length,
    resuelto: bugs.filter(b => b.status === 'resuelto').length,
  };

  const chartData = {
    labels: ['Abierto', 'En progreso', 'Resuelto'],
    datasets: [
      {
        data: [statusCounts.abierto, statusCounts['en progreso'], statusCounts.resuelto],
        backgroundColor: [STATUS_COLORS.abierto, STATUS_COLORS['en progreso'], STATUS_COLORS.resuelto],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ background: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="dashboard-grid">

        {/* IZQUIERDA - Dashboard de Bugs */}
        <div>
          <div className="bugs-header">
            <h3>Dashboard de Bugs</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="bugs-stats">
                <div className="stat-item">Total: {bugs.length}</div>
                <div className="stat-item">Abiertos: {statusCounts.abierto}</div>
              </div>
              <button className="add-bug-btn" onClick={() => setIsModalOpen(true)}>
                + Nuevo Bug
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="abierto">Abiertos</option>
              <option value="en progreso">En progreso</option>
              <option value="resuelto">Resueltos</option>
            </select>

            <input
              className="search-input"
              type="text"
              placeholder="Buscar bug..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="bugs-list">
            {filteredBugs.map(bug => (
              <div key={bug.id} className="bug-card" style={{ borderLeftColor: PRIORITY_COLORS[bug.priority] }}>
                <div className="bug-header-row">
                  <div className="bug-id">#{bug.id}</div>
                  <div className="bug-status" style={{ backgroundColor: STATUS_COLORS[bug.status] }}>
                    {bug.status}
                  </div>
                  <div className="bug-priority"
                       style={{ color: PRIORITY_COLORS[bug.priority], border: `1px solid ${PRIORITY_COLORS[bug.priority]}` }}>
                    {bug.priority}
                  </div>
                </div>
                <div className="bug-title">{bug.title}</div>
                <div className="bug-footer">Reportado por: <strong>{bug.reporter}</strong></div>
              </div>
            ))}
          </div>
        </div>

        {/* DERECHA - Gráfico */}
        <div style={{ maxWidth: '400px', marginLeft: '40px' }}>
          <h3>Estado de Bugs</h3>
          <Pie data={chartData} />
        </div>

        {isModalOpen && <AddBugModal onClose={() => setIsModalOpen(false)} onSave={handleAddBug} />}
      </div>
    </div>
  );
}
