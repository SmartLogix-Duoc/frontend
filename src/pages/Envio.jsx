import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getEnvioConTracking } from '../api/envioService'

const estadoEstilo = {
  PENDING:    'bg-yellow-100 text-yellow-700',
  IN_TRANSIT: 'bg-blue-100 text-blue-700',
  DELIVERED:  'bg-green-100 text-green-700',
  CANCELLED:  'bg-red-100 text-red-600',
}

const estadoLabel = {
  PENDING:    'Pendiente',
  IN_TRANSIT: 'En tránsito',
  DELIVERED:  'Entregado',
  CANCELLED:  'Cancelado',
}

const tipoLabel = {
  STANDARD:      'Estándar',
  EXPRESS:       'Express',
  INTERNATIONAL: 'Internacional',
}

const pasos = ['PENDING', 'IN_TRANSIT', 'DELIVERED']

function Envio() {
  const { id } = useParams()
  const [envio, setEnvio]       = useState(null)
  const [tracking, setTracking] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    getEnvioConTracking(id)
      .then(({ envio, tracking }) => {
        setEnvio(envio)
        setTracking(tracking)
      })
      .catch(err => setError(err.response?.data?.detail ?? err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center text-gray-400">
        Cargando envío…
      </div>
    )
  }

  if (error || !envio) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-4xl mb-4">📭</p>
        <h2 className="text-xl font-bold text-gray-700 mb-2">Envío no encontrado</h2>
        {error && <p className="text-sm text-gray-400 mb-4">{error}</p>}
        <Link to="/pedidos" className="text-blue-700 hover:underline text-sm">
          Volver a mis pedidos
        </Link>
      </div>
    )
  }

  const pasoActual = pasos.indexOf(envio.status)

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link to="/pedidos" className="hover:text-blue-700 transition-colors">
          Mis Pedidos
        </Link>
        <span>/</span>
        <span className="text-gray-600">Envío {envio.shipment_code}</span>
      </div>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-1">
            {envio.shipment_code}
          </h1>
          <p className="text-gray-500 text-sm">Pedido {envio.order_id}</p>
        </div>
        <span className={`text-sm font-semibold px-3 py-1.5 rounded-full ${estadoEstilo[envio.status] ?? 'bg-gray-100 text-gray-600'}`}>
          {estadoLabel[envio.status] ?? envio.status}
        </span>
      </div>

      {envio.status !== 'CANCELLED' && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-6">
            Progreso del envío
          </h2>
          <div className="flex items-center justify-between relative">
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 z-0" />
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

        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
            Detalles del envío
          </h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Tipo</span>
              <span className="font-medium text-gray-800">
                {tipoLabel[envio.shipment_type] ?? envio.shipment_type}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Transportista ID</span>
              <span className="font-medium text-gray-800">{envio.carrier_id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Entrega estimada</span>
              <span className="font-medium text-gray-800">
                {envio.estimated_delivery
                  ? new Date(envio.estimated_delivery).toLocaleDateString('es-CL')
                  : '—'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Creado el</span>
              <span className="font-medium text-gray-800">
                {new Date(envio.created_at).toLocaleDateString('es-CL')}
              </span>
            </div>
          </div>
        </div>

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

      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-sm font-semibold text-gray-600 uppercase mb-4">
          Historial de tracking
        </h2>

        {tracking.length === 0 ? (
          <p className="text-sm text-gray-400">Sin eventos de tracking registrados aún.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {[...tracking].reverse().map((evento, i) => (
              <div key={evento.id ?? i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full shrink-0 mt-0.5
                    ${i === 0 ? 'bg-blue-900' : 'bg-gray-300'}`} />
                  {i < tracking.length - 1 && (
                    <div className="w-0.5 bg-gray-200 flex-1 mt-1" />
                  )}
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${estadoEstilo[evento.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {estadoLabel[evento.status] ?? evento.status}
                    </span>
                    <span className="text-xs text-gray-400">
                      {evento.occurred_at
                        ? new Date(evento.occurred_at).toLocaleString('es-CL')
                        : ''}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">{evento.description}</p>
                  {evento.location && (
                    <p className="text-xs text-gray-400 mt-0.5">📍 {evento.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}

export default Envio
