import { useState, useEffect, ReactNode } from 'react'
import { User, AuthContext, MOCK_USERS } from './AuthContextCore'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rotcs_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('rotcs_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const userRecord = MOCK_USERS[email.toLowerCase()]

    if (!userRecord || userRecord.password !== password) {
      throw new Error('Invalid email or password')
    }

    const authenticatedUser = userRecord.user
    setUser(authenticatedUser)
    localStorage.setItem('rotcs_user', JSON.stringify(authenticatedUser))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('rotcs_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
