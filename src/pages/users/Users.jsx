import React, { useMemo, useState, useEffect } from "react";

import "./Users.css";

import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";

import UserStats from "../../components/userComponents/UserStats";
import UserTable from "../../components/userComponents/UserTable";
import UserCharts from "../../components/userComponents/UserCharts";
import EditUserDialog from "../../components/userComponents/EditUserDialog";

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
