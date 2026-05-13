import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import AppRoutes from './app/AppRoutes'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-white text-gray-900">
          
          <main className="flex-1">
            <AppRoutes />
          </main>
          
        </div>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App