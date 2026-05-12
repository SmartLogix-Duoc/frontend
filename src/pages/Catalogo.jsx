import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts } from '../api'

function Catalogo() {
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        setCargando(true)
        // GET /api/products → ProductDTO[]
        const { data } = await getAllProducts()
        setProductos(data)
      } catch (err) {
        setError('No se pudo cargar el catálogo. Verifica tu conexión.')
        console.error('Error al obtener productos:', err)
      } finally {
        setCargando(false)
      }
    }
    obtenerProductos()
  }, [])

  // Campos del ProductDTO: id, name, description, price
  // Mapeamos "name" → "nombre" y "price" → "precio" para el filtrado y la UI
  const categorias = ['Todas', ...new Set(productos.map(p => p.category).filter(Boolean))]

  const productosFiltrados = productos.filter(p => {
    const nombre = p.name || p.nombre || ''
    const categoria = p.category || p.categoria || ''
    const coincideBusqueda = nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaActiva === 'Todas' || categoria === categoriaActiva
    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Catálogo SmartLogix</h1>
        <p className="text-gray-500 text-sm">
          {cargando ? 'Cargando...' : `${productosFiltrados.length} productos disponibles`}
        </p>
      </div>

      {/* Buscador y Filtros */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-2 flex-wrap">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors
                ${categoriaActiva === cat
                  ? 'bg-blue-900 text-white border-blue-900'
                  : 'border-gray-300 text-gray-600 hover:border-blue-400'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Estado de carga y error */}
      {cargando && (
        <div className="text-center py-20 text-gray-400">
          <p className="animate-pulse text-lg">Cargando catálogo...</p>
        </div>
      )}

      {!cargando && error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Grid de Productos */}
      {!cargando && !error && productosFiltrados.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">Sin productos en el inventario</p>
        </div>
      )}

      {!cargando && !error && productosFiltrados.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <Link
              key={producto.id}
              to={`/producto/${producto.id}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              <div className="bg-blue-50 rounded-lg h-36 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>
              <div className="flex-1">
                <span className="text-xs text-blue-600 font-medium">{producto.category || producto.categoria || 'General'}</span>
                <h3 className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">
                  {producto.name || producto.nombre}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-bold text-sm">
                  ${Number(producto.price ?? producto.precio ?? 0).toLocaleString('es-CL')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Catalogo