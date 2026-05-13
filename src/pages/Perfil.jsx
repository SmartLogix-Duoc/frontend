import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getPerfil } from '../api/perfilService'

function Perfil() {
  const { user }              = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    if (!user?.userId) return

    getPerfil(user.userId)
      .then(data => setProfile(data))
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }, [user])

  const fullName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : user?.username ?? '—'

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center text-gray-400">
        Cargando perfil…
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <p className="text-red-600 font-medium">Error al cargar el perfil</p>
        <p className="text-sm text-gray-400 mt-1">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {fullName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-900">{fullName}</h1>
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              user?.role === 'ADMIN'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {user?.role ?? '—'}
          </span>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">
          Información personal
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Nombre
            </label>
            <p className="text-gray-800 text-sm">{profile?.firstName ?? '—'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Apellido
            </label>
            <p className="text-gray-800 text-sm">{profile?.lastName ?? '—'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Teléfono
            </label>
            <p className="text-gray-800 text-sm">{profile?.phoneNumber ?? '—'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Usuario
            </label>
            <p className="text-gray-800 text-sm">{user?.username ?? '—'}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Correo electrónico
            </label>
            <p className="text-gray-800 text-sm">{profile?.user?.email ?? '—'}</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Perfil
