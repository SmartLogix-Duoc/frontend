import api from './client'

export const login = async ({ username, password }) => {
  const res = await api.post('/auth/login', { username, password })
  return res.data.token
}

export const register = async ({ username, password, email }) => {
  const res = await api.post('/auth/register', { username, password, email })
  return res.data.token
}

export const getPerfil = async (userId) => {
  const res = await api.get(`/api/v1/auth/profile/${userId}`)
  return res.data
}
