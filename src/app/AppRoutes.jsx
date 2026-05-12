import { Routes, Route } from 'react-router-dom'
import Landing  from '../pages/Landing'
import Login    from '../pages/Login'
import Catalogo from '../pages/Catalogo'
import Producto from '../pages/Producto'
import Perfil   from '../pages/Perfil'
import Pedido   from '../pages/Pedido'
import Envio    from '../pages/Envio'
import PrivateRoute from './PrivateRoute'

function AppRoutes() {
  return (
    <Routes>

      {/* ── Rutas públicas: cualquiera puede acceder ──────────────────────── */}
      <Route path="/"             element={<Landing />} />
      <Route path="/login"        element={<Login />} />
      <Route path="/catalogo"     element={<Catalogo />} />
      <Route path="/producto/:id" element={<Producto />} />

      {/* ── Rutas protegidas: requieren sesión activa ─────────────────────── */}
      <Route path="/pedidos" element={
        <PrivateRoute roles={['ADMIN', 'USER']}>
          <Pedido />
        </PrivateRoute>
      } />
      <Route path="/envio/:id" element={
        <PrivateRoute roles={['ADMIN', 'USER']}>
          <Envio />
        </PrivateRoute>
      } />
      <Route path="/perfil" element={
        <PrivateRoute roles={['ADMIN', 'USER']}>
          <Perfil />
        </PrivateRoute>
      } />

      {/* ── Rutas protegidas: solo ADMIN ─────────────────────────────────── */}
      {/* <Route path="/admin/..." element={
        <PrivateRoute roles={['ADMIN']}>
          <AdminPage />
        </PrivateRoute>
      } /> */}

      {/* ── Rutas protegidas: CLIENT (reservado, sin página aún) ─────────── */}
      <Route path="/client" element={
        <PrivateRoute roles={['CLIENT']}>
          <div className="min-h-screen flex items-center justify-center text-center px-6">
            <div>
              <p className="text-5xl mb-4">🚧</p>
              <p className="text-2xl font-bold text-blue-900 mb-2">Próximamente</p>
              <p className="text-gray-500 text-sm">
                Esta sección está en desarrollo.
              </p>
            </div>
          </div>
        </PrivateRoute>
      } />

      {/* ── 404 ──────────────────────────────────────────────────────────── */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center text-center px-6">
          <div>
            <p className="text-6xl font-bold text-blue-900 mb-4">404</p>
            <p className="text-gray-500">Página no encontrada</p>
          </div>
        </div>
      } />

    </Routes>
  )
}

export default AppRoutes
