import { Card, Typography, Table, Tag, Badge, Row, Col, Statistic, Spin, Alert } from 'antd'
import { Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import OperatorDetailModal from '@/components/admin/OperatorDetailModal'
import { calculateVariance } from '@/utils/variance'
import { formatCurrency } from '@/utils/formatters'
import { useAuth } from '@/contexts/AuthContextCore'

const { Title, Text } = Typography

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'compliant':
      return { color: 'success', icon: <CheckCircle size={16} />, text: 'Active' }
    case 'warning':
    case 'inactive':
      return { color: 'warning', icon: <AlertCircle size={16} />, text: 'Review Required' }
    case 'revoked':
    case 'default':
      return { color: 'error', icon: <XCircle size={16} />, text: 'Revoked' }
    default:
      return { color: 'default', icon: null, text: 'Unknown' }
  }
}

const getVarianceTag = (variance: number) => {
  if (variance < 0.0005) return <Tag color="green">Green</Tag>
  if (variance < 0.005) return <Tag color="orange">Amber</Tag>
  return <Tag color="red">Red</Tag>
}

const columns = [
  {
    title: 'Operator',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <Building2 size={16} className="text-blue-500" />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: 'License',
    dataIndex: 'license_number',
    key: 'license_number',
    render: (text: string) => <Text code>{text}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const config = getStatusConfig(status)
      return (
        <Badge
          status={config.color as any}
          text={
            <span className="flex items-center gap-1">
              {config.icon}
              {config.text}
            </span>
          }
        />
      )
    },
  },
  {
    title: 'API Endpoint',
    dataIndex: 'api_endpoint',
    key: 'api_endpoint',
    render: (url: string) => <Text type="secondary" className="text-xs">{url || 'N/A'}</Text>,
  },
]

const Operators = () => {
  const { user, token } = useAuth()
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<any>(null)
  const [operators, setOperators] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [opsRes, statsRes] = await Promise.all([
          fetch((import.meta.env.VITE_API_URL || 'http://localhost:5001/api') + '/dashboard/operators', {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch((import.meta.env.VITE_API_URL || 'http://localhost:5001/api') + '/dashboard/stats', {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ])

        if (!opsRes.ok || !statsRes.ok) throw new Error('Failed to fetch data')

        const opsData = await opsRes.json()
        const statsData = await statsRes.json()

        setOperators(opsData)
        setStats(statsData.metrics)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (token) fetchData()
  }, [token])

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spin size="large" tip="Synchronizing Operator Records..." />
    </div>
  )

  if (error) return <Alert message="Error" description={error} type="error" showIcon className="mt-12" />

  const compliantCount = operators.filter(op => op.status === 'active').length
  const totalGGR = Number(stats?.total_ggr || 0)

  const handleRowClick = (record: any) => {
    setSelectedOperator(record)
    setModalVisible(true)
  }

  return (
    <div>
      <Title level={2}>{user?.state_name} Operator Fleet</Title>
      <Text type="secondary">Licensed gaming entities operating within {user?.state_name}</Text>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Operators"
              value={operators.length}
              prefix={<Building2 size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Licenses"
              value={compliantCount}
              prefix={<CheckCircle size={20} className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="State GGR"
              value={totalGGR}
              formatter={(value) => formatCurrency(Number(value))}
              prefix={<Badge status="processing" className="mr-2" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Compliance Rate"
              value={operators.length ? (compliantCount / operators.length) * 100 : 0}
              suffix="%"
              precision={1}
            />
          </Card>
        </Col>
      </Row>

      {/* Operator Status Grid */}
      <Card className="mt-6 border-0 shadow-sm bg-transparent">
        <Title level={4}>License Registry</Title>
        <Text type="secondary" className="block mb-4">Click row to inspect operator's real-time ingestion health</Text>
        <div className="overflow-x-auto">
          <Table
            dataSource={operators}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            onRow={(record) => ({
              onClick: () => handleRowClick(record),
              style: { cursor: 'pointer' },
            })}
          />
        </div>
      </Card>

      <OperatorDetailModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        operator={selectedOperator}
      />
    </div>
  )
}

export default Operators
