// ...existing code...
import React, { useMemo, useState } from 'react'
import {
  Box,
  Paper,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  Grid,
  TextField,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export default function Users() {
  const [query, setQuery] = useState('')
  const [users] = useState([
    { id: 1, name: 'Admin Principal', email: 'admin@panel.com', role: 'Administrador', status: 'activo' },
    { id: 2, name: 'Juan Pérez', email: 'juan@panel.com', role: 'Editor', status: 'activo' },
    { id: 3, name: 'María García', email: 'maria@panel.com', role: 'Moderador', status: 'activo' },
    { id: 4, name: 'Carlos López', email: 'carlos@panel.com', role: 'Usuario', status: 'inactivo' },
    { id: 5, name: 'Ana Ruiz', email: 'ana@panel.com', role: 'Usuario', status: 'activo' },
    { id: 6, name: 'Luis Gómez', email: 'luis@panel.com', role: 'Editor', status: 'activo' },
  ])

  const ROLE_COLORS = {
    Administrador: '#d32f2f',
    Editor: '#7b1fa2',
    Moderador: '#1976d2',
    Usuario: '#2e7d32',
    default: '#757575',
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      u => u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
    )
  }, [query, users])

  const roleCounts = useMemo(() => {
    const map = {}
    users.forEach(u => { map[u.role] = (map[u.role] || 0) + 1 })
    return Object.entries(map).map(([role, value]) => ({ name: role, value }))
  }, [users])

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Paper elevation={0} sx={{ mb: 2, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <PeopleIcon sx={{ color: '#0b5cff' }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>Administración de Usuarios</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Buscar por nombre, email o rol"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
          />
          <Button variant="contained" startIcon={<AddIcon />}>Agregar usuario</Button>
        </Box>
      </Paper>

      <Grid container spacing={2}>
        {/* Left: Metrics + Table */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2} sx={{ mb: 1 }}>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Total registrados</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{users.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Activos</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{users.filter(u => u.status === 'activo').length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Inactivos</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{users.filter(u => u.status !== 'activo').length}</Typography>
              </Paper>
            </Grid>
          </Grid>

          <TableContainer component={Paper} elevation={2}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f5f7ff' }}>
                  <TableCell><strong>Usuario</strong></TableCell>
                  <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}><strong>Email</strong></TableCell>
                  <TableCell><strong>Rol</strong></TableCell>
                  <TableCell><strong>Estado</strong></TableCell>
                  <TableCell align="center"><strong>Acciones</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filtered.map(u => (
                  <TableRow key={u.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: '#0b5cff', width: 36, height: 36 }}>{u.name.charAt(0)}</Avatar>
                        <Box>
                          <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                          <Typography variant="caption" color="text.secondary">ID: {u.id}</Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Typography color="text.secondary">{u.email}</Typography>
                    </TableCell>

                    <TableCell>
                      <Chip label={u.role} size="small" sx={{ bgcolor: ROLE_COLORS[u.role] || ROLE_COLORS.default, color: '#fff', fontWeight: 600 }} />
                    </TableCell>

                    <TableCell>
                      <Chip
                        label={u.status === 'activo' ? 'Activo' : 'Inactivo'}
                        size="small"
                        color={u.status === 'activo' ? 'success' : 'default'}
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
        </Grid>

        {/* Right: Pie Chart */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Distribución por rol</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={roleCounts}
                    dataKey="value"
                    nameKey="name"
                    outerRadius="80%"
                    innerRadius="45%"
                    paddingAngle={4}
                    label={(entry) => `${entry.name} (${entry.value})`}
                  >
                    {roleCounts.map((entry, index) => {
                      const color = ROLE_COLORS[entry.name] || ROLE_COLORS.default
                      return <Cell key={`cell-${index}`} fill={color} />
                    })}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">Leyenda</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                {roleCounts.map(r => (
                  <Chip key={r.name} label={`${r.name} — ${r.value}`} size="small" sx={{ bgcolor: ROLE_COLORS[r.name] || ROLE_COLORS.default, color: '#fff' }} />
                ))}
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}