
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Dashboard, Geracoes, Unidades } from './pages'
import './App.css'

function App() {

  return (
    <BrowserRouter>

    <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/dashboard" element={<Navigate replace to="/" />} />
    <Route path="/unidades" element={<Unidades />} />
    <Route path="/cadastro" element={<Geracoes />} />
    <Route path="*" element={<h1>Rota não encontrada</h1>} />
     </Routes>
    </BrowserRouter>
  )
}

export default App
