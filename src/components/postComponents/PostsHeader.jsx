import React from 'react'
import { Paper, Box, Typography, Button } from '@mui/material'
import ArticleIcon from '@mui/icons-material/Article'
import AddIcon from '@mui/icons-material/Add'

export default function PostsHeader({ totalPosts = 0, onCreate }) {
  return (
    <Paper
      elevation={0}
      sx={{
        px: 4,
        py: 3,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 3,
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', md: 'center' }
      }}
    >
      <Box>
        <Typography variant="overline" sx={{ color: 'text.secondary', letterSpacing: 1 }}>
          Contenido
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ArticleIcon color="primary" />
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Panel de publicaciones
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Administra y da seguimiento a las publicaciones creadas por los usuarios.
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="caption" color="text.secondary">
            Total de publicaciones
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {totalPosts}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onCreate}
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
        >
          Nueva publicación
        </Button>
      </Box>
    </Paper>
  )
}

