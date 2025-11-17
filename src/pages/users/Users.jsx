import React, { useMemo, useState, useEffect, useCallback } from "react";

import "./Users.css";

import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import UserStats from "../../components/userComponents/UserStats";
import UserTable from "../../components/userComponents/UserTable";
import UserCharts from "../../components/userComponents/UserCharts";
import EditUserDialog from "../../components/userComponents/EditUserDialog";
import DeleteUserDialog from "../../components/userComponents/DeleteUserDialog";
import CreateUserDialog from "../../components/userComponents/CreateUserDialog";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./dataUsers";

const toPremiumBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return normalized === "activo" || normalized === "active" || normalized === "true" || normalized === "1";
  }
  return Boolean(value);
};

const getPremiumLabel = (value) => (value ? "Activo" : "Inactivo");

export default function Users() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const loadUsers = useCallback(async () => {
    try {
      const data = await listUsers();
      if (Array.isArray(data)) {
        setUsers(
          data.map((user) => ({
            ...user,
            premium: toPremiumBoolean(user.premium),
          }))
        );
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const [ventanaEditar, setVentanaEditar] = useState(false);
  const [editarUser, setEditarUser] = useState(null);

  const [ventanaEliminar, setVentanaEliminar] = useState(false);
  const [eliminarUser, setEliminarUser] = useState(null);
  const [ventanaCrear, setVentanaCrear] = useState(false);
  const [createFormData, setCreateFormData] = useState({
    name: "",
    email: "",
    role: "user",
    premium: false,
  });

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    premium: false,
  });

  useEffect(() => {
    if (editarUser) {
      setFormData({
        name: editarUser.name || "",
        email: editarUser.email || "",
        role: editarUser.role || "user",
        premium: toPremiumBoolean(editarUser.premium),
      });
    }
  }, [editarUser]);

  const handleConfirm = async () => {
    if (!editarUser?.id) {
      return;
    }

    try {
      await updateUser(editarUser.id, formData);
      await loadUsers();
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    } finally {
      setVentanaEditar(false);
      setEditarUser(null);
    }
  };

  const handleCancel = () => {
    setVentanaEditar(false);
  };

  const handleEditRequest = (user) => {
    setEditarUser(user);
    setVentanaEditar(true);
  };

  const handleDeleteRequest = (user) => {
    setEliminarUser(user);
    setVentanaEliminar(true);
  };

  const handleDeleteConfirm = async () => {
    if (!eliminarUser?.id) {
      return;
    }

    try {
      await deleteUser(eliminarUser.id);
      await loadUsers();
    } catch (error) {
      console.error("Error eliminando usuario:", error);
    } finally {
      setVentanaEliminar(false);
      setEliminarUser(null);
    }
  };

  const handleDeleteCancel = () => {
    setVentanaEliminar(false);
    setEliminarUser(null);
  };

  const handleCreateOpen = () => {
    setCreateFormData({
      name: "",
      email: "",
      role: "user",
      premium: false,
    });
    setVentanaCrear(true);
  };

  const handleCreateCancel = () => {
    setVentanaCrear(false);
  };

  const handleCreateConfirm = async () => {
    try {
      await createUser(createFormData);
      await loadUsers();
    } catch (error) {
      console.error("Error creando usuario:", error);
    } finally {
      setVentanaCrear(false);
    }
  };

  const ROLE_COLORS = {
    admin: "#d32f2f",
    user: "#2e7d32",
    default: "#757575",
  };

  const PREMIUM_COLORS = { Activo: "#ce4278ff", Inactivo: "#6b5435ff", default: "#9e9e9e" };

  // Función para normalizar acentos y caracteres especiales
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return users;
    const normalizedQuery = normalizeText(q);
    return users.filter(
      (u) =>
        normalizeText(u.name).includes(normalizedQuery) ||
        normalizeText(u.email).includes(normalizedQuery) ||
        normalizeText(u.role).includes(normalizedQuery) ||
        normalizeText(getPremiumLabel(u.premium)).includes(normalizedQuery)
    );
  }, [query, users]);

  const paginatedUsers = useMemo(() => {
    const start = currentPage * usersPerPage;
    const end = start + usersPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, usersPerPage]);

  const totalPages = Math.ceil(filtered.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const roleCounts = useMemo(() => {
    const map = {};
    users.forEach((u) => {
      map[u.role] = (map[u.role] || 0) + 1;
    });
    return Object.entries(map).map(([role, value]) => ({ name: role, value }));
  }, [users]);

  const premiumCounts = useMemo(() => {
    const map = { Activo: 0, Inactivo: 0 };
    users.forEach((u) => {
      const label = getPremiumLabel(u.premium);
      map[label] = (map[label] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [users]);

  const totalUsers = users.length;
  const activeUsers = useMemo(() => users.filter((u) => Boolean(u.premium)).length, [users]);
  const inactiveUsers = totalUsers - activeUsers;
  const adminCount = useMemo(() => users.filter((u) => u.role === "admin").length, [users]);
  const normalUserCount = useMemo(() => users.filter((u) => u.role === "user").length, [users]);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{ mb: 2, p: 2, display: "flex", alignItems: "center" }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <PeopleIcon sx={{ color: "#0b5cff" }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Administración de Usuarios
          </Typography>
        </Box>
      </Paper>

      <div className="main-layout">
        <div className="layout-row">
          <UserStats
            totalUsers={totalUsers}
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers}
            adminCount={adminCount}
            userCount={normalUserCount}
            query={query}
            setQuery={setQuery}
            onAddUser={handleCreateOpen}
          />
        </div>
        <div className="layout-row-main-content">
          <div className="table-section">
            <UserTable
              paginatedUsers={paginatedUsers}
              ROLE_COLORS={ROLE_COLORS}
              onEditRequest={handleEditRequest}
              onDeleteRequest={handleDeleteRequest}
              currentPage={currentPage}
              totalPages={totalPages}
              filteredUserCount={filtered.length}
              handlePreviousPage={handlePreviousPage}
              handleNextPage={handleNextPage}
              usersPerPage={usersPerPage}
            />
          </div>
          <div className="charts-section">
            <UserCharts
              roleCounts={roleCounts}
              premiumCounts={premiumCounts}
              ROLE_COLORS={ROLE_COLORS}
              PREMIUM_COLORS={PREMIUM_COLORS}
            />
          </div>
        </div>
      </div>

      <EditUserDialog
        open={ventanaEditar}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        formData={formData}
        setFormData={setFormData}
      />

      <DeleteUserDialog
        open={ventanaEliminar}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        userName={eliminarUser?.name || ""}
      />

      <CreateUserDialog
        open={ventanaCrear}
        onClose={handleCreateCancel}
        onConfirm={handleCreateConfirm}
        formData={createFormData}
        setFormData={setCreateFormData}
      />
    </Box>
  );
}
