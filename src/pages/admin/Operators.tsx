import { Card, Typography, Table, Tag, Badge, Row, Col, Statistic } from 'antd'
import { Building2, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { useState } from 'react'
import OperatorDetailModal from '@/components/admin/OperatorDetailModal'
import { calculateVariance } from '@/utils/variance'
import { OPERATORS, TOTAL_MARKET_TGV } from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'

const { Title, Text } = Typography

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'compliant':
      return { color: 'success', icon: <CheckCircle size={16} />, text: 'Compliant' }
    case 'warning':
      return { color: 'warning', icon: <AlertCircle size={16} />, text: 'Review Required' }
    case 'default':
      return { color: 'error', icon: <XCircle size={16} />, text: 'In Default' }
    default:
      return { color: 'default', icon: null, text: 'Unknown' }
  }
}

const getVarianceTag = (variance: number) => {
  // Variance thresholds based on documentation:
  // Green: < 0.05%, Amber: 0.05% - 0.5%, Red: > 0.5%
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
    filters: [
      { text: 'Compliant', value: 'compliant' },
      { text: 'Warning', value: 'warning' },
      { text: 'Default', value: 'default' },
    ],
    onFilter: (value: any, record: any) => record.status === value,
  },
  {
    title: 'TGV',
    dataIndex: 'ggr',
    key: 'ggr',
    render: (ggr: number) => <Text>{formatCurrency(ggr)}</Text>,
    sorter: (a: any, b: any) => a.ggr - b.ggr,
  },
  {
    title: 'Tax Due',
    dataIndex: 'taxDue',
    key: 'taxDue',
    render: (taxDue: number) => <Text>{formatCurrency(taxDue)}</Text>,
  },
  {
    title: 'Tax Paid',
    dataIndex: 'taxPaid',
    key: 'taxPaid',
    render: (taxPaid: number, record: any) => {
      const isPaid = taxPaid >= record.taxDue
      return (
        <Text className={isPaid ? 'text-green-600' : 'text-red-600'}>
          {formatCurrency(taxPaid)}
        </Text>
      )
    },
  },
  {
    title: 'Variance Status',
    key: 'varianceStatus',
    render: (_: any, record: any) => {
      const variance = calculateVariance(record.taxDue, record.taxPaid)
      return getVarianceTag(variance)
    },
  },
  {
    title: 'Variance %',
    key: 'varianceValue',
    render: (_: any, record: any) => {
      const variance = calculateVariance(record.taxDue, record.taxPaid)
      return <Text type="secondary">{(variance * 100).toFixed(2)}%</Text>
    },
    sorter: (a: any, b: any) => {
      const varA = calculateVariance(a.taxDue, a.taxPaid)
      const varB = calculateVariance(b.taxDue, b.taxPaid)
      return varA - varB
    },
  },
  {
    title: 'Last Payment',
    dataIndex: 'lastPayment',
    key: 'lastPayment',
    render: (date: string) => <Text type="secondary">{date}</Text>,
  },
]

const Operators = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedOperator, setSelectedOperator] = useState<any>(null)

  const compliantCount = OPERATORS.filter(op => op.status === 'compliant').length
  const warningCount = OPERATORS.filter(op => op.status === 'warning').length
  const defaultCount = OPERATORS.filter(op => op.status === 'default').length
  const totalMarketTGV = TOTAL_MARKET_TGV

  const handleRowClick = (record: any) => {
    setSelectedOperator(record)
    setModalVisible(true)
  }

  return (
    <div>
      <Title level={2}>Operator Overview</Title>
      <Text type="secondary">Operator status and compliance overview</Text>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Operators"
              value={OPERATORS.length}
              prefix={<Building2 size={20} className="text-blue-500" />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Compliant"
              value={compliantCount}
              prefix={<CheckCircle size={20} className="text-green-500" />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Under Review"
              value={warningCount}
              prefix={<AlertCircle size={20} className="text-orange-500" />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Late Payments"
              value={defaultCount}
              prefix={<XCircle size={20} className="text-red-500" />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Market Volume */}
      <Card className="mt-6">
        <Title level={4}>Total Gaming Value</Title>
        <div className="text-4xl font-bold text-blue-600">
          {formatCurrency(totalMarketTGV)}
          <span className="text-sm font-normal text-gray-500 ml-2">(TGV)</span>
        </div>
        <Text type="secondary">Aggregate TGV across all operators</Text>
      </Card>

      {/* Operator Status Grid */}
      <Card className="mt-6">
        <Title level={4}>Operator Status Grid</Title>
        <Text type="secondary" className="block mb-4">Click on any row to view detailed information</Text>
        <div className="overflow-x-auto">
          <Table
            dataSource={OPERATORS}
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
