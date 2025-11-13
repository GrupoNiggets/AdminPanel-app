import React, { useState } from 'react'
import './Posts.css'

export default function Posts() {
  const [posts] = useState([
    { id: 1, title: 'Bienvenido a AdminPanel', author: 'Admin', date: '2025-11-10', views: 234, category: 'Noticias' },
    { id: 2, title: 'Nuevas funcionalidades', author: 'Desarrollador', date: '2025-11-12', views: 156, category: 'Actualizaciones' },
    { id: 3, title: 'Guía de inicio rápido', author: 'Soporte', date: '2025-11-13', views: 89, category: 'Tutoriales' }
  ])

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h3>📝 Publicaciones</h3>
        <button className="btn-new-post">+ Nueva publicación</button>
      </div>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <div className="post-category">{post.category}</div>
            <h4 className="post-title">{post.title}</h4>
            <div className="post-meta">
              <span>✍️ {post.author}</span>
              <span>📅 {post.date}</span>
              <span>👁️ {post.views} vistas</span>
            </div>
            <div className="post-actions">
              <button className="btn-edit">Editar</button>
              <button className="btn-delete">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
