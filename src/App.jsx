import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Perfil from './pages/Perfil'
import Catalogo from './pages/Catalogo'
import Producto from './pages/Producto'
import Pedido from './pages/Pedido'
import Envio from './pages/Envio'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/producto/:id" element={<Producto />} />
            <Route path="/pedido/:id" element={<Pedido />} />
            <Route path="/envio/:id" element={<Envio />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App