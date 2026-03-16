import { Card, Typography, Table, Tag, Badge } from 'antd'
import { Activity, CheckCircle, XCircle, Clock } from 'lucide-react'

const { Title, Text } = Typography

// Mock API ingestion logs
const ingestionLogs = [
  {
    id: 1,
    operator: 'Bet9ja',
    endpoint: '/api/v1/transactions',
    lastSync: '2026-01-04 09:00:00',
    status: 'success',
    recordsIngested: 15420,
    responseTime: 245,
  },
  {
    id: 2,
    operator: 'SportyBet',
    endpoint: '/api/v1/transactions',
    lastSync: '2026-01-04 09:00:15',
    status: 'success',
    recordsIngested: 12380,
    responseTime: 198,
  },
  {
    id: 3,
    operator: '1xBet',
    endpoint: '/api/v1/transactions',
    lastSync: '2026-01-04 08:55:00',
    status: 'warning',
    recordsIngested: 8920,
    responseTime: 1250,
  },
  {
    id: 4,
    operator: 'BetKing',
    endpoint: '/api/v1/transactions',
    lastSync: '2026-01-04 08:50:00',
    status: 'error',
    recordsIngested: 0,
    responseTime: 0,
  },
]

const APIIngestionLogs = () => {
  const columns = [
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'Endpoint',
      dataIndex: 'endpoint',
      key: 'endpoint',
      render: (text: string) => <Text className="font-mono text-xs">{text}</Text>,
    },
    {
      title: 'Last Sync',
      dataIndex: 'lastSync',
      key: 'lastSync',
      render: (text: string) => (
        <div className="flex items-center gap-1">
          <Clock size={14} className="text-gray-400" />
          <Text type="secondary" className="text-xs">{text}</Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const config = {
          success: { color: 'success', icon: <CheckCircle size={14} />, text: 'Success' },
          warning: { color: 'warning', icon: <Clock size={14} />, text: 'Slow' },
          error: { color: 'error', icon: <XCircle size={14} />, text: 'Failed' },
        }[status] || { color: 'default', icon: null, text: 'Unknown' }

        return (
          <Tag color={config.color} icon={config.icon}>
            {config.text}
          </Tag>
        )
      },
      filters: [
        { text: 'Success', value: 'success' },
        { text: 'Warning', value: 'warning' },
        { text: 'Error', value: 'error' },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },
    {
      title: 'Records',
      dataIndex: 'recordsIngested',
      key: 'recordsIngested',
      render: (count: number) => count.toLocaleString(),
      sorter: (a: any, b: any) => a.recordsIngested - b.recordsIngested,
    },
    {
      title: 'Response Time',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time: number) => (
        <Text className={time > 1000 ? 'text-red-600' : time > 500 ? 'text-orange-600' : 'text-green-600'}>
          {time}ms
        </Text>
      ),
      sorter: (a: any, b: any) => a.responseTime - b.responseTime,
    },
  ]

  const successCount = ingestionLogs.filter((log) => log.status === 'success').length
  const errorCount = ingestionLogs.filter((log) => log.status === 'error').length

  return (
    <Card>
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>
          <Activity className="inline mr-2" size={20} />
          API Ingestion Logs
        </Title>
        <div className="flex gap-4">
          <Badge status="success" text={`${successCount} Active`} />
          <Badge status="error" text={`${errorCount} Failed`} />
        </div>
      </div>
      <Table dataSource={ingestionLogs} columns={columns} pagination={false} rowKey="id" />
    </Card>
  )
}

export default APIIngestionLogs
