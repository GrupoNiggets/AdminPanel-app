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
import './Modulos.css'

// Versión muy simple de Modulos: lista fija de módulos (chat, bugs, posts, status, usuarios).
// Guardamos sólo los módulos instalados (ids) en localStorage.

const MODULES = [
	{ 
		id: 'chat', 
		name: 'Chat', 
		description: 'Mensajería y conversaciones en tiempo real',
		image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=500&q=80'
	},
	{ 
		id: 'bugs', 
		name: 'Bugs', 
		description: 'Reportes y seguimiento de errores',
		image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=500&q=80'
	},
	{ 
		id: 'posts', 
		name: 'Posts', 
		description: 'Gestión de publicaciones y contenido',
		image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=500&q=80'
	},
	{ 
		id: 'status', 
		name: 'Status', 
		description: 'Estados del sistema y monitoreo',
		image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80'
	},
	{ 
		id: 'users', 
		name: 'Usuarios', 
		description: 'Administración de usuarios y permisos',
		image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&q=80'
	}
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
		<div className="modulos-container">
			<div className="modulos-header">
				<div>
					<h2 className="modulos-title">Módulos del Sistema</h2>
					<p className="modulos-subtitle">Gestiona los módulos instalados en tu plataforma</p>
				</div>
				<button 
					className="restore-button"
					onClick={() => { localStorage.removeItem(KEY); window.location.reload() }}
				>
					Restaurar instalación
				</button>
			</div>

			<div className="modulos-grid">
				{MODULES.map(m => (
					<div className="modulo-card" key={m.id}>
						<div 
							className="modulo-card-image"
							style={{ backgroundImage: `url(${m.image})` }}
						/>
						<div className="modulo-card-content">
							<div className="modulo-card-header">
								<h3 className="modulo-name">{m.name}</h3>
								{installed.includes(m.id) && (
									<span className="modulo-chip">Instalado</span>
								)}
							</div>
							<p className="modulo-description">{m.description}</p>
							<div className="modulo-actions">
								<button 
									className={`modulo-button ${installed.includes(m.id) ? 'modulo-button-uninstall' : 'modulo-button-install'}`}
									onClick={() => onToggle(m.id)}
								>
									{installed.includes(m.id) ? (
										<><CancelIcon fontSize="small" /> Desinstalar</>
									) : (
										<><CheckCircleIcon fontSize="small" /> Instalar</>
									)}
								</button>
								<button 
									className="modulo-button modulo-button-open"
									onClick={() => onOpen(m.id)}
								>
									Abrir <ArrowForwardIcon fontSize="small" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

// Componente para ver detalle del módulo
function ModuloDetail({ modId, installed, onToggle, onBack }) {
	const mod = MODULES.find(m => m.id === modId)
	
	if (!mod) {
		return (
			<div className="modulo-error">
				<h2>Módulo no encontrado</h2>
				<p>ID: {modId}</p>
				<button className="back-button" onClick={onBack}>
					<ArrowBackIcon fontSize="small" /> Volver a módulos
				</button>
			</div>
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
			<div 
				className="modulo-detail-banner"
				style={{ backgroundImage: `url(${mod.image})` }}
			>
				<div className="modulo-detail-overlay">
					<div className="modulo-detail-info">
						<h2>{mod.name}</h2>
						<p>{mod.description}</p>
					</div>
					<div className="modulo-detail-actions">
						<span className={`modulo-chip ${installed.includes(mod.id) ? '' : 'not-installed'}`}>
							{installed.includes(mod.id) ? 'Instalado' : 'No instalado'}
						</span>
						<button 
							className={`modulo-button ${installed.includes(mod.id) ? 'modulo-button-uninstall' : 'modulo-button-install'}`}
							onClick={() => onToggle(mod.id)}
						>
							{installed.includes(mod.id) ? 'Desinstalar' : 'Instalar'}
						</button>
						<button className="back-button" onClick={onBack}>
							<ArrowBackIcon fontSize="small" /> Volver
						</button>
					</div>
				</div>
			</div>

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
