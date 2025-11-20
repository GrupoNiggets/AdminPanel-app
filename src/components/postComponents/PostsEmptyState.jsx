import React from 'react'
import { Paper, Typography, Button } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import AddIcon from '@mui/icons-material/Add'

export default function PostsEmptyState({ onCreate }) {
  return (
    <Paper
      elevation={0}
      sx={{
        py: 8,
        borderRadius: 3,
        border: '1px dashed',
        borderColor: 'divider',
        textAlign: 'center',
        color: 'text.secondary'
      }}
    >
      <ArticleIcon sx={{ fontSize: 48, color: 'action.active', mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        No hay publicaciones registradas
      </Typography>
      <Typography variant="body2" sx={{ mb: 3 }}>
        Crea tu primera publicación para visualizarla en este panel.
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onCreate}>
        Crear publicación
      </Button>
    </Paper>
  )
}

