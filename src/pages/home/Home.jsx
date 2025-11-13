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
    <Box sx={{ p: 2, bgcolor: '#f5f5f5', height: 'calc(100vh - 64px)', overflow: 'hidden', maxWidth: '1800px', mx: 'auto' }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Estadísticas - 30% altura */}
        <Grid item xs={12} sx={{ height: '30%' }}>
          <Grid container spacing={1.5} sx={{ height: '100%' }}>
            {stats.map((stat, i) => (
              <Grid item xs={3} key={i} sx={{ height: '100%' }}>
                <Card elevation={2} sx={{ bgcolor: '#ffffff', borderRadius: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-2px)', boxShadow: 4 } }}>
                  <CardContent sx={{ textAlign: 'center', p: 1.5, width: '100%' }}>
                    <Box sx={{ color: stat.color, mb: 0.5 }}>{stat.icon}</Box>
                    <Typography variant="h3" sx={{ fontWeight: 700, color: stat.color, mb: 0.5 }}>
                      {stat.value}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                      {stat.label}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Accesos Rápidos y Actividad Reciente - 70% altura */}
        <Grid item xs={12} sx={{ height: '70%' }}>
          <Grid container spacing={2} sx={{ height: '100%' }}>
            <Grid item xs={12} lg={5} sx={{ height: '100%' }}>
              <Paper elevation={2} sx={{ bgcolor: '#ffffff', borderRadius: 2, p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: '#000000', textAlign: 'center' }}>
                  Accesos Rápidos
                </Typography>
                <List dense sx={{ flex: 1, overflow: 'hidden' }}>
                  {quickLinks.map((link, i) => (
                    <ListItem
                      key={i}
                      component="a"
                      href={link.url}
                      sx={{
                        borderRadius: 1.5,
                        mb: 0.75,
                        p: 1.25,
                        textDecoration: 'none',
                        color: 'text.primary',
                        transition: 'all 0.2s',
                        border: '2px solid transparent',
                        '&:hover': {
                          bgcolor: '#f8f9fa',
                          borderColor: link.color,
                          transform: 'translateX(4px)'
                        }
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: link.color }}>{link.icon}</ListItemIcon>
                      <ListItemText primary={<Typography fontWeight={600} fontSize="0.9rem">{link.name}</Typography>} />
                      <ArrowForwardIcon sx={{ color: link.color, fontSize: '1.1rem' }} />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>

            <Grid item xs={12} lg={7} sx={{ height: '100%' }}>
              <Paper elevation={2} sx={{ p: 2, height: '100%', bgcolor: '#ffffff', borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1.5, color: '#000000', textAlign: 'center' }}>
                  Actividad Reciente
                </Typography>
                <List dense sx={{ flex: 1, overflow: 'hidden' }}>
                  {recentActivity.map((activity, i) => (
                    <ListItem key={i} sx={{ bgcolor: '#f8f9fa', borderRadius: 1.5, mb: 0.75, p: 1.25, border: '1px solid #e9ecef' }}>
                      <ListItemIcon sx={{ color: '#000000', minWidth: 36 }}>{activity.icon}</ListItemIcon>
                      <ListItemText
                        primary={<Typography fontWeight={600} fontSize="0.9rem">{activity.action}</Typography>}
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
        </Grid>
      </Grid>
    </Box>
  )
}
