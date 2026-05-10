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
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="bg-blue-900 text-white py-24 px-8 text-center">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          Logística inteligente <br />
          <span className="text-blue-300">para tu empresa</span>
        </h1>
        <p className="text-blue-200 text-lg max-w-xl mx-auto mb-8">
          SmartLogix centraliza la gestión de inventario, pedidos y envíos
          en una sola plataforma segura y eficiente.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/catalogo"
            className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition-colors"
          >
            Ver Catálogo
          </Link>
          <Link
            to="/login"
            className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            Iniciar Sesión
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-blue-800 text-white py-10 px-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {stats.map(stat => (
            <div key={stat.label}>
              <p className="text-4xl font-bold text-blue-200">{stat.value}</p>
              <p className="text-sm text-blue-300 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-8 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">
            Todo lo que necesitas en un solo lugar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map(feature => (
              <div
                key={feature.title}
                className="flex gap-4 p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow"
              >
                <span className="text-4xl">{feature.icon}</span>
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-50 py-16 px-8 text-center border-t border-blue-100">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">
          ¿Listo para optimizar tu logística?
        </h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Únete a cientos de empresas que ya confían en SmartLogix para gestionar
          sus operaciones.
        </p>
        <Link
          to="/login"
          className="bg-blue-900 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-800 transition-colors"
        >
          Comenzar ahora
        </Link>
      </section>

    </div>
  )
}

export default Landing