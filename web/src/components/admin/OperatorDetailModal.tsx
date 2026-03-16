import { Modal, Descriptions, Tag, Tabs, Table, Progress } from 'antd'
import { Building2, CheckCircle, XCircle, TrendingUp } from 'lucide-react'

interface OperatorDetailModalProps {
  visible: boolean
  onClose: () => void
  operator: {
    id: number
    name: string
    status: string
    ggr: number
    taxDue: number
    taxPaid: number
    lastPayment: string
    variance: number
  } | null
}

const OperatorDetailModal = ({ visible, onClose, operator }: OperatorDetailModalProps) => {
  if (!operator) return null

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'compliant':
        return { color: 'success', icon: <CheckCircle size={16} />, text: 'Compliant' }
      case 'warning':
        return { color: 'warning', icon: <XCircle size={16} />, text: 'Review Required' }
      case 'default':
        return { color: 'error', icon: <XCircle size={16} />, text: 'In Default' }
      default:
        return { color: 'default', icon: null, text: 'Unknown' }
    }
  }

  const statusConfig = getStatusConfig(operator.status)
  const complianceRate = (operator.taxPaid / operator.taxDue) * 100

  // Mock transaction history
  const transactions = [
    { id: 1, date: '2026-01-03', type: 'Payment', amount: 48000000, status: 'Completed' },
    { id: 2, date: '2026-01-02', type: 'Invoice', amount: 48000000, status: 'Paid' },
    { id: 3, date: '2025-12-15', type: 'Payment', amount: 45000000, status: 'Completed' },
  ]

  const transactionColumns = [
    { title: 'Date', dataIndex: 'date', key: 'date' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `₦${(amount / 1000000).toFixed(1)}M`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color="success">{status}</Tag>,
    },
  ]

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Building2 size={20} />
          <span>{operator.name} - Detailed View</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      width={800}
      footer={null}
    >
      <Tabs
        items={[
          {
            key: 'overview',
            label: 'Overview',
            children: (
              <div>
                <Descriptions bordered column={2}>
                  <Descriptions.Item label="Operator ID">{operator.id}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Tag color={statusConfig.color} icon={statusConfig.icon}>
                      {statusConfig.text}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="TGV (Current Period)">
                    ₦{(operator.ggr / 1000000).toFixed(1)}M
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Due">
                    ₦{(operator.taxDue / 1000000).toFixed(1)}M
                  </Descriptions.Item>
                  <Descriptions.Item label="Tax Paid">
                    ₦{(operator.taxPaid / 1000000).toFixed(1)}M
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Payment">
                    {operator.lastPayment}
                  </Descriptions.Item>
                  <Descriptions.Item label="Variance">
                    {(Math.abs((operator.taxPaid / operator.taxDue) - 1) * 100).toFixed(2)}%
                  </Descriptions.Item>
                  <Descriptions.Item label="Compliance Rate">
                    <Progress percent={complianceRate} size="small" />
                  </Descriptions.Item>
                </Descriptions>
              </div>
            ),
          },
          {
            key: 'transactions',
            label: 'Transaction History',
            children: (
              <Table
                dataSource={transactions}
                columns={transactionColumns}
                pagination={false}
                rowKey="id"
              />
            ),
          },
          {
            key: 'analytics',
            label: 'Analytics',
            children: (
              <div className="py-8 text-center text-gray-500">
                <TrendingUp size={48} className="mx-auto mb-4 text-gray-300" />
                <p>Detailed analytics and performance metrics will be displayed here</p>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  )
}

export default OperatorDetailModal
