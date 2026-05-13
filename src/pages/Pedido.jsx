import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getPedidos } from '../api/pedidoService'

const estadoEstilo = {
  'Pendiente':  'bg-yellow-100 text-yellow-700',
  'Procesando': 'bg-blue-100 text-blue-700',
  'Enviado':    'bg-purple-100 text-purple-700',
  'Entregado':  'bg-green-100 text-green-700',
  'Cancelado':  'bg-red-100 text-red-600',
}

function Pedido() {
  const [pedidos, setPedidos]           = useState([])
  const [pedidoActivo, setPedidoActivo] = useState(null)
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)

  useEffect(() => {
    getPedidos()
      .then(lista => setPedidos(lista))
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-gray-400">
        Cargando pedidos…
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-red-600 font-medium">Error al cargar los pedidos</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Mis Pedidos</h1>
        <p className="text-gray-500 text-sm">{pedidos.length} pedidos registrados</p>
      </div>

      {pedidos.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          No tienes pedidos aún.{' '}
          <Link to="/catalogo" className="text-blue-700 hover:underline">
            Ver catálogo
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {pedidos.map(pedido => (
            <div
              key={pedido.order_id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Pedido #{pedido.order_id.slice(0, 8)}…
                    </p>
                    <p className="text-xs text-gray-400">
                      {new Date(pedido.created_at).toLocaleDateString('es-CL')}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      estadoEstilo[pedido.status] ?? 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {pedido.status}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-sm font-bold text-blue-900">
                    ${Number(pedido.total).toLocaleString('es-CL')}
                  </p>
                  <button
                    onClick={() =>
                      setPedidoActivo(
                        pedidoActivo === pedido.order_id ? null : pedido.order_id
                      )
                    }
                    className="text-sm text-blue-700 hover:underline font-medium"
                  >
                    {pedidoActivo === pedido.order_id ? 'Ocultar' : 'Ver detalle'}
                  </button>
                </div>
              </div>

              {pedidoActivo === pedido.order_id && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                    Productos
                  </p>

                  <p className="text-xs text-gray-400 mb-3">
                    Tipo:{' '}
                    <span className="font-medium text-gray-600">
                      {pedido.order_type === 'INTERNATIONAL'
                        ? 'Internacional (+15%)'
                        : 'Nacional'}
                    </span>
                  </p>

                  <div className="flex flex-col gap-2 mb-4">
                    {(pedido.items ?? []).map((item, i) => (
                      <div key={i} className="flex justify-between text-sm">
                        <span className="text-gray-700">
                          Producto #{item.product_id}
                          <span className="text-gray-400 ml-1">x{item.amount}</span>
                        </span>
                        <span className="font-medium text-gray-800">
                          ${(item.unit_price * item.amount).toLocaleString('es-CL')}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <Link
                      to={`/envio/${pedido.order_id}`}
                      className="text-sm text-blue-700 font-medium hover:underline"
                    >
                      Ver envío →
                    </Link>
                    <p className="text-sm font-bold text-blue-900">
                      Total: ${Number(pedido.total).toLocaleString('es-CL')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default Pedido
