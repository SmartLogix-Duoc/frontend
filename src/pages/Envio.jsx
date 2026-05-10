import { useParams, Link } from 'react-router-dom'

const envios = [
  {
    id: 1,
    shipment_code: 'SHP-A1B2C3D4',
    order_id: 'ORD-001',
    origin: 'Bodega Central Santiago',
    destination: 'Av. Providencia 1234, Santiago',
    shipment_type: 'EXPRESS',
    status: 'DELIVERED',
    carrier: 'Chilexpress',
    estimated_delivery: '2025-05-03',
    created_at: '2025-05-01',
    tracking: [
      { status: 'PENDING', description: 'Envío creado y pendiente de despacho', location: 'Bodega Central Santiago', date: '2025-05-01 09:00' },
      { status: 'IN_TRANSIT', description: 'Paquete recogido por transportista', location: 'Bodega Central Santiago', date: '2025-05-01 14:30' },
      { status: 'IN_TRANSIT', description: 'En camino al destino', location: 'Centro de Distribución', date: '2025-05-02 08:15' },
      { status: 'DELIVERED', description: 'Entregado en destino', location: 'Av. Providencia 1234', date: '2025-05-03 11:45' },
    ],
  },
  {
    id: 2,
    shipment_code: 'SHP-E5F6G7H8',
    order_id: 'ORD-002',
    origin: 'Bodega Central Santiago',
    destination: 'Calle Los Leones 567, Providencia',
    shipment_type: 'STANDARD',
    status: 'IN_TRANSIT',
    carrier: 'Starken',
    estimated_delivery: '2025-05-10',
    created_at: '2025-05-05',
    tracking: [
      { status: 'PENDING', description: 'Envío creado y pendiente de despacho', location: 'Bodega Central Santiago', date: '2025-05-05 10:00' },
      { status: 'IN_TRANSIT', description: 'Paquete recogido por transportista', location: 'Bodega Central Santiago', date: '2025-05-05 16:00' },
    ],
  },
  {
    id: 3,
    shipment_code: 'SHP-I9J0K1L2',
    order_id: 'ORD-003',
    origin: 'Bodega Central Santiago',
    destination: 'Av. Las Condes 8900, Las Condes',
    shipment_type: 'STANDARD',
    status: 'PENDING',
    carrier: 'Correos de Chile',
    estimated_delivery: '2025-05-13',
    created_at: '2025-05-08',
    tracking: [
      { status: 'PENDING', description: 'Envío creado y pendiente de despacho', location: 'Bodega Central Santiago', date: '2025-05-08 09:30' },
    ],
  },
]

const estadoEstilo = {
  PENDING: 'bg-yellow-100 text-yellow-700',
  IN_TRANSIT: 'bg-blue-100 text-blue-700',
  DELIVERED: 'bg-green-100 text-green-700',
  CANCELLED: 'bg-red-100 text-red-600',
}

const estadoLabel = {
  PENDING: 'Pendiente',
  IN_TRANSIT: 'En tránsito',
  DELIVERED: 'Entregado',
  CANCELLED: 'Cancelado',
}

const tipoLabel = {
  STANDARD: 'Estándar',
  EXPRESS: 'Express',
  INTERNATIONAL: 'Internacional',
}

const pasos = ['PENDING', 'IN_TRANSIT', 'DELIVERED']

function Envio() {
  const { id } = useParams()

  // TODO: reemplazar con llamada al MS Envíos
  // const [envio, setEnvio] = useState(null)
  // useEffect(() => {
  //   fetch(`http://localhost:8004/api/shipments/${id}`, {
  //     headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  //   })
  //   .then(r => r.json())
  //   .then(data => setEnvio(data))
  // }, [id])

  const envio = envios.find(e => e.id === parseInt(id))

  if (!envio) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-4">📭</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Envío no encontrado</h2>
        <Link to="/pedido/1" className="text-blue-700 hover:underline text-sm">
          Volver a mis pedidos
        </Link>
      </div>
    )
  }

  const pasoActual = pasos.indexOf(envio.status)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/pedido/1" className="hover:text-blue-700 transition-colors">
          Mis Pedidos
        </Link>
        <span>/</span>
        <span className="text-gray-600">Envío {envio.shipment_code}</span>
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            {envio.shipment_code}
          </h1>
          <p className="text-gray-500 text-sm">Pedido {envio.order_id}</p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${estadoEstilo[envio.status]}`}>
          {estadoLabel[envio.status]}
        </span>
      </div>

      {/* Progreso */}
      {envio.status !== 'CANCELLED' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-6">
            Progreso del envío
          </h2>
          <div className="flex items-center justify-between relative">
            {/* Línea de fondo */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
            {/* Línea de progreso */}
            <div
              className="absolute top-4 left-0 h-0.5 bg-blue-600 z-0 transition-all"
              style={{ width: `${(pasoActual / (pasos.length - 1)) * 100}%` }}
            />
            {pasos.map((paso, i) => (
              <div key={paso} className="flex flex-col items-center gap-2 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2
                  ${i <= pasoActual
                    ? 'bg-blue-900 border-blue-900 text-white'
                    : 'bg-white border-gray-300 text-gray-400'}`}>
                  {i < pasoActual ? '✓' : i + 1}
                </div>
                <span className={`text-xs font-medium ${i <= pasoActual ? 'text-blue-900' : 'text-gray-400'}`}>
                  {estadoLabel[paso]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* Detalles */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Detalles del envío
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tipo</span>
              <span className="font-medium text-gray-800">{tipoLabel[envio.shipment_type]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transportista</span>
              <span className="font-medium text-gray-800">{envio.carrier}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Entrega estimada</span>
              <span className="font-medium text-gray-800">{envio.estimated_delivery}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Creado el</span>
              <span className="font-medium text-gray-800">{envio.created_at}</span>
            </div>
          </div>
        </div>

        {/* Ruta */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Ruta
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-900 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Origen</p>
                <p className="text-sm font-medium text-gray-800">{envio.origin}</p>
              </div>
            </div>
            <div className="ml-1 border-l-2 border-dashed border-gray-300 h-4" />
            <div className="flex gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-400">Destino</p>
                <p className="text-sm font-medium text-gray-800">{envio.destination}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Tracking */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
          Historial de tracking
        </h2>
        <div className="flex flex-col gap-4">
          {[...envio.tracking].reverse().map((evento, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5
                  ${i === 0 ? 'bg-blue-900' : 'bg-gray-300'}`} />
                {i < envio.tracking.length - 1 && (
                  <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
                )}
              </div>
              <div className="pb-4">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${estadoEstilo[evento.status]}`}>
                    {estadoLabel[evento.status]}
                  </span>
                  <span className="text-xs text-gray-400">{evento.date}</span>
                </div>
                <p className="text-sm text-gray-700">{evento.description}</p>
                {evento.location && (
                  <p className="text-xs text-gray-400 mt-0.5">📍 {evento.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Envio
