import React, { useState } from 'react'
import { Box, Paper, Typography, Button, Card, CardContent, CardActions, Chip, Grid } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import PersonIcon from '@mui/icons-material/Person'

export default function Posts() {
  const [posts] = useState([
    { id: 1, title: 'Bienvenido a AdminPanel', author: 'Admin', date: '2025-11-10', views: 234, category: 'Noticias' },
    { id: 2, title: 'Nuevas funcionalidades', author: 'Desarrollador', date: '2025-11-12', views: 156, category: 'Actualizaciones' },
    { id: 3, title: 'Guía de inicio rápido', author: 'Soporte', date: '2025-11-13', views: 89, category: 'Tutoriales' }
  ])

  return (
    <Box sx={{ width: '100%', m: 0, p: 0 }}>
      <Paper elevation={0} sx={{ bgcolor: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: '#000000', fontWeight: 700 }}>
          <ArticleIcon sx={{ color: '#000000' }} /> Gestión de Contenido
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>Nueva publicación</Button>
      </Paper>

      <Box>
              <Grid container spacing={3} sx={{ mb: 4 }}>
          {posts.map(post => (
            <Grid item xs={12} sm={6} lg={4} key={post.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#eff6ff', border: '1px solid #bfdbfe', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent sx={{ flex: 1 }}>
                  <Chip label={post.category} size="small" color="primary" sx={{ mb: 1, fontWeight: 600 }} />
                  <Typography variant="h6" color="#1e3a8a" gutterBottom>{post.title}</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, color: 'text.secondary' }}>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PersonIcon fontSize="small" /> {post.author}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon fontSize="small" /> {post.date}
                    </Typography>
                    <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <VisibilityIcon fontSize="small" /> {post.views} vistas
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Button size="small" startIcon={<EditIcon />} sx={{ color: '#3730a3', bgcolor: '#e0e7ff', '&:hover': { bgcolor: '#c7d2fe' } }}>Editar</Button>
                  <Button size="small" startIcon={<DeleteIcon />} sx={{ color: '#991b1b', bgcolor: '#fee2e2', '&:hover': { bgcolor: '#fecaca' } }}>Eliminar</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  )
}
