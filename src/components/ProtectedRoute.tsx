import { Navigate, Outlet } from 'react-router-dom'
import { useAuth, UserRole } from '@/contexts/AuthContextCore'
import { Spin } from 'antd'

interface ProtectedRouteProps {
  allowedRoles: UserRole[]
}

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth()

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  // Redirect to landing page if not logged in (they can sign in via modal)
  if (!user) {
    return <Navigate to="/" replace />
  }

  // Redirect to user's dashboard if accessing wrong role's routes
  if (!allowedRoles.includes(user.role)) {
    const dashboardPaths: Record<UserRole, string> = {
      admin: '/admin/revenue',
      consultant: '/consultant/hub',
      operator: '/operator/home',
    }
    return <Navigate to={dashboardPaths[user.role]} replace />
  }

  // User is authenticated and has correct role
  return <Outlet />
}

export default ProtectedRoute

