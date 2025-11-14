import React from "react";
import { Box, Paper, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

function UserStats({
  totalUsers,
  activeUsers,
  inactiveUsers,
  query,
  setQuery,
}) {
  return (
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

export default UserStats;
