//IMPORTS
import { useState, useEffect } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Chip,
  CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { getUser } from "./dataUsers";

//toPremiumBoolean PARA ACEPTAR STRINGS DISTINTOS
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

//DETALLES DEL USUARIO
function UserDetail({ userId, navigate }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    //BUSCAR USUARIO
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

  //COLORES DE ROLES
  const ROLE_COLORS = {
    admin: "#d32f2f",
    user: "#2e7d32",
    default: "#757575",
  };

  if (loading) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 2,
          boxSizing: "border-box",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  //SI NO EXISTE EL USUARIO
  if (!user) {
    return (
      <Box
        sx={{
          width: "100%",
          p: 2,
          boxSizing: "border-box",
        }}
      >
        <Paper sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            Usuario no encontrado
          </Typography>
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
    <Box
      sx={{
        width: "100%",
        p: 2,
        boxSizing: "border-box",
      }}
    >
      <Paper
        elevation={0}
        sx={{ mb: 2, p: 2, display: "flex", alignItems: "center", gap: 2 }}
      >
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/modules/users")}
        >
          Volver
        </Button>
        <Box
          sx={{ display: "flex", gap: 2, alignItems: "center", flexGrow: 1 }}
        >
          <AccountCircleIcon sx={{ color: "#0b5cff", fontSize: 32 }} />
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Detalle de Usuario
          </Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 3,
              pb: 3,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Avatar
              sx={{ bgcolor: "#0b5cff", width: 80, height: 80, fontSize: 32 }}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                {user.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                ID: {user.id}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                Email
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {user.email}
              </Typography>
            </Box>
            {user.createdAt && (
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mb: 0.5 }}
                >
                  Fecha de creación
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {new Date(user.createdAt).toLocaleDateString("es-ES", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  —{" "}
                  {new Date(user.createdAt).toLocaleTimeString("es-ES", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Typography>
              </Box>
            )}
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
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
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
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
    </Box>
  );
}

export default UserDetail;
