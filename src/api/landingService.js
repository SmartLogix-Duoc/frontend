import { pedidosApi } from './axiosConfig'
 
// GET /api/v1/orders/ → { success, data: Order[] }
export const getAllOrders = () =>
  pedidosApi.get('/api/v1/orders/')
 
// GET /api/v1/orders/:id/ → Order
export const getOrderById = (id) =>
  pedidosApi.get(`/api/v1/orders/${id}/`)
 
// POST /api/v1/orders/ → { success, data: { order_id, total, items, message } }
export const createOrder = (data) =>
  pedidosApi.post('/api/v1/orders/', data)
 
// PATCH /api/v1/orders/:id/ → actualiza estado
export const updateOrderStatus = (id, status) =>
  pedidosApi.patch(`/api/v1/orders/${id}/`, { status })
 
// DELETE /api/v1/orders/:id/
export const deleteOrder = (id) =>
  pedidosApi.delete(`/api/v1/orders/${id}/`)
 