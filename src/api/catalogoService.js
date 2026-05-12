import axios from 'axios'

const BASE_URL = 'http://localhost:8002'

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
  const res = await api.get('/api/products')
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}
