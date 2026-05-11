import { Link } from 'react-router-dom'

const features = [
  {
    icon: '📦',
    title: 'Gestión de Inventario',
    description: 'Control total sobre tu stock en tiempo real desde cualquier lugar.',
  },
  {
    icon: '🚚',
    title: 'Seguimiento de Envíos',
    description: 'Rastrea tus envíos en cada etapa del proceso logístico.',
  },
  {
    icon: '📋',
    title: 'Gestión de Pedidos',
    description: 'Administra y procesa pedidos de forma eficiente y organizada.',
  },
  {
    icon: '🔒',
    title: 'Seguridad garantizada',
    description: 'Acceso seguro con autenticación JWT para proteger tu información.',
  },
]

const stats = [
  { value: '+500', label: 'Empresas confían en nosotros' },
  { value: '+10.000', label: 'Envíos gestionados al mes' },
  { value: '99.9%', label: 'Disponibilidad del sistema' },
]

function Landing() {
  // Comprobamos si hay un token para saber si el usuario ya inició sesión
  const estaAutenticado = !!localStorage.getItem('token');

  return (
    <div className="flex flex-col animate-fadeIn">

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-24 px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            Logística inteligente <br />
            <span className="text-blue-400">para tu empresa</span>
          </h1>
          <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            SmartLogix centraliza la gestión de inventario, pedidos y envíos 
            en una sola plataforma segura, escalable y eficiente.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              to="/catalogo"
              className="bg-white text-blue-900 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
            >
              Explorar Catálogo
            </Link>
            
            {/* Botón dinámico según si está logueado o no */}
            <Link
              to={estaAutenticado ? "/dashboard" : "/login"}
              className="bg-blue-700 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-600 border border-blue-500 transition-all transform hover:scale-105"
            >
              {estaAutenticado ? "Ir a mi Panel" : "Iniciar Sesión"}
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 px-8 border-y border-gray-100 shadow-inner">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {stats.map(stat => (
            <div key={stat.label} className="group">
              <p className="text-4xl font-extrabold text-blue-900 group-hover:scale-110 transition-transform">
                {stat.value}
              </p>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(feature => (
              <div
                key={feature.title}
                className="flex gap-6 p-8 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="bg-blue-50 w-16 h-16 flex items-center justify-center rounded-2xl text-4xl shrink-0">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-blue-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="bg-blue-900 py-20 px-8 text-center relative overflow-hidden">
        {/* Decoración de fondo */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-white rounded-full"></div>
            <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-blue-400 rounded-full"></div>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¿Listo para optimizar tu logística?
          </h2>
          <p className="text-blue-200 mb-10 max-w-lg mx-auto text-lg">
            Únete a las empresas que ya escalan sus operaciones con nuestra tecnología de punta.
          </p>
          <Link
            to="/login"
            className="inline-block bg-blue-500 text-white font-bold px-10 py-4 rounded-xl hover:bg-blue-400 transition-colors shadow-lg"
          >
            Comenzar Gratis
          </Link>
        </div>
      </section>

      {/* Footer simple */}
      <footer className="bg-white py-8 text-center border-t border-gray-100">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} SmartLogix - Soluciones Logísticas Inteligentes.
        </p>
      </footer>

    </div>
  )
}

export default Landing