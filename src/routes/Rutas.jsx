import React, { useEffect, useState } from 'react'
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material'
import HomeIcon from '@mui/icons-material/Home'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Modulos from '../components/Modulos'
import Home from '../pages/home/Home'

export function navigate(to) {
	window.location.hash = to
}

function currentPath() {
	return window.location.hash.slice(1) || '/'
}

function Header() {
	const path = currentPath()
	
	return (
		<AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', mb: 3 }}>
			<Toolbar>
				<Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
					🎯 Admin Panel
				</Typography>
				<Box sx={{ display: 'flex', gap: 1 }}>
					<Button 
						color="inherit"
						href="#/"
						startIcon={<HomeIcon />}
						sx={{ 
							fontWeight: path === '/' ? 600 : 400,
							bgcolor: path === '/' ? 'rgba(255,255,255,0.2)' : 'transparent'
						}}
					>
						Inicio
					</Button>
					<Button 
						color="inherit"
						href="#/modules"
						startIcon={<DashboardIcon />}
						sx={{ 
							fontWeight: path.startsWith('/modules') ? 600 : 400,
							bgcolor: path.startsWith('/modules') ? 'rgba(255,255,255,0.2)' : 'transparent'
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
				<Container maxWidth="xl">
					<Home />
				</Container>
			</Box>
		)
	}

	// Rutas de módulos
	if (path.startsWith('/modules')) {
		return (
			<Box>
				<Header />
				<Container maxWidth="xl">
					<Modulos path={path} navigate={navigate} />
				</Container>
			</Box>
		)
	}

	// 404
	return (
		<Box>
			<Header />
			<Container maxWidth="xl">
				<Box sx={{ textAlign: 'center', py: 5 }}>
					<Typography variant="h4" gutterBottom>❌ 404 — No encontrado</Typography>
					<Typography color="text.secondary" sx={{ mb: 2 }}>Ruta: <code>{path}</code></Typography>
					<Button variant="contained" href="#/">← Volver al inicio</Button>
				</Box>
			</Container>
		</Box>
	)
}
