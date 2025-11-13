import './App.css'
import Rutas from './routes/Rutas'

// Asegurar que no hay márgenes
if (typeof document !== 'undefined') {
  document.body.style.margin = '0'
  document.body.style.padding = '0'
  document.documentElement.style.margin = '0'
  document.documentElement.style.padding = '0'
}

function App() {
  return (
    <div className="app-root" style={{fontFamily:'Inter, Roboto, sans-serif', minHeight: '100vh', backgroundColor: '#ffffff', margin: 0, padding: 0, width: '100%'}}>
      <Rutas />
    </div>
  )
}

export default App
