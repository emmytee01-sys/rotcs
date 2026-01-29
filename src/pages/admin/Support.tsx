import { Typography } from 'antd'
import SupportChat from '@/components/shared/SupportChat'

const { Title, Text } = Typography

const Support = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Support</Title>
        <Text type="secondary">Chat with consultants for assistance and support</Text>
      </div>
      <SupportChat userRole="admin" userName="Lagos State Admin" />
    </div>
  )
}

export default Support
