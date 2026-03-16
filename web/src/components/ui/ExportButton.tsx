import { Button, Dropdown } from 'antd'
import { Download, FileText, FileSpreadsheet, File } from 'lucide-react'
import { toast } from '@/utils/notifications'

interface ExportButtonProps {
  data: any[]
  filename: string
  formats?: ('csv' | 'excel' | 'pdf')[]
}

export const ExportButton = ({ 
  data, 
  filename, 
  formats = ['csv', 'excel', 'pdf'] 
}: ExportButtonProps) => {
  
  const handleExport = (format: string) => {
    // Mock export - will be implemented with actual export libraries
    toast.success(`Exporting ${filename}.${format}...`)
    console.log('Exporting data:', { format, data, filename })
  }

  const menuItems = [
    formats.includes('csv') && {
      key: 'csv',
      icon: <FileText size={16} />,
      label: 'Export as CSV',
      onClick: () => handleExport('csv'),
    },
    formats.includes('excel') && {
      key: 'excel',
      icon: <FileSpreadsheet size={16} />,
      label: 'Export as Excel',
      onClick: () => handleExport('xlsx'),
    },
    formats.includes('pdf') && {
      key: 'pdf',
      icon: <File size={16} />,
      label: 'Export as PDF',
      onClick: () => handleExport('pdf'),
    },
  ].filter(Boolean)

  return (
    <Dropdown menu={{ items: menuItems as any }} placement="bottomRight">
      <Button icon={<Download size={16} />}>
        Export
      </Button>
    </Dropdown>
  )
}

export default ExportButton
