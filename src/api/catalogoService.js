import api from './client'

export const getProductos = async () => {
  const res = await api.get('/api/products')
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}

export const getProductoById = async (id) => {
  const res = await api.get(`/api/products/${id}`)
  return res.data
}
