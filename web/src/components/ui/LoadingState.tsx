import { Spin } from 'antd'
import { Loader2 } from 'lucide-react'

interface LoadingStateProps {
  message?: string
  fullScreen?: boolean
}

export const LoadingState = ({ message = 'Loading...', fullScreen = false }: LoadingStateProps) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <Spin indicator={<Loader2 className="animate-spin" size={48} />} />
      <p className="text-gray-600">{message}</p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        {content}
      </div>
    )
  }

  return <div className="py-12">{content}</div>
}

export default LoadingState
