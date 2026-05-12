import axios from 'axios'
 
// Base URLs de cada microservicio
export const authApi = axios.create({
  baseURL: 'http://localhost:8001',
})
 
export const inventarioApi = axios.create({
  baseURL: 'http://localhost:8002',
})
 
export const pedidosApi = axios.create({
  baseURL: 'http://localhost:8003',
})
 
export const enviosApi = axios.create({
  baseURL: 'http://localhost:8004',
})
 
// Interceptor que agrega el token JWT en todas las instancias
const addAuthInterceptor = (instance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )
}
 
addAuthInterceptor(authApi)
addAuthInterceptor(inventarioApi)
addAuthInterceptor(pedidosApi)
addAuthInterceptor(enviosApi)