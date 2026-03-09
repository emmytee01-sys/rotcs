import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Form, Input, Button, Typography, Alert } from 'antd'
import { Lock, ArrowLeft } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContextCore'

const { Title, Text, Link } = Typography

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const dashboardPaths: Record<string, string> = {
    admin: '/admin/revenue',
    state_admin: '/admin/revenue',
    consultant: '/consultant/hub',
    global_admin: '/consultant/hub',
    operator: '/operator/home',
    operator_admin: '/operator/home',
  }

  const onFinish = async (values: { username: string; password: string }) => {
    setError('')
    setLoading(true)
    try {
      const loggedInUser = await login(values.username, values.password)
      const path = dashboardPaths[loggedInUser.role] || '/'
      navigate(path, { replace: true })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 px-4">
      <Card className="w-full max-w-md shadow-2xl">
        {/* Back to Home Link */}
        <div className="mb-4">
          <Link
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full mb-4">
            <Lock className="text-white" size={32} />
          </div>
          <Title level={2} className="m-0">ROTCS</Title>
          <Text type="secondary">Regulatory Oversight & Tax Calculation System</Text>
        </div>

        {error && (
          <Alert
            message="Authentication Failed"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => setError('')}
            className="mb-4"
          />
        )}

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[
              { required: true, message: 'Please input your username!' },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              style={{
                background: loading ? undefined : 'linear-gradient(135deg, #008751 0%, #006d3f 100%)',
                border: 'none'
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div className="text-center mt-6">
          <Text type="secondary" className="text-xs block mb-2">
            Test Credentials:
          </Text>
          <Text type="secondary" className="text-xs block">
            Lagos Admin: lagos_admin / admin123
          </Text>
          <Text type="secondary" className="text-xs block">
            Ondo Admin: ondo_admin / admin123
          </Text>
          <Text type="secondary" className="text-xs block">
            Taraba Admin: taraba_admin / admin123
          </Text>
          <Text type="secondary" className="text-xs block">
            Global: global_consultant / admin123
          </Text>
        </div>

        <div className="text-center mt-6">
          <Text type="secondary" className="text-xs">
            © 2026 ROTCS. All rights reserved.
          </Text>
        </div>
      </Card>
    </div>
  )
}

export default Login

