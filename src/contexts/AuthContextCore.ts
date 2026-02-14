import { createContext, useContext } from 'react'

export type UserRole = 'admin' | 'consultant' | 'operator'

export interface User {
  id: string
  email: string
  role: UserRole
  name: string
}

export interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Mock user database for testing
export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@rotcs.gov': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@rotcs.gov',
      role: 'admin',
      name: 'Admin User',
    },
  },
  'consultant@rotcs.gov': {
    password: 'consultant123',
    user: {
      id: '2',
      email: 'consultant@rotcs.gov',
      role: 'consultant',
      name: 'Consultant User',
    },
  },
  'operator@rotcs.gov': {
    password: 'operator123',
    user: {
      id: '3',
      email: 'operator@rotcs.gov',
      role: 'operator',
      name: 'Operator User',
    },
  },
}
