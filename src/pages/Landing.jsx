import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Package, ShoppingCart, Truck, User, LayoutDashboard, Settings } from 'lucide-react'

const cards = [
  {
    Icon: LayoutDashboard,
    title: 'Panel de Control',
    desc: 'Visión general del estado de tu negocio en tiempo real.',
    link: '/gestion',
    label: 'Ir al Panel',
    color: 'text-indigo-600',
    bg: 'bg-indigo-50'
  },
  {
    Icon: Package,
    title: 'Gestión de Inventario',
    desc: 'Administra productos, stock y categorías.',
    link: '/catalogo', // Podrías cambiar esto a /inventario si ya limpiaste la ruta
    label: 'Controlar Stock',
    color: 'text-blue-600',
    bg: 'bg-blue-50'
  },
  {
    Icon: ShoppingCart,
    title: 'Control de Pedidos',
    desc: 'Gestiona ventas entrantes y estados de pago.',
    link: '/pedidos',
    label: 'Gestionar Ventas',
    color: 'text-emerald-600',
    bg: 'bg-emerald-50'
  },
  {
    Icon: Truck,
    title: 'Logística de Envíos',
    desc: 'Seguimiento de rutas y tiempos de entrega.',
    link: '/pedidos',
    label: 'Rastrear Envíos',
    color: 'text-amber-600',
    bg: 'bg-amber-50'
  }
]

function Landing() {
  const { user } = useAuth()
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-8 py-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">
              Dashboard de <span className="text-blue-900">Gestión</span>
            </h1>
            <p className="text-gray-500 mt-1 font-medium">
              Hola, {user?.username} • Bienvenido al centro operativo de SmartLogix
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/perfil" className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all">
              <User className="w-4 h-4" /> Mi Cuenta
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((c, i) => (
            <Link
              key={i}
              to={c.link}
              className="group relative bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all overflow-hidden"
            >
              <div className="relative z-10 flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${c.bg} ${c.color} group-hover:scale-110 transition-transform`}>
                  <c.Icon className="w-8 h-8" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl group-hover:text-blue-900 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                    {c.desc}
                  </p>
                  <div className={`mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider ${c.color}`}>
                    {c.label} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
              {/* Decoración sutil de fondo */}
              <div className={`absolute -right-8 -bottom-8 w-32 h-32 ${c.bg} rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700`}></div>
            </Link>
          ))}
        </div>

        {/* Sección Extra de "Estado" */}
        <div className="mt-12 bg-blue-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-900/30">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Settings className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Optimización Logística</h4>
              <p className="text-blue-200 text-sm">Todos los sistemas están operando con normalidad.</p>
            </div>
          </div>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold text-sm hover:bg-blue-50 transition-colors">
            Ver Reportes
          </button>
        </div>
      </main>

      <footer className="px-8 py-8 text-center">
        <p className="text-xs text-gray-400 font-bold tracking-widest uppercase">
          SmartLogix Platform v2.0 &middot; 2026
        </p>
      </footer>
    </div>
  )
}

export default Landing