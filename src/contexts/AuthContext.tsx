import { useState, useEffect, ReactNode } from 'react'
import { User, AuthContext } from './AuthContextCore'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user and token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rotcs_user')
    const storedToken = localStorage.getItem('rotcs_token')

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser))
        setToken(storedToken)
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('rotcs_user')
        localStorage.removeItem('rotcs_token')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (username: string, password: string): Promise<User> => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      let message = 'Login failed'
      try {
        const errorData = await response.json()
        message = errorData.message || message
      } catch {
        message = response.status === 500 ? 'Server error. Check if the database is running.' : message
      }
      throw new Error(message)
    }

    const data = await response.json()
    const authenticatedUser: User = data.user
    const authToken: string = data.token

    setUser(authenticatedUser)
    setToken(authToken)
    localStorage.setItem('rotcs_user', JSON.stringify(authenticatedUser))
    localStorage.setItem('rotcs_token', authToken)
    return authenticatedUser
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('rotcs_user')
    localStorage.removeItem('rotcs_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, token }}>
      {children}
    </AuthContext.Provider>
  )
}
