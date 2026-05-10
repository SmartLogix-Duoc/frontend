import { useState } from 'react'

const initialData = {
  full_name: 'Juan Pérez',
  email: 'juan.perez@empresa.cl',
  role: 'OPERATOR',
  is_active: true,
}

function Perfil() {
  const [user, setUser] = useState(initialData)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(initialData)
  const [saved, setSaved] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSave = (e) => {
    e.preventDefault()

    // TODO: conectar con PUT /api/usuarios/{id} del MS Usuarios
    // await fetch(`http://localhost:8001/api/usuarios/${user.id}`, {
    //   method: 'PUT',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify(form)
    // })

    setUser(form)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancel = () => {
    setForm(user)
    setEditing(false)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">

      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center">
          <span className="text-white text-2xl font-bold">
            {user.full_name.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-blue-900">{user.full_name}</h1>
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full
            ${user.role === 'ADMIN' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-600'}`}>
            {user.role}
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
              Nombre completo
            </label>
            {editing ? (
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 text-sm">{user.full_name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Correo electrónico
            </label>
            {editing ? (
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <p className="text-gray-800 text-sm">{user.email}</p>
            )}
          </div>

          {/* Estado */}
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-1">
              Estado de cuenta
            </label>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full
              ${user.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
              {user.is_active ? 'Activa' : 'Inactiva'}
            </span>
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