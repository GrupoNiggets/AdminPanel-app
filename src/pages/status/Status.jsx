import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography, Card, CardContent, Grid, List, ListItem, ListItemText, Chip, Button } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export default function Status() {
  const [time, setTime] = useState(new Date().toLocaleTimeString('es-ES'))
  const [apiStatus, setApiStatus] = useState('desconocido')
  const [pingMessage, setPingMessage] = useState('')

  useEffect(() => {
    const clock = setInterval(() => {
      setTime(new Date().toLocaleTimeString('es-ES'))
    }, 1000)
    return () => clearInterval(clock)
  }, [])

  // función que hace el ping
async function sendPing() {
  try {
    const res = await fetch(import.meta.env.VITE_API_URL + "/api/v1/status/")
    if (res.ok) {
      setApiStatus('activo')
      setPingMessage('API funcionando ✅')
      setTimeout(() => setPingMessage(''), 3000)
    } else {
      setApiStatus('error')
      setPingMessage('Ping fallido ❌')
      setTimeout(() => setPingMessage(''), 3000)
    }
  } catch {
    setApiStatus('error')
    setPingMessage('Ping fallido ❌')
    setTimeout(() => setPingMessage(''), 3000)
  }
}


  // ping automático cada 5 minutos
  useEffect(() => {
    const interval = setInterval(() => {
      sendPing()
    }, 5*60000) 
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: 'CPU', value: '23%', status: 'normal', icon: <MemoryIcon sx={{ fontSize: 40 }} /> },
    { label: 'Memoria', value: '1.8GB / 8GB', status: 'normal', icon: <MemoryIcon sx={{ fontSize: 40 }} /> },
    { label: 'Disco', value: '45GB / 256GB', status: 'normal', icon: <StorageIcon sx={{ fontSize: 40 }} /> },
    { label: 'Red', value: '125 Mbps', status: 'bueno', icon: <NetworkCheckIcon sx={{ fontSize: 40 }} /> }
  ]

  const services = [
    { name: 'Base de datos', status: apiStatus, uptime: '99.9%' },
    { name: 'API REST', status: apiStatus, uptime: '99.7%' },
    { name: 'Cache Redis', status: 'activo', uptime: '100%' },
    { name: 'CDN', status: 'activo', uptime: '99.5%' }
  ]

  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      <Paper elevation={0} sx={{ bgcolor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#000000', fontWeight: 700 }}>
          <BarChartIcon sx={{ color: '#000000' }} /> Monitoreo del Sistema
        </Typography>
        <Chip label={`Actualizado: ${time}`} size="small" sx={{ bgcolor: 'white', color: '#4d7c0f' }} />
      </Paper>

      <Box sx={{ my: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button variant="contained" color="success" onClick={sendPing}>Comprobar Ping</Button>
        {pingMessage && <Chip label={pingMessage} color={pingMessage.includes('✅') ? 'success' : 'error'} size="small" />}
      </Box>

      <Grid container spacing={3}>
        {metrics.map((metric, idx) => (
          <Grid item xs={6} sm={6} md={3} key={idx}>
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

      <Paper sx={{ p: 2, mt: 2 }}>
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
  )
}
