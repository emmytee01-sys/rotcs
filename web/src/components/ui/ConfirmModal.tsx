import { Modal } from 'antd'
import { AlertTriangle, Info, XCircle, CheckCircle2 } from 'lucide-react'

interface ConfirmOptions {
  title: string
  content: string
  onOk: () => void | Promise<void>
  onCancel?: () => void
  okText?: string
  cancelText?: string
  type?: 'warning' | 'error' | 'info' | 'success'
}

export const showConfirm = ({
  title,
  content,
  onOk,
  onCancel,
  okText = 'Confirm Action',
  cancelText = 'Cancel',
  type = 'warning'
}: ConfirmOptions) => {
  const getIcon = () => {
    switch (type) {
      case 'error': return <XCircle size={28} className="text-red-500" />
      case 'success': return <CheckCircle2 size={28} className="text-emerald-500" />
      case 'info': return <Info size={28} className="text-blue-500" />
      default: return <AlertTriangle size={28} className="text-amber-500" />
    }
  }

  const getOkButtonProps = () => {
    if (type === 'error') {
      return { className: 'bg-red-600 hover:bg-red-500 border-none font-bold' }
    }
    return { className: 'bg-emerald-600 hover:bg-emerald-500 border-none font-bold' }
  }

  Modal.confirm({
    title: <span className="text-white text-xl font-black uppercase tracking-tight italic">{title}</span>,
    icon: <div className="mb-4">{getIcon()}</div>,
    content: <div className="text-[#94A3B8] text-sm font-medium leading-relaxed">{content}</div>,
    okText,
    cancelText,
    okButtonProps: getOkButtonProps(),
    cancelButtonProps: { 
      className: 'bg-transparent border-emerald-500/30 text-emerald-500 hover:text-emerald-400 hover:border-emerald-400 font-bold' 
    },
    centered: true,
    width: 440,
    className: 'emerald-confirm-modal',
    onOk,
    onCancel,
  })
}

export default showConfirm
