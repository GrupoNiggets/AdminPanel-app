import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";

function DeleteUserDialog({ open, onClose, onConfirm, userName }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent
        sx={{ position: "relative", pt: 4, pb: 2, bgcolor: "#fff" }}
      >
        <Button
          size="small"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          Atrás
        </Button>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
            pt: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            ¿Seguro que quiere eliminar este usuario?
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "0.875rem" }}
          >
            Esto no se podrá revertir
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          CANCELAR
        </Button>
        <Button variant="contained" color="error" onClick={onConfirm}>
          CONFIRMAR
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteUserDialog;
