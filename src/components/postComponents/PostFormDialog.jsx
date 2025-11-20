import React from 'react'
import { Dialog, DialogContent, DialogActions, Typography, Box, TextField, Button } from '@mui/material'

export default function PostFormDialog({
  open,
  onClose,
  title,
  submitLabel,
  formData,
  setFormData,
  onSubmit
}) {
  const coordinatesArray = formData.coordinates?.coordinates || [0, 0]

  const handleCoordinateChange = (index, value) => {
    const newCoordinates = [...coordinatesArray]
    newCoordinates[index] = parseFloat(value) || 0
    setFormData({
      ...formData,
      coordinates: {
        type: formData.coordinates?.type || 'Point',
        coordinates: newCoordinates
      }
    })
  }

  const isSubmitDisabled = !formData.userId || !formData.content

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent sx={{ pt: 4, pb: 2 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
          {title}
        </Typography>
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
              value={coordinatesArray[0]}
              onChange={(e) => handleCoordinateChange(0, e.target.value)}
              inputProps={{ step: 'any' }}
              helperText="Longitud (X)"
            />
            <TextField
              label="Latitud"
              type="number"
              fullWidth
              required
              value={coordinatesArray[1]}
              onChange={(e) => handleCoordinateChange(1, e.target.value)}
              inputProps={{ step: 'any' }}
              helperText="Latitud (Y)"
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={onSubmit} disabled={isSubmitDisabled}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

