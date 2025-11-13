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
      case 'abierto': return '#ef4444'
      case 'en progreso': return '#f59e0b'
      case 'resuelto': return '#10b981'
      default: return '#6b7280'
    }
  }

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'alta': return '#dc2626'
      case 'media': return '#f59e0b'
      case 'baja': return '#3b82f6'
      default: return '#6b7280'
    }
  }

  return (
    <Box>
      <Paper sx={{ bgcolor: '#fef3c7', p: 2, mb: 2, borderBottom: 2, borderColor: '#fbbf24' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#92400e' }}>
            <BugReportIcon /> Reportes de Bugs
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Chip label={`Total: ${bugs.length}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
            <Chip label={`Abiertos: ${bugs.filter(b => b.status === 'abierto').length}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
          </Box>
        </Box>
      </Paper>

      <Box sx={{ maxHeight: 450, overflowY: 'auto', p: 2 }}>
        <Grid container spacing={2}>
          {bugs.map(bug => (
            <Grid item xs={12} key={bug.id}>
              <Paper sx={{ p: 2, bgcolor: '#fefce8', border: '1px solid #fde047' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  <Chip label={`#${bug.id}`} size="small" sx={{ bgcolor: 'white', color: '#92400e', fontWeight: 600 }} />
                  <Chip label={bug.status} size="small" sx={{ bgcolor: getStatusColor(bug.status), color: 'white', fontWeight: 600, textTransform: 'uppercase' }} />
                  <Chip label={bug.priority.toUpperCase()} size="small" sx={{ color: getPriorityColor(bug.priority), bgcolor: 'white', fontWeight: 700 }} />
                </Box>
                <Typography variant="subtitle1" fontWeight={500} sx={{ mb: 1 }}>{bug.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Reportado por: <strong>{bug.reporter}</strong>
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
