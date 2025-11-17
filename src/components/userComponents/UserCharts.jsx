import React from "react";
import { Box, Paper, Typography, Chip } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function UserCharts({
  roleCounts,
  premiumCounts,
  ROLE_COLORS,
  PREMIUM_COLORS,
}) {
  return (
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
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
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
              {premiumCounts.map((r) => (
                <Chip
                  key={`legend-${r.name}`}
                  label={`${r.name} — ${r.value}`}
                  size="small"
                  sx={{
                    bgcolor: PREMIUM_COLORS[r.name] || PREMIUM_COLORS.default,
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

export default UserCharts;
