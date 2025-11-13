import React, { useEffect, useState } from 'react'
import Modulos from '../components/Modulos'

export function Link({ to, children, style }) {
	return (
		<a href={'#' + to} style={style}>{children}</a>
	)
}

export function navigate(to) {
	// acepta '/modules' o '/modules/id'
	window.location.hash = to
}

function currentPath() {
	return window.location.hash.slice(1) || '/'
}

function Header() {
	return (
		<header style={{display:'flex',alignItems:'center',gap:12,marginBottom:16}}>
			<h1 style={{margin:0,fontSize:20}}>Admin Panel</h1>
			<nav style={{marginLeft:12}}>
				<Link to="/" style={{marginRight:10}}>Inicio</Link>
				<Link to="/modules">Módulos</Link>
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

	// rutas muy simples
	if (path === '/') {
		return (
			<div>
				<Header />
				<main>
					<h2>Bienvenido</h2>
					<p>Panel de administración simple. Usa <a href="#/modules">Módulos</a> para ver los módulos.</p>
				</main>
			</div>
		)
	}

	if (path.startsWith('/modules')) {
		return (
			<div>
				<Header />
				<main>
					<Modulos path={path} navigate={navigate} />
				</main>
			</div>
		)
	}

	return (
		<div>
			<Header />
			<main>
				<h2>404 — No encontrado</h2>
				<p>Ruta: <code>{path}</code></p>
			</main>
		</div>
	)
}
