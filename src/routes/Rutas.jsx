import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Modulos from '../components/Modulos'
import Home from '../pages/home/Home'
import UserDetail from '../pages/users/UserDetail'

export function navigate(to) {
	window.location.hash = to
}

function currentPath() {
	return window.location.hash.slice(1) || '/'
}

function Header() {
	const path = currentPath()
	
	return (
		<AppBar position="static" elevation={0} sx={{ bgcolor: '#000000', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
			<Toolbar sx={{ minHeight: { xs: 56, md: 64 } }}>
				<Typography variant={{ xs: 'subtitle1', md: 'h6' }} sx={{ flexGrow: 1, fontWeight: 700, letterSpacing: 0.5 }}>
					Admin Panel
				</Typography>
				<Box sx={{ display: 'flex', gap: { xs: 0, md: 0.5 } }}>
					<Button 
						color="inherit"
						href="#/"
						startIcon={<HomeIcon />}
						sx={{ 
							px: 2,
							fontWeight: path === '/' ? 600 : 400,
							bgcolor: path === '/' ? 'rgba(255,255,255,0.15)' : 'transparent',
							'&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
						}}
					>
						Dashboard
					</Button>
					<Button 
						color="inherit"
						href="#/modules"
						startIcon={<DashboardIcon />}
						sx={{ 
							px: 2,
							fontWeight: path.startsWith('/modules') ? 600 : 400,
							bgcolor: path.startsWith('/modules') ? 'rgba(255,255,255,0.15)' : 'transparent',
							'&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
						}}
					>
						Módulos
					</Button>
				</Box>
			</Toolbar>
		</AppBar>
	)
}

export default function Rutas() {
	const [path, setPath] = useState(currentPath())

	useEffect(() => {
		const onHash = () => setPath(currentPath())
		window.addEventListener('hashchange', onHash)
		return () => window.removeEventListener('hashchange', onHash)
	}, [])

	// Ruta home
	if (path === '/') {
		return (
			<Box>
				<Header />
				<Home />
			</Box>
		)
	}

	// Ruta de detalle de usuario
	if (path.startsWith('/users/')) {
		const userId = path.split('/users/')[1]
		return (
			<Box sx={{ width: '100%', height: '100vh', m: 0, p: 0 }}>
				<Header />
				<UserDetail userId={userId} navigate={navigate} />
			</Box>
		)
	}

	// Rutas de módulos
	if (path.startsWith('/modules')) {
		return (
			<Box sx={{ width: '100%', height: '100vh', m: 0, p: 0 }}>
				<Header />
				<Modulos path={path} navigate={navigate} />
			</Box>
		)
	}

	// 404
	return (
		<Box sx={{ width: '100%', height: '100vh', m: 0, p: 0 }}>
			<Header />
			<Box sx={{ textAlign: 'center', py: 5 }}>
				<Typography variant="h4" gutterBottom>❌ 404 — No encontrado</Typography>
				<Typography color="text.secondary" sx={{ mb: 2 }}>Ruta: <code>{path}</code></Typography>
				<Button variant="contained" href="#/">← Volver al inicio</Button>
			</Box>
		</Box>
	)
}
