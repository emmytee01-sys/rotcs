import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, UserRole } from '@/contexts/AuthContextCore'
import Login from './Login'

// Wrapper component to handle automatic redirect after login
const AuthPage = () => {
  const navigate = useNavigate()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      // Redirect based on user role
      const dashboardPaths: Record<UserRole, string> = {
        admin: '/admin/revenue',
        consultant: '/consultant/hub',
        operator: '/operator/home',
      }
      navigate(dashboardPaths[user.role], { replace: true })
    }
  }, [user, navigate])

  return <Login />
}

export default AuthPage
