import { Card, Typography, Select, Row, Col } from 'antd'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'
import { 
  CONSULTANT_STATES, 
  PLAYER_WIN_RATIO, 
  NET_REVENUE_TAX_RATE 
} from '@/utils/mockData'

const { Title } = Typography
const { Option } = Select

// Derive comparative data from centralized source
const compareData = CONSULTANT_STATES.map(s => ({
  state: s.name.replace(' State', ''),
  ggr: s.tgv,
  taxCollected: Math.round(s.tgv * (1 - PLAYER_WIN_RATIO) * NET_REVENUE_TAX_RATE),
  operators: s.operators
}))

const trendData = [
  { month: 'Jan', Lagos: 1500000000, Ogun: 800000000, Rivers: 1100000000 },
  { month: 'Feb', Lagos: 1550000000, Ogun: 820000000, Rivers: 1180000000 },
  { month: 'Mar', Lagos: 1580000000, Ogun: 840000000, Rivers: 1210000000 },
  { month: 'Apr', Lagos: 1600000000, Ogun: 845000000, Rivers: 1230000000 },
  { month: 'May', Lagos: 1610000000, Ogun: 848000000, Rivers: 1235000000 },
  { month: 'Jun', Lagos: 1620000000, Ogun: 850000000, Rivers: 1240000000 },
]

const ComparativeAnalytics = () => {
  return (
    <Card>
      <div className="flex justify-between items-center mb-6">
        <Title level={4}>
          <TrendingUp className="inline mr-2" size={20} />
          Comparative Analytics
        </Title>
        <Select defaultValue="ggr" style={{ width: 200 }}>
          <Option value="ggr">Compare TGV</Option>
          <Option value="tax">Compare Tax Collection</Option>
          <Option value="operators">Compare Operators</Option>
          <Option value="compliance">Compare Compliance</Option>
        </Select>
      </div>

      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={5}>TGV Comparison Across States</Title>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={compareData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="state" />
              <YAxis />
              <Tooltip formatter={(value: any) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Bar dataKey="ggr" fill="#1890ff" name="TGV" />
              <Bar dataKey="taxCollected" fill="#52c41a" name="Tax Collected" />
            </BarChart>
          </ResponsiveContainer>
        </Col>

        <Col span={24}>
          <Title level={5}>TGV Trend Comparison (6 Months)</Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value: any) => `₦${(value / 1000000).toFixed(1)}M`} />
              <Legend />
              <Line type="monotone" dataKey="Lagos" stroke="#1890ff" strokeWidth={2} />
              <Line type="monotone" dataKey="Ogun" stroke="#52c41a" strokeWidth={2} />
              <Line type="monotone" dataKey="Rivers" stroke="#faad14" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Col>
      </Row>
    </Card>
  )
}

export default ComparativeAnalytics
