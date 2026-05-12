import { enviosApi } from './axiosConfig'
 
// GET /api/shipments → ShipmentResponse[]
export const getAllShipments = () =>
  enviosApi.get('/api/shipments')
 
// GET /api/shipments/:id → ShipmentResponse
export const getShipmentById = (id) =>
  enviosApi.get(`/api/shipments/${id}`)
 
// GET /api/shipments/:id/tracking → TrackingEventResponse[]
export const getShipmentTracking = (id) =>
  enviosApi.get(`/api/shipments/${id}/tracking`)
 
// POST /api/shipments → ShipmentResponse
export const createShipment = (data) =>
  enviosApi.post('/api/shipments', data)
 
// PATCH /api/shipments/:id/status
export const updateShipmentStatus = (id, data) =>
  enviosApi.patch(`/api/shipments/${id}/status`, data)
 