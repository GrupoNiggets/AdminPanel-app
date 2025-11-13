import React from 'react'
import { Box, Typography, Card, CardContent, Grid, Paper, List, ListItem, ListItemText, ListItemIcon, Chip, Alert } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PeopleIcon from '@mui/icons-material/People'
import ArticleIcon from '@mui/icons-material/Article'
import BugReportIcon from '@mui/icons-material/BugReport'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import DescriptionIcon from '@mui/icons-material/Description'
import ChatIcon from '@mui/icons-material/Chat'
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates'

export default function Home() {
  const stats = [
    { label: 'Módulos', value: '5', icon: <DashboardIcon sx={{fontSize: 40}} />, color: '#3b82f6' },
    { label: 'Usuarios', value: '24', icon: <PeopleIcon sx={{fontSize: 40}} />, color: '#8b5cf6' },
    { label: 'Posts', value: '156', icon: <ArticleIcon sx={{fontSize: 40}} />, color: '#06b6d4' },
    { label: 'Bugs', value: '8', icon: <BugReportIcon sx={{fontSize: 40}} />, color: '#f59e0b' }
  ]

  const recentActivity = [
    { action: 'Nuevo usuario registrado', user: 'María García', time: 'Hace 5 min', icon: <PersonAddIcon /> },
    { action: 'Bug #23 resuelto', user: 'Juan Pérez', time: 'Hace 12 min', icon: <CheckCircleIcon /> },
    { action: 'Post publicado', user: 'Admin', time: 'Hace 1 hora', icon: <DescriptionIcon /> },
    { action: 'Chat iniciado', user: 'Carlos López', time: 'Hace 2 horas', icon: <ChatIcon /> }
  ]

  const quickLinks = [
    { name: 'Ver módulos', url: '#/modules', icon: <DashboardIcon />, color: '#3b82f6' },
    { name: 'Gestionar usuarios', url: '#/modules/users', icon: <PeopleIcon />, color: '#8b5cf6' },
    { name: 'Revisar bugs', url: '#/modules/bugs', icon: <BugReportIcon />, color: '#f59e0b' },
    { name: 'Estado del sistema', url: '#/modules/status', icon: <CheckCircleIcon />, color: '#10b981' }
  ]

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" gutterBottom>👋 Bienvenido al Panel de Administración</Typography>
        <Typography variant="body1" color="text.secondary">Gestiona tus módulos, usuarios y contenido desde un solo lugar</Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ 
              background: `linear-gradient(135deg, ${stat.color} 0%, ${stat.color}dd 100%)`,
              color: 'white',
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box>{stat.icon}</Box>
                <Box>
                  <Typography variant="h4" fontWeight="bold">{stat.value}</Typography>
                  <Typography variant="caption" sx={{ opacity: 0.9, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                    {stat.label}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              🚀 Accesos rápidos
            </Typography>
            <List>
              {quickLinks.map((link, i) => (
                <ListItem
                  key={i}
                  component="a"
                  href={link.url}
                  sx={{
                    borderRadius: 1,
                    mb: 1,
                    bgcolor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: link.color,
                      color: 'white',
                      transform: 'translateX(4px)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>
                  <ListItemText primary={link.name} />
                  <ArrowForwardIcon />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>📋 Actividad reciente</Typography>
            <List>
              {recentActivity.map((activity, i) => (
                <ListItem key={i} sx={{ bgcolor: 'grey.50', borderRadius: 1, mb: 1, border: '1px solid', borderColor: 'grey.200' }}>
                  <ListItemIcon>{activity.icon}</ListItemIcon>
                  <ListItemText
                    primary={activity.action}
                    secondary={
                      <>
                        <Typography component="span" variant="body2">{activity.user}</Typography>
                        {' · '}
                        <Typography component="span" variant="body2" color="text.disabled">{activity.time}</Typography>
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>

      <Alert icon={<TipsAndUpdatesIcon />} severity="info" sx={{ bgcolor: '#fef3c7', color: '#92400e', border: '2px solid #fbbf24' }}>
        <strong>Tip del día:</strong> Puedes instalar o desinstalar módulos desde la sección de Módulos
      </Alert>
    </Box>
  )
}
