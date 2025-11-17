import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function CreateUserDialog({ open, onClose, onConfirm, formData, setFormData }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogContent
        sx={{ position: "relative", pt: 4, pb: 0, bgcolor: "#fff" }}
      >
        <Button
          size="small"
          onClick={onClose}
          sx={{ position: "absolute", top: 8, right: 8 }}
        >
          Atrás
        </Button>

        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <div className="form-field">
            <label htmlFor="create-user-name">Usuario</label>
            <input
              id="create-user-name"
              type="text"
              className="custom-input"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>

          <div className="form-field">
            <label htmlFor="create-user-email">Email</label>
            <input
              id="create-user-email"
              type="email"
              className="custom-input"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>

          <FormControl fullWidth size="small">
            <InputLabel id="create-role-select-label">Rol</InputLabel>
            <Select
              labelId="create-role-select-label"
              label="Rol"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
            >
              <MenuItem value="admin">Administrador</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel id="create-premium-select-label">Premium</InputLabel>
            <Select
              labelId="create-premium-select-label"
              label="Premium"
              value={formData.premium ? "true" : "false"}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  premium: e.target.value === "true",
                }))
              }
            >
              <MenuItem value="true">Activo</MenuItem>
              <MenuItem value="false">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button variant="outlined" onClick={onClose}>
          CANCELAR
        </Button>
        <Button variant="contained" onClick={onConfirm}>
          GUARDAR
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateUserDialog;


