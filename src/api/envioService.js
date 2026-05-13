import axios from 'axios'

const BASE_URL = import.meta.env.VITE_ENVIOS_URL

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * Obtiene los datos de un envío por su ID.
 * GET /api/shipments/{id}
 * Devuelve: { id, shipment_code, order_id, origin, destination,
 *             shipment_type, status, carrier_id, estimated_delivery, created_at }
 * @param {number|string} id
 * @returns {Promise<Object>} Datos del envío
 */
export const getEnvio = async (id) => {
  const res = await api.get(`/api/shipments/${id}`)
  return res.data
}

/**
 * Obtiene el historial de tracking de un envío.
 * GET /api/shipments/{id}/tracking
 * Devuelve: [{ id, status, location, description, occurred_at, shipment_id }, ...]
 * @param {number|string} id
 * @returns {Promise<Array>} Lista de eventos de tracking
 */
export const getTracking = async (id) => {
  const res = await api.get(`/api/shipments/${id}/tracking`)
  return res.data ?? []
}

/**
 * Obtiene envío y tracking en paralelo.
 * Combinación de getEnvio + getTracking para uso en Envio.jsx
 * @param {number|string} id
 * @returns {Promise<{ envio: Object, tracking: Array }>}
 */
export const getEnvioConTracking = async (id) => {
  const [envio, tracking] = await Promise.all([
    getEnvio(id),
    getTracking(id),
  ])
  return { envio, tracking }
}
