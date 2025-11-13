import React, { useEffect, useState } from 'react'
import Modulos from '../components/Modulos'
import Home from '../pages/home/Home'

export function Link({ to, children, style }) {
	return (
		<a href={'#' + to} style={style}>{children}</a>
	)
}

export function navigate(to) {
	window.location.hash = to
}

function currentPath() {
	return window.location.hash.slice(1) || '/'
}

function Header() {
	const path = currentPath()
	
	return (
		<header style={{
			display:'flex',
			alignItems:'center',
			justifyContent:'space-between',
			padding:'12px 20px',
			background:'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
			color:'#fff',
			boxShadow:'0 2px 8px rgba(0,0,0,0.15)',
			marginBottom:20
		}}>
			<h1 style={{margin:0,fontSize:22,fontWeight:600}}>🎯 Admin Panel</h1>
			<nav style={{display:'flex',gap:8}}>
				<a 
					href="#/" 
					style={{
						padding:'8px 16px',
						borderRadius:6,
						textDecoration:'none',
						color:'#fff',
						background: path === '/' ? 'rgba(255,255,255,0.3)' : 'transparent',
						fontWeight: path === '/' ? 600 : 400,
						transition:'all 0.2s'
					}}
				>
					🏠 Inicio
				</a>
				<a 
					href="#/modules" 
					style={{
						padding:'8px 16px',
						borderRadius:6,
						textDecoration:'none',
						color:'#fff',
						background: path.startsWith('/modules') ? 'rgba(255,255,255,0.3)' : 'transparent',
						fontWeight: path.startsWith('/modules') ? 600 : 400,
						transition:'all 0.2s'
					}}
				>
					📦 Módulos
				</a>
			</nav>
		</header>
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
			<div>
				<Header />
				<main>
					<Home />
				</main>
			</div>
		)
	}

	// Rutas de módulos
	if (path.startsWith('/modules')) {
		return (
			<div>
				<Header />
				<main style={{padding:'0 20px'}}>
					<Modulos path={path} navigate={navigate} />
				</main>
			</div>
		)
	}

	// 404
	return (
		<div>
			<Header />
			<main style={{padding:20,textAlign:'center'}}>
				<h2>❌ 404 — No encontrado</h2>
				<p style={{color:'#6b7280'}}>Ruta: <code>{path}</code></p>
				<a href="#/" style={{color:'#4f46e5',textDecoration:'none',fontWeight:500}}>← Volver al inicio</a>
			</main>
		</div>
	)
}
