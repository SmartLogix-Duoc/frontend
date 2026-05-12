import axios from 'axios'

const BASE_URL = 'http://localhost:8002/api'

// Instancia axios con baseURL y header de auth inyectado automáticamente
const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * Obtiene todos los productos del catálogo.
 * GET /api/products
 * Devuelve: [{ id, name, description, price }, ...]
 * @returns {Promise<Array>} Lista de productos
 */
export const getProductos = async () => {
  const res = await api.get('/products')
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}

/**
 * Obtiene el detalle de un producto por su ID.
 * GET /api/products/{id}
 * Devuelve: { id, name, description, price }
 * @param {number|string} id
 * @returns {Promise<Object>} Datos del producto
 */
export const getProductoById = async (id) => {
  const res = await api.get(`/products/${id}`)
  return res.data
}
