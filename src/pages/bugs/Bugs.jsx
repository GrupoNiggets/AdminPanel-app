import React, { useState } from 'react'
import { Box, Paper, Typography, Chip, Grid } from '@mui/material'
import BugReportIcon from '@mui/icons-material/BugReport'

export default function Bugs() {
  const [bugs] = useState([
    { id: 1, title: 'Error en login con email', status: 'abierto', priority: 'alta', reporter: 'Juan' },
    { id: 2, title: 'Botón de guardar no responde', status: 'en progreso', priority: 'media', reporter: 'Ana' },
    { id: 3, title: 'Carga lenta en dashboard', status: 'resuelto', priority: 'baja', reporter: 'Carlos' },
    { id: 4, title: 'Error 404 en módulo usuarios', status: 'abierto', priority: 'alta', reporter: 'María' }
  ])

  const getStatusColor = (status) => {
    switch(status) {
      case 'abierto': return '#d32f2f'
      case 'en progreso': return '#ed6c02'
      case 'resuelto': return '#2e7d32'
      default: return '#757575'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return '#d32f2f'
      case 'media': return '#ed6c02'
      case 'baja': return '#1976d2'
      default: return '#757575'
    }
  }

  return (
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#000000', mb: 1 }}>
        🐛 Gestión de Bugs
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Sistema de seguimiento de errores
      </Typography>

      <Paper elevation={2} sx={{ bgcolor: '#fef3c7', p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#92400e', fontWeight: 600 }}>
            <BugReportIcon /> Reportes de Bugs
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={`Total: ${bugs.length}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
            <Chip label={`Abiertos: ${bugs.filter(b => b.status === 'abierto').length}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {bugs.map(bug => (
          <Grid item xs={12} sm={6} lg={4} key={bug.id}>
            <Paper elevation={2} sx={{ p: 3, bgcolor: '#ffffff', borderRadius: 2, height: '100%', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip label={`#${bug.id}`} size="small" sx={{ bgcolor: '#f5f5f5', color: '#000000', fontWeight: 600 }} />
                <Chip label={bug.status} size="small" sx={{ bgcolor: getStatusColor(bug.status), color: 'white', fontWeight: 600, textTransform: 'uppercase' }} />
                <Chip label={bug.priority.toUpperCase()} size="small" sx={{ color: getPriorityColor(bug.priority), bgcolor: '#f5f5f5', fontWeight: 700 }} />
              </Box>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 1 }}>{bug.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                Reportado por: <strong>{bug.reporter}</strong>
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
