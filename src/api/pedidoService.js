import axios from 'axios'

const BASE_URL = 'http://localhost:8003/api/v1'

// Instancia axios con baseURL y header de auth inyectado automáticamente
const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los pedidos del usuario autenticado.
 * GET /api/v1/orders/
 * @returns {Promise<Array>} Lista de pedidos
 */
export const getPedidos = async () => {
  const res = await api.get('/orders/')
  // El backend devuelve { success: true, data: [...] }
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}

/**
 * Crea un nuevo pedido.
 * POST /api/v1/orders/
 * @param {Object} params
 * @param {'NATIONAL'|'INTERNATIONAL'} params.order_type
 * @param {Array<{ product_id: number, amount: number }>} params.items
 * @returns {Promise<Object>} Pedido creado
 */
export const createPedido = async ({ order_type = 'NATIONAL', items }) => {
  const res = await api.post('/orders/', { order_type, items })
  return res.data
}
