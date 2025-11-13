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
      'Administrador': '#d32f2f',
      'Editor': '#7b1fa2',
      'Moderador': '#1976d2',
      'Usuario': '#2e7d32'
    }
    return colors[role] || '#757575'
  }

  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      <Paper elevation={0} sx={{ bgcolor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#000000', fontWeight: 700 }}>
          <PeopleIcon sx={{ color: '#000000' }} /> Administración de Usuarios
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Agregar usuario</Button>
      </Paper>

      <Box>
      <TableContainer component={Paper} elevation={2} sx={{ overflowX: 'auto', borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f0f9ff' }}>
                <TableCell sx={{ whiteSpace: 'nowrap' }}><strong>Nombre</strong></TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap', display: { xs: 'none', sm: 'table-cell' } }}><strong>Email</strong></TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}><strong>Rol</strong></TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}><strong>Estado</strong></TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id} sx={{ '&:hover': { bgcolor: 'grey.50' } }}>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: '#000000', width: { xs: 32, md: 36 }, height: { xs: 32, md: 36 } }}>{user.name.charAt(0)}</Avatar>
                      <Typography sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}><Typography color="text.secondary">{user.email}</Typography></TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Chip label={user.role} size="small" sx={{ bgcolor: getRoleBadge(user.role), color: 'white', fontWeight: 600 }} />
                  </TableCell>
                  <TableCell sx={{ whiteSpace: 'nowrap' }}>
                    <Chip 
                      label={user.status === 'activo' ? '✓ Activo' : '○ Inactivo'} 
                      size="small" 
                      color={user.status === 'activo' ? 'success' : 'default'}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
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
