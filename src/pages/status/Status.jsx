import React from 'react'
import { Box, Paper, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Chip } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function Status() {
  const metrics = [
    { label: 'CPU', value: '23%', status: 'normal', icon: <MemoryIcon sx={{fontSize: 40}} /> },
    { label: 'Memoria', value: '1.8GB / 8GB', status: 'normal', icon: <MemoryIcon sx={{fontSize: 40}} /> },
    { label: 'Disco', value: '45GB / 256GB', status: 'normal', icon: <StorageIcon sx={{fontSize: 40}} /> },
    { label: 'Red', value: '125 Mbps', status: 'bueno', icon: <NetworkCheckIcon sx={{fontSize: 40}} /> }
  ]

  const services = [
    { name: 'Base de datos', status: 'activo', uptime: '99.9%' },
    { name: 'API REST', status: 'activo', uptime: '99.7%' },
    { name: 'Cache Redis', status: 'activo', uptime: '100%' },
    { name: 'CDN', status: 'activo', uptime: '99.5%' }
  ]

  return (
    <Box>
      <Paper sx={{ bgcolor: '#d9f99d', p: 2, mb: 2, borderBottom: 2, borderColor: '#84cc16', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#3f6212' }}>
          <BarChartIcon /> Estado del Sistema
        </Typography>
        <Chip label={`Actualizado: ${new Date().toLocaleTimeString('es-ES')}`} size="small" sx={{ bgcolor: 'white', color: '#4d7c0f' }} />
      </Paper>

      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {metrics.map((metric, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <Card sx={{ bgcolor: '#f7fee7', border: '1px solid #d9f99d' }}>
                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box>{metric.icon}</Box>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="caption" color="#65a30d" fontWeight={600} textTransform="uppercase">{metric.label}</Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ my: 0.5 }}>{metric.value}</Typography>
                    <Chip label={metric.status} size="small" color="success" sx={{ fontSize: 11, height: 20 }} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ p: 2 }}>
          <Typography variant="h6" color="#3f6212" gutterBottom>Servicios activos</Typography>
          <List>
            {services.map((service, i) => (
              <ListItem key={i} sx={{ bgcolor: '#f7fee7', border: '1px solid #d9f99d', borderRadius: 1, mb: 1 }}>
                <ListItemText
                  primary={service.name}
                  secondary={`Uptime: ${service.uptime}`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ color: '#65a30d' }}
                />
                <Chip icon={<CheckCircleIcon />} label={service.status} size="small" color="success" sx={{ fontWeight: 600 }} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  )
}
