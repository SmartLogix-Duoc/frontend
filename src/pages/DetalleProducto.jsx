import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductoById } from '../api/catalogoService'
import { createPedido } from '../api/pedidoService'
import { ArrowLeft, ShoppingBag } from 'lucide-react'

function DetalleProducto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [procesando, setProcesando] = useState(false)

  useEffect(() => {
    getProductoById(id).then(setProducto)
  }, [id])

  const handleComprar = async () => {
    setProcesando(true)
    try {
      await createPedido({
        order_type: 'LOCAL', // Como es panadería, puede ser local
        items: [{ product_id: Number(id), amount: cantidad }],
      })
      alert("¡Pedido realizado con éxito! En breve lo prepararemos.")
      navigate('/menu') // Lo devolvemos al menú
    } catch (err) {
      alert("Error al procesar el pedido.")
    } finally {
      setProcesando(false)
    }
  }

  if (!producto) return <div className="text-center py-20 bg-[#FDFBF7] min-h-screen">Cargando...</div>

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-[#F0EBE1] overflow-hidden flex flex-col md:flex-row">
        
        {/* Imagen Gigante */}
        <div className="md:w-1/2 bg-[#FDF8EE] flex items-center justify-center p-20">
          <span className="text-9xl">🍞</span>
        </div>

        {/* Detalles de la compra */}
        <div className="md:w-1/2 p-10 flex flex-col justify-center">
          <Link to="/menu" className="inline-flex items-center text-[#C9972C] font-semibold mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al menú
          </Link>

          <h1 className="text-4xl font-bold text-[#3D1C02] mb-4">{producto.name}</h1>
          <p className="text-gray-600 mb-8 leading-relaxed">{producto.description}</p>
          
          <div className="text-3xl font-black text-[#C9972C] mb-8">
            ${Number(producto.price * cantidad).toLocaleString('es-CL')}
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="font-semibold text-[#3D1C02]">Cantidad:</span>
            <div className="flex items-center bg-[#FDF8EE] rounded-full px-4 py-2 border border-[#E5B65E]">
              <button onClick={() => setCantidad(Math.max(1, cantidad - 1))} className="text-[#3D1C02] px-2 font-bold">-</button>
              <span className="font-bold text-[#3D1C02] px-4 w-12 text-center">{cantidad}</span>
              <button onClick={() => setCantidad(cantidad + 1)} className="text-[#3D1C02] px-2 font-bold">+</button>
            </div>
          </div>

          <button 
            onClick={handleComprar}
            disabled={procesando}
            className="w-full bg-[#3D1C02] text-white py-4 rounded-full font-bold text-lg hover:bg-[#2A1301] transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ShoppingBag className="w-5 h-5" />
            {procesando ? 'Horneando pedido...' : 'Confirmar Compra'}
          </button>
        </div>

      </div>
    </div>
  )
}

export default DetalleProducto