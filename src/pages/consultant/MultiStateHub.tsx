import { Card, Typography, Select, Row, Col } from 'antd'
import { Globe, TrendingUp, CheckCircle } from 'lucide-react'
import ComparativeAnalytics from '@/components/consultant/ComparativeAnalytics'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import { useState } from 'react'
import { 
  COMPANIES,
  CONSULTANT_TOTAL_TGV,
  CONSULTANT_TAX_COLLECTED,
  CONSULTANT_PLAYER_WINS,
  CONSULTANT_STATES
} from '@/utils/mockData'

const { Title, Text } = Typography
const { Option } = Select


const MultiStateHub = () => {
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <Title level={2}>Multi-State Command Hub</Title>
          <Text type="secondary">Global view of all managed jurisdictions</Text>
        </div>
        <div className="flex flex-wrap gap-3">
          <Select
            value={selectedState}
            onChange={setSelectedState}
            className="w-full sm:w-[180px]"
            size="large"
          >
            <Option value="all">All States</Option>
            {CONSULTANT_STATES.map(state => (
              <Option key={state.id} value={state.id}>{state.name}</Option>
            ))}
          </Select>
          <Select
            value={selectedCompany}
            onChange={setSelectedCompany}
            className="w-full sm:w-[180px]"
            size="large"
            placeholder="Filter by Company"
          >
            <Option value="all">All Companies</Option>
            {COMPANIES.map((company) => (
              <Option key={company} value={company}>{company}</Option>
            ))}
          </Select>
        </div>
      </div>

      {/* Key Metrics - Multi-State Aggregated */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div>
              <Text type="secondary" className="text-sm">Total Gaming Value</Text>
              <div className="text-3xl font-bold text-green-600 mt-2">₦{(CONSULTANT_TOTAL_TGV / 1000000).toFixed(0)}M</div>
              <Text type="secondary" className="text-xs mt-1">Across 5 states</Text>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="text-sm">Total Tax Collected</Text>
                <div className="text-3xl font-bold text-blue-600 mt-2">₦{(CONSULTANT_TAX_COLLECTED / 1000000).toFixed(0)}M</div>
                <Text type="secondary" className="text-xs mt-1">Multi-state revenue</Text>
              </div>
              <TrendingUp size={24} className="text-blue-500 mt-2" />
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <div className="flex items-start justify-between">
              <div>
                <Text type="secondary" className="text-sm">Total Player Wins</Text>
                <div className="text-3xl font-bold text-purple-600 mt-2">₦{(CONSULTANT_PLAYER_WINS / 1000000).toFixed(0)}M</div>
                <Text type="secondary" className="text-xs mt-1">Aggregate payouts</Text>
              </div>
              <CheckCircle size={24} className="text-purple-500 mt-2" />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Portfolio Health Summary */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <Globe size={32} className="text-blue-500" />
              <div>
                <Text type="secondary" className="text-xs">Total States</Text>
                <div className="text-2xl font-bold">{CONSULTANT_STATES.length}</div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <CheckCircle size={32} className="text-green-500" />
              <div>
                <Text type="secondary" className="text-xs">Compliant States</Text>
                <div className="text-2xl font-bold text-green-600">
                  {CONSULTANT_STATES.filter(s => s.status === 'healthy').length}
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <TrendingUp size={32} className="text-purple-500" />
              <div>
                <Text type="secondary" className="text-xs">Avg Compliance Rate</Text>
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(CONSULTANT_STATES.reduce((sum, s) => sum + s.collectionRate, 0) / CONSULTANT_STATES.length)}%
                </div>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <div className="flex items-center gap-3">
              <Globe size={32} className="text-orange-500" />
              <div>
                <Text type="secondary" className="text-xs">Total Operators</Text>
                <div className="text-2xl font-bold text-orange-600">
                  {CONSULTANT_STATES.reduce((sum, s) => sum + s.operators, 0)}
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Real-Time Collections Feed */}
      <div className="mt-6">
        <RealTimeCollectionsFeed 
          selectedCompany={selectedCompany}
        />
      </div>

      {/* Comparative Analytics */}
      <div className="mt-6">
        <ComparativeAnalytics />
      </div>
    </div>
  )
}

export default MultiStateHub
