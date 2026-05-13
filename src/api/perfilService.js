import axios from 'axios'

const BASE_URL = import.meta.env.VITE_AUTH_URL

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// ── Endpoints ─────────────────────────────────────────────────────────────────

/**
 * Inicia sesión y retorna el token.
 * El guardado en localStorage y actualización del estado
 * los maneja AuthContext a través de su función login().
 * POST /auth/login
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<string>} Token JWT
 */
export const login = async ({ username, password }) => {
  const res = await api.post('/auth/login', { username, password })
  return res.data.token
}

/**
 * Obtiene el perfil del usuario autenticado.
 * GET /api/v1/auth/profile/{userId}
 * Devuelve: { firstName, lastName, phoneNumber, user: { email, ... } }
 * @param {string|number} userId
 * @returns {Promise<Object>} Datos del perfil
 */
export const getPerfil = async (userId) => {
  const res = await api.get(`/api/v1/auth/profile/${userId}`)
  return res.data
}

/**
 * Actualiza los datos editables del perfil.
 * PUT /api/v1/auth/profile/{userId}
 * @param {string|number} userId
 * @param {{ firstName: string, lastName: string, phoneNumber: string }} datos
 * @returns {Promise<Object>} Perfil actualizado
 */
export const updatePerfil = async (userId, datos) => {
  const res = await api.put(`/api/v1/auth/profile/${userId}`, datos)
  return res.data
}