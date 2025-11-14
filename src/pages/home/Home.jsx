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
import './Home.css'

export default function Home() {
  const stats = [
    { label: 'Módulos', value: '5', icon: <DashboardIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#3b82f6' },
    { label: 'Usuarios', value: '24', icon: <PeopleIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#8b5cf6' },
    { label: 'Posts', value: '156', icon: <ArticleIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#06b6d4' },
    { label: 'Bugs', value: '8', icon: <BugReportIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#f59e0b' },
    { label: 'Conversaciones', value: '42', icon: <ChatIcon sx={{fontSize: { xs: 32, md: 40 }}} />, color: '#10b981' }
  ]

  const recentActivity = [
    { action: 'Nuevo usuario registrado', user: 'María García', time: 'Hace 5 min', icon: <PersonAddIcon /> },
    { action: 'Bug #23 resuelto', user: 'Juan Pérez', time: 'Hace 12 min', icon: <CheckCircleIcon /> },
    { action: 'Post publicado', user: 'Admin', time: 'Hace 1 hora', icon: <DescriptionIcon /> },
    { action: 'Chat iniciado', user: 'Carlos López', time: 'Hace 2 horas', icon: <ChatIcon /> },
    { action: 'Módulo actualizado', user: 'Ana Martínez', time: 'Hace 3 horas', icon: <TipsAndUpdatesIcon /> },
    { action: 'Sistema optimizado', user: 'Tech Team', time: 'Hace 4 horas', icon: <CheckCircleIcon /> },
    { action: 'Nuevo post creado', user: 'Editor', time: 'Hace 5 horas', icon: <DescriptionIcon /> },
    { action: 'Usuario eliminado', user: 'Administrador', time: 'Hace 6 horas', icon: <PersonAddIcon /> }
  ]

  const quickLinks = [
    { name: 'Ver módulos', url: '#/modules', icon: <DashboardIcon />, color: '#3b82f6' },
    { name: 'Gestionar usuarios', url: '#/modules/users', icon: <PeopleIcon />, color: '#8b5cf6' },
    { name: 'Ver posts', url: '#/modules/posts', icon: <ArticleIcon />, color: '#06b6d4' },
    { name: 'Chat', url: '#/modules/chat', icon: <ChatIcon />, color: '#10b981' },
    { name: 'Revisar bugs', url: '#/modules/bugs', icon: <BugReportIcon />, color: '#f59e0b' },
    { name: 'Estado del sistema', url: '#/modules/status', icon: <CheckCircleIcon />, color: '#22c55e' }
  ]

  return (
    <Box sx={{ bgcolor: '#f5f5f5', height: 'calc(100vh - 64px)', overflow: 'visible', m: 0, p: 0 }}>
      <Grid container spacing={0} sx={{ height: '100%', m: 0 }}>
        {/* Columna Izquierda - Accesos Rápidos */}
        <Grid item xs={12} lg={1.3} sx={{ height: '100%', p: 0 }}>
          <Paper elevation={3} sx={{ bgcolor: '#ffffff', borderRadius: 0, p: 1.5, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'visible' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#000000', fontSize: '1.05rem' }}>
              Accesos Rápidos
            </Typography>
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1.5, overflow: 'visible' }}>
              {quickLinks.map((link, i) => (
                <Box
                  key={i}
                  component="a"
                  href={link.url}
                  sx={{
                    borderRadius: 2,
                    p: 2,
                    textDecoration: 'none',
                    color: 'text.primary',
                    transition: 'all 0.3s',
                    border: '2px solid #e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#fafafa',
                    '&:hover': {
                      bgcolor: '#f0f0f0',
                      borderColor: link.color,
                      transform: 'translateX(8px)',
                      boxShadow: 3
                    }
                  }}
                >
                  <Box sx={{ 
                    minWidth: 48, 
                    height: 48, 
                    borderRadius: 2, 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    bgcolor: link.color,
                    color: 'white',
                    mr: 2
                  }}>
                    {link.icon}
                  </Box>
                  <Typography fontWeight={700} fontSize="1rem" sx={{ flex: 1 }}>
                    {link.name}
                  </Typography>
                  <ArrowForwardIcon sx={{ color: link.color, fontSize: '1.5rem', flexShrink: 0 }} />
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Columna Derecha - Estadísticas arriba y dos bloques abajo */}
        <Grid item xs={12} lg={10.7} sx={{ height: '100%', display: 'flex', flexDirection: 'column', p: 0, pl: 0.5, pr: 2 }}>
          {/* Estadísticas - 18% altura */}
          <Box sx={{ height: '18%', mb: 0.5 }}>
            <Grid container spacing={0.5} sx={{ height: '100%' }}>
              {stats.map((stat, i) => (
                <Grid item xs={12} sm={6} md={2.4} key={i} sx={{ height: '100%' }}>
                  <Card elevation={4} sx={{ 
                    bgcolor: '#ffffff', 
                    borderRadius: 0, 
                    height: '100%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    transition: 'all 0.3s',
                    border: '1px solid #f0f0f0',
                    '&:hover': { 
                      transform: 'translateY(-4px)', 
                      boxShadow: 8,
                      borderColor: stat.color
                    } 
                  }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, width: '100%', justifyContent: 'flex-start', pl: 3 }}>
                      <Box sx={{ color: stat.color, display: 'flex', alignItems: 'center', '& svg': { fontSize: '3rem' } }}>{stat.icon}</Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Typography variant="h2" sx={{ fontWeight: 800, color: stat.color, fontSize: '2.5rem', lineHeight: 1 }}>
                          {stat.value}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 600, fontSize: '0.9rem', mt: 0.5 }}>
                          {stat.label}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Dos bloques 50/50 - 82% altura */}
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0.5} sx={{ height: '100%' }}>
              {/* Bloque Izquierdo - Actividad Reciente */}
              <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                <Paper elevation={4} sx={{ 
                  p: 2, 
                  height: '100%', 
                  bgcolor: '#ffffff', 
                  borderRadius: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  overflow: 'visible',
                  border: '1px solid #f0f0f0'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#000000' }}>
                    Actividad Reciente
                  </Typography>
                  <Box className="activity-list" sx={{ flex: 1, overflowY: 'visible', pr: 1, maxHeight: '100%' }}>
                    {recentActivity.slice(0, 4).map((activity, i) => (
                      <Box key={i} className="activity-item" sx={{ 
                        bgcolor: '#f8f9fa', 
                        borderRadius: 2, 
                        mb: 1.5, 
                        p: 1.5, 
                        border: '2px solid #e9ecef',
                        display: 'flex', 
                        alignItems: 'center',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#f0f0f0',
                          borderColor: '#000000',
                          transform: 'translateX(10px)',
                          boxShadow: 4
                        }
                      }}>
                        <Box className="activity-icon" sx={{ 
                          minWidth: 48, 
                          height: 48, 
                          borderRadius: 2, 
                          bgcolor: '#000000', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          '& svg': { fontSize: '1.5rem' }
                        }}>
                          {activity.icon}
                        </Box>
                        <Box className="activity-info" sx={{ flex: 1 }}>
                          <Typography className="activity-action" fontWeight={700} fontSize="0.875rem" sx={{ mb: 0.3, lineHeight: 1.2 }}>
                            {activity.action}
                          </Typography>
                          <Typography className="activity-meta" variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                            {activity.user} · {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>

              {/* Bloque Derecho - Más Actividad */}
              <Grid item xs={12} md={6} sx={{ height: '100%' }}>
                <Paper elevation={4} sx={{ 
                  p: 2, 
                  height: '100%', 
                  bgcolor: '#ffffff', 
                  borderRadius: 0, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  overflow: 'visible',
                  border: '1px solid #f0f0f0'
                }}>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#000000' }}>
                    Más Actividad
                  </Typography>
                  <Box className="activity-list" sx={{ flex: 1, overflowY: 'visible', pr: 1, maxHeight: '100%' }}>
                    {recentActivity.slice(4, 8).map((activity, i) => (
                      <Box key={i} className="activity-item" sx={{ 
                        bgcolor: '#f8f9fa', 
                        borderRadius: 2, 
                        mb: 1.5, 
                        p: 1.5, 
                        border: '2px solid #e9ecef',
                        display: 'flex', 
                        alignItems: 'center',
                        transition: 'all 0.2s',
                        '&:hover': {
                          bgcolor: '#f0f0f0',
                          borderColor: '#000000',
                          transform: 'translateX(10px)',
                          boxShadow: 4
                        }
                      }}>
                        <Box className="activity-icon" sx={{ 
                          minWidth: 48, 
                          height: 48, 
                          borderRadius: 2, 
                          bgcolor: '#000000', 
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          '& svg': { fontSize: '1.5rem' }
                        }}>
                          {activity.icon}
                        </Box>
                        <Box className="activity-info" sx={{ flex: 1 }}>
                          <Typography className="activity-action" fontWeight={700} fontSize="0.875rem" sx={{ mb: 0.3, lineHeight: 1.2 }}>
                            {activity.action}
                          </Typography>
                          <Typography className="activity-meta" variant="body2" color="text.secondary" sx={{ fontWeight: 500, fontSize: '0.75rem' }}>
                            {activity.user} · {activity.time}
                          </Typography>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
