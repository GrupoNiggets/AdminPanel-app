import React, { useState } from 'react'
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar, Chip, IconButton } from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Users() {
  const [users] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@panel.com', role: 'Administrador', status: 'activo' },
    { id: 2, name: 'Juan Pérez', email: 'juan@panel.com', role: 'Editor', status: 'activo' },
    { id: 3, name: 'María García', email: 'maria@panel.com', role: 'Moderador', status: 'activo' },
    { id: 4, name: 'Carlos López', email: 'carlos@panel.com', role: 'Usuario', status: 'inactivo' }
  ])

  const getRoleBadge = (role) => {
    const colors = {
      'Administrador': '#dc2626',
      'Editor': '#7c3aed',
      'Moderador': '#2563eb',
      'Usuario': '#059669'
    }
    return colors[role] || '#6b7280'
  }

  return (
    <Box>
      <Paper sx={{ bgcolor: '#dbeafe', p: 2, mb: 2, borderBottom: 2, borderColor: '#0ea5e9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#0c4a6e' }}>
          <PeopleIcon /> Gestión de Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Agregar usuario</Button>
      </Paper>

      <Box sx={{ p: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0f9ff' }}>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Rol</strong></TableCell>
                <TableCell><strong>Estado</strong></TableCell>
                <TableCell align="center"><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: '#0ea5e9', width: 36, height: 36 }}>{user.name.charAt(0)}</Avatar>
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Typography color="text.secondary">{user.email}</Typography></TableCell>
                  <TableCell>
                    <Chip label={user.role} size="small" sx={{ bgcolor: getRoleBadge(user.role), color: 'white', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={user.status === 'activo' ? '✓ Activo' : '○ Inactivo'} 
                      size="small" 
                      color={user.status === 'activo' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <IconButton size="small" color="primary"><EditIcon /></IconButton>
                    <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
