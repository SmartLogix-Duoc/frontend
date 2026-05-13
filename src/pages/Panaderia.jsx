import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Star, Clock, ArrowRight, ShoppingBag } from 'lucide-react'
import { getProductos } from '../api/catalogoService' // Mantenemos la llamada a tu API

const valores = [
  {
    Icon: Leaf,
    titulo: '100% Natural',
    descripcion: 'Sin conservantes, solo ingredientes seleccionados cuidadosamente para tu familia.',
  },
  {
    Icon: Star,
    titulo: 'Masa Madre',
    descripcion: 'Fermentación lenta de 48 horas para un sabor inigualable y mejor digestión.',
  },
  {
    Icon: Clock,
    titulo: 'Recién Horneado',
    descripcion: 'Siente el aroma del pan caliente saliendo del horno varias veces al día.',
  },
]

function Panaderia() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductos()
      .then(data => {
        const items = Array.isArray(data) ? data : []
        setProductos(items.slice(0, 4))
      })
      .catch(() => setProductos([]))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-orange-50/40 font-sans selection:bg-amber-700 selection:text-white">
      
      {/* ── HERO SECTION EXTREMO CON TAILWIND ── */}
      <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo con gradientes superpuestos para contraste */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-[#3D1C02]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto mt-16">
          
          {/* Badge con efecto Glassmorphism (Backdrop blur) */}
          <span className="px-6 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-md text-amber-300 text-sm font-bold tracking-[0.2em] uppercase mb-8 shadow-lg">
            Panadería Artesanal Delicias
          </span>
          
          {/* Texto con gradiente (bg-clip-text) */}
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-300 to-amber-600 mb-6 drop-shadow-2xl">
            El Arte del Buen Pan
          </h1>
          
          <p className="text-xl md:text-2xl text-amber-100/90 font-light max-w-2xl mb-10 leading-relaxed">
            Descubre el sabor de la verdadera tradición. Horneamos con pasión todos los días para llevar lo mejor directo a tu mesa.
          </p>
          
          {/* Botón con hover effects avanzados */}
          <Link 
            to="/menu" 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-amber-700 rounded-full hover:bg-amber-600 hover:shadow-[0_0_40px_rgba(217,119,6,0.5)] hover:-translate-y-1"
          >
            <ShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
            <span>Ver Nuestro Menú</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        
        {/* Difuminado suave hacia la siguiente sección */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-[#FFF9F2] to-transparent"></div>
      </section>

      {/* ── SECCIÓN VALORES (Tarjetas flotantes) ── */}
      <section className="relative z-20 py-24 px-6 max-w-7xl mx-auto -mt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {valores.map((v, idx) => (
            <div 
              key={idx} 
              className="group flex flex-col items-center text-center p-10 bg-white rounded-[2rem] shadow-xl shadow-amber-900/5 border border-amber-100/50 hover:border-amber-300 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-amber-900/10"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-50 flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                <v.Icon className="w-10 h-10 text-amber-700" />
              </div>
              <h3 className="text-2xl font-bold text-[#3D1C02] mb-4">{v.titulo}</h3>
              <p className="text-gray-600 leading-relaxed font-medium">{v.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECCIÓN PRODUCTOS DESTACADOS ── */}
      <section className="pb-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-[#3D1C02] mb-4 tracking-tight">
              Recién Salidos del Horno
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-amber-500 to-orange-400 rounded-full"></div>
          </div>
          <Link 
            to="/menu" 
            className="hidden md:flex items-center gap-2 text-amber-700 font-bold hover:text-amber-600 text-lg group transition-colors"
          >
            Explorar todo el menú 
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-amber-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productos.map(p => (
              <Link 
                key={p.id} 
                to={`/detalle/${p.id}`} 
                className="group relative bg-white rounded-3xl overflow-hidden border border-amber-100/50 hover:border-amber-400/50 shadow-lg shadow-amber-900/5 hover:shadow-2xl hover:shadow-amber-900/10 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                {/* Contenedor de la Imagen / Emoji con hover effects */}
                <div className="h-64 bg-gradient-to-br from-orange-50 to-amber-100/50 flex items-center justify-center relative overflow-hidden">
                  
                  {/* Destello de fondo al hacer hover */}
                  <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <span className="text-8xl transform transition-transform duration-700 group-hover:scale-125 group-hover:rotate-6">
                    {p.name.toLowerCase().includes('pastel') ? '🍰' : '🥐'}
                  </span>
                  
                  {/* Etiqueta flotante que aparece en hover */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-black text-amber-800 shadow-sm transform -translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Ver Detalles
                  </div>
                </div>
                
                {/* Contenido de la tarjeta */}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-[#3D1C02] text-xl mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">
                    {p.description || "Delicioso producto horneado con los mejores ingredientes de la casa."}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <p className="text-amber-600 font-black text-2xl">
                      ${Number(p.price).toLocaleString('es-CL')}
                    </p>
                    <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center group-hover:bg-amber-600 transition-colors duration-300">
                      <ArrowRight className="w-5 h-5 text-amber-600 group-hover:text-white" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {/* Botón móvil */}
        <div className="mt-12 text-center md:hidden">
            <Link 
            to="/menu" 
            className="inline-flex items-center justify-center w-full px-6 py-4 bg-amber-100 text-amber-900 rounded-2xl font-bold gap-2 active:bg-amber-200 transition-colors"
            >
            Ver todo el menú <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  )
}

export default Panaderia