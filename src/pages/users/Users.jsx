import React, { useMemo, useState, useEffect } from "react";

import './Users.css'

import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function UserStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
  query,
  setQuery,
}) {
  return (
    // Grid reemplazado por divs con clases
    <div className="stats-container">
      <div className="stat-item">
        <Paper sx={{ bgcolor: "#b5a5a5ff", p: 2, height: "55%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total registrados
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {totalUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "#b5a5a5ff", p: 2, height: "55%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Activos
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {activeUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "#b5a5a5ff", p: 2, height: "55%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Inactivos
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {inactiveUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* TextField reemplazado por input */}
          <div className="search-input-wrapper">
            <SearchIcon className="search-input-icon" />
            <input
              type="text"
              className="custom-input"
              placeholder="Buscar por nombre, e..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button fullWidth variant="contained" startIcon={<AddIcon />}>
            Agregar usuario
          </Button>
        </Box>
      </div>
    </div>
  );
}

function UserTable({
  paginatedUsers,
  ROLE_COLORS,
  onEditRequest,
  currentPage,
  totalPages,
  filteredUserCount,
  handlePreviousPage,
  handleNextPage,
  usersPerPage,
}) {
  const emptyRows =
    paginatedUsers.length < usersPerPage
      ? usersPerPage - paginatedUsers.length
      : 0;

  return (
    <>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="outlined"
          size="small"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
        >
          Anterior
        </Button>
        <Typography variant="body2" color="text.secondary">
          Página {currentPage + 1} de {totalPages} ({filteredUserCount}{" "}
          usuarios)
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages - 1}
        >
          Siguiente
        </Button>
      </Box>

      {/* TableContainer, Table, etc., reemplazados por elementos HTML */}
      <div className="table-wrapper">
        <table className="user-table">
          <thead className="table-head">
            <tr style={{ backgroundColor: "#f5f7ff" }}>
              <th>
                <strong>Usuario</strong>
              </th>
              <th>
                <strong>Email</strong>
              </th>
              <th>
                <strong>Rol</strong>
              </th>
              <th>
                <strong>Premium</strong>
              </th>
              <th style={{ textAlign: "center" }}>
                <strong>Acciones</strong>
              </th>
            </tr>
          </thead>
          <tbody className="table-body">
            {paginatedUsers.map((u) => (
              <tr key={u.id} className="table-row">
                <td>
                  <Box
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Avatar
                      sx={{ bgcolor: "#0b5cff", width: 36, height: 36 }}
                    >
                      {u.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography sx={{ fontWeight: 600 }}>
                        {u.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        ID: {u.id}
                      </Typography>
                    </Box>
                  </Box>
                </td>
                <td>
                  <Typography color="text.secondary">{u.email}</Typography>
                </td>
                <td>
                  <Chip
                    label={u.role}
                    size="small"
                    sx={{
                      bgcolor: ROLE_COLORS[u.role] || ROLE_COLORS.default,
                      color: "#fff",
                      fontWeight: 600,
                    }}
                  />
                </td>
                <td>
                  <Chip
                    label={u.premium === "activo" ? "Activo" : "Inactivo"}
                    size="small"
                    color={u.premium === "activo" ? "success" : "default"}
                  />
                </td>
                <td style={{ textAlign: "center" }}>
                  <IconButton
                    name="Editar"
                    size="small"
                    color="primary"
                    onClick={() => onEditRequest(u)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton name="Borrar" size="small" color="error">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton name="Perfil" size="small" color="disabled">
                    <AccountCircleIcon />
                  </IconButton>
                </td>
              </tr>
            ))}

            {emptyRows > 0 && (
              <tr
                style={{
                  height: 53 * emptyRows,
                }}
              >
                <td colSpan="5" />
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UserCharts({
  roleCounts,
  premiumCounts,
  ROLE_COLORS,
  PREMIUM_COLORS,
}) {
  return (
    // Grid reemplazado por divs con clases
    <div className="charts-container">
      <div className="chart-item">
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
            Roles
          </Typography>
          <Box sx={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={roleCounts}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="70%"
                  innerRadius="35%"
                  paddingAngle={4}
                >
                  {roleCounts.map((entry, index) => {
                    const color =
                      ROLE_COLORS[entry.name] || ROLE_COLORS.default;
                    return <Cell key={`cell-${index}`} fill={color} />;
                  })}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Leyenda
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
            >
              {roleCounts.map((r) => (
                <Chip
                  key={r.name}
                  label={`${r.name} — ${r.value}`}
                  size="small"
                  sx={{
                    bgcolor: ROLE_COLORS[r.name] || ROLE_COLORS.default,
                    color: "#fff",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </div>
      <div className="chart-item">
        <Paper sx={{ p: 2, height: "100%" }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>
            Usuarios Premium
          </Typography>
          <Box sx={{ width: "100%", height: 220 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={premiumCounts}
                  dataKey="value"
                  nameKey="name"
                  outerRadius="70%"
                  innerRadius="35%"
                  paddingAngle={4}
                >
                  {premiumCounts.map((entry, index) => (
                    <Cell
                      key={`prem-${index}`}
                      fill={PREMIUM_COLORS[entry.name] || "#9e9e9e"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Typography variant="caption" color="text.secondary">
              Leyenda
            </Typography>
            <Box
              sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}
            >
              {premiumCounts.map((r) => (
                <Chip
                  key={`legend-${r.name}`}
                  label={`${r.name} — ${r.value}`}
                  size="small"
                  sx={{
                    bgcolor:
                      PREMIUM_COLORS[r.name] || PREMIUM_COLORS.default,
                    color: "#fff",
                  }}
                />
              ))}
            </Box>
          </Box>
        </Paper>
      </div>
    </div>
  );
}

function EditUserDialog({
  open,
  onClose,
  onConfirm,
  formData,
  setFormData,
}) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent
        sx={{ position: "relative", pt: 4, pb: 0, bgcolor: "#fff" }}
      >
        <Button
          size="small"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          Atrás
        </Button>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* TextField reemplazado por label + input */}
          <div className="form-field">
            <label htmlFor="edit-user-name">Usuario</label>
            <input
              id="edit-user-name"
              type="text"
              className="custom-input"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="edit-user-email">Email</label>
            <input
              id="edit-user-email"
              type="email"
              className="custom-input"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <FormControl fullWidth size="small">
            <InputLabel id="role-select-label">Rol</InputLabel>
            <Select
              labelId="role-select-label"
              label="Rol"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="premium-select-label">Premium</InputLabel>
            <Select
              labelId="premium-select-label"
              label="Premium"
              value={formData.premium}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, premium: e.target.value }))
              }
            >
              <MenuItem value="activo">Activo</MenuItem>
              <MenuItem value="inactivo">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          CANCELAR
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function Users() {
  const [query, setQuery] = useState("");
  const [users] = useState([
    {
      id: 1,
      name: "Alejandro Hernández",
      email: "alheadmin@radiuserp.com",
      role: "admin",
      premium: "activo",
    },
    {
      id: 2,
      name: "Andoni Iriso",
      email: "aniradmin@radiuserp.com",
      role: "admin",
      premium: "activo",
    },
    {
      id: 3,
      name: "Igor Lizasp",
      email: "igliadmin@radiuserp.com",
      role: "admin",
      premium: "activo",
    },
    {
      id: 4,
      name: "Gonzalo Luna",
      email: "goluadmin@radiuserp.com",
      role: "admin",
      premium: "inactivo",
    },
    {
      id: 5,
      name: "Íñigo Ruiz de la Torre",
      email: "inruadmin@radiuserp.com",
      role: "admin",
      premium: "activo",
    },
    {
      id: 6,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 7,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 8,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 9,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 10,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 11,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 12,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 13,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 14,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 15,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
    {
      id: 16,
      name: "Luis Gómez",
      email: "luis@panel.com",
      role: "user",
      premium: "activo",
    },
  ]);

  const [ventanaEditar, setVentanaEditar] = useState(false);
  const [editarUser, setEditarUser] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const usersPerPage = 5;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    premium: "activo",
  });

  useEffect(() => {
    if (editarUser) {
      setFormData({
        name: editarUser.name || "",
        email: editarUser.email || "",
        role: editarUser.role || "user",
        premium: editarUser.premium || "activo",
      });
    }
  }, [editarUser]);

  const handleConfirm = () => {
    console.log("Confirmar edición:", formData);
    setVentanaEditar(false);
  };

  const handleCancel = () => {
    setVentanaEditar(false);
  };

  const handleEditRequest = (user) => {
    setEditarUser(user);
    setVentanaEditar(true);
  };

  const ROLE_COLORS = {
    admin: "#d32f2f",
    user: "#2e7d32",
    default: "#757575",
  };

  const PREMIUM_COLORS = { activo: "#ce4278ff", inactivo: "#6b5435ff" };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
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
    const map = {};
    users.forEach((u) => {
      map[u.premium] = (map[u.premium] || 0) + 1;
    });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [users]);

  const totalUsers = users.length;
  const activeUsers = useMemo(
    () => users.filter((u) => u.premium === "activo").length,
    [users]
  );
  const inactiveUsers = totalUsers - activeUsers;

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

      {/* Grid principal reemplazado por divs */}
      <div className="main-layout">
        <div className="layout-row">
          <UserStats
            totalUsers={totalUsers}
            activeUsers={activeUsers}
            inactiveUsers={inactiveUsers}
            query={query}
            setQuery={setQuery}
          />
        </div>
        <div className="layout-row-main-content">
          <div className="table-section">
            <UserTable
              paginatedUsers={paginatedUsers}
              ROLE_COLORS={ROLE_COLORS}
              onEditRequest={handleEditRequest}
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
    </Box>
  );
}