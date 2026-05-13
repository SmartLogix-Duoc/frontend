import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// Asegúrate de tener exportada una función para actualizar (ej. updatePedido) en tu service
import { getPedidos, updatePedido } from '../api/pedidoService'

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
  const [procesandoId, setProcesandoId] = useState(null) // Para mostrar un loader en el botón

  useEffect(() => {
    cargarPedidos()
  }, [])

  const cargarPedidos = () => {
    getPedidos()
      .then(lista => setPedidos(lista))
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }

  // ── FUNCIÓN PARA ACTUALIZAR EL ESTADO EN TIEMPO REAL ──
  const cambiarEstado = async (orderId, nuevoEstado) => {
    setProcesandoId(orderId)
    try {
      // Llamada a tu API (PATCH /api/orders/{id}/)
      await updatePedido(orderId, { status: nuevoEstado })
      
      // Actualizamos el estado local para que cambie de color de inmediato sin recargar
      setPedidos(pedidosActuales => 
        pedidosActuales.map(p => 
          p.order_id === orderId ? { ...p, status: nuevoEstado } : p
        )
      )
    } catch (err) {
      alert(`Error al actualizar el pedido: ${err.response?.data?.error ?? err.message}`)
    } finally {
      setProcesandoId(null)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-gray-400">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900 mx-auto mb-4"></div>
        Cargando historial de pedidos…
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-2xl border border-red-100 inline-block">
          <p className="font-bold text-lg mb-1">Error de conexión</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">

      {/* HEADER DE GESTIÓN */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black text-blue-900 tracking-tight">Control de Pedidos</h1>
          <p className="text-gray-500 font-medium mt-1">Gestiona los despachos y ventas de la tienda</p>
        </div>
        <div className="bg-blue-50 text-blue-900 px-4 py-2 rounded-xl font-bold text-sm shadow-sm">
          Total: {pedidos.length} Pedidos
        </div>
      </div>

      {pedidos.length === 0 ? (
        <div className="text-center bg-white rounded-3xl border border-gray-100 py-20 shadow-sm">
          <p className="text-4xl mb-4">📦</p>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Bandeja Vacía</h3>
          <p className="text-gray-500">Aún no hay pedidos registrados en el sistema.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {pedidos.map(pedido => {
            
            const orderId = pedido.order_id || 'ID_N/A'
            const displayDate = pedido.created_at ? new Date(pedido.created_at).toLocaleDateString('es-CL') : 'Fecha reciente'
            
            const statusText = pedido.status || 'Pendiente'
            const statusStyle = estadoEstilo[statusText] ?? 'bg-gray-100 text-gray-600'
            
            const orderItems = pedido.items || []
            const orderTotal = pedido.total ?? 0

            return (
              <div
                key={orderId}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* BARRA PRINCIPAL DEL PEDIDO */}
                <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-5 border-b border-gray-100 gap-4">
                  
                  <div className="flex items-center gap-5">
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                    </div>
                    <div>
                      <p className="text-sm font-black text-gray-900">
                        Pedido <span className="text-blue-600">#{String(orderId).slice(0, 8).toUpperCase()}</span>
                      </p>
                      <p className="text-xs font-medium text-gray-500 mt-0.5">
                        {displayDate} • {pedido.order_type === 'INTERNATIONAL' ? 'Envío Internacional' : 'Envío Nacional'}
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ml-2 transition-colors duration-300 ${statusStyle}`}>
                      {statusText}
                    </span>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                    <p className="text-lg font-black text-gray-900">
                      ${Number(orderTotal).toLocaleString('es-CL')}
                    </p>
                    <button
                      onClick={() => setPedidoActivo(pedidoActivo === orderId ? null : orderId)}
                      className="text-sm bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2 rounded-lg font-bold hover:bg-gray-100 hover:text-blue-700 transition-colors"
                    >
                      {pedidoActivo === orderId ? 'Ocultar Detalles' : 'Gestionar'}
                    </button>
                  </div>

                </div>

                {/* DETALLE DESPLEGABLE */}
                {pedidoActivo === orderId && (
                  <div className="px-6 py-6 bg-gray-50/50">
                    <h4 className="text-xs font-black text-gray-400 uppercase tracking-wider mb-4">
                      Desglose de Productos
                    </h4>

                    <div className="flex flex-col gap-3 mb-6">
                      {orderItems.length > 0 ? (
                        orderItems.map((item, i) => {
                          const pId = item.product_id ?? '?'
                          const qty = item.amount ?? 0
                          const price = item.unit_price ?? 0 
                          const subtotal = price * qty

                          return (
                            <div key={i} className="flex justify-between items-center bg-white p-3 rounded-xl border border-gray-100">
                              <span className="text-sm font-semibold text-gray-700">
                                📦 SKU #{pId} 
                                <span className="inline-flex items-center justify-center bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded ml-3">
                                  x{qty}
                                </span>
                              </span>
                              <span className="text-sm font-bold text-gray-900">
                                ${subtotal.toLocaleString('es-CL')}
                              </span>
                            </div>
                          )
                        })
                      ) : (
                        <p className="text-sm text-gray-400 italic">No hay detalle de ítems en este pedido.</p>
                      )}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200">
                      
                      {/* ── BOTONES FUNCIONALES DE GESTIÓN ── */}
                      <div className="flex gap-2">
                        {statusText === 'Pendiente' && (
                          <button 
                            onClick={() => cambiarEstado(orderId, 'Procesando')}
                            disabled={procesandoId === orderId}
                            className="text-xs font-bold bg-blue-100 text-blue-800 px-4 py-2.5 rounded-lg hover:bg-blue-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            {procesandoId === orderId ? 'Actualizando...' : 'Iniciar Preparación (Procesando)'}
                          </button>
                        )}
                        {statusText === 'Procesando' && (
                          <button 
                            onClick={() => cambiarEstado(orderId, 'Enviado')}
                            disabled={procesandoId === orderId}
                            className="text-xs font-bold bg-purple-100 text-purple-800 px-4 py-2.5 rounded-lg hover:bg-purple-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            {procesandoId === orderId ? 'Actualizando...' : 'Despachar a Ruta (Enviado)'}
                          </button>
                        )}
                        {statusText === 'Enviado' && (
                          <button 
                            onClick={() => cambiarEstado(orderId, 'Entregado')}
                            disabled={procesandoId === orderId}
                            className="text-xs font-bold bg-green-100 text-green-800 px-4 py-2.5 rounded-lg hover:bg-green-200 transition-colors disabled:opacity-50 flex items-center gap-2"
                          >
                            {procesandoId === orderId ? 'Actualizando...' : 'Confirmar Entrega'}
                          </button>
                        )}
                        
                        {/* Botón de cancelar disponible si no ha sido entregado o cancelado */}
                        {!['Entregado', 'Cancelado'].includes(statusText) && (
                          <button 
                            onClick={() => {
                              if (window.confirm("¿Estás seguro de cancelar este pedido?")) {
                                cambiarEstado(orderId, 'Cancelado')
                              }
                            }}
                            disabled={procesandoId === orderId}
                            className="text-xs font-bold text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                          >
                            Cancelar Pedido
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-4">
                        <Link
                          to={`/envio/${orderId}`}
                          className="text-sm text-blue-700 font-bold hover:text-blue-800 flex items-center gap-1 bg-white border border-blue-200 px-4 py-2 rounded-lg"
                        >
                          Rastrear Envío →
                        </Link>
                      </div>
                    </div>

                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

export default Pedido