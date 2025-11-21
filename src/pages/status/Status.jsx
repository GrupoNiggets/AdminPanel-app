import React, { useState, useEffect } from 'react'
import { Box, Button, Chip, Paper, Typography } from '@mui/material'
import BarChartIcon from '@mui/icons-material/BarChart'
import './Status.css'

export default function Status() {
  const [time, setTime] = useState("—")
  const [apiStatus, setApiStatus] = useState('desconocido')
  const [pingMessage, setPingMessage] = useState('')
  const [history, setHistory] = useState(
    Array(10).fill({ ok: null, timestamp: "", errorMessage: "" })
  )

  const errorMessages = {
    500: "500 Internal Server Error",
    404: "404 Not Found",
    403: "403 Forbidden",
    401: "401 Unauthorized",
    400: "400 Bad Request",
  }

  // Ping normal
  async function sendPing() {
    const timestamp = new Date().toLocaleTimeString('es-ES')
    setTime(timestamp)

    try {
      const res = await fetch(import.meta.env.VITE_API_URL + "/status/ping")
      const ok = res.ok
      let errorMessage = ""
      if (!ok) errorMessage = errorMessages[res.status] || "motivo desconocido"

      setHistory(prev => [
        { ok, timestamp, errorMessage },
        ...prev.slice(0, 9)
      ])
      setApiStatus(ok ? "activo" : "error")
      setPingMessage(ok ? "API funcionando ✅" : "Ping fallido ❌")
    } catch {
      setHistory(prev => [
        { ok: false, timestamp, errorMessage: "motivo desconocido" },
        ...prev.slice(0, 9)
      ])
      setApiStatus("error")
      setPingMessage("Ping fallido ❌")
    }

    setTimeout(() => setPingMessage(''), 3000)
  }

  // Errores simulados
  async function triggerError(code) {
    const timestamp = new Date().toLocaleTimeString('es-ES')
    setTime(timestamp)

    const ok = false
    const errorMessage = errorMessages[code]

    setHistory(prev => [
      { ok, timestamp, errorMessage },
      ...prev.slice(0, 9)
    ])

    setApiStatus("error")
    setPingMessage("Ping fallido ❌")

    setTimeout(() => setPingMessage(''), 3000)
  }

  // Ping automático cada 5 minutos
  useEffect(() => {
    const interval = setInterval(sendPing, 5 * 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Paper className="status-container" elevation={0}>
      <Box className="status-header">
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BarChartIcon /> Monitoreo del Sistema
        </Typography>
        <Typography className="status-time">Actualizado: {time}</Typography>
      </Box>

      <Box sx={{ my: 2, pl: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
        <Button variant="contained" color="success" onClick={sendPing}>
          Comprobar Ping
        </Button>

        <Button variant="contained" color="warning" onClick={() => triggerError(404)}>
          Error 404 (prueba)
        </Button>

        <Button variant="contained" color="secondary" onClick={() => triggerError(403)}>
          Error 403 (prueba)
        </Button>

        <Button variant="contained" color="error" onClick={() => triggerError(500)}>
          Error 500 (prueba)
        </Button>

        {pingMessage && (
          <Chip
            label={pingMessage}
            color={pingMessage.includes('✅') ? 'success' : 'error'}
            size="small"
          />
        )}
      </Box>

      <Box sx={{ pl: 2, mb: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>Historial de Pings</Typography>
        <Box className="ping-history">
          {history.map((h, i) => (
            <Box
              key={i}
              className="ping-item"
              style={{ background: h.ok === null ? '#e0e0e0' : h.ok ? '#4caf50' : '#f44336' }}
              title={
                h.ok === null
                  ? "Sin ping"
                  : `${h.timestamp}: ${h.ok ? "API funcionando correctamente" : h.errorMessage}`
              }
            />
          ))}
        </Box>
      </Box>
    </Paper>
  )
}
