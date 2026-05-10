import { useState } from 'react'
import { Link } from 'react-router-dom'

const pedidos = [
  {
    id: 1,
    fecha: '2025-05-01',
    estado: 'ENTREGADO',
    total: 1389980,
    productos: [
      { nombre: 'Laptop Dell XPS 15', cantidad: 1, precio: 1299990 },
      { nombre: 'Mouse Inalámbrico', cantidad: 3, precio: 29990 },
    ],
  },
  {
    id: 2,
    fecha: '2025-05-05',
    estado: 'EN_PROCESO',
    total: 349990,
    productos: [
      { nombre: 'Monitor LG 27"', cantidad: 1, precio: 349990 },
    ],
  },
  {
    id: 3,
    fecha: '2025-05-08',
    estado: 'PENDIENTE',
    total: 169980,
    productos: [
      { nombre: 'Teclado Mecánico Logitech', cantidad: 1, precio: 89990 },
      { nombre: 'Webcam Logitech C920', cantidad: 1, precio: 79990 },
    ],
  },
]

const estadoEstilo = {
  PENDIENTE: 'bg-yellow-100 text-yellow-700',
  EN_PROCESO: 'bg-blue-100 text-blue-700',
  ENTREGADO: 'bg-green-100 text-green-700',
  CANCELADO: 'bg-red-100 text-red-600',
}

const estadoLabel = {
  PENDIENTE: 'Pendiente',
  EN_PROCESO: 'En proceso',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
}

function Pedido() {
  const [pedidoActivo, setPedidoActivo] = useState(null)

  // TODO: reemplazar con llamada al MS Pedidos
  // const [pedidos, setPedidos] = useState([])
  // useEffect(() => {
  //   fetch('http://localhost:8003/api/pedidos/', {
  //     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //   })
  //   .then(r => r.json())
  //   .then(data => setPedidos(data))
  // }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-1">Mis Pedidos</h1>
        <p className="text-gray-500 text-sm">{pedidos.length} pedidos registrados</p>
      </div>

      {/* Lista de pedidos */}
      <div className="flex flex-col gap-4">
        {pedidos.map(pedido => (
          <div
            key={pedido.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden"
          >
            {/* Header del pedido */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Pedido #{pedido.id}
                  </p>
                  <p className="text-xs text-gray-400">{pedido.fecha}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoEstilo[pedido.estado]}`}>
                  {estadoLabel[pedido.estado]}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-sm font-bold text-blue-900">
                  ${pedido.total.toLocaleString('es-CL')}
                </p>
                <button
                  onClick={() => setPedidoActivo(pedidoActivo === pedido.id ? null : pedido.id)}
                  className="text-sm text-blue-700 hover:underline font-medium"
                >
                  {pedidoActivo === pedido.id ? 'Ocultar' : 'Ver detalle'}
                </button>
              </div>
            </div>

            {/* Detalle expandible */}
            {pedidoActivo === pedido.id && (
              <div className="px-6 py-4 bg-gray-50">
                <p className="text-xs font-semibold text-gray-500 uppercase mb-3">
                  Productos
                </p>
                <div className="flex flex-col gap-2 mb-4">
                  {pedido.productos.map((p, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {p.nombre}
                        <span className="text-gray-400 ml-1">x{p.cantidad}</span>
                      </span>
                      <span className="font-medium text-gray-800">
                        ${(p.precio * p.cantidad).toLocaleString('es-CL')}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                  <Link
                    to={`/envio/${pedido.id}`}
                    className="text-sm text-blue-700 font-medium hover:underline"
                  >
                    Ver envío →
                  </Link>
                  <p className="text-sm font-bold text-blue-900">
                    Total: ${pedido.total.toLocaleString('es-CL')}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  )
}

export default Pedido