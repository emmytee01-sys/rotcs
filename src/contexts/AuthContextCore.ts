import { createContext, useContext } from 'react'

export type UserRole = 'global_admin' | 'state_admin' | 'auditor' | 'operator_admin' | 'admin' | 'consultant' | 'operator'

export interface User {
  id: number | string
  username?: string
  email: string
  role: UserRole
  name?: string
  state_id?: number | null
  state_name?: string | null
  state_code?: string | null
  state_slug?: string | null
  state?: string // for backward compatibility if needed
}

export interface AuthContextType {
  user: User | null
  login: (username: string, password: string) => Promise<User>
  logout: () => void
  isLoading: boolean
  token: string | null
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
      state: 'Lagos',
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
