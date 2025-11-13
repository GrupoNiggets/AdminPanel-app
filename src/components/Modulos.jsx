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
		<Box>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
				<Typography variant="h4" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					📦 Módulos disponibles
				</Typography>
				<Button 
					variant="contained" 
					color="error" 
					onClick={() => { localStorage.removeItem(KEY); window.location.reload() }}
				>
					Reset installs
				</Button>
			</Box>

			<Grid container spacing={2}>
				{MODULES.map(m => (
					<Grid item xs={12} sm={6} md={4} key={m.id}>
						<Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
							<CardContent sx={{ flex: 1 }}>
								<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
									<Typography variant="h6">{m.name}</Typography>
									{installed.includes(m.id) && <Chip label="INSTALADO" size="small" color="success" />}
								</Box>
								<Typography variant="body2" color="text.secondary">{m.description}</Typography>
							</CardContent>
							<CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
								<Button 
									variant="outlined"
									color={installed.includes(m.id) ? 'error' : 'success'}
									onClick={() => onToggle(m.id)}
									startIcon={installed.includes(m.id) ? <CancelIcon /> : <CheckCircleIcon />}
								>
									{installed.includes(m.id) ? 'Desinstalar' : 'Instalar'}
								</Button>
								<Button 
									variant="contained"
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
			<Box sx={{ textAlign: 'center', py: 5 }}>
				<Typography variant="h4" gutterBottom>❌ Módulo no encontrado</Typography>
				<Typography color="text.secondary" sx={{ mb: 2 }}>ID: {modId}</Typography>
				<Button variant="contained" onClick={onBack} startIcon={<ArrowBackIcon />}>
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
		<Box>
			<Paper sx={{ p: 2, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'grey.50' }}>
				<Box>
					<Typography variant="h5">{mod.name}</Typography>
					<Typography variant="body2" color="text.secondary">{mod.description}</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
					<Chip 
						label={installed.includes(mod.id) ? '✓ Instalado' : '○ No instalado'}
						color={installed.includes(mod.id) ? 'success' : 'default'}
					/>
					<Button 
						variant="contained"
						onClick={() => onToggle(mod.id)}
					>
						{installed.includes(mod.id) ? 'Desinstalar' : 'Instalar'}
					</Button>
					<Button 
						variant="outlined"
						onClick={onBack}
						startIcon={<ArrowBackIcon />}
					>
						Volver
					</Button>
				</Box>
			</Paper>

			<Paper elevation={2}>
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
