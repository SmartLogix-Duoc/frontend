import api from './client'

export const getEnvios = async () => {
  const res = await api.get('/api/shipments/')
  return Array.isArray(res.data) ? res.data : (res.data.data ?? [])
}

export const getTracking = async (id) => {
  const res = await api.get(`/api/shipments/${id}/tracking`)
  return res.data ?? []
}

export const getEnvioConTracking = async (id) => {
  const [envio, tracking] = await Promise.all([
    api.get(`/api/shipments/${id}`).then(r => r.data),
    getTracking(id),
  ])
  return { envio, tracking }
}
