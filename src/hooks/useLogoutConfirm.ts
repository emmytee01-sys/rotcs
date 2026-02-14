import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContextCore'
import { showConfirm } from '@/components/ui/ConfirmModal'

export const useLogoutConfirm = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const showLogoutConfirm = () => {
    showConfirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout? Any unsaved changes will be lost.',
      okText: 'Yes, Logout',
      cancelText: 'Cancel',
      type: 'error',
      onOk() {
        logout()
        navigate('/', { replace: true })
      },
    })
  }

  return { showLogoutConfirm }
}

export default useLogoutConfirm
