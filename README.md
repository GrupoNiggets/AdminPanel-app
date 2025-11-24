# AdminPanel App

Panel de administración modular construido con React, Vite y Electron para gestión empresarial.

## 🚀 Características

- **Dashboard Interactivo**: Visualización de estadísticas en tiempo real
- **Gestión de Usuarios**: CRUD completo con roles (Admin, Moderador, Usuario)
- **Sistema de Posts**: Creación y gestión de publicaciones
- **Chat Empresarial**: Mensajería en tiempo real entre usuarios
- **Tracking de Bugs**: Sistema de reporte y seguimiento de incidencias con prioridades
- **Estado del Sistema**: Monitoreo de recursos y rendimiento
- **Módulos Dinámicos**: Arquitectura extensible basada en componentes

## 🛠️ Tecnologías

- **Frontend**: React 19 + Vite
- **UI Framework**: Material-UI (MUI) v7
- **Desktop**: Electron 39
- **Routing**: React Router DOM v7
- **Gráficos**: Chart.js + Recharts
- **Estilos**: CSS + Emotion

## 📦 Instalación

```bash
# Instalar dependencias
npm install

# Modo desarrollo web
npm run dev

# Modo Electron
npm start
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/       # Componentes reutilizables
├── pages/           # Páginas principales
│   ├── home/        # Dashboard principal
│   ├── users/       # Gestión de usuarios
│   ├── posts/       # Gestión de posts
│   ├── chat/        # Chat empresarial
│   ├── bugs/        # Sistema de bugs
│   ├── status/      # Estado del sistema
│   └── informacion/ # Información adicional
├── routes/          # Configuración de rutas
└── modules/         # Módulos del sistema
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia servidor de desarrollo Vite
- `npm run electron` - Ejecuta aplicación Electron
- `npm start` - Inicia Electron con configuración personalizada

## 🌐 API Backend

La aplicación se conecta a una API REST en `http://localhost:3000/api/v1/` con los siguientes endpoints:

- `/users` - Gestión de usuarios
- `/posts` - Gestión de publicaciones
- `/chat` - Mensajes de chat
- `/bugs` - Reporte de bugs
- `/status` - Estado del sistema

## 📝 Notas

- **Versión**: 0.0.0 (En desarrollo)
- **Tipo**: Aplicación privada
- **Plataforma**: Web y Desktop (Electron)

## 🔒 Requisitos

- Node.js 18+
- Backend API corriendo en puerto 3000

## 📄 Licencia

Proyecto privado
