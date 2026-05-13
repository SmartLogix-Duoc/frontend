import api from './client'

export const getPedidos = async () => {
  const res = await api.get('/api/v1/orders/')
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}

export const createPedido = async ({ order_type = 'NATIONAL', items }) => {
  const res = await api.post('/api/v1/orders/', { order_type, items })
  return res.data
}
