import { Outlet } from 'react-router-dom'
import Navbar from './Navbar' // Asegúrate de que la ruta al Navbar sea correcta
import Footer from './Footer' // Asegúrate de que la ruta al Footer sea correcta

function SmartLogixLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* El Navbar azul de siempre */}
      <Navbar /> 
      
      {/* Aquí adentro se mostrará Login, Perfil, Pedidos, etc. */}
      <main className="flex-1">
        <Outlet /> 
      </main>

      {/* El Footer azul de siempre */}
      <Footer />
    </div>
  )
}

export default SmartLogixLayout