import { inventarioApi } from './axiosConfig'
 
// GET /api/products → ProductDTO[]
export const getAllProducts = () =>
  inventarioApi.get('/api/products')
 
// GET /api/products/:id → ProductDTO
export const getProductById = (id) =>
  inventarioApi.get(`/api/products/${id}`)
 