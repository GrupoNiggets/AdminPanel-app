import React, { useState } from 'react'
import { Box, TextField, Button, Paper, Typography, Avatar, Chip } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import ChatIcon from '@mui/icons-material/Chat'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Admin', text: 'Bienvenido al chat', time: '10:30' },
    { id: 2, user: 'Usuario1', text: 'Hola, ¿cómo están?', time: '10:32' },
    { id: 3, user: 'Usuario2', text: 'Todo bien, gracias', time: '10:35' }
  ])
  const [newMsg, setNewMsg] = useState('')

  const sendMessage = () => {
    if (!newMsg.trim()) return
    const msg = {
      id: messages.length + 1,
      user: 'Tú',
      text: newMsg,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, msg])
    setNewMsg('')
  }

  return (
    <Paper elevation={0} sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', bgcolor: '#ffffff', m: 0, p: 0 }}>
      <Box sx={{ bgcolor: '#000000', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant={{ xs: 'subtitle1', md: 'h6' }} sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 600 }}>
          <ChatIcon sx={{ fontSize: { xs: 20, md: 24 } }} /> Chat Empresarial
        </Typography>
        <Chip label={`${messages.length} mensajes`} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }} />
      </Box>
      
            <Box sx={{ flex: 1, overflowY: 'auto', p: 3, bgcolor: '#ffffff', m: 2, borderRadius: 2 }}>
        {messages.map(msg => (
          <Paper key={msg.id} elevation={1} sx={{ p: 1.5, mb: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography variant="subtitle2" color="primary" fontWeight="bold">{msg.user}</Typography>
              <Typography variant="caption" color="text.secondary">{msg.time}</Typography>
            </Box>
            <Typography variant="body2">{msg.text}</Typography>
          </Paper>
        ))}
      </Box>

            <Box sx={{ p: 3, bgcolor: '#ffffff', borderTop: '2px solid #e0e0e0', m: 2, mb: 0, borderRadius: '8px 8px 0 0' }}>
        <TextField
          fullWidth
          size="small"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <Button variant="contained" onClick={sendMessage} endIcon={<SendIcon />}>Enviar</Button>
      </Box>
    </Paper>
  )
}
