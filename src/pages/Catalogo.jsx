import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../api/catalogoService'

function Catalogo() {
  const [productos, setProductos]         = useState([])
  const [busqueda, setBusqueda]           = useState('')
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)

  useEffect(() => {
    getProductos()
      .then(lista => setProductos(lista))
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }, [])

  const productosFiltrados = productos.filter(p =>
    p.name.toLowerCase().includes(busqueda.toLowerCase())
  )

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center text-gray-400">
        Cargando catálogo…
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">
        <p className="text-red-600 font-medium">Error al cargar el catálogo</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Catálogo</h1>
        <p className="text-gray-500 text-sm">
          {productosFiltrados.length} productos disponibles
        </p>
      </div>

      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar producto…"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm w-full md:max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {productosFiltrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">Sin resultados</p>
          <p className="text-sm">Intenta con otro término de búsqueda</p>
        </div>
      ) : (
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
                <h3 className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">
                  {producto.name}
                </h3>
                {producto.description && (
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {producto.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-bold text-sm">
                  ${Number(producto.price).toLocaleString('es-CL')}
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
