import React, { useState } from 'react';
import './Bugs.css';

export default function AddBugModal({ onClose, onSave }) {

  const [form, setForm] = useState({
    title: '',
    status: 'abierto',
    priority: 'media',
    reporter: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const saveBug = () => {
    if (!form.title.trim() || !form.reporter.trim()) return;
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Registrar Nuevo Bug</h3>

        <div className="modal-body">

          <label>Título del bug</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="modal-input"
            placeholder="Ej: Botón no responde"
          />

          <label>Estado</label>
          <select name="status" value={form.status} onChange={handleChange} className="modal-input">
            <option value="abierto">Abierto</option>
            <option value="en progreso">En progreso</option>
            <option value="resuelto">Resuelto</option>
          </select>

          <label>Prioridad</label>
          <select name="priority" value={form.priority} onChange={handleChange} className="modal-input">
            <option value="alta">Alta</option>
            <option value="media">Media</option>
            <option value="baja">Baja</option>
          </select>

          <label>Reportado por</label>
          <input
            name="reporter"
            value={form.reporter}
            onChange={handleChange}
            className="modal-input"
            placeholder="Tu nombre"
          />

        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-save" onClick={saveBug}>Guardar</button>
        </div>

      </div>
    </div>
  );
}
