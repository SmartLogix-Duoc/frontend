import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

// ── Helper: decodifica el payload del JWT ─────────────────────────────────────
function decodeToken(token) {
  try {
    const payload = token.split('.')[1]
    const padded  = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    return JSON.parse(atob(padded))
  } catch {
    return null
  }
}

// ── Provider ──────────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // { userId, username, role }
  const [loading, setLoading] = useState(true)

  // Al montar, leer el token que ya pudiera existir en localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const payload = decodeToken(token)
      if (payload) {
        setUser({
          userId:   payload.userId,
          username: payload.sub,
          // internal_role lleva el rol real (ADMIN | USER | CLIENT)
          // payload.role lleva "authenticated" (para Supabase), se usa como fallback
          role:     payload.internal_role ?? payload.role,
        })
      }
    }
    setLoading(false)
  }, [])

  // ── login: guarda token y actualiza estado ──────────────────────────────────
  const login = (token) => {
    localStorage.setItem('token', token)
    const payload = decodeToken(token)
    if (payload) {
      setUser({
        userId:   payload.userId,
        username: payload.sub,
        role:     payload.internal_role ?? payload.role,
      })
    }
  }

  // ── logout: limpia token y estado ──────────────────────────────────────────
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  const isAuthenticated = Boolean(user)

  return (
    <AuthContext.Provider value={{ user, loading, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook de consumo ───────────────────────────────────────────────────────────
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return context
}
