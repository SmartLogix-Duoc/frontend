import { Outlet, Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'

function PanaderiaLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7]">
      {/* Navbar propio de la Panadería */}
      <nav className="bg-[#3D1C02] text-white px-8 py-4 flex items-center justify-between shadow-md">
        <Link to="/" className="font-bold text-xl tracking-wide text-[#E5B65E] flex items-center gap-2">
          <span className="text-2xl">🥐</span> Delicias
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/menu" className="hover:text-[#E5B65E] transition-colors flex items-center gap-2 font-medium">
            <ShoppingBag className="w-5 h-5" /> Ver Catálogo
          </Link>
          <Link to="/login" className="text-sm bg-white text-[#3D1C02] px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition-all shadow-sm">
            Acceso Empleados
          </Link>
        </div>
      </nav>

      {/* Aquí adentro se mostrará Panaderia.jsx, Catalogo.jsx o Producto.jsx */}
      <main className="flex-1">
        <Outlet /> 
      </main>

      {/* Footer propio de la Panadería */}
      <footer className="bg-[#3D1C02] text-[#F5F0E8] text-center py-8">
        <p className="font-medium">Panadería Delicias © {new Date().getFullYear()}. Todos los derechos reservados.</p>
        <p className="text-xs text-[#C9972C] mt-2 opacity-80">Logística impulsada por SmartLogix</p>
      </footer>
    </div>
  )
}

export default PanaderiaLayout