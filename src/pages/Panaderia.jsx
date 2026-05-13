import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Leaf, Star, Truck, ArrowRight, ShoppingBag } from 'lucide-react'
import { getProductos } from '../api/catalogoService'

const valores = [
  {
    Icon: Leaf,
    titulo: 'Frescura Diaria',
    descripcion: 'Horneado cada mañana con ingredientes 100% naturales y seleccionados.',
  },
  {
    Icon: Star,
    titulo: 'Tradición Artesanal',
    descripcion: 'Recetas de masa madre pasadas de generación en generación.',
  },
  {
    Icon: Truck,
    titulo: 'Entrega Rápida',
    descripcion: 'Logística impulsada por SmartLogix para que el pan llegue caliente a tu puerta.',
  },
]

function Panaderia() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductos()
      .then(data => {
        const items = Array.isArray(data) ? data : []
        setProductos(items.slice(0, 4)) // Mostrar solo los 4 primeros
      })
      .catch(() => setProductos([])) // Si falla, mostramos vacío en vez de romper
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#FDFBF7] font-sans">
      
      {/* ── Hero Section con Imagen ── */}
      <section className="relative h-[600px] flex items-center justify-center">
        {/* Imagen de fondo (Unsplash) y Overlay oscuro */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80')" }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="text-[#E5B65E] font-semibold tracking-wider uppercase text-sm mb-4 block">
            Panadería Delicias
          </span>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Pan fresco y artesanal, directo a tu mesa
          </h1>
          <p className="text-lg text-gray-200 mb-10">
            Descubre el sabor de la verdadera tradición. Haz tu pedido hoy y recíbelo con la velocidad de nuestra logística inteligente.
          </p>
          <div className="flex justify-center gap-4">
            <Link
          to="/menu"
          className="bg-[#C9972C] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#b08426] transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
        <ShoppingBag className="w-5 h-5" />
          Ver Menú
</Link>
          </div>
        </div>
      </section>

      {/* ── Sección de Valores ── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-[#3D1C02]">Nuestra Promesa</h2>
          <div className="w-24 h-1 bg-[#C9972C] mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {valores.map(v => (
            <div key={v.titulo} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-[#F0EBE1] hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FDF8EE] rounded-full flex items-center justify-center mb-6">
                <v.Icon className="w-8 h-8 text-[#C9972C]" />
              </div>
              <h3 className="text-xl font-bold text-[#3D1C02] mb-3">{v.titulo}</h3>
              <p className="text-gray-600 leading-relaxed">{v.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Productos Destacados ── */}
      <section className="py-20 px-6 bg-white border-t border-[#F0EBE1]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-[#3D1C02]">Recién Salidos del Horno</h2>
              <p className="text-gray-500 mt-2">Nuestra selección especial del día</p>
            </div>
            <Link to="/menu" className="hidden md:flex items-center gap-2 text-[#C9972C] font-semibold hover:text-[#b08426] transition-colors">
              Ver todos <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C9972C]"></div></div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {productos.map(p => (
                <Link key={p.id} to={`/producto/${p.id}`} className="group block bg-[#FDFBF7] rounded-2xl overflow-hidden border border-[#F0EBE1] hover:border-[#C9972C] transition-colors">
                  <div className="h-48 bg-[#F5F0E6] flex items-center justify-center relative overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-300">🥐</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-[#3D1C02] text-lg mb-1">{p.name}</h3>
                    <p className="text-[#C9972C] font-bold text-xl">${Number(p.price).toLocaleString('es-CL')}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-8 text-center md:hidden">
             <Link to="/menu" className="inline-flex items-center gap-2 text-[#C9972C] font-semibold">
              Ver todo el catálogo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Panaderia