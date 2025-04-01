"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Tipos
type User = {
  id: string
  email: string
  isAdmin: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  error: string | null
}

// Valores por defecto
const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  login: async () => {},
  logout: async () => {},
  error: null,
}

// Crear el contexto
const AuthContext = createContext<AuthContextType>(defaultAuthContext)

// Hook personalizado para usar el contexto
export const useAuth = () => useContext(AuthContext)

// Proveedor del contexto
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simular verificación de sesión al cargar
  useEffect(() => {
    // Aquí se implementaría la verificación con Firebase
    const checkAuth = () => {
      const savedUser = localStorage.getItem("admin_user")
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
      setLoading(false)
    }

    checkAuth()
  }, [])

  // Función de login
  const login = async (email: string, password: string) => {
    setError(null)
    try {
      setLoading(true)

      // Simulación de autenticación (reemplazar con Firebase)
      if (email === "admin@leoradiadores.com" && password === "admin123") {
        const user = {
          id: "1",
          email: email,
          isAdmin: true,
        }
        setUser(user)
        localStorage.setItem("admin_user", JSON.stringify(user))
      } else {
        throw new Error("Credenciales incorrectas")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de autenticación")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Función de logout
  const logout = async () => {
    try {
      // Simulación de cierre de sesión (reemplazar con Firebase)
      setUser(null)
      localStorage.removeItem("admin_user")
    } catch (err) {
      console.error(err)
    }
  }

  return <AuthContext.Provider value={{ user, loading, login, logout, error }}>{children}</AuthContext.Provider>
}

