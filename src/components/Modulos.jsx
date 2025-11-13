import React, { useEffect, useState } from 'react'
import { Box, Button, Card, CardContent, CardActions, Typography, Chip, Grid, Paper } from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CancelIcon from '@mui/icons-material/Cancel'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Chat from '../pages/chat/Chat'
import Bugs from '../pages/bugs/Bugs'
import Posts from '../pages/posts/Posts'
import Status from '../pages/status/Status'
import Users from '../pages/users/Users'

// Versión muy simple de Modulos: lista fija de módulos (chat, bugs, posts, status, usuarios).
// Guardamos sólo los módulos instalados (ids) en localStorage.

const MODULES = [
	{ id: 'chat', name: 'Chat', description: 'Mensajería y conversaciones en tiempo real' },
	{ id: 'bugs', name: 'Bugs', description: 'Reportes y seguimiento de errores' },
	{ id: 'posts', name: 'Posts', description: 'Gestión de publicaciones y contenido' },
	{ id: 'status', name: 'Status', description: 'Estados del sistema y monitoreo' },
	{ id: 'users', name: 'Usuarios', description: 'Administración de usuarios y permisos' }
]

const KEY = 'ap_installed_modules'

function loadInstalled() {
	try {
		const raw = localStorage.getItem(KEY)
		return raw ? JSON.parse(raw) : []
	} catch (e) {
		console.warn(e)
		return []
	}
}

function saveInstalled(list) {
	localStorage.setItem(KEY, JSON.stringify(list))
}

// Componente para listar módulos
function ModulosList({ installed, onToggle, onOpen }) {
	return (
		<Box sx={{ p: 4, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
				<Box>
					<Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: '#000000' }}>
						Módulos del Sistema
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Gestiona los módulos instalados en tu plataforma
					</Typography>
				</Box>
				<Button 
					variant="outlined" 
					color="error" 
					size="small"
					onClick={() => { localStorage.removeItem(KEY); window.location.reload() }}
				>
					Restaurar instalación
				</Button>
			</Box>

			<Grid container spacing={3}>
				{MODULES.map(m => (
					<Grid item xs={12} sm={6} lg={4} key={m.id}>
						<Card 
							elevation={2} 
							sx={{ 
								display: 'flex', 
								flexDirection: 'column', 
								bgcolor: '#ffffff', 
								borderRadius: 2, 
								height: '100%',
								transition: 'transform 0.2s, box-shadow 0.2s', 
								'&:hover': { 
									transform: 'translateY(-4px)',
									boxShadow: 4
								} 
							}}
						>
							<CardContent sx={{ flex: 1 }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 2 }}>
									<Typography variant="h6" sx={{ fontWeight: 600, color: '#000000' }}>{m.name}</Typography>
									{installed.includes(m.id) && <Chip label="Instalado" size="small" sx={{ bgcolor: '#2e7d32', color: '#fff', fontWeight: 500 }} />}
								</Box>
								<Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{m.description}</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
								<Button 
									variant="outlined"
									size="small"
									color={installed.includes(m.id) ? 'error' : 'primary'}
									onClick={() => onToggle(m.id)}
									startIcon={installed.includes(m.id) ? <CancelIcon /> : <CheckCircleIcon />}
								>
									{installed.includes(m.id) ? 'Desinstalar' : 'Instalar'}
								</Button>
								<Button 
									variant="contained"
									size="small"
									sx={{ bgcolor: '#000000', '&:hover': { bgcolor: '#333333' } }}
									onClick={() => onOpen(m.id)}
									endIcon={<ArrowForwardIcon />}
								>
									Abrir
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

// Componente para ver detalle del módulo
function ModuloDetail({ modId, installed, onToggle, onBack }) {
	const mod = MODULES.find(m => m.id === modId)
	
	if (!mod) {
		return (
			<Box sx={{ p: 4, textAlign: 'center', bgcolor: '#f5f5f5', minHeight: '100vh' }}>
				<Typography variant="h4" gutterBottom sx={{ fontWeight: 600, color: '#d32f2f' }}>Módulo no encontrado</Typography>
				<Typography color="text.secondary" sx={{ mb: 3 }}>ID: {modId}</Typography>
				<Button variant="contained" sx={{ bgcolor: '#000000', '&:hover': { bgcolor: '#333333' } }} onClick={onBack} startIcon={<ArrowBackIcon />}>
					Volver a módulos
				</Button>
			</Box>
		)
	}

	// Renderizar componente de página según id
	function renderPageComponent(id) {
		switch (id) {
			case 'chat': return <Chat />
			case 'bugs': return <Bugs />
			case 'posts': return <Posts />
			case 'status': return <Status />
			case 'users': return <Users />
			default: return <Typography color="text.secondary" sx={{ p: 3, textAlign: 'center' }}>Componente no disponible</Typography>
		}
	}

	return (
		<Box sx={{ width: '100%', m: 0, p: 0 }}>
			<Paper elevation={0} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#ffffff' }}>
				<Box>
					<Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5, color: '#000000' }}>{mod.name}</Typography>
					<Typography variant="body2" color="text.secondary">{mod.description}</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
					<Chip 
						label={installed.includes(mod.id) ? 'Instalado' : 'No instalado'}
						sx={{ bgcolor: installed.includes(mod.id) ? '#2e7d32' : '#757575', color: '#fff', fontWeight: 500 }}
					/>
					<Button 
						variant="outlined"
						size="small"
						color={installed.includes(mod.id) ? 'error' : 'primary'}
						onClick={() => onToggle(mod.id)}
					>
						{installed.includes(mod.id) ? 'Desinstalar' : 'Instalar'}
					</Button>
					<Button 
						variant="outlined"
						size="small"
						onClick={onBack}
						startIcon={<ArrowBackIcon />}
					>
						Volver
					</Button>
				</Box>
			</Paper>

			<Paper elevation={0} sx={{ bgcolor: '#ffffff' }}>
				{renderPageComponent(mod.id)}
			</Paper>
		</Box>
	)
}

// Componente principal que decide qué mostrar
export default function Modulos({ path = '/modules', navigate }) {
	const [installed, setInstalled] = useState(() => loadInstalled())

	useEffect(() => saveInstalled(installed), [installed])

	const base = '/modules'
	const isDetail = path !== base && path.startsWith(base + '/')
	const detailId = isDetail ? decodeURIComponent(path.slice((base + '/').length)) : null

	function toggle(id) {
		setInstalled(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
	}

	function open(id) {
		navigate(`/modules/${encodeURIComponent(id)}`)
	}

	function back() {
		navigate('/modules')
	}

	if (isDetail) {
		return <ModuloDetail modId={detailId} installed={installed} onToggle={toggle} onBack={back} />
	}

	return <ModulosList installed={installed} onToggle={toggle} onOpen={open} />
}
