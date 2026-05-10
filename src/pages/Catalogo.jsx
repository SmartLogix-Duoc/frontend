import { useState } from 'react'
import { Link } from 'react-router-dom'

const productos = [
  { id: 1, nombre: 'Laptop Dell XPS 15', categoria: 'Electrónica', precio: 1299990, stock: 15 },
  { id: 2, nombre: 'Monitor LG 27"', categoria: 'Electrónica', precio: 349990, stock: 8 },
  { id: 3, nombre: 'Teclado Mecánico Logitech', categoria: 'Periféricos', precio: 89990, stock: 32 },
  { id: 4, nombre: 'Mouse Inalámbrico', categoria: 'Periféricos', precio: 29990, stock: 50 },
  { id: 5, nombre: 'Silla Ergonómica', categoria: 'Muebles', precio: 459990, stock: 5 },
  { id: 6, nombre: 'Escritorio Standing', categoria: 'Muebles', precio: 599990, stock: 3 },
  { id: 7, nombre: 'Auriculares Sony WH-1000XM5', categoria: 'Electrónica', precio: 299990, stock: 12 },
  { id: 8, nombre: 'Webcam Logitech C920', categoria: 'Periféricos', precio: 79990, stock: 20 },
]

const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))]

function Catalogo() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  // TODO: reemplazar productos hardcodeados con:
  // const [productos, setProductos] = useState([])
  // useEffect(() => {
  //   fetch('http://localhost:8002/api/inventario/', {
  //     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //   })
  //   .then(r => r.json())
  //   .then(data => setProductos(data))
  // }, [])

  const productosFiltrados = productos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaActiva === 'Todas' || p.categoria === categoriaActiva
    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Catálogo</h1>
        <p className="text-gray-500 text-sm">
          {productosFiltrados.length} productos disponibles
        </p>
      </div>

      {/* Búsqueda y filtros */}
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

      {/* Grid de productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">Sin resultados</p>
          <p className="text-sm">Intenta con otro término o categoría</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productosFiltrados.map(producto => (
            <Link
              key={producto.id}
              to={`/producto/${producto.id}`}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
            >
              {/* Imagen placeholder */}
              <div className="bg-blue-50 rounded-lg h-36 flex items-center justify-center">
                <span className="text-4xl">📦</span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <span className="text-xs text-blue-600 font-medium">
                  {producto.categoria}
                </span>
                <h3 className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">
                  {producto.nombre}
                </h3>
              </div>

              {/* Precio y stock */}
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-bold text-sm">
                  ${producto.precio.toLocaleString('es-CL')}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${producto.stock > 10
                    ? 'bg-green-100 text-green-700'
                    : producto.stock > 0
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-red-100 text-red-600'}`}>
                  {producto.stock > 0 ? `${producto.stock} en stock` : 'Sin stock'}
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
