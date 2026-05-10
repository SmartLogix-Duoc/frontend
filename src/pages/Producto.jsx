import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

const productos = [
  { id: 1, nombre: 'Laptop Dell XPS 15', categoria: 'Electrónica', precio: 1299990, stock: 15, descripcion: 'Laptop de alto rendimiento con procesador Intel Core i7, 16GB RAM y pantalla OLED 4K de 15.6 pulgadas. Ideal para profesionales y creadores de contenido.' },
  { id: 2, nombre: 'Monitor LG 27"', categoria: 'Electrónica', precio: 349990, stock: 8, descripcion: 'Monitor IPS 4K de 27 pulgadas con cobertura de color 99% sRGB. Perfecto para diseño gráfico y trabajo de oficina.' },
  { id: 3, nombre: 'Teclado Mecánico Logitech', categoria: 'Periféricos', precio: 89990, stock: 32, descripcion: 'Teclado mecánico con switches táctiles, retroiluminación RGB y conectividad inalámbrica Bluetooth.' },
  { id: 4, nombre: 'Mouse Inalámbrico', categoria: 'Periféricos', precio: 29990, stock: 50, descripcion: 'Mouse ergonómico inalámbrico con sensor de alta precisión y batería de larga duración.' },
  { id: 5, nombre: 'Silla Ergonómica', categoria: 'Muebles', precio: 459990, stock: 5, descripcion: 'Silla de oficina con soporte lumbar ajustable, reposabrazos 4D y respaldo de malla transpirable.' },
  { id: 6, nombre: 'Escritorio Standing', categoria: 'Muebles', precio: 599990, stock: 3, descripcion: 'Escritorio eléctrico de altura ajustable con memoria de posiciones y superficie amplia de 140x70cm.' },
  { id: 7, nombre: 'Auriculares Sony WH-1000XM5', categoria: 'Electrónica', precio: 299990, stock: 12, descripcion: 'Auriculares premium con cancelación de ruido líder en la industria y hasta 30 horas de batería.' },
  { id: 8, nombre: 'Webcam Logitech C920', categoria: 'Periféricos', precio: 79990, stock: 20, descripcion: 'Webcam Full HD 1080p con micrófono estéreo integrado y enfoque automático. Ideal para videollamadas.' },
]

function Producto() {
  const { id } = useParams()
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)

  // TODO: reemplazar con llamada al MS Inventario
  // const [producto, setProducto] = useState(null)
  // useEffect(() => {
  //   fetch(`http://localhost:8002/api/inventario/${id}`, {
  //     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //   })
  //   .then(r => r.json())
  //   .then(data => setProducto(data))
  // }, [id])

  const producto = productos.find(p => p.id === parseInt(id))

  const handleAgregar = () => {
    // TODO: conectar con POST /api/pedidos/ del MS Pedidos
    // await fetch('http://localhost:8003/api/pedidos/', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({ producto_id: producto.id, cantidad })
    // })

    setAgregado(true)
    setTimeout(() => setAgregado(false), 3000)
  }

  if (!producto) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Producto no encontrado</h2>
        <Link to="/catalogo" className="text-blue-700 hover:underline text-sm">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/catalogo" className="hover:text-blue-700 transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-gray-600">{producto.nombre}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagen */}
        <div className="bg-blue-50 rounded-2xl flex items-center justify-center h-80">
          <span className="text-8xl">📦</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <span className="text-sm text-blue-600 font-medium">{producto.categoria}</span>
          <h1 className="text-3xl font-bold text-blue-900">{producto.nombre}</h1>
          <p className="text-gray-500 text-sm leading-relaxed">{producto.descripcion}</p>

          {/* Precio */}
          <p className="text-3xl font-bold text-blue-900">
            ${producto.precio.toLocaleString('es-CL')}
          </p>

          {/* Stock */}
          <span className={`text-xs font-semibold px-3 py-1 rounded-full w-fit
            ${producto.stock > 10
              ? 'bg-green-100 text-green-700'
              : producto.stock > 0
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-red-100 text-red-600'}`}>
            {producto.stock > 0 ? `${producto.stock} unidades en stock` : 'Sin stock'}
          </span>

          {/* Cantidad */}
          {producto.stock > 0 && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-600">Cantidad:</span>
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  −
                </button>
                <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">
                  {cantidad}
                </span>
                <button
                  onClick={() => setCantidad(Math.min(producto.stock, cantidad + 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Mensaje agregado */}
          {agregado && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2.5">
              ✓ Pedido creado correctamente
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAgregar}
              disabled={producto.stock === 0}
              className="flex-1 bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              Crear Pedido
            </button>
            <Link
              to="/catalogo"
              className="border border-gray-300 text-gray-600 font-medium px-5 py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Volver
            </Link>
          </div>

        </div>
      </div>

    </div>
  )
}

export default Producto
