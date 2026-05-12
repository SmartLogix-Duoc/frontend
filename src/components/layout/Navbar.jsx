import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const publicLinks = [
  { label: 'Inicio',    path: '/' },
  { label: 'Catálogo', path: '/catalogo' },
]

const privateLinks = [
  { label: 'Catálogo',    path: '/catalogo' },
  { label: 'Mis Pedidos', path: '/pedidos' },
]

function Navbar() {
  const location                    = useLocation()
  const navigate                    = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const links = isAuthenticated ? privateLinks : publicLinks

  return (
    <nav className="bg-blue-900 text-white px-8 py-4 flex items-center justify-between shadow-md">

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
          <span className="text-blue-900 font-black text-sm">SL</span>
        </div>
        <span className="font-bold text-xl tracking-wide">SmartLogix</span>
      </Link>

      {/* Links centrales */}
      <div className="hidden md:flex items-center gap-6">
        {links.map(link => (
          <Link
            key={link.path}
            to={link.path}
            className={`text-sm font-medium transition-colors hover:text-blue-200
              ${location.pathname === link.path
                ? 'text-white border-b-2 border-white pb-0.5'
                : 'text-blue-200'}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Acciones según sesión */}
      <div className="flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <Link
              to="/perfil"
              className={`text-sm font-medium transition-colors hover:text-white
                ${location.pathname === '/perfil' ? 'text-white' : 'text-blue-200'}`}
            >
              Mi Perfil
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-white text-blue-900 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>

    </nav>
  )
}

export default Navbar