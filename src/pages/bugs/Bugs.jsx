import React, { useState, useEffect } from "react";
import "./Bugs.css";
import AddBugsModal from "./AddBugsModal";
import EditBugModal from "./EditBugModal";

const STATUS_COLORS = {
  ABIERTO: "#f87171", // rojo
  "EN PROGRESO": "#fbbf24", // amarillo
  RESUELTO: "#34d399", // verde
};

const PRIORITY_COLORS = {
  ALTA: "#ef4444",
  MEDIA: "#f59e0b",
  BAJA: "#34d399",
};

export default function BugsDashboard() {
  const [filter, setFilter] = useState("todos");
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingBug, setEditingBug] = useState(null);
  const [bugs, setBugs] = useState([]);

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔵 CARGAR BUGS desde la API (nuevo)
  const loadBugs = async () => {
    try {
      const res = await fetch(`${API_URL}/bugs`);
      const data = await res.json();
      if (res.ok) setBugs(data.data ?? []);
    } catch (err) {
      console.error("Error al cargar bugs:", err);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  // 🟢 GUARDAR BUG desde el modal (ya conectado en tu modal)
  const handleAddBug = async (newBug) => {
    // Reload bugs from API to ensure we have the latest data
    await loadBugs();
  };

  // 🟡 EDITAR BUG
  const handleEditBug = (bug) => {
    setEditingBug(bug);
    setIsEditModalOpen(true);
  };

  const handleUpdateBug = async (updatedBug) => {
    // Reload bugs from API to ensure we have the latest data
    await loadBugs();
  };

  const filteredBugs = bugs.filter((bug) => {
    // Convertir el filtro a mayúsculas para comparar con los valores de la API
    const statusFilter = filter === "todos" ? "todos" : filter.toUpperCase();
    return (
      (statusFilter === "todos" || bug.status === statusFilter) &&
      bug.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  const statusCounts = {
    ABIERTO: bugs.filter((b) => b.status === "ABIERTO").length,
    "EN PROGRESO": bugs.filter((b) => b.status === "EN PROGRESO").length,
    RESUELTO: bugs.filter((b) => b.status === "RESUELTO").length,
  };

  const priorityCounts = {
    ALTA: bugs.filter((b) => b.priority === "ALTA").length,
    MEDIA: bugs.filter((b) => b.priority === "MEDIA").length,
    BAJA: bugs.filter((b) => b.priority === "BAJA").length,
  };

  return (
    <div className="dashboard-layout">
      {/* COLUMNA IZQUIERDA */}
      <div className="left-column">
        <div className="bugs-header">
          <h3>Dashboard de Bugs</h3>
          <div className="bugs-controls">
            {/* 🔵 BOTÓN PARA ABRIR EL MODAL (faltaba) */}
            <button className="btn-add" onClick={() => setIsModalOpen(true)}>
              + Nuevo Bug
            </button>
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
          {filteredBugs.map((bug) => (
            <div
              key={bug.id}
              className={`bug-card prioridad-${bug.priority.toLowerCase()} ${bug.status === "RESUELTO" ? "estado-resuelto" : ""
                }`}
            >
              <div className="bug-header">
                <span className="bug-status">{bug.status}</span>
                <button
                  className="btn-edit"
                  onClick={() => handleEditBug(bug)}
                  title="Editar bug"
                >
                  ✏️
                </button>
              </div>
              <span className="bug-priority">Prioridad {bug.priority}</span>
              <div className="bug-title">{bug.title}</div>
              <div className="bug-footer">
                Reportado por: <strong>{bug.reporter}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* COLUMNA DERECHA */}
      <div className="right-column">
        <h3>Resumen de Bugs</h3>
        <div>
          Abiertos: <strong>{statusCounts.ABIERTO}</strong>
        </div>
        <div>
          En progreso: <strong>{statusCounts["EN PROGRESO"]}</strong>
        </div>
        <div>
          Resueltos: <strong>{statusCounts.RESUELTO}</strong>
        </div>
        <hr style={{ margin: "10px 0" }} />
        <div>
          Alta prioridad: <strong>{priorityCounts.ALTA}</strong>
        </div>
        <div>
          Media prioridad: <strong>{priorityCounts.MEDIA}</strong>
        </div>
        <div>
          Baja prioridad: <strong>{priorityCounts.BAJA}</strong>
        </div>
      </div>

      {isModalOpen && (
        <AddBugsModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleAddBug}
        />
      )}

      {isEditModalOpen && editingBug && (
        <EditBugModal
          bug={editingBug}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingBug(null);
          }}
          onSave={handleUpdateBug}
        />
      )}
    </div>
  );
}
