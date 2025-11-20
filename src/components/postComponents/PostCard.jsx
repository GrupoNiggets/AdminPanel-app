import React from 'react'
import {
  Card,
  CardHeader,
  Avatar,
  Chip,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  CardActions,
  Button
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import PersonIcon from '@mui/icons-material/Person'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'

export default function PostCard({ post, onEdit, onDelete }) {
  const lat = post.coordinates?.coordinates?.[1]
  const lng = post.coordinates?.coordinates?.[0]

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        transition: 'all 0.2s ease',
        '&:hover': { borderColor: 'primary.main', boxShadow: 6 }
      }}
    >
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.light', color: 'primary.dark', fontWeight: 600 }}>
            {post.userId ? post.userId?.[0]?.toUpperCase() : 'U'}
          </Avatar>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {post.userId || 'Usuario desconocido'}
            </Typography>
            <Chip size="small" label={post.postId || 'ID'} variant="outlined" />
          </Box>
        }
        subheader={
          post.createdAt
            ? new Date(post.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })
            : 'Sin fecha'
        }
        sx={{ pb: 0 }}
      />
      <CardContent sx={{ flex: 1, pt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 64 }}>
          {post.content || 'Sin contenido'}
        </Typography>
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <PersonIcon fontSize="small" color="action" />
            <Typography variant="caption">Usuario #{post.userId || 'N/D'}</Typography>
          </Box>
          {lat !== undefined && lng !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <LocationOnIcon fontSize="small" color="action" />
              <Typography variant="caption">
                {lat.toFixed(4)}, {lng.toFixed(4)}
              </Typography>
            </Box>
          )}
          {post.createdAt && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="caption">
                Registrado el{' '}
                {new Date(post.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
      <Divider sx={{ mt: 'auto' }} />
      <CardActions sx={{ justifyContent: 'space-between', px: 3, pb: 3 }}>
        <Button
          size="small"
          startIcon={<EditIcon />}
          onClick={() => onEdit(post)}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Editar
        </Button>
        <Button
          size="small"
          color="error"
          startIcon={<DeleteIcon />}
          onClick={() => onDelete(post)}
          sx={{ textTransform: 'none', fontWeight: 600 }}
        >
          Eliminar
        </Button>
      </CardActions>
    </Card>
  )
}

