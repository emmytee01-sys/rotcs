import { Table, Tabs, Row, Col } from 'antd'
import { MapPin, Users, TrendingUp, ShoppingCart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GeospatialHeatmap from '@/components/admin/GeospatialHeatmap'
import BuyingPowerHeatmap from '@/components/admin/BuyingPowerHeatmap'
import { TERRITORIAL_DATA, BUYING_POWER_DATA } from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'



const territorialColumns = [
  {
    title: 'Territory/LGA',
    dataIndex: 'territory',
    key: 'territory',
    render: (text: string) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <MapPin size={14} className="text-emerald-500" />
        </div>
        <span className="text-sm font-black text-white uppercase tracking-tight">{text}</span>
      </div>
    ),
  },
  {
    title: 'Active Users',
    dataIndex: 'users',
    key: 'users',
    render: (users: number) => (
      <div className="flex items-center gap-2">
        <Users size={14} className="text-[#64748B]" />
        <span className="text-sm font-black text-white tabular-nums">{users.toLocaleString()}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.users - b.users,
  },
  {
    title: 'TGV',
    dataIndex: 'ggr',
    key: 'ggr',
    render: (ggr: number) => (
      <span className="text-sm font-black text-emerald-400 tabular-nums">
        {formatCurrency(ggr)}
      </span>
    ),
    sorter: (a: any, b: any) => a.ggr - b.ggr,
  },
  {
    title: 'Penetration',
    dataIndex: 'penetration',
    key: 'penetration',
    render: (penetration: number) => (
      <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-black text-white inline-block">
        {penetration.toFixed(1)}%
      </div>
    ),
    sorter: (a: any, b: any) => a.penetration - b.penetration,
  },
]

const buyingPowerColumns = [
  {
    title: 'Territory/LGA',
    dataIndex: 'territory',
    key: 'territory',
    render: (text: string) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
          <MapPin size={14} className="text-blue-500" />
        </div>
        <span className="text-sm font-black text-white uppercase tracking-tight">{text}</span>
      </div>
    ),
  },
  {
    title: 'Total Spend',
    dataIndex: 'totalSpend',
    key: 'totalSpend',
    render: (spend: number) => (
      <div className="flex items-center gap-2">
        <TrendingUp size={14} className="text-emerald-500" />
        <span className="text-sm font-black text-emerald-400 tabular-nums">
          {formatCurrency(spend)}
        </span>
      </div>
    ),
    sorter: (a: any, b: any) => a.totalSpend - b.totalSpend,
  },
  {
    title: 'Events',
    dataIndex: 'transactions',
    key: 'transactions',
    render: (transactions: number) => (
      <div className="flex items-center gap-2">
        <ShoppingCart size={14} className="text-[#64748B]" />
        <span className="text-sm font-black text-white tabular-nums">{transactions.toLocaleString()}</span>
      </div>
    ),
    sorter: (a: any, b: any) => a.transactions - b.transactions,
  },
  {
    title: 'AOV',
    dataIndex: 'avgOrderValue',
    key: 'avgOrderValue',
    render: (avg: number) => (
      <span className="text-xs font-black text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md">
        ₦{avg.toLocaleString()}
      </span>
    ),
    sorter: (a: any, b: any) => a.avgOrderValue - b.avgOrderValue,
  },
]

const Geospatial = () => {
  const tabItems = [
    {
      key: 'territorial',
      label: (
        <span className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
          <Users size={14} />
          Regional Data
        </span>
      ),
      children: (
        <div className="space-y-8">
          <p className="text-[#64748B] text-xs font-bold uppercase tracking-[0.2em] italic pl-4 border-l-2 border-emerald-500">
            User density mapping and regional performance monitoring
          </p>

          {/* Heatmap */}
          <div className="rounded-3xl border-2 border-white/[0.05] overflow-hidden bg-black/20 shadow-2xl">
            <GeospatialHeatmap />
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              {/* Regional Leaderboard */}
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-emerald-500" size={20} />
                  <h4 className="text-xl bold-heading text-white m-0 uppercase italic tracking-tight">Regional Rankings</h4>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    dataSource={TERRITORIAL_DATA}
                    columns={territorialColumns}
                    pagination={false}
                    rowKey="territory"
                    className="industrial-table"
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              {/* TGV Distribution Chart */}
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full flex flex-col">
                <h4 className="text-xl bold-heading text-white mb-8 uppercase italic tracking-tight">TGV Distribution</h4>
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={TERRITORIAL_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="territory" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#10B981', fontWeight: 900 }}
                        formatter={(value: any) => formatCurrency(value)} 
                      />
                      <Bar dataKey="ggr" radius={[6, 6, 0, 0]}>
                        {TERRITORIAL_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'buying-power',
      label: (
        <span className="flex items-center gap-2 uppercase tracking-widest font-black text-[10px]">
          <TrendingUp size={14} />
          Buying Power
        </span>
      ),
      children: (
        <div className="space-y-8">
          <p className="text-[#64748B] text-xs font-bold uppercase tracking-[0.2em] italic pl-4 border-l-2 border-blue-500">
            Regional spend analysis and transaction velocity monitoring
          </p>

          <div className="rounded-3xl border-2 border-white/[0.05] overflow-hidden bg-black/20 shadow-2xl">
            <BuyingPowerHeatmap />
          </div>

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={12}>
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-blue-500" size={20} />
                  <h4 className="text-xl bold-heading text-white m-0 uppercase italic tracking-tight">Spend Rankings</h4>
                </div>
                <div className="overflow-x-auto">
                  <Table
                    dataSource={BUYING_POWER_DATA}
                    columns={buyingPowerColumns}
                    pagination={false}
                    rowKey="territory"
                    className="industrial-table"
                    scroll={{ x: 'max-content' }}
                  />
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full flex flex-col">
                <h4 className="text-xl bold-heading text-white mb-8 uppercase italic tracking-tight">Spend Distribution</h4>
                <div className="flex-1 min-h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={BUYING_POWER_DATA}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis 
                        dataKey="territory" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#64748B', fontSize: 10, fontWeight: 700 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                        itemStyle={{ color: '#3B82F6', fontWeight: 900 }}
                        formatter={(value: any) => formatCurrency(value)} 
                      />
                      <Bar dataKey="totalSpend" radius={[6, 6, 0, 0]}>
                        {BUYING_POWER_DATA.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Regional Overview</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Location-based Revenue Analysis
          </p>
        </div>
      </div>

      <div className="p-2 md:p-4 rounded-[32px] bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl">
        <Tabs 
          defaultActiveKey="territorial" 
          items={tabItems} 
          size="large"
          className="custom-tabs"
        />
      </div>
    </div>
  )
}

export default Geospatial
