import { message, notification } from 'antd'

type NotificationType = 'success' | 'error' | 'info' | 'warning'

export const showToast = (type: NotificationType, content: string) => {
  message[type](content)
}

export const showNotification = (
  type: NotificationType,
  title: string,
  description?: string,
  duration: number = 4.5
) => {
  notification[type]({
    message: title,
    description,
    duration,
    placement: 'topRight',
  })
}

export const notify = {
  success: (message: string, description?: string) => 
    showNotification('success', message, description),
  
  error: (message: string, description?: string) => 
    showNotification('error', message, description),
  
  info: (message: string, description?: string) => 
    showNotification('info', message, description),
  
  warning: (message: string, description?: string) => 
    showNotification('warning', message, description),
}

export const toast = {
  success: (content: string) => showToast('success', content),
  error: (content: string) => showToast('error', content),
  info: (content: string) => showToast('info', content),
  warning: (content: string) => showToast('warning', content),
}
