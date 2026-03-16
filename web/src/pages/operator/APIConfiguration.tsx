import { Card, Typography, Form, Input, Button, Table, Tag, Modal, Space } from 'antd'
import { Settings, Plus, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { toast } from '@/utils/notifications'
import showConfirm from '@/components/ui/ConfirmModal'

const { Title, Text } = Typography

interface Endpoint {
  id: number
  name: string
  url: string
  method: string
  status: 'active' | 'inactive'
  lastSync: string
}

const APIConfiguration = () => {
  const [endpoints, setEndpoints] = useState<Endpoint[]>([
    {
      id: 1,
      name: 'Transactions Endpoint',
      url: 'https://api.operator.com/v1/transactions',
      method: 'GET',
      status: 'active',
      lastSync: '2026-01-04 09:00:00',
    },
    {
      id: 2,
      name: 'Summary Endpoint',
      url: 'https://api.operator.com/v1/summary',
      method: 'GET',
      status: 'active',
      lastSync: '2026-01-04 00:01:00',
    },
  ])

  const [modalVisible, setModalVisible] = useState(false)
  const [editingEndpoint, setEditingEndpoint] = useState<Endpoint | null>(null)
  const [form] = Form.useForm()

  const handleSave = (values: any) => {
    if (editingEndpoint) {
      setEndpoints(endpoints.map(ep => 
        ep.id === editingEndpoint.id ? { ...ep, ...values } : ep
      ))
      toast.success('Endpoint updated successfully')
    } else {
      const newEndpoint: Endpoint = {
        id: Date.now(),
        ...values,
        status: 'active',
        lastSync: 'Never',
      }
      setEndpoints([...endpoints, newEndpoint])
      toast.success('Endpoint added successfully')
    }
    setModalVisible(false)
    form.resetFields()
    setEditingEndpoint(null)
  }

  const handleEdit = (endpoint: Endpoint) => {
    setEditingEndpoint(endpoint)
    form.setFieldsValue(endpoint)
    setModalVisible(true)
  }

  const handleDelete = (id: number) => {
    showConfirm({
      title: 'Delete Endpoint',
      content: 'Are you sure you want to delete this endpoint? This action cannot be undone.',
      onOk: () => {
        setEndpoints(endpoints.filter(ep => ep.id !== id))
        toast.success('Endpoint deleted successfully')
      },
      type: 'error',
    })
  }

  const handleTestConnection = (endpoint: Endpoint) => {
    toast.info('Testing connection...')
    setTimeout(() => {
      toast.success(`Connection to ${endpoint.name} successful!`)
    }, 1500)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      render: (text: string) => <Text className="font-mono text-xs">{text}</Text>,
    },
    {
      title: 'Method',
      dataIndex: 'method',
      key: 'method',
      render: (method: string) => <Tag color="blue">{method}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'success' : 'default'} icon={status === 'active' ? <CheckCircle size={14} /> : <XCircle size={14} />}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Last Sync',
      dataIndex: 'lastSync',
      key: 'lastSync',
      render: (text: string) => <Text type="secondary" className="text-xs">{text}</Text>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Endpoint) => (
        <Space>
          <Button size="small" onClick={() => handleTestConnection(record)}>
            Test
          </Button>
          <Button size="small" icon={<Edit size={14} />} onClick={() => handleEdit(record)} />
          <Button size="small" danger icon={<Trash2 size={14} />} onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>
        <Settings className="inline mr-2" size={24} />
        API Configuration
      </Title>
      <Text type="secondary">Configure your API endpoints for data ingestion</Text>

      <Card className="mt-6">
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
          <Title level={4}>Registered Endpoints</Title>
          <Button
            type="primary"
            icon={<Plus size={16} />}
            className="w-full sm:w-auto"
            onClick={() => {
              setEditingEndpoint(null)
              form.resetFields()
              setModalVisible(true)
            }}
          >
            Add Endpoint
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table dataSource={endpoints} columns={columns} rowKey="id" pagination={false} scroll={{ x: 'max-content' }} />
        </div>
      </Card>

      <Card className="mt-6">
        <Title level={4}>API Authentication</Title>
        <Form layout="vertical">
          <Form.Item label="API Key" help="This key is used to authenticate requests from ROTCS">
            <Input.Password value="sk_live_xxxxxxxxxxxxxxxxxxxxxxxx" disabled />
          </Form.Item>
          <Button type="primary">Regenerate API Key</Button>
        </Form>
      </Card>

      <Modal
        title={editingEndpoint ? 'Edit Endpoint' : 'Add New Endpoint'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false)
          form.resetFields()
          setEditingEndpoint(null)
        }}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSave}>
          <Form.Item
            label="Endpoint Name"
            name="name"
            rules={[{ required: true, message: 'Please enter endpoint name' }]}
          >
            <Input placeholder="e.g., Transactions Endpoint" />
          </Form.Item>

          <Form.Item
            label="URL"
            name="url"
            rules={[
              { required: true, message: 'Please enter URL' },
              { type: 'url', message: 'Please enter a valid URL' },
            ]}
          >
            <Input placeholder="https://api.operator.com/v1/transactions" />
          </Form.Item>

          <Form.Item
            label="HTTP Method"
            name="method"
            initialValue="GET"
            rules={[{ required: true }]}
          >
            <Input placeholder="GET" />
          </Form.Item>

          <Form.Item className="mb-0">
            <div className="flex justify-end gap-2">
              <Button onClick={() => setModalVisible(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingEndpoint ? 'Update' : 'Add'} Endpoint
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default APIConfiguration
