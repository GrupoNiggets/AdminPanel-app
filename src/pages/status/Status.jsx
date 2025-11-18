import React, { useState, useEffect } from 'react'
import { Box, Button, Chip, Paper, Typography, Grid } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import MemoryIcon from '@mui/icons-material/Memory'
import StorageIcon from '@mui/icons-material/Storage'
import NetworkCheckIcon from '@mui/icons-material/NetworkCheck'
import './Status.css'

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

  useEffect(() => {
    const interval = setInterval(() => {
      sendPing()
    }, 5 * 60000)
    return () => clearInterval(interval)
  }, [])

  const metrics = [
    { label: 'CPU', value: '23%', status: 'normal', icon: <MemoryIcon className="metric-icon" /> },
    { label: 'Memoria', value: '1.8GB / 8GB', status: 'normal', icon: <MemoryIcon className="metric-icon" /> },
    { label: 'Disco', value: '45GB / 256GB', status: 'normal', icon: <StorageIcon className="metric-icon" /> },
    { label: 'Red', value: '125 Mbps', status: 'bueno', icon: <NetworkCheckIcon className="metric-icon" /> }
  ]

  const services = [
    { name: 'Base de datos', status: apiStatus, uptime: '99.9%' },
    { name: 'API REST', status: apiStatus, uptime: '99.7%' },
    { name: 'Cache Redis', status: 'activo', uptime: '100%' },
    { name: 'CDN', status: 'activo', uptime: '99.5%' }
  ]

  return (
    <Paper className="status-container" elevation={0}>
      
      {/* HEADER */}
      <Box className="status-header">
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BarChartIcon /> Monitoreo del Sistema
        </Typography>
        <Typography className="status-time">Actualizado: {time}</Typography>
      </Box>

      {/* BOTÓN DE PING */}
      <Box sx={{ my: 2, pl: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
        <Button variant="contained" color="success" onClick={sendPing}>
          Comprobar Ping
        </Button>
        {pingMessage && (
          <Chip
            label={pingMessage}
            color={pingMessage.includes('✅') ? 'success' : 'error'}
            size="small"
          />
        )}
      </Box>

      {/* METRICS GRID */}
      <Grid container spacing={2} sx={{ pl: 2 }}>
        {metrics.map((m, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Box className="metric-card">
              {m.icon}
              <Box className="metric-info">
                <Typography className="metric-label">{m.label}</Typography>
                <Typography className="metric-value">{m.value}</Typography>
                <Typography className="metric-status" data-status={m.status}>
                  {m.status}
                </Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* SERVICES */}
      <Box className="services-section">
        <Typography variant="h6" sx={{ mb: 1 }}>Servicios activos</Typography>

        <Box className="services-list">
          {services.map((service, i) => (
            <Box className="service-item" key={i}>
              <Box>
                <Typography className="service-name">{service.name}</Typography>
                <Typography className="service-uptime">Uptime: {service.uptime}</Typography>
              </Box>
              <Typography className="service-status">{service.status}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

    </Paper>
  )
}

