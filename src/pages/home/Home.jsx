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
    { label: 'Módulos', value: '5', icon: <DashboardIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#3b82f6' },
    { label: 'Usuarios', value: '24', icon: <PeopleIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#8b5cf6' },
    { label: 'Posts', value: '156', icon: <ArticleIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#06b6d4' },
    { label: 'Bugs', value: '8', icon: <BugReportIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#f59e0b' }
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
    <Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#000000' }}>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Visión general del sistema
      </Typography>

      <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#000000' }}>
        Estadísticas del Sistema
      </Typography>
      <Grid container spacing={3}>
        {stats.map((stat, i) => (
          <Grid item xs={6} sm={6} md={3} key={i}>
            <Card elevation={2} sx={{ bgcolor: '#ffffff', borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                <Typography variant={{ xs: 'h4', md: 'h3' }} sx={{ fontWeight: 700, color: stat.color, mb: 0.5 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: { xs: '0.75rem', md: '0.875rem' } }}>
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 4 }}>
        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ bgcolor: '#ffffff', borderRadius: 2, p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#000000' }}>
              Accesos Rápidos
            </Typography>
            <List>
              {quickLinks.map((link, i) => (
                <ListItem
                  key={i}
                  component="a"
                  href={link.url}
                  sx={{
                    borderRadius: 1,
                    mb: 0.5,
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 40, color: link.color }}>{link.icon}</ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500}>{link.name}</Typography>} />
                  <ArrowForwardIcon sx={{ color: 'text.disabled' }} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} lg={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%', bgcolor: '#ffffff', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2, color: '#000000' }}>
              Actividad Reciente
            </Typography>
            <List>
              {recentActivity.map((activity, i) => (
                <ListItem key={i} sx={{ bgcolor: '#fafafa', borderRadius: 1, mb: 0.5 }}>
                  <ListItemIcon sx={{ color: '#000000' }}>{activity.icon}</ListItemIcon>
                  <ListItemText
                    primary={<Typography fontWeight={500}>{activity.action}</Typography>}
                    secondary={
                      <Typography variant="caption" color="text.secondary">
                        {activity.user} · {activity.time}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}
