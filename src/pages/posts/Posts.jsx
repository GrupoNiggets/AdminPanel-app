import React, { useState, useEffect } from 'react'
import { Box, Paper, Typography, Button, Card, CardContent, CardActions, Chip, Grid, Dialog, DialogContent, DialogActions, TextField, Alert, Snackbar } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { getPosts, createPost, updatePost, deletePost } from './data'

export default function Posts() {
  const [posts, setPosts] = useState([])
  const [openCreateDialog, setOpenCreateDialog] = useState(false)
  const [openEditDialog, setOpenEditDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    content: '',
    coordinates: {
      type: 'Point',
      coordinates: [0, 0] // [longitud, latitud]
    }
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  useEffect(() => {
    loadPosts()
  }, [])

  const loadPosts = () => {
    getPosts().then(data => {
      if (data) {
        setPosts(data)
      }
    })
  }

  const handleOpenCreate = () => {
    setFormData({
      userId: '',
      content: '',
      coordinates: {
        type: 'Point',
        coordinates: [0, 0] // [longitude, latitude]
      }
    })
    setOpenCreateDialog(true)
  }

  const handleOpenEdit = (post) => {
    setSelectedPost(post)
    setFormData({
      userId: post.userId || '',
      content: post.content || '',
      coordinates: post.coordinates || {
        type: 'Point',
        coordinates: [0, 0]
      }
    })
    setOpenEditDialog(true)
  }

  const handleOpenDelete = (post) => {
    setSelectedPost(post)
    setOpenDeleteDialog(true)
  }

  const handleCreate = () => {
    createPost(formData).then(result => {
      if (result) {
        setSnackbar({ open: true, message: 'Post creado exitosamente', severity: 'success' })
        setOpenCreateDialog(false)
        loadPosts()
      } else {
        setSnackbar({ open: true, message: 'Error al crear el post', severity: 'error' })
      }
    })
  }

  const handleUpdate = () => {
    if (selectedPost) {
      updatePost(selectedPost.postId || selectedPost._id, formData).then(result => {
        if (result) {
          setSnackbar({ open: true, message: 'Post actualizado exitosamente', severity: 'success' })
          setOpenEditDialog(false)
          setSelectedPost(null)
          loadPosts()
        } else {
          setSnackbar({ open: true, message: 'Error al actualizar el post', severity: 'error' })
        }
      })
    }
  }

  const handleDelete = () => {
    if (selectedPost) {
      deletePost(selectedPost.postId || selectedPost._id).then(result => {
        if (result !== null) {
          setSnackbar({ open: true, message: 'Post eliminado exitosamente', severity: 'success' })
          setOpenDeleteDialog(false)
          setSelectedPost(null)
          loadPosts()
        } else {
          setSnackbar({ open: true, message: 'Error al eliminar el post', severity: 'error' })
        }
      })
    }
  }

  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      <Paper elevation={0} sx={{ bgcolor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#000000', fontWeight: 700 }}>
          <ArticleIcon sx={{ color: '#000000' }} /> Gestión de Contenido
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreate}>Nueva publicación</Button>
      </Paper>

      <Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} lg={4} key={post.postId || post._id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#eff6ff', border: '1px solid #bfdbfe', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent sx={{ flex: 1 }}>
                  <Chip label={post.postId || 'ID'} size="small" color="primary" sx={{ mb: 1, fontWeight: 600 }} />
                  <Typography variant="body1" color="#1e3a8a" gutterBottom sx={{ mb: 2, wordBreak: 'break-word' }}>
                    {post.content || 'Sin contenido'}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.secondary' }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PersonIcon fontSize="small" /> Usuario: {post.userId}
                    </Typography>
                    {post.coordinates && post.coordinates.coordinates && (
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <LocationOnIcon fontSize="small" /> 
                        {post.coordinates.coordinates[1].toFixed(4)}, {post.coordinates.coordinates[0].toFixed(4)}
                      </Typography>
                    )}
                    {post.createdAt && (
                      <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <CalendarTodayIcon fontSize="small" /> 
                        {new Date(post.createdAt).toLocaleDateString('es-ES', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </Typography>
                    )}
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<EditIcon />} onClick={() => handleOpenEdit(post)} sx={{ color: '#3730a3', bgcolor: '#e0e7ff', '&:hover': { bgcolor: '#c7d2fe' } }}>Editar</Button>
                  <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleOpenDelete(post)} sx={{ color: '#991b1b', bgcolor: '#fee2e2', '&:hover': { bgcolor: '#fecaca' } }}>Eliminar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ pt: 4, pb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>Nueva Publicación</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="ID de Usuario"
              fullWidth
              required
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              helperText="ID del usuario que crea el post"
            />
            <TextField
              label="Contenido"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              helperText="Contenido del post"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Longitud"
                type="number"
                fullWidth
                required
                value={formData.coordinates.coordinates[0]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates,
                    coordinates: [parseFloat(e.target.value) || 0, formData.coordinates.coordinates[1]]
                  }
                })}
                inputProps={{ step: 'any' }}
                helperText="Longitud (X)"
              />
              <TextField
                label="Latitud"
                type="number"
                fullWidth
                required
                value={formData.coordinates.coordinates[1]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates,
                    coordinates: [formData.coordinates.coordinates[0], parseFloat(e.target.value) || 0]
                  }
                })}
                inputProps={{ step: 'any' }}
                helperText="Latitud (Y)"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={() => setOpenCreateDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleCreate}
            disabled={!formData.userId || !formData.content}
          >
            Crear
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para editar post */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)} maxWidth="sm" fullWidth>
        <DialogContent sx={{ pt: 4, pb: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>Editar Publicación</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="ID de Usuario"
              fullWidth
              required
              value={formData.userId}
              onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
              helperText="ID del usuario que crea el post"
            />
            <TextField
              label="Contenido"
              fullWidth
              required
              multiline
              rows={4}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              helperText="Contenido del post"
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                label="Longitud"
                type="number"
                fullWidth
                required
                value={formData.coordinates.coordinates[0]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates,
                    coordinates: [parseFloat(e.target.value) || 0, formData.coordinates.coordinates[1]]
                  }
                })}
                inputProps={{ step: 'any' }}
                helperText="Longitud (X)"
              />
              <TextField
                label="Latitud"
                type="number"
                fullWidth
                required
                value={formData.coordinates.coordinates[1]}
                onChange={(e) => setFormData({
                  ...formData,
                  coordinates: {
                    ...formData.coordinates,
                    coordinates: [formData.coordinates.coordinates[0], parseFloat(e.target.value) || 0]
                  }
                })}
                inputProps={{ step: 'any' }}
                helperText="Latitud (Y)"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={() => setOpenEditDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={handleUpdate}
            disabled={!formData.userId || !formData.content}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para confirmar eliminación */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)} maxWidth="xs" fullWidth>
        <DialogContent sx={{ pt: 4, pb: 2 }}>
          <Typography variant="h6" gutterBottom>¿Eliminar publicación?</Typography>
          <Typography variant="body2" color="text.secondary">
            ¿Estás seguro de que deseas eliminar el post con ID "{selectedPost?.postId || selectedPost?._id}"? Esta acción no se puede deshacer.
          </Typography>
          {selectedPost?.content && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
              "{selectedPost.content.substring(0, 100)}{selectedPost.content.length > 100 ? '...' : ''}"
            </Typography>
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button variant="outlined" onClick={() => setOpenDeleteDialog(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
