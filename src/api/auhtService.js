import { authApi } from './axiosConfig'
 
// POST /auth/login  → { token }
export const login = (credentials) =>
  authApi.post('/auth/login', credentials)
 
// POST /auth/register → { token }
export const register = (userData) =>
  authApi.post('/auth/register', userData)
 
// GET /api/v1/auth/profile/:id → Profile
export const getProfile = (id) =>
  authApi.get(`/api/v1/auth/profile/${id}`)
 