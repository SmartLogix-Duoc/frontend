import { useState, useEffect } from 'react'
import { getProductos } from '../api/catalogoService'
// Si tienes lucide-react instalado, estos íconos le darán un toque genial
import { Edit, Trash2, Plus } from 'lucide-react' 

function GestionInventario() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Llamamos al microservicio de inventario
    getProductos()
      .then(data => setProductos(Array.isArray(data) ? data : []))
      .catch(err => console.error("Error cargando inventario:", err))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="p-10 text-center text-gray-500 font-medium">Cargando datos del inventario...</div>
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      {/* ── Header de Gestión ── */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">Control de Inventario</h1>
          <p className="text-gray-500 mt-1">Gestiona los productos y el stock disponible</p>
        </div>
        <button className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700 flex items-center gap-2 font-semibold transition-colors">
          <Plus size={20} /> Nuevo Producto
        </button>
      </div>

      {/* ── Tabla de Datos ── */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white text-sm uppercase tracking-wide">
              <th className="p-4 font-semibold">SKU</th>
              <th className="p-4 font-semibold">Producto</th>
              <th className="p-4 font-semibold hidden md:table-cell">Descripción</th>
              <th className="p-4 font-semibold">Precio Venta</th>
              <th className="p-4 font-semibold text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {productos.map(p => (
              <tr key={p.id} className="hover:bg-blue-50/50 transition-colors">
                <td className="p-4 text-gray-500 text-sm font-mono">#{p.id}</td>
                <td className="p-4 font-semibold text-gray-800">{p.name}</td>
                <td className="p-4 text-sm text-gray-500 truncate max-w-[200px] hidden md:table-cell">
                  {p.description}
                </td>
                <td className="p-4 font-bold text-blue-900">
                  ${Number(p.price).toLocaleString('es-CL')}
                </td>
                <td className="p-4 flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded hover:bg-blue-100 transition" title="Editar">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded hover:bg-red-100 transition" title="Eliminar">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            
            {productos.length === 0 && (
              <tr>
                <td colSpan="5" className="p-10 text-center text-gray-500">
                  No hay productos registrados en el sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GestionInventario