import { Row, Col, Card, Statistic, Progress, Typography, Select } from 'antd'
import { TrendingUp, CheckCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import ExportButton from '@/components/ui/ExportButton'
import { useState } from 'react'
import { 
  COMPANIES, 
  TOTAL_MARKET_TGV, 
  TOTAL_PLAYER_WINS, 
  PROJECTED_REVENUE, 
  REVENUE_TREND_DATA,
  TOTAL_TAX_COLLECTED 
} from '@/utils/mockData'

const { Title, Text } = Typography
const { Option } = Select

const RevenueCenter = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  const collectedMTD = TOTAL_TAX_COLLECTED
  const projectedRevenue = PROJECTED_REVENUE
  const progressPercent = (collectedMTD / projectedRevenue) * 100

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <Title level={2} className="mb-2">Revenue Command Center</Title>
          <Text type="secondary">Real-time tax revenue tracking and collections monitoring</Text>
        </div>

        {/* Global Filters */}
        <div className="flex flex-wrap gap-3">
          <Select
            value={selectedCompany}
            onChange={setSelectedCompany}
            className="w-full sm:w-[180px]"
            placeholder="Filter by Company"
            size="large"
          >
            <Option value="all">All Companies</Option>
            {COMPANIES.map((company) => (
              <Option key={company} value={company}>{company}</Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} className="mt-6">
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Gaming Value"
              value={TOTAL_MARKET_TGV}
              suffix="₦"
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Company Revenue"
              value={projectedRevenue}
              prefix={<TrendingUp size={20} className="text-blue-500" />}
              suffix="₦"
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Player Wins"
              value={TOTAL_PLAYER_WINS}
              suffix="₦"
              prefix={<CheckCircle size={20} className="text-purple-500" />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>

      </Row>

      {/* Revenue Progress */}
      <Card className="mt-6">
        <Title level={4}>Monthly Revenue Target</Title>
        <div className="mb-4">
          <Progress
            percent={progressPercent}
            status="active"
            strokeColor={{
              '0%': '#108ee9',
              '100%': '#87d068',
            }}
            format={(percent) => `${percent?.toFixed(1)}% of ₦${(projectedRevenue / 1000000).toFixed(0)}M`}
          />
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Text strong>Collected:</Text> <Text className="text-green-600">₦{(collectedMTD / 1000000).toFixed(1)}M</Text>
          </Col>
          <Col span={12}>
            <Text strong>Remaining:</Text> <Text className="text-orange-600">₦{((projectedRevenue - collectedMTD) / 1000000).toFixed(1)}M</Text>
          </Col>
        </Row>
      </Card>

      {/* Real-Time Collections Feed - Full Width Section */}
      <div className="mt-6">
        <RealTimeCollectionsFeed 
          selectedCompany={selectedCompany}
        />
      </div>

      {/* Revenue Trend Chart - Full Width Section */}
      <Card className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <Title level={4}>Revenue Trend (6 Months)</Title>
          <ExportButton data={REVENUE_TREND_DATA} filename="revenue-trend" />
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={REVENUE_TREND_DATA}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: any) => `₦${(value / 1000000).toFixed(1)}M`} />
            <Area type="monotone" dataKey="revenue" stroke="#1890ff" fill="#1890ff" fillOpacity={0.3} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

export default RevenueCenter
