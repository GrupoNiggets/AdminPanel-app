import React, { useState } from 'react';
import { Box, Paper, Typography, Chip, Grid, Stack, Button } from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';

// Colores por estado y prioridad
const STATUS_COLORS = {
  abierto: '#f44336',
  'en progreso': '#ff9800',
  resuelto: '#4caf50',
};

const PRIORITY_COLORS = {
  alta: '#f44336',
  media: '#ff9800',
  baja: '#2196f3',
};

// Componente de resumen de bugs
function BugSummary({ bugs }) {
  const total = bugs.length;
  const abiertos = bugs.filter(b => b.status === 'abierto').length;

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 3, bgcolor: '#fff8e1' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" spacing={2}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600, color: '#92400e' }}>
          <BugReportIcon /> Reportes de Bugs
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label={`Total: ${total}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
          <Chip label={`Abiertos: ${abiertos}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
        </Stack>
      </Stack>
    </Paper>
  );
}

// Componente de tarjeta de bug
function BugCard({ bug }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': { transform: 'translateY(-6px)', boxShadow: 8 },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Stack spacing={1}>
        <Stack direction="row" spacing={1} flexWrap="wrap">
          <Chip label={`#${bug.id}`} size="small" sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }} />
          <Chip
            label={bug.status}
            size="small"
            sx={{
              bgcolor: STATUS_COLORS[bug.status],
              color: 'white',
              fontWeight: 600,
              textTransform: 'uppercase',
            }}
          />
          <Chip
            label={bug.priority.toUpperCase()}
            size="small"
            sx={{
              color: PRIORITY_COLORS[bug.priority],
              bgcolor: '#f5f5f5',
              fontWeight: 700,
            }}
          />
        </Stack>
        <Typography variant="subtitle1" fontWeight={600}>
          {bug.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Reportado por: <strong>{bug.reporter}</strong>
        </Typography>
      </Stack>
    </Paper>
  );
}

// Componente principal
export default function BugsDashboard() {
  const [bugs] = useState([
    { id: 1, title: 'Error en login con email', status: 'abierto', priority: 'alta', reporter: 'Juan' },
    { id: 2, title: 'Botón de guardar no responde', status: 'en progreso', priority: 'media', reporter: 'Ana' },
    { id: 3, title: 'Carga lenta en dashboard', status: 'resuelto', priority: 'baja', reporter: 'Carlos' },
    { id: 4, title: 'Error 404 en módulo usuarios', status: 'abierto', priority: 'alta', reporter: 'María' },
  ]);

  return (
    <Box sx={{ p: 5, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 1 }}>
        🐛 Gestión de Bugs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Dashboard elegante de seguimiento de errores
      </Typography>

      <BugSummary bugs={bugs} />

      <Grid container spacing={3}>
        {bugs.map(bug => (
          <Grid item xs={12} sm={6} lg={4} key={bug.id}>
            <BugCard bug={bug} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
