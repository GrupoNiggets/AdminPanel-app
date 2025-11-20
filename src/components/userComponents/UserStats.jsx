import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function UserStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
  adminCount,
  userCount,
  query,
  setQuery,
  onAddUser,
}) {
  return (
    <div className="stats-container">
      <div className="stat-item">
        <Paper sx={{ bgcolor: "darkgray", p: 2, height: "100%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Total de usuarios
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {totalUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "darkgray", p: 2, height: "100%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Premium
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {activeUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "darkgray", p: 2, height: "100%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            No Premium
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {inactiveUsers}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "darkgray", p: 2, height: "100%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Administradores
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {adminCount}
          </Typography>
        </Paper>
      </div>
      <div className="stat-item">
        <Paper sx={{ bgcolor: "darkgray", p: 2, height: "100%" }}>
          <Typography variant="subtitle2" color="text.secondary">
            Usuarios sin permisos
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {userCount}
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
          <div className="search-input-wrapper">
            <SearchIcon className="search-input-icon" />
            <input
              type="text"
              className="custom-input"
              placeholder="Buscar por nombre, email, rol o premium"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AddIcon />}
            onClick={onAddUser}
          >
            Agregar usuario
          </Button>
        </Box>
      </div>
    </div>
  );
}

export default UserStats;
