import { Routes, Route } from 'react-router-dom'

// ── Layouts ──
import PanaderiaLayout from '../components/layout/PanaderiaLayout'
import SmartLogixLayout from '../components/layout/SmartLogixLayout'

// ── Páginas Públicas (Panadería) ──
import Panaderia from '../pages/Panaderia'
import MenuPanaderia from '../pages/MenuPanaderia'
import DetalleProducto from '../pages/DetalleProducto'

// ── Páginas Privadas (SmartLogix) ──
import Login from '../pages/Login'
import Landing from '../pages/Landing'
import GestionInventario from '../pages/GestionInventario'
import Perfil from '../pages/Perfil'
import Pedido from '../pages/Pedido'
import Envio from '../pages/Envio'

import PrivateRoute from './PrivateRoute'

function AppRoutes() {
  return (
    <Routes>

      {/* ── MUNDO 1: PANADERÍA (B2C) ── */}
      <Route element={<PanaderiaLayout />}>
        <Route path="/" element={<Panaderia />} />
        <Route path="/menu" element={<MenuPanaderia />} />
        <Route path="/detalle/:id" element={<DetalleProducto />} />
      </Route>

      {/* ── MUNDO 2: SOFTWARE LOGÍSTICO (SmartLogix) ── */}
      <Route element={<SmartLogixLayout />}>
        <Route path="/login" element={<Login />} />
        
        {/* Rutas protegidas para ADMIN / USER */}
        <Route path="/gestion" element={
          <PrivateRoute roles={['ADMIN', 'USER']}>
            <Landing />
          </PrivateRoute>
        } />

        {/* AQUÍ ESTÁ LA RUTA QUE TE DABA ERROR */}
        <Route path="/inventario" element={
          <PrivateRoute roles={['ADMIN', 'USER']}>
            <GestionInventario />
          </PrivateRoute>
        } />

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

        {/* Ruta para Clientes B2B */}
        <Route path="/client" element={
          <PrivateRoute roles={['CLIENT']}>
            <div className="min-h-screen flex items-center justify-center">
              <p className="text-2xl font-bold text-blue-900">Próximamente para clientes</p>
            </div>
          </PrivateRoute>
        } />
      </Route>

      {/* 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl">Página no encontrada</p>
        </div>
      } />

    </Routes>
  )
}

export default AppRoutes