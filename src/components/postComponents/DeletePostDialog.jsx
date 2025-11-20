import React from 'react'
import { Dialog, DialogContent, DialogActions, Typography, Button } from '@mui/material'

export default function DeletePostDialog({ open, onClose, onConfirm, selectedPost }) {
  const postId = selectedPost?.postId || selectedPost?._id
  const previewContent = selectedPost?.content || ''
  const truncatedContent =
    previewContent.length > 100 ? `${previewContent.substring(0, 100)}...` : previewContent

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ pt: 4, pb: 2 }}>
        <Typography variant="h6" gutterBottom>
          ¿Eliminar publicación?
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ¿Estás seguro de que deseas eliminar el post con ID "{postId}"? Esta acción no se puede deshacer.
        </Typography>
        {previewContent && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontStyle: 'italic' }}>
            "{truncatedContent}"
          </Typography>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  )
}

