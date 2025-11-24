import React, { useState } from "react";
import "./Bugs.css";

export default function EditBugModal({ bug, onClose, onSave }) {
    const [form, setForm] = useState({
        title: bug.title || "",
        description: bug.description || "",
        status: bug.status?.toLowerCase() || "abierto",
        priority: bug.priority?.toLowerCase() || "media",
        reporter: bug.reporter || "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const updateBug = async () => {
        if (
            !form.title.trim() ||
            !form.description.trim() ||
            !form.reporter.trim()
        ) {
            alert("Por favor completa todos los campos obligatorios");
            return;
        }

        // Convertir status y priority a mayúsculas según lo que espera la API
        const payload = {
            ...form,
            status: form.status.toUpperCase().replace(" ", " "), // "en progreso" -> "EN PROGRESO"
            priority: form.priority.toUpperCase(),
        };

        console.log("Actualizando bug en la API:", payload);

        try {
            const res = await fetch(`${API_URL}/bugs/${bug.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            console.log("Respuesta del servidor:", res.status);

            if (res.ok) {
                const data = await res.json();
                console.log("Bug actualizado exitosamente:", data);
                onSave(data.data || data);
                onClose();
            } else {
                const errorData = await res.json().catch(() => ({}));
                console.error("Error al actualizar el bug:", res.status, errorData);
                console.error(
                    "Detalles del error:",
                    JSON.stringify(errorData, null, 2)
                );
                const errorMsg =
                    errorData.error?.message ||
                    errorData.message ||
                    JSON.stringify(errorData.error) ||
                    res.statusText;
                alert(`Error al actualizar el bug: ${errorMsg}`);
            }
        } catch (err) {
            console.error("Error al actualizar el bug:", err);
            alert("Error de conexión con la API");
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h3>Editar Bug</h3>

                <div className="modal-body">
                    <label>Título del bug</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="modal-input"
                        placeholder="Ej: Botón no responde"
                    />

                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        className="modal-input"
                        placeholder="Describe el bug en detalle"
                        rows="3"
                    />

                    <label>Estado</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                        className="modal-input"
                    >
                        <option value="abierto">Abierto</option>
                        <option value="en progreso">En progreso</option>
                        <option value="resuelto">Resuelto</option>
                    </select>

                    <label>Prioridad</label>
                    <select
                        name="priority"
                        value={form.priority}
                        onChange={handleChange}
                        className="modal-input"
                    >
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
                    <button className="btn-cancel" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn-save" onClick={updateBug}>
                        Guardar Cambios
                    </button>
                </div>
            </div>
        </div>
    );
}
