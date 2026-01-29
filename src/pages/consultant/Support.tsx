import { Typography } from 'antd'
import SupportChat from '@/components/shared/SupportChat'

const { Title, Text } = Typography

const Support = () => {
  return (
    <div>
      <div className="mb-6">
        <Title level={2}>Support Center</Title>
        <Text type="secondary">Manage support conversations with admins and operators</Text>
      </div>
      <SupportChat userRole="consultant" userName="Support Consultant" />
    </div>
  )
}

export default Support
