import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login as loginService, register as registerService } from '../api/perfilService'

function Login() {
  const [mode, setMode]         = useState('login')
  const [form, setForm]         = useState({ username: '', password: '', email: '' })
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const navigate                = useNavigate()
  const { login }               = useAuth()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let token
      if (mode === 'login') {
        token = await loginService({
          username: form.username,
          password: form.password,
        })
      } else {
        token = await registerService({
          username: form.username,
          password: form.password,
          email: form.email,
        })
      }
      login(token)
      navigate('/catalogo')
    } catch (err) {
      const msg = err.response?.data?.message ?? err.response?.data?.error
      setError(msg ?? 'Error al procesar la solicitud.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black">SL</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">
            {mode === 'login' ? 'Bienvenido' : 'Crear Cuenta'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'login'
              ? 'Ingresa a tu cuenta SmartLogix'
              : 'Regístrate en SmartLogix'}
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Usuario
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="tu_usuario"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {mode === 'register' && (
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@ejemplo.com"
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-2.5">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-900 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-800 transition-colors disabled:opacity-60 mt-2"
          >
            {loading
              ? 'Procesando…'
              : mode === 'login'
              ? 'Iniciar Sesión'
              : 'Crear Cuenta'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === 'login' ? (
            <>
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-700 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Regístrate
              </button>
            </>
          ) : (
            <>
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={toggleMode}
                className="text-blue-700 font-medium hover:underline bg-transparent border-none p-0 cursor-pointer"
              >
                Inicia sesión
              </button>
            </>
          )}
        </p>

      </div>
    </div>
  )
}

export default Login
