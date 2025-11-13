import React, { useMemo, useState, useEffect } from 'react'
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
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Users() {
  const [query, setQuery] = useState('')
  const [users] = useState([
    { id: 1, name: 'Alejandro Hernández', email: 'alheadmin@radiuserp.com', role: 'admin', premium: 'activo' },
    { id: 2, name: 'Andoni Iriso', email: 'aniradmin@radiuserp.com', role: 'admin', premium: 'activo' },
    { id: 3, name: 'Igor Lizasp', email: 'igliadmin@radiuserp.com', role: 'admin', premium: 'activo' },
    { id: 4, name: 'Gonzalo Luna', email: 'goluadmin@radiuserp.com', role: 'admin', premium: 'inactivo' },
    { id: 5, name: 'Íñigo Ruiz de la Torre', email: 'inruadmin@radiuserp.com', role: 'admin', premium: 'activo' },
    { id: 6, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 7, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 8, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 9, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 10, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 11, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 12, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 13, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 14, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 15, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
    { id: 16, name: 'Luis Gómez', email: 'luis@panel.com', role: 'user', premium: 'activo' },
  ])

  const [ventanaEditar, setVentanaEditar] = useState(false)
  const [editarUser, setEditarUser] = useState(null)

  const [formData, setFormData] = useState({ name: '', email: '', role: 'user', premium: 'activo' })
  
  useEffect(() => {
    if (editarUser) {
      setFormData({
        name: editarUser.name || '',
        email: editarUser.email || '',
        role: editarUser.role || 'user',
        premium: editarUser.premium || 'activo',
      })
    }
  }, [editarUser])

  const handleConfirm = () => {
    console.log('Confirmar edición:', formData)
    setVentanaEditar(false)
  }

  const handleCancel = () => {
    setVentanaEditar(false)
  }

  const ROLE_COLORS = {
    admin: '#d32f2f',
    user: '#2e7d32',
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

  // Conteo simple para "Premium" / no-Premium
  const premiumCounts = useMemo(() => {
    const map = {}
    users.forEach(u => { map[u.premium] = (map[u.premium] || 0) + 1 })
    return Object.entries(map).map(([name, value]) => ({ name, value }))
  }, [users])
  const PREMIUM_COLORS = { activo: '#ce4278ff', inactivo: '#6b5435ff' }

  return (
    <Box
      sx={{
        width: '100%',
        p: 2,
        minHeight: '100vh',          // ocupar viewport completo
        boxSizing: 'border-box',
        overflowY: 'auto',          // scroll interno si hace falta (evita barra externa)
      }}
    >
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
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 6 }}
          />
          {/* botón eliminado de aquí para colocarlo encima de la lista */}
        </Box>
      </Paper>

      {/* Botón Agregar por encima de la lista */}
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant="contained" startIcon={<AddIcon />}>Agregar usuario</Button>
        </Grid>
      </Grid>

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
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{users.filter(u => u.premium === 'activo').length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">Inactivos</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{users.filter(u => u.premium !== 'activo').length}</Typography>
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
                  <TableCell><strong>Premium</strong></TableCell>
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
                        label={u.premium === 'activo' ? 'Activo' : 'Inactivo'}
                        size="small"
                        color={u.premium === 'activo' ? 'success' : 'default'}
                      />
                    </TableCell>

                    <TableCell align="center">
                      <IconButton name="Editar" size="small" color="primary" onClick={() => { setEditarUser(u); setVentanaEditar(true) }}><EditIcon /></IconButton>
                      <IconButton name="Borrar" size="small" color="error"><DeleteIcon /></IconButton>
                      <IconButton name="Perfil" size="small" color="disabled"><AccountCircleIcon /></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* Right: two pie charts side-by-side */}
        <Grid item xs={12} ml={35} md={4}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Roles</Typography>
                <Box sx={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={roleCounts}
                        dataKey="value"
                        nameKey="name"
                        outerRadius="70%"
                        innerRadius="35%"
                        paddingAngle={4}
                      >
                        {roleCounts.map((entry, index) => {
                          const color = ROLE_COLORS[entry.name] || ROLE_COLORS.default
                          return <Cell key={`cell-${index}`} fill={color} />
                        })}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Leyenda</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {roleCounts.map(r => (
                      <Chip key={r.name} label={`${r.name} — ${r.value}`} size="small" sx={{ bgcolor: ROLE_COLORS[r.name] || ROLE_COLORS.default, color: '#fff' }} />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={6}>
              <Paper sx={{ p: 2, height: '100%' }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 700 }}>Usuarios Premium</Typography>
                <Box sx={{ width: '100%', height: 220 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={premiumCounts}
                        dataKey="value"
                        nameKey="name"
                        outerRadius="70%"
                        innerRadius="35%"
                        paddingAngle={4}
                      >
                        {premiumCounts.map((entry, index) => (
                          <Cell key={`prem-${index}`} fill={PREMIUM_COLORS[entry.name] || '#9e9e9e'} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {/* se muestra la misma leyenda que "Distribución por rol" mediante chips abajo */}
                    </PieChart>
                  </ResponsiveContainer>
                </Box>

                {/* Leyenda igual a la de "Distribución por rol" */}
                <Box sx={{ mt: 1 }}>
                  <Typography variant="caption" color="text.secondary">Leyenda</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                    {premiumCounts.map(r => (
                      <Chip key={`legend-${r.name}`} label={`${r.name} — ${r.value}`} size="small" sx={{ bgcolor: PREMIUM_COLORS[r.name] || PREMIUM_COLORS.default, color: '#fff' }} />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog open={ventanaEditar} onClose={() => setVentanaEditar(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ position: 'relative', pt: 4, pb: 0, bgcolor: '#fff' }}>
          <Button
            size="small"
            onClick={() => setVentanaEditar(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            Atrás
          </Button>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Usuario"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              fullWidth
              variant="outlined"
              size="small"
            />

            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              fullWidth
              variant="outlined"
              size="small"
            />

            <FormControl fullWidth size="small">
              <InputLabel id="role-select-label">Rol</InputLabel>
              <Select
                labelId="role-select-label"
                label="Rol"
                value={formData.role}
                onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              >
                <MenuItem value="admin">Administrador</MenuItem>
                <MenuItem value="user">Usuario</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel id="premium-select-label">Premium</InputLabel>
              <Select
                labelId="premium-select-label"
                label="Premium"
                value={formData.premium}
                onChange={(e) => setFormData(prev => ({ ...prev, premium: e.target.value }))}
              >
                <MenuItem value="activo">Activo</MenuItem>
                <MenuItem value="inactivo">Inactivo</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={handleCancel}>CANCELAR</Button>
          <Button variant="contained" onClick={handleConfirm}>CONFIRMAR</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}