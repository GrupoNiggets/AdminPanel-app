//IMPORTS
import { useMemo, useState, useEffect, useCallback } from "react";

import "./Users.css";

import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import UserStats from "../../components/userComponents/UserStats";
import UserTable from "../../components/userComponents/UserTable";
import EditUserDialog from "../../components/userComponents/EditUserDialog";
import DeleteUserDialog from "../../components/userComponents/DeleteUserDialog";
import CreateUserDialog from "../../components/userComponents/CreateUserDialog";
import {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./dataUsers";

//toPremiumBoolean PARA ACEPTAR STRINGS DISTINTOS
const toPremiumBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "activo" ||
      normalized === "active" ||
      normalized === "true" ||
      normalized === "1"
    );
  }
  return Boolean(value);
};

//getPremiumLabel CON LOS VALORES DE LA ETIQUETA
const getPremiumLabel = (value) => (value ? "Activo" : "Inactivo");

//FUNCIÓN Users()
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

  useEffect(() => {
    setCurrentPage(0);
  }, [query]);

  //useState DE CONSTANTES DE EDICIÓN
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

  //useState DE CONSTANTES PARA TENER LOS USUARIOS PAGINADOS
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

  //handleConfirm PARA CONFIRMAR LA EDICIÓN DE USUARIO
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

  //handleCancel PARA NEGAR LA EDICIÓN DE USUARIO
  const handleCancel = () => {
    setVentanaEditar(false);
  };

  //handleEditRequest PARA CONSULTA DE EDICIÓN DE USUARIO
  const handleEditRequest = (user) => {
    setEditarUser(user);
    setVentanaEditar(true);
  };

  //handleDeleteRequest PARA CONSULTA DE ELIMINACIÓN DE USUARIO
  const handleDeleteRequest = (user) => {
    setEliminarUser(user);
    setVentanaEliminar(true);
  };

  //handleDeleteConfirm PARA CONFIRMAR LA ELIMINACIÓN DE USUARIO
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

  //handleDeleteCancel PARA CANCELAR ELIMINACIÓN DE USUARIO
  const handleDeleteCancel = () => {
    setVentanaEliminar(false);
    setEliminarUser(null);
  };

  //handleCreateOpen PARA ABRIR LA CREACIÓN DE USUARIO
  const handleCreateOpen = () => {
    setCreateFormData({
      name: "",
      email: "",
      role: "user",
      premium: false,
    });
    setVentanaCrear(true);
  };

  //handleCreateCancel PARA CANCELAR LA CREACIÓN DE USUARIO
  const handleCreateCancel = () => {
    setVentanaCrear(false);
  };

  //handleCreateConfirm PARA CONFIRMAR LA CREACIÓN DE USUARIO
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

  //COLORES DE ROLES
  const ROLE_COLORS = {
    admin: "#d32f2f",
    user: "#2e7d32",
    default: "#757575",
  };

  // FUNCIÓN PARA NORMALIZAR SIGNOS DE ACENTUACIÓN
  const normalizeText = (text) => {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  // FILTRACIÓN CON LA FUNCIÓN ANTERIOR normalizeText
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

  // USUARIOS PAGINADOS
  const paginatedUsers = useMemo(() => {
    const start = currentPage * usersPerPage;
    const end = start + usersPerPage;
    return filtered.slice(start, end);
  }, [filtered, currentPage, usersPerPage]);

  // TOTAL DE PÁGINAS
  const totalPages = Math.ceil(filtered.length / usersPerPage);

  //handleNextPage PARA MOSTRAR LA SIGUIENTE PÁGINA
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  //handlePreviousPage PARA MOSTRAR LA PÁGINA ANTERIOR
  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  //USUARIOS TOTALES
  const totalUsers = users.length;
  //USUARIOS CON PREMIUM
  const activeUsers = useMemo(
    () => users.filter((u) => Boolean(u.premium)).length,
    [users]
  );
  //USUARIOS SIN PREMIUM
  const inactiveUsers = totalUsers - activeUsers;
  //USUARIOS ADMINISTRADORES
  const adminCount = useMemo(
    () => users.filter((u) => u.role === "admin").length,
    [users]
  );
  //USUARIOS SIN PERMISOS
  const normalUserCount = useMemo(
    () => users.filter((u) => u.role === "user").length,
    [users]
  );

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
