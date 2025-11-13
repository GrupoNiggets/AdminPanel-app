import React, { useState } from 'react'
import './Chat.css'

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Admin', text: 'Bienvenido al chat', time: '10:30' },
    { id: 2, user: 'Usuario1', text: 'Hola, ¿cómo están?', time: '10:32' },
    { id: 3, user: 'Usuario2', text: 'Todo bien, gracias', time: '10:35' }
  ])
  const [newMsg, setNewMsg] = useState('')

  const sendMessage = () => {
    if (!newMsg.trim()) return
    const msg = {
      id: messages.length + 1,
      user: 'Tú',
      text: newMsg,
      time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    }
    setMessages([...messages, msg])
    setNewMsg('')
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>💬 Chat en vivo</h3>
        <span className="status-badge">● {messages.length} mensajes</span>
      </div>
      
      <div className="messages-list">
        {messages.map(msg => (
          <div key={msg.id} className="message-item">
            <div className="message-header">
              <strong>{msg.user}</strong>
              <span className="message-time">{msg.time}</span>
            </div>
            <div className="message-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  )
}
