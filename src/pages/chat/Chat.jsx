import React, { useEffect, useRef, useState } from 'react'
import { Box, TextField, Button, Paper, Typography, Chip, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import EditIcon from '@mui/icons-material/Edit'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import './Chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [newMsg, setNewMsg] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingContent, setEditingContent] = useState('')
  const [error, setError] = useState(null)
  const bottomRef = useRef(null)

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })

  // Cargar mensajes y usuarios
  const loadMessages = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/chat?_=${Date.now()}`, {
        headers: { 'Cache-Control': 'no-cache' }
      })
      const data = await res.json()
      console.log('Mensajes recibidos:', data.data)
      if (res.ok) {
        // Ordenar por createdAt para mantener orden cronológico
        const sorted = (data.data ?? []).sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        )
        setMessages(sorted)
      }
      setTimeout(scrollToBottom, 50)
    } catch (err) { console.error(err) }
  }

  const loadUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/v1/users')
      const data = await res.json()
      if (res.ok) {
        const usersList = data.data ?? []
        console.log('Usuarios cargados:', usersList) // Debug
        setUsers(usersList)
        setCurrentUser(usersList[0] || null) // por defecto primer usuario
      }
    } catch (err) { 
      console.error('Error al cargar usuarios:', err) 
    }
  }

  useEffect(() => {
    loadMessages()
    loadUsers()
  }, [])

  // Crear mensaje
  const sendMessage = async () => {
    if (!newMsg.trim()) {
      setError('Escribe un mensaje')
      return
    }
    
    if (!currentUser) {
      setError('Selecciona un usuario')
      return
    }
    
    setError(null)

    const payload = {
      content: newMsg,
      userId: String(currentUser.id),  // Convertir a string
      messageId: crypto.randomUUID(),
      meta: {}
    }

    console.log('========== PAYLOAD ENVIADO ==========')
    console.log(JSON.stringify(payload, null, 2))
    console.log('====================================')

    try {
      const res = await fetch('http://localhost:3000/api/v1/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      const data = await res.json()
      
      console.log('========== RESPUESTA DEL SERVIDOR ==========')
      console.log('Status:', res.status)
      console.log('Success:', data.success)
      console.log('Message:', data.message)
      console.log('Code:', data.code)
      console.log('Details:', data.details)
      console.log('Data completo:', JSON.stringify(data, null, 2))
      console.log('============================================')
      
      if (!res.ok) {
        const errorMsg = data.details ? `${data.message}: ${data.details.join(', ')}` : data.message
        setError(errorMsg || 'Error al enviar el mensaje')
        return
      }

      setMessages(prev => [...prev, data.data])
      setNewMsg('')
      setTimeout(scrollToBottom, 50)
    } catch (err) { 
      console.error('Error al enviar mensaje:', err)
      setError('Error de conexión al servidor')
    }
  }

  // Guardar edición
  const saveEdit = async (msgId) => {
    if (!editingContent.trim()) return

    try {
      const res = await fetch(`http://localhost:3000/api/v1/chat/${msgId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editingContent })
      })
      const data = await res.json()
      if (!res.ok) return console.error('Error backend:', data)

      // Mantener la posición original, solo actualizar el contenido
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, content: editingContent } : m))
      setEditingId(null)
      setEditingContent('')
    } catch (err) { console.error(err) }
  }

  // Borrar mensaje
  const deleteMessage = async (msgId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/chat/${msgId}`, {
        method: 'DELETE'
      })
      if (!res.ok) {
        const data = await res.json()
        return console.error('Error backend:', data)
      }
      setMessages(prev => prev.filter(m => m.id !== msgId))
    } catch (err) { console.error(err) }
  }

  return (
    <Paper elevation={0} sx={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* ERROR ALERT */}
      {error && (
        <Box sx={{ bgcolor: '#fee2e2', color: '#991b1b', p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2">{error}</Typography>
          <Button size="small" onClick={() => setError(null)} sx={{ color: '#991b1b', minWidth: 'auto' }}>✕</Button>
        </Box>
      )}
      
      {/* HEADER */}
      <Box sx={{ bgcolor: '#000', color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6">Chat Empresarial</Typography>

        {/* Selector de usuario activo */}
        <FormControl size="small" className="user-selector">
          <InputLabel sx={{ color: 'white' }}>Usuario</InputLabel>
          <Select
            value={currentUser?.id || ''}
            onChange={e => setCurrentUser(users.find(u => u.id === e.target.value))}
            sx={{ 
              color: 'white', 
              minWidth: 180,
              '.MuiOutlinedInput-notchedOutline': { border: 'none' },
              '.MuiSvgIcon-root': { color: 'white' }
            }}
          >
            {users.map(u => (
              <MenuItem key={u.id} value={u.id}>{u.name} ({u.role})</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {/* MENSAJES */}
      <Box sx={{ flex: 1, overflowY: 'auto', p: 3 }}>
        {messages.map(msg => {
          // Buscar el usuario correspondiente de múltiples formas
          const msgUser = msg.user || 
            users.find(u => String(u.id) === String(msg.userId)) ||
            users.find(u => u._id === msg.userId) ||
            users.find(u => u.id === msg.userId)
          
          console.log('Mensaje userId:', msg.userId, 'Usuario encontrado:', msgUser)
          
          return (
            <Paper key={msg.id} sx={{ p: 1.5, mb: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {msgUser?.name || 'Usuario desconocido'}
                  </Typography>
                  {(() => {
                    const roleLabel = msgUser?.role || 'N/A'
                    const rl = String(roleLabel).toLowerCase()
                    const baseSx = { fontSize: 11, height: 20 }
                    let chipSx = baseSx

                    if (rl === 'admin') {
                      chipSx = { ...baseSx, bgcolor: '#ef4444', color: '#fff' } // rojo
                    } else if (rl === 'mod' || rl === 'moderator') {
                      chipSx = { ...baseSx, bgcolor: '#3b82f6', color: '#fff' } // azul
                    } else {
                      chipSx = { ...baseSx, bgcolor: '#6b7280', color: '#fff' } // gris
                    }

                    return (
                      <Chip
                        label={roleLabel}
                        size="small"
                        sx={chipSx}
                      />
                    )
                  })()}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : ''}
                </Typography>
              </Box>

            {/* EDICIÓN */}
            {editingId === msg.id ? (
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  value={editingContent}
                  onChange={e => setEditingContent(e.target.value)}
                  className="edit-input"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '8px',
                    }
                  }}
                />
                <IconButton 
                  className="save-button" 
                  onClick={() => saveEdit(msg.id)}
                  sx={{ 
                    bgcolor: '#10b981',
                    '&:hover': { bgcolor: '#059669' }
                  }}
                >
                  <SaveIcon fontSize="small" sx={{ color: 'white' }} />
                </IconButton>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                <Typography>{msg.content}</Typography>
                {String(msg.userId) === String(currentUser?.id) && (
                  <Box>
                    <IconButton size="small" onClick={() => { setEditingId(msg.id); setEditingContent(msg.content) }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => deleteMessage(msg.id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
            )}
          </Paper>
        )})}
        <div ref={bottomRef} />
      </Box>

      {/* INPUT */}
      <Box sx={{ p: 3, borderTop: '2px solid #eee' }}>
        <TextField
          fullWidth
          size="small"
          value={newMsg}
          onChange={e => setNewMsg(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={sendMessage} endIcon={<SendIcon />}>
          Enviar
        </Button>
      </Box>
    </Paper>
  )
}
