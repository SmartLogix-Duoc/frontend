import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getPerfil, updatePerfil } from '../api/perfilService'

function Perfil() {
  const { user }              = useAuth()   // { userId, username, role }
  const [profile, setProfile] = useState(null)
  const [editing, setEditing] = useState(false)
  const [form, setForm]       = useState({})
  const [saved, setSaved]     = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // ── Carga inicial del perfil ──────────────────────────────────────────────
  useEffect(() => {
    if (!user?.userId) return

    getPerfil(user.userId)
      .then(data => {
        setProfile(data)
        setForm({
          firstName:   data.firstName   ?? '',
          lastName:    data.lastName    ?? '',
          phoneNumber: data.phoneNumber ?? '',
        })
      })
      .catch(err => setError(err.response?.data?.error ?? err.message))
      .finally(() => setLoading(false))
  }, [user])

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    try {
      const updated = await updatePerfil(user.userId, form)
      setProfile(updated)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      alert(`No se pudo guardar: ${err.response?.data?.error ?? err.message}`)
    }
  }

  const handleCancel = () => {
    setForm({
      firstName:   profile?.firstName   ?? '',
      lastName:    profile?.lastName    ?? '',
      phoneNumber: profile?.phoneNumber ?? '',
    })
    setEditing(false)
  }

  const fullName = profile
    ? `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
    : user?.username ?? '—'

  // ── Estados de carga y error ──────────────────────────────────────────────

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

  // ── Vista principal ───────────────────────────────────────────────────────

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Header */}
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

      {/* Mensaje guardado */}
      {saved && (
        <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-lg px-4 py-2.5 mb-6">
          ✓ Perfil actualizado correctamente
        </div>
      )}

      {/* Card */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800">
            Información personal
          </h2>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-blue-700 font-medium hover:underline"
            >
              Editar
            </button>
          )}
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-4">

          {/* Nombre */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Nombre
            </label>
            {editing ? (
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 text-sm">{profile?.firstName ?? '—'}</p>
            )}
          </div>

          {/* Apellido */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Apellido
            </label>
            {editing ? (
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 text-sm">{profile?.lastName ?? '—'}</p>
            )}
          </div>

          {/* Teléfono */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Teléfono
            </label>
            {editing ? (
              <input
                type="tel"
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 text-sm">{profile?.phoneNumber ?? '—'}</p>
            )}
          </div>

          {/* Usuario (solo lectura) */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Usuario
            </label>
            <p className="text-gray-800 text-sm">{user?.username ?? '—'}</p>
          </div>

          {/* Email (solo lectura) */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Correo electrónico
            </label>
            <p className="text-gray-800 text-sm">{profile?.user?.email ?? '—'}</p>
          </div>

          {/* Botones */}
          {editing && (
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-blue-900 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                Guardar cambios
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="border border-gray-300 text-gray-600 text-sm font-medium px-5 py-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>

    </div>
  )
}

export default Perfil