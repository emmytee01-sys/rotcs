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

  const onFinish = async (values: { email: string; password: string }) => {
    setError('')
    setLoading(true)

    try {
      await login(values.email, values.password)
      
      // AuthContext will handle the redirect based on user role
      // We'll navigate in the useEffect of a wrapper component
      // For now, just wait for the context to update
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
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' },
            ]}
          >
            <Input placeholder="Enter your email" />
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
            Admin: admin@rotcs.gov / admin123
          </Text>
          <Text type="secondary" className="text-xs block">
            Consultant: consultant@rotcs.gov / consultant123
          </Text>
          <Text type="secondary" className="text-xs block">
            Operator: operator@rotcs.gov / operator123
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

