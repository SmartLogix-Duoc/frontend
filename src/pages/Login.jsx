import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom' // Añadimos useNavigate

function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate() // Para redirigir al usuario tras el éxito

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // 1. Conexión con el MS de Usuarios (Puerto 8001)
      const response = await fetch('http://localhost:8001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })

      const data = await response.json()

      if (response.ok) {
        // 2. Guardamos el token en el almacenamiento local
        // Nota: Asegúrate de que tu API devuelva 'access_token' o ajusta el nombre
        localStorage.setItem('token', data.access_token)
        
        // 3. Redirigimos al catálogo
        navigate('/catalogo')
      } else {
        // Manejo de errores del servidor (credenciales incorrectas, etc.)
        setError(data.message || 'Credenciales incorrectas. Intenta de nuevo.')
      }
    } catch (err) {
      setError('Error de conexión con el servidor de autenticación.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8 border border-blue-100">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-900 rounded-2xl flex items-center justify-center mx-auto mb-4 rotate-3 shadow-lg">
            <span className="text-white font-black text-2xl tracking-tighter">SL</span>
          </div>
          <h1 className="text-2xl font-bold text-blue-900">Bienvenido de nuevo</h1>
          <p className="text-gray-500 text-sm mt-1">Accede al panel logístico de SmartLogix</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-900 uppercase tracking-wider block ml-1">
              Correo corporativo
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nombre@smartlogix.cl"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-blue-900 uppercase tracking-wider block ml-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Error dinámico */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 text-xs rounded-r-lg px-4 py-3 animate-shake">
              <p className="font-bold">Error de acceso</p>
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-900 text-white font-bold py-3.5 rounded-xl hover:bg-blue-800 transition-all shadow-md active:scale-95 disabled:opacity-50 disabled:pointer-events-none mt-2"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Verificando...
              </span>
            ) : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500">
            ¿Problemas para ingresar?{' '}
            <Link to="/perfil" className="text-blue-600 font-bold hover:text-blue-800 transition-colors">
              Soporte Técnico
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Login