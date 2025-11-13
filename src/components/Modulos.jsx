import React, { useEffect, useState } from 'react'
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
	{ id: 'usuarios', name: 'Usuarios', description: 'Administración de usuarios y permisos' }
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

	if (!isDetail) {
		return (
			<div>
				<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
					<h2>Módulos</h2>
					<div>
						<button onClick={() => { localStorage.removeItem(KEY); setInstalled([]) }}>Reset installs</button>
					</div>
				</div>

				<ul style={{paddingLeft:0,listStyle:'none',marginTop:12}}>
					{MODULES.map(m => (
						<li key={m.id} style={{border:'1px solid #eee',padding:12,marginBottom:8,display:'flex',justifyContent:'space-between'}}>
							<div>
								<div style={{fontWeight:600}}>{m.name}</div>
								<div style={{color:'#555'}}>{m.description}</div>
							</div>
							<div style={{display:'flex',gap:8}}>
								<button onClick={() => toggle(m.id)}>{installed.includes(m.id) ? 'Desinstalar' : 'Instalar'}</button>
								<button onClick={() => open(m.id)}>Abrir</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		)
	}

		// detalle
		const mod = MODULES.find(m => m.id === detailId)
		if (!mod) {
			return (
				<div>
					<h2>No encontrado</h2>
					<p>ID: {detailId}</p>
					<p><button onClick={back}>Volver</button></p>
				</div>
			)
		}

		// map id to component
		const ModuleComponent = ({ id }) => {
			switch (id) {
				case 'chat': return <Chat />
				case 'bugs': return <Bugs />
				case 'posts': return <Posts />
				case 'status': return <Status />
				case 'usuarios': return <Users />
				default: return <div>Componente no disponible</div>
			}
		}

		return (
			<div>
				<div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
					<div>
						<h2>{mod.name}</h2>
						<div style={{color:'#555'}}>ID: <code>{mod.id}</code></div>
					</div>
					<div>
						<button onClick={() => toggle(mod.id)} style={{marginRight:8}}>{installed.includes(mod.id) ? 'Desinstalar' : 'Instalar'}</button>
						<button onClick={back}>Volver</button>
					</div>
				</div>

				<section style={{marginTop:12}}>
					<h3>Descripción</h3>
					<p>{mod.description}</p>
				</section>

				<section style={{marginTop:12}}>
					<h3>Estado</h3>
					<p>{installed.includes(mod.id) ? 'Instalado' : 'No instalado'}</p>
				</section>

				<section style={{marginTop:12}}>
					<h3>Vista</h3>
					<div style={{border:'1px solid #eee',padding:12,borderRadius:6,marginTop:8}}>
						<ModuleComponent id={mod.id} />
					</div>
				</section>
			</div>
		)
}


