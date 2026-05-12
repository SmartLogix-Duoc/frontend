import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protege rutas según autenticación y rol.
 *
 * Uso básico (solo requiere sesión):
 *   <PrivateRoute><MiPage /></PrivateRoute>
 *
 * Uso con roles permitidos:
 *   <PrivateRoute roles={['ADMIN']}><AdminPage /></PrivateRoute>
 *
 * @param {React.ReactNode} children   - Componente a renderizar si tiene acceso
 * @param {string[]}        roles      - Roles permitidos. Si no se pasa, solo valida sesión
 */
function PrivateRoute({ children, roles }) {
  const { isAuthenticated, user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Cargando…
      </div>
    )
  }

  // Sin sesión → redirige al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Con sesión pero sin el rol requerido → redirige al catálogo
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/catalogo" replace />
  }

  return children
}

export default PrivateRoute