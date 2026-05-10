import { useState } from 'react'
import { Link } from 'react-router-dom'

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // TODO: conectar con POST /auth/login del MS Usuarios
    // const response = await fetch('http://localhost:8001/auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(form)
    // })
    // const data = await response.json()
    // localStorage.setItem('token', data.access_token)

    setTimeout(() => {
      setLoading(false)
      setError('Conectar con el backend para habilitar el login.')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-black">SL</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Bienvenido</h1>
          <p className="text-gray-500 text-sm mt-1">Ingresa a tu cuenta SmartLogix</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Correo electrónico
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="tu@empresa.cl"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          {/* Error */}
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
            {loading ? 'Ingresando...' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          ¿No tienes cuenta?{' '}
          <Link to="/perfil" className="text-blue-700 font-medium hover:underline">
            Contáctanos
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Login
