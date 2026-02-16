import { Card, Typography, Table, Tag, Tabs, Select } from 'antd'
import { MapPin, Users, TrendingUp, ShoppingCart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GeospatialHeatmap from '@/components/admin/GeospatialHeatmap'
import BuyingPowerHeatmap from '@/components/admin/BuyingPowerHeatmap'
import { useState } from 'react'
import { 
  CONSULTANT_TERRITORIAL_DATA, 
  CONSULTANT_BUYING_POWER_DATA,
  COMPANIES,
  CONSULTANT_STATES
} from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'

const { Title, Text } = Typography
const { Option } = Select

const territorialColumns = [
  {
    title: 'Territory/Region',
    dataIndex: 'territory',
    key: 'territory',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-blue-500" />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: 'Active Users',
    dataIndex: 'users',
    key: 'users',
    render: (users: number) => (
      <div className="flex items-center gap-2">
        <Users size={16} className="text-green-500" />
        <Text>{users.toLocaleString()}</Text>
      </div>
    ),
    sorter: (a: any, b: any) => a.users - b.users,
  },
  {
    title: 'TGV',
    dataIndex: 'ggr',
    key: 'ggr',
    render: (ggr: number) => (
      <Text className="font-semibold text-green-600">
        {formatCurrency(ggr)}
      </Text>
    ),
    sorter: (a: any, b: any) => a.ggr - b.ggr,
  },
  {
    title: 'Player Wins',
    dataIndex: 'playerWins',
    key: 'playerWins',
    render: (wins: number) => (
      <Text className="font-semibold text-blue-600">
        {formatCurrency(wins)}
      </Text>
    ),
    sorter: (a: any, b: any) => a.playerWins - b.playerWins,
  },
  {
    title: 'Player Loss',
    dataIndex: 'playerLosses',
    key: 'playerLosses',
    render: (losses: number) => (
      <Text className="font-semibold text-amber-600">
        {formatCurrency(losses)}
      </Text>
    ),
    sorter: (a: any, b: any) => a.playerLosses - b.playerLosses,
  },
  {
    title: 'Market Penetration',
    dataIndex: 'penetration',
    key: 'penetration',
    render: (penetration: number) => (
      <Tag color={penetration > 10 ? 'green' : 'orange'}>
        {penetration.toFixed(1)}%
      </Tag>
    ),
    sorter: (a: any, b: any) => a.penetration - b.penetration,
  },
]

const buyingPowerColumns = [
  {
    title: 'Territory/Region',
    dataIndex: 'territory',
    key: 'territory',
    render: (text: string) => (
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-blue-500" />
        <Text strong>{text}</Text>
      </div>
    ),
  },
  {
    title: 'Total Spend',
    dataIndex: 'totalSpend',
    key: 'totalSpend',
    render: (spend: number) => (
      <div className="flex items-center gap-2">
        <TrendingUp size={16} className="text-green-500" />
        <Text className="font-semibold text-green-600">
          {formatCurrency(spend)}
        </Text>
      </div>
    ),
    sorter: (a: any, b: any) => a.totalSpend - b.totalSpend,
  },
  {
    title: 'Transactions',
    dataIndex: 'transactions',
    key: 'transactions',
    render: (transactions: number) => (
      <div className="flex items-center gap-2">
        <ShoppingCart size={16} className="text-blue-500" />
        <Text>{transactions.toLocaleString()}</Text>
      </div>
    ),
    sorter: (a: any, b: any) => a.transactions - b.transactions,
  },
  {
    title: 'Avg Order Value',
    dataIndex: 'avgOrderValue',
    key: 'avgOrderValue',
    render: (avg: number) => (
      <Tag color="blue">
        ₦{avg.toLocaleString()}
      </Tag>
    ),
    sorter: (a: any, b: any) => a.avgOrderValue - b.avgOrderValue,
  },
]

const GeospatialIntel = () => {
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  const tabItems = [
    {
      key: 'territorial',
      label: (
        <span className="flex items-center gap-2 text-base font-semibold">
          <Users size={20} />
          Territorial Intelligence
        </span>
      ),
      children: (
        <div>
          <div className="flex flex-wrap gap-3 mb-4">
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
            >
              <Option value="all">All Companies</Option>
              {COMPANIES.map((company) => (
                <Option key={company} value={company}>{company}</Option>
              ))}
            </Select>
          </div>
          <Text type="secondary">Multi-state user density and economic activity across jurisdictions</Text>

          {/* Heatmap */}
          <GeospatialHeatmap />

          {/* Regional Leaderboard */}
          <Card className="mt-6">
            <Title level={4}>
              <TrendingUp className="inline mr-2" size={20} />
              Multi-State Regional Leaderboard
            </Title>
            <div className="overflow-x-auto">
              <Table
                dataSource={CONSULTANT_TERRITORIAL_DATA}
                columns={territorialColumns}
                pagination={false}
                rowKey="territory"
                scroll={{ x: 'max-content' }}
              />
            </div>
          </Card>

          {/* TGV Distribution Chart */}
          <Card className="mt-6">
            <Title level={4}>TGV Distribution by Territory</Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CONSULTANT_TERRITORIAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="territory" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar dataKey="ggr" radius={[8, 8, 0, 0]}>
                  {CONSULTANT_TERRITORIAL_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ),
    },
    {
      key: 'buying-power',
      label: (
        <span className="flex items-center gap-2 text-base font-semibold">
          <TrendingUp size={20} />
          Buying Power
        </span>
      ),
      children: (
        <div>
          <div className="flex flex-wrap gap-3 mb-4">
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
            >
              <Option value="all">All Companies</Option>
              {COMPANIES.map((company) => (
                <Option key={company} value={company}>{company}</Option>
              ))}
            </Select>
          </div>
          <Text type="secondary">Multi-state total spend and transaction analysis across regions</Text>

          {/* Buying Power Heatmap */}
          <BuyingPowerHeatmap />

          {/* Regional Spend Leaderboard */}
          <Card className="mt-6">
            <Title level={4}>
              <TrendingUp className="inline mr-2" size={20} />
              Multi-State Regional Spend Leaderboard
            </Title>
            <div className="overflow-x-auto">
              <Table
                dataSource={CONSULTANT_BUYING_POWER_DATA}
                columns={buyingPowerColumns}
                pagination={false}
                rowKey="territory"
                scroll={{ x: 'max-content' }}
              />
            </div>
          </Card>

          {/* Spend Distribution Chart */}
          <Card className="mt-6">
            <Title level={4}>Total Spend Distribution by Territory</Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={CONSULTANT_BUYING_POWER_DATA}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="territory" />
                <YAxis />
                <Tooltip formatter={(value: any) => formatCurrency(value)} />
                <Bar dataKey="totalSpend" radius={[8, 8, 0, 0]}>
                  {CONSULTANT_BUYING_POWER_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div>
      <Title level={2}>Geospatial Intel</Title>
      <Text type="secondary" className="block mb-4">
        Multi-state territorial intelligence and regional buying power analysis
      </Text>
      <Card className="mt-4">
        <Tabs 
          defaultActiveKey="territorial" 
          items={tabItems} 
          size="large"
          tabBarStyle={{ 
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '24px'
          }}
        />
      </Card>
    </div>
  )
}

export default GeospatialIntel
