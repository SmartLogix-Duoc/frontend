import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function Producto() {
  const { id } = useParams()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [agregado, setAgregado] = useState(false)
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [creando, setCreando]   = useState(false)

  // ── Carga del producto desde MS Inventario ────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem('token')

    // GET /api/products/{id} → { id, name, description, price }
    axios
      .get(`http://localhost:8002/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(res => setProducto(res.data))
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }, [id])

  // ── Crear pedido en MS Pedidos ────────────────────────────────────────────
  const handleAgregar = async () => {
    const token = localStorage.getItem('token')
    setCreando(true)

    try {
      // POST /api/v1/orders/
      // Body: { order_type, items: [{ product_id, amount }] }
      await axios.post(
        'http://localhost:8003/api/v1/orders/',
        {
          order_type: 'NATIONAL',
          items: [{ product_id: Number(id), amount: cantidad }],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setAgregado(true)
      setTimeout(() => setAgregado(false), 3000)
    } catch (err) {
      alert(`No se pudo crear el pedido: ${err.response?.data?.error ?? err.message}`)
    } finally {
      setCreando(false)
    }
  }

  // ── Estados de carga y error ──────────────────────────────────────────────

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-gray-400">
        Cargando producto…
      </div>
    )
  }

  if (error || !producto) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-4">🔍</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">
          Producto no encontrado
        </h2>
        {error && <p className="text-sm text-gray-400 mb-4">{error}</p>}
        <Link to="/catalogo" className="text-blue-700 hover:underline text-sm">
          Volver al catálogo
        </Link>
      </div>
    )
  }

  // El endpoint /api/products/{id} no devuelve stock directamente;
  // si en el futuro lo incluye, ya está manejado.
  const stockDisponible = producto.stock ?? null

  // ── Vista principal ───────────────────────────────────────────────────────

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/catalogo" className="hover:text-blue-700 transition-colors">
          Catálogo
        </Link>
        <span>/</span>
        <span className="text-gray-600">{producto.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Imagen placeholder */}
        <div className="bg-blue-50 rounded-2xl flex items-center justify-center h-80">
          <span className="text-8xl">📦</span>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold text-blue-900">{producto.name}</h1>

          {producto.description && (
            <p className="text-gray-500 text-sm leading-relaxed">
              {producto.description}
            </p>
          )}

          {/* Precio */}
          <p className="text-3xl font-bold text-blue-900">
            ${Number(producto.price).toLocaleString('es-CL')}
          </p>

          {/* Stock — solo si el endpoint lo devuelve */}
          {stockDisponible !== null && (
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full w-fit ${
                stockDisponible > 10
                  ? 'bg-green-100 text-green-700'
                  : stockDisponible > 0
                  ? 'bg-yellow-100 text-yellow-700'
                  : 'bg-red-100 text-red-600'
              }`}
            >
              {stockDisponible > 0
                ? `${stockDisponible} unidades en stock`
                : 'Sin stock'}
            </span>
          )}

          {/* Selector de cantidad */}
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
                onClick={() =>
                  setCantidad(
                    stockDisponible !== null
                      ? Math.min(stockDisponible, cantidad + 1)
                      : cantidad + 1
                  )
                }
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Mensaje éxito */}
          {agregado && (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2.5">
              ✓ Pedido creado correctamente
            </div>
          )}

          {/* Botones */}
          <div className="flex gap-3 mt-2">
            <button
              onClick={handleAgregar}
              disabled={creando || stockDisponible === 0}
              className="flex-1 bg-blue-900 text-white font-semibold py-3 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {creando ? 'Creando pedido…' : 'Crear Pedido'}
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
