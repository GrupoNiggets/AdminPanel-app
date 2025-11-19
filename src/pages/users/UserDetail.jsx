// IMPORTS
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  CircularProgress,
  Dialog,            // Nuevo
  DialogTitle,       // Nuevo
  DialogContent,     // Nuevo
  DialogActions,     // Nuevo
  IconButton,        // Nuevo
  Grid               // Nuevo
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EditIcon from "@mui/icons-material/Edit"; // Icono para editar
import { getUser } from "./dataUsers";

// DEFINICIÓN DE RUTAS DE AVATARES (Carpeta public)
// Al estar en 'public/UserAvatares', se accede con la barra '/' al inicio.
const availableAvatars = [
  "/UserAvatares/avatar1.jpg",
  "/UserAvatares/avatar2.jpg",
  "/UserAvatares/avatar3.jpg",
  "/UserAvatares/avatar4.jpg",
  "/UserAvatares/avatar5.jpg",
];

// toPremiumBoolean PARA ACEPTAR STRINGS DISTINTOS
const toPremiumBoolean = (value) => {
  if (typeof value === "boolean") return value;
  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    return (
      normalized === "activo" ||
      normalized === "active" ||
      normalized === "true" ||
      normalized === "1"
    );
  }
  return Boolean(value);
};

// DETALLES DEL USUARIO
function UserDetail({ userId, navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estado para abrir/cerrar el modal de selección
  const [openAvatarDialog, setOpenAvatarDialog] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // BUSCAR USUARIO
    const fetchUser = async () => {
      setLoading(true);
      try {
        const data = await getUser(userId);
        if (isMounted) {
          setUser(
            data
              ? {
                  ...data,
                  premium: toPremiumBoolean(data.premium),
                  // Si el usuario ya tiene un avatar guardado, úsalo, si no null
                  avatar: data.avatar || null 
                }
              : null
          );
        }
      } catch (error) {
        console.error("Error obteniendo usuario:", error);
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // FUNCIÓN PARA GUARDAR EL NUEVO AVATAR
  const handleAvatarChange = (newAvatarPath) => {
    // 1. Actualizamos la vista localmente
    setUser((prev) => ({ ...prev, avatar: newAvatarPath }));
    
    // 2. Cerramos el modal
    setOpenAvatarDialog(false);

    // TODO: AQUÍ DEBES GUARDARLO EN LA BASE DE DATOS O JSON
    // Ejemplo: updateUser(userId, { avatar: newAvatarPath });
    console.log("Nuevo avatar seleccionado:", newAvatarPath);
  };

  // COLORES DE ROLES
  const ROLE_COLORS = {
    admin: "#d32f2f",
    user: "#2e7d32",
    default: "#757575",
  };

  if (loading) {
    return (
      <Box sx={{ width: "100%", p: 2, display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  // SI NO EXISTE EL USUARIO
  if (!user) {
    return (
      <Box sx={{ width: "100%", p: 2 }}>
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">Usuario no encontrado</Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/modules/users")}
            sx={{ mt: 2 }}
          >
            Volver a usuarios
          </Button>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", p: 2, boxSizing: "border-box" }}>
      
      {/* BARRA SUPERIOR */}
      <Paper elevation={0} sx={{ mb: 2, p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/modules/users")}
        >
          Volver
        </Button>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}>
          <AccountCircleIcon sx={{ color: "#0b5cff", fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Detalle de Usuario
          </Typography>
        </Box>
      </Paper>

      {/* CONTENIDO PRINCIPAL */}
      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          
          {/* ZONA DEL AVATAR CON BOTÓN DE EDICIÓN */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              pb: 3,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            {/* Contenedor relativo para el botón flotante */}
            <Box sx={{ position: 'relative' }}>
              <Avatar
                src={user.avatar} // Carga la ruta /UserAvatares/xxx.jpg
                alt={user.name}
                sx={{ 
                  bgcolor: "#0b5cff", 
                  width: 80, 
                  height: 80, 
                  fontSize: 32,
                  border: "1px solid #e0e0e0"
                }}
              >
                {/* Fallback: Inicial si no hay imagen */}
                {!user.avatar && user.name.charAt(0)}
              </Avatar>

              {/* Botón lápiz pequeño */}
              <IconButton
                size="small"
                onClick={() => setOpenAvatarDialog(true)}
                sx={{
                  position: 'absolute',
                  bottom: -5,
                  right: -5,
                  backgroundColor: 'white',
                  boxShadow: 2,
                  '&:hover': { backgroundColor: '#f5f5f5' }
                }}
              >
                <EditIcon fontSize="small" color="primary" />
              </IconButton>
            </Box>

            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ID: {user.id}
              </Typography>
              {/* Botón de texto opcional */}
              <Button 
                onClick={() => setOpenAvatarDialog(true)} 
                sx={{ mt: 1, p: 0, minWidth: 'auto', textTransform: 'none' }}
              >
                Cambiar avatar
              </Button>
            </Box>
          </Box>

          {/* INFORMACIÓN DETALLADA */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.email}
              </Typography>
            </Box>
            {user.createdAt && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                  Fecha de creación
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(user.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric", month: "long", day: "numeric",
                  })}{" "}
                  —{" "}
                  {new Date(user.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit", minute: "2-digit",
                  })}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Rol
              </Typography>
              <Chip
                label={user.role}
                size="medium"
                sx={{
                  bgcolor: ROLE_COLORS[user.role] || ROLE_COLORS.default,
                  color: "#fff",
                  fontWeight: 600,
                }}
              />
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 0.5 }}>
                Estado Premium
              </Typography>
              <Chip
                label={user.premium ? "Activo" : "Inactivo"}
                size="medium"
                color={user.premium ? "success" : "default"}
              />
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* MODAL DE SELECCIÓN DE AVATAR */}
      <Dialog open={openAvatarDialog} onClose={() => setOpenAvatarDialog(false)}>
        <DialogTitle>Elige un avatar</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1, justifyContent: 'center' }}>
            {availableAvatars.map((avatarPath, index) => (
              <Grid item key={index}>
                <Avatar
                  src={avatarPath}
                  onClick={() => handleAvatarChange(avatarPath)}
                  sx={{
                    width: 70,
                    height: 70,
                    cursor: 'pointer',
                    // Resaltar el avatar seleccionado actualmente
                    border: user.avatar === avatarPath ? '3px solid #0b5cff' : '2px solid transparent',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.1)',
                      borderColor: '#0b5cff'
                    }
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAvatarDialog(false)}>Cancelar</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

export default UserDetail;