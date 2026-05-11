import { useState, useEffect } from 'react' // Importamos useEffect
import { Link } from 'react-router-dom'

function Catalogo() {
  // 1. Ahora el estado de productos empieza como una lista vacía
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [categoriaActiva, setCategoriaActiva] = useState('Todas')

  // 2. useEffect para disparar la búsqueda de datos cuando se cargue el componente
  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch('http://localhost:8002/api/inventario/', {
          headers: { 
            'Authorization': `Bearer ${localStorage.getItem('token')}` 
          }
        })
        if (response.ok) {
          const data = await response.json()
          setProductos(data)
        } else {
          console.error("Error al obtener productos")
        }
      } catch (error) {
        console.error("Error de conexión:", error)
      }
    }

    obtenerProductos()
  }, []) // El array vacío [] significa que esto solo se ejecuta UNA VEZ al cargar

  // 3. Generamos las categorías dinámicamente basadas en lo que llegue de la API
  const categorias = ['Todas', ...new Set(productos.map(p => p.categoria))]

  const productosFiltrados = productos.filter(p => {
    const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase())
    const coincideCategoria = categoriaActiva === 'Todas' || p.categoria === categoriaActiva
    return coincideBusqueda && coincideCategoria
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* ... (El resto del JSX se mantiene igual que tu código original) ... */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Catálogo SmartLogix</h1>
        <p className="text-gray-500 text-sm">
          {productosFiltrados.length} productos disponibles
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

      {/* Grid de Productos */}
      {productosFiltrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-lg font-medium">Sin productos en el inventario</p>
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
                <span className="text-xs text-blue-600 font-medium">{producto.categoria}</span>
                <h3 className="text-sm font-semibold text-gray-800 mt-0.5 leading-tight">{producto.nombre}</h3>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-bold text-sm">
                  ${Number(producto.precio).toLocaleString('es-CL')}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                  ${producto.stock > 10 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                  {producto.stock} en stock
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