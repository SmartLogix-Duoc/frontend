import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Package, ShoppingCart, Truck, User, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'

const cards = [
  {
    Icon: Package,
    title: 'Gestión de Inventario',
    desc: 'Administra tu catálogo, categorías y stock disponible',
    link: '/inventario', // ¡LINK CORREGIDO!
    label: 'Ir a Inventario',
    color: 'text-blue-600',
    bg: 'bg-blue-100'
  },
  {
    Icon: ShoppingCart,
    title: 'Control de Pedidos',
    desc: 'Revisa y gestiona los pedidos recibidos de tus clientes',
    link: '/pedidos',
    label: 'Ver Pedidos',
    color: 'text-emerald-600',
    bg: 'bg-emerald-100'
  },
  {
    Icon: Truck,
    title: 'Logística y Envíos',
    desc: 'Rastrea cada entrega y gestiona los estados de despacho',
    link: '/pedidos', // Usualmente los envíos se gestionan desde el pedido
    label: 'Gestionar Envíos',
    color: 'text-amber-600',
    bg: 'bg-amber-100'
  },
  {
    Icon: User,
    title: 'Mi Perfil PYME',
    desc: 'Configuración de cuenta, sucursales y datos del negocio',
    link: '/perfil',
    label: 'Ir a Perfil',
    color: 'text-purple-600',
    bg: 'bg-purple-100'
  },
]

function Landing() {
  const { user } = useAuth()
  
  const now = new Date()
  const dateStr = now.toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Determinamos el rol visualmente
  const isSuperAdmin = user?.role === 'ADMIN'

  return (
    <div className="min-h-screen bg-[#F4F7FB] flex flex-col">
      
      {/* ── HEADER SAAS MODERNO ── */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-800 pb-24 pt-10 px-6 shadow-inner">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-blue-200 text-sm capitalize mb-1">{dateStr}</p>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Bienvenido, {user?.username || 'Usuario'} 👋
            </h1>
            <p className="text-blue-100 text-sm mt-2">
              Panel de control principal de tu negocio
            </p>
          </div>
          
          {/* Badge de Rol */}
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 ${isSuperAdmin ? 'bg-amber-500/20 border-amber-400 text-amber-300' : 'bg-white/10 border-white/20 text-white'}`}>
            <span className={`w-2 h-2 rounded-full ${isSuperAdmin ? 'bg-amber-400' : 'bg-green-400'} animate-pulse`}></span>
            {isSuperAdmin ? 'SUPER ADMIN (SmartLogix)' : 'ADMINISTRADOR (PYME)'}
          </div>
        </div>
      </header>

      {/* ── CONTENIDO SUPERPUESTO (-mt-12 para dar efecto 3D) ── */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-6 -mt-12 mb-12">
        
        {/* Estadísticas Rápidas (Mockup visual para que se vea pro) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Ventas del mes</p>
              <p className="text-2xl font-bold text-gray-800">$1.240.500</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600">
              <TrendingUp size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Pedidos Pendientes</p>
              <p className="text-2xl font-bold text-gray-800">14</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <AlertCircle size={24} />
            </div>
          </div>
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium">Envíos Completados</p>
              <p className="text-2xl font-bold text-gray-800">128</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        {/* Tarjetas de Navegación */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map(c => (
            <Link
              to={c.link}
              key={c.title}
              className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decoración de fondo */}
              <div className={`absolute -right-6 -top-6 w-24 h-24 ${c.bg} rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500`}></div>
              
              <div className="relative flex items-start gap-5">
                <div className={`p-4 rounded-xl ${c.bg} ${c.color} shadow-sm group-hover:scale-110 transition-transform`}>
                  <c.Icon className="w-7 h-7" strokeWidth={2.5} />
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-gray-800 text-lg group-hover:text-blue-900 transition-colors">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1 leading-relaxed">{c.desc}</p>
                  <span className={`inline-flex items-center gap-1 mt-4 text-sm font-bold ${c.color}`}>
                    {c.label} <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-gray-200 px-6 py-6 text-center mt-auto">
        <p className="text-sm text-gray-600 font-medium">
          SmartLogix &middot; Plataforma Logística para PYMEs
        </p>
        <p className="text-xs text-gray-400 mt-1">Versión 1.0.0 &middot; Área Segura</p>
      </footer>
    </div>
  )
}

export default Landing