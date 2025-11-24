//IMPORTS
import { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
  useParams,
  Link,
} from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Modulos from "../components/Modulos";
import Home from "../pages/home/Home";
import UserDetail from "../pages/users/UserDetail";
import Informe from "../pages/informacion/informe/informe";
import Tutorial from "../pages/informacion/documentacion/tutorial/Tutorial";
import HowToGuide from "../pages/informacion/documentacion/howToGuide/HowToGuide";
import MV from "../pages/informacion/documentacion/maquinaVirtual/MV";

function Header() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        bgcolor: "#000000",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 56, md: 64 } }}>
        <Typography
          variant={{ xs: "subtitle1", md: "h6" }}
          sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}
        >
          Admin Panel
        </Typography>
        <Box sx={{ display: "flex", gap: { xs: 0, md: 0.5 } }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            startIcon={<HomeIcon />}
            sx={{
              px: 2,
              fontWeight: path === "/" ? 600 : 400,
              bgcolor: path === "/" ? "rgba(255,255,255,0.15)" : "transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Dashboard
          </Button>
          <Button
            component={Link}
            to="/modules"
            color="inherit"
            startIcon={<DashboardIcon />}
            sx={{
              px: 2,
              fontWeight: path.startsWith("/modules") ? 600 : 400,
              bgcolor: path.startsWith("/modules")
                ? "rgba(255,255,255,0.15)"
                : "transparent",
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            Módulos
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

// Componente wrapper para pasar navigate a los componentes
function ModulosWrapper() {
  const navigate = useNavigate();
  const location = useLocation();
  return <Modulos path={location.pathname} navigate={navigate} />;
}

function UserDetailWrapper() {
  const navigate = useNavigate();
  const { userId } = useParams();
  return <UserDetail userId={userId} navigate={navigate} />;
}

function NotFound() {
  const location = useLocation();
  return (
    <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
      <Header />
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h4" gutterBottom>
          404 — No encontrado
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2 }}>
          Ruta: <code>{location.pathname}</code>
        </Typography>
        <Button variant="contained" component={Link} to="/">
          Volver al inicio
        </Button>
      </Box>
    </Box>
  );
}

function AppContent() {
  const location = useLocation();

  // Actualizar título de la ventana según la ruta
  useEffect(() => {
    const titles = {
      "/": "Dashboard - Radius ERP",
      "/modules": "Módulos - Radius ERP",
      "/modules/chat": "Chat - Radius ERP",
      "/modules/bugs": "Bugs - Radius ERP",
      "/modules/posts": "Posts - Radius ERP",
      "/modules/status": "Status - Radius ERP",
      "/modules/users": "Usuarios - Radius ERP",
      "/informacion/informe": "Informe - Radius ERP",
      "/informacion/documentacion/tutorial": "Tutorial - Radius ERP",
      "/informacion/documentacion/howToGuide": "How-to-guide - Radius ERP",
      "/informacion/documentacion/maquinaVirtual":
        "Máquina Virtual - Radius ERP",
    };

    // Título específico o por defecto
    if (location.pathname.startsWith("/users/")) {
      document.title = "Usuario - Radius ERP";
    } else {
      document.title = titles[location.pathname] || "Admin Panel - Radius ERP";
    }
  }, [location.pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Box>
            <Header />
            <Home />
          </Box>
        }
      />
      <Route
        path="/users/:userId"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <UserDetailWrapper />
          </Box>
        }
      />
      <Route
        path="/modules/*"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <ModulosWrapper />
          </Box>
        }
      />
      <Route
        path="/informacion/informe"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <Informe />
          </Box>
        }
      />
      <Route
        path="/informacion/documentacion/tutorial"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <Tutorial />
          </Box>
        }
      />
      <Route
        path="/informacion/documentacion/howToGuide"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <HowToGuide />
          </Box>
        }
      />
      <Route
        path="/informacion/documentacion/maquinaVirtual"
        element={
          <Box sx={{ width: "100%", height: "100vh", m: 0, p: 0 }}>
            <Header />
            <MV />
          </Box>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function Rutas() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}
