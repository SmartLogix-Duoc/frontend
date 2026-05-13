import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../api/catalogoService'
import { Search } from 'lucide-react'

function MenuPanaderia() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getProductos()
      .then(setProductos)
      .finally(() => setLoading(false))
  }, [])

  const filtrados = productos.filter(p => 
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-[#3D1C02] mb-6">Nuestro Menú</h1>
          
          {/* Buscador de Panadería */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text"
              placeholder="Buscar por nombre (ej. Marraqueta, Hallulla...)"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-[#F0EBE1] focus:outline-none focus:border-[#C9972C] shadow-sm"
            />
          </div>
        </header>

        {loading ? (
          <div className="text-center text-[#C9972C] font-bold">Horneando catálogo...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filtrados.map(p => (
              <Link to={`/detalle/${p.id}`} key={p.id} className="group block bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all border border-[#F0EBE1]">
                <div className="aspect-square bg-[#FDF8EE] rounded-2xl flex items-center justify-center text-6xl mb-5 group-hover:scale-105 transition-transform duration-300">
                  🥐
                </div>
                <h3 className="font-bold text-[#3D1C02] text-xl mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{p.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-[#C9972C] font-black text-2xl">${Number(p.price).toLocaleString('es-CL')}</span>
                  <span className="bg-[#3D1C02] text-white text-sm px-4 py-2 rounded-full font-bold">Ver +</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MenuPanaderia