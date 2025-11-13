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
		<div>
			<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
				<h2 style={{margin:0}}>📦 Módulos disponibles</h2>
				<button 
					onClick={() => { localStorage.removeItem(KEY); window.location.reload() }}
					style={{padding:'8px 14px',background:'#ef4444',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontSize:13}}
				>
					Reset installs
				</button>
			</div>

			<div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))',gap:16}}>
				{MODULES.map(m => (
					<div key={m.id} style={{border:'1px solid #e5e7eb',padding:16,borderRadius:8,background:'#fff',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
						<div style={{display:'flex',justifyContent:'space-between',alignItems:'start',marginBottom:8}}>
							<h3 style={{margin:0,fontSize:18,color:'#1f2937'}}>{m.name}</h3>
							{installed.includes(m.id) && <span style={{background:'#10b981',color:'#fff',padding:'2px 8px',borderRadius:4,fontSize:11,fontWeight:600}}>INSTALADO</span>}
						</div>
						<p style={{color:'#6b7280',fontSize:14,marginBottom:12}}>{m.description}</p>
						<div style={{display:'flex',gap:8}}>
							<button 
								onClick={() => onToggle(m.id)}
								style={{flex:1,padding:'8px 12px',background:installed.includes(m.id) ? '#fef2f2' : '#eff6ff',color:installed.includes(m.id) ? '#991b1b' : '#1e40af',border:'1px solid',borderColor:installed.includes(m.id) ? '#fecaca' : '#bfdbfe',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:500}}
							>
								{installed.includes(m.id) ? '❌ Desinstalar' : '✅ Instalar'}
							</button>
							<button 
								onClick={() => onOpen(m.id)}
								style={{padding:'8px 16px',background:'#4f46e5',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:500}}
							>
								Abrir →
							</button>
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
			<div style={{textAlign:'center',padding:40}}>
				<h2>❌ Módulo no encontrado</h2>
				<p style={{color:'#6b7280'}}>ID: {modId}</p>
				<button onClick={onBack} style={{padding:'8px 16px',background:'#4f46e5',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',marginTop:12}}>
					← Volver a módulos
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
			default: return <div style={{color:'#999',padding:20,textAlign:'center'}}>Componente no disponible</div>
		}
	}

	return (
		<div>
			<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16,padding:16,background:'#f9fafb',borderRadius:8}}>
				<div>
					<h2 style={{margin:0,fontSize:24}}>{mod.name}</h2>
					<p style={{margin:'4px 0 0 0',color:'#6b7280',fontSize:14}}>{mod.description}</p>
				</div>
				<div style={{display:'flex',gap:8,alignItems:'center'}}>
					<span style={{padding:'6px 12px',background:installed.includes(mod.id) ? '#d1fae5' : '#fee2e2',color:installed.includes(mod.id) ? '#065f46' : '#991b1b',borderRadius:6,fontSize:13,fontWeight:600}}>
						{installed.includes(mod.id) ? '✓ Instalado' : '○ No instalado'}
					</span>
					<button 
						onClick={() => onToggle(mod.id)}
						style={{padding:'8px 14px',background:'#4f46e5',color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:500}}
					>
						{installed.includes(mod.id) ? 'Desinstalar' : 'Instalar'}
					</button>
					<button 
						onClick={onBack}
						style={{padding:'8px 14px',background:'#fff',color:'#374151',border:'1px solid #d1d5db',borderRadius:6,cursor:'pointer',fontSize:13,fontWeight:500}}
					>
						← Volver
					</button>
				</div>
			</div>

			<div style={{background:'#fff',borderRadius:8,overflow:'hidden',boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
				{renderPageComponent(mod.id)}
			</div>
		</div>
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
