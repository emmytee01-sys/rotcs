import { useState, useEffect } from 'react'
import { Table, Tabs, Row, Col, Spin } from 'antd'
import { MapPin, Users, TrendingUp, ShoppingCart } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import GeospatialHeatmap from '@/components/admin/GeospatialHeatmap'
import BuyingPowerHeatmap from '@/components/admin/BuyingPowerHeatmap'
import { TERRITORIAL_DATA_BY_STATE, BUYING_POWER_DATA_BY_STATE } from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'
import { useAuth } from '@/contexts/AuthContextCore'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'

type TerritorialState = { state: string; stateCode: string; lgas: { territory: string; users: number; ggr: number; playerWins: number; playerLosses: number; penetration: number; color: string }[] }



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
    title: 'Player Wins',
    dataIndex: 'playerWins',
    key: 'playerWins',
    render: (wins: number) => (
      <span className="text-sm font-black text-blue-400 tabular-nums">
        {formatCurrency(wins)}
      </span>
    ),
    sorter: (a: any, b: any) => a.playerWins - b.playerWins,
  },
  {
    title: 'Player Loss',
    dataIndex: 'playerLosses',
    key: 'playerLosses',
    render: (losses: number) => (
      <span className="text-sm font-black text-amber-500 tabular-nums">
        {formatCurrency(losses)}
      </span>
    ),
    sorter: (a: any, b: any) => a.playerLosses - b.playerLosses,
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
  const { user, token } = useAuth()
  const [territorialFromApi, setTerritorialFromApi] = useState<TerritorialState[] | null>(null)
  const [territorialLoading, setTerritorialLoading] = useState(false)
  const useDbTerritorial = user?.state_slug === 'ondo' || user?.state_slug === 'taraba'

  useEffect(() => {
    if (!useDbTerritorial || !token) return
    setTerritorialLoading(true)
    fetch(API_BASE + '/dashboard/territorial', { headers: { Authorization: `Bearer ${token}` } })
      .then((r) => r.ok ? r.json() : Promise.reject(new Error('Failed to fetch')))
      .then((data) => setTerritorialFromApi([{ state: data.state, stateCode: data.stateCode, lgas: data.lgas }]))
      .catch(() => setTerritorialFromApi([]))
      .finally(() => setTerritorialLoading(false))
  }, [useDbTerritorial, token])

  const territorialDataByStateRaw = useDbTerritorial && territorialFromApi ? territorialFromApi : TERRITORIAL_DATA_BY_STATE
  const territorialDataByState =
    user?.state_id && user?.state_code
      ? territorialDataByStateRaw.filter((s) => s.stateCode === user.state_code)
      : territorialDataByStateRaw

  const buyingPowerDataByStateRaw = BUYING_POWER_DATA_BY_STATE
  const buyingPowerDataByState =
    user?.state_id && user?.state_code
      ? buyingPowerDataByStateRaw.filter((s) => s.stateCode === user.state_code)
      : buyingPowerDataByStateRaw

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
              {/* Regional Rankings — per state, each with its LGAs */}
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUp className="text-emerald-500" size={20} />
                  <h4 className="text-xl bold-heading text-white m-0 uppercase italic tracking-tight">Regional Rankings</h4>
                </div>
                {territorialLoading ? (
                  <div className="flex items-center justify-center py-12"><Spin size="large" tip="Loading from database..." /></div>
                ) : (
                <div className="space-y-8 overflow-x-auto">
                  {territorialDataByState.map(({ state, stateCode, lgas }) => (
                    <div key={state}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-black text-emerald-400/90 uppercase tracking-widest border border-emerald-500/30 px-2 py-1 rounded-md">
                          {stateCode}
                        </span>
                        <h5 className="text-sm font-black text-white m-0 uppercase tracking-tight">{state}</h5>
                      </div>
                      <Table
                        dataSource={lgas}
                        columns={territorialColumns}
                        pagination={false}
                        rowKey="territory"
                        className="industrial-table mb-6"
                        scroll={{ x: 'max-content' }}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
                )}
              </div>
            </Col>
            <Col xs={24} lg={12}>
              {/* TGV Distribution — per state */}
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full flex flex-col">
                <h4 className="text-xl bold-heading text-white mb-8 uppercase italic tracking-tight">TGV Distribution</h4>
                {territorialLoading ? (
                  <div className="flex items-center justify-center flex-1 min-h-[300px]"><Spin size="large" /></div>
                ) : (
                <div className="space-y-8 flex-1 min-h-0">
                  {territorialDataByState.map(({ state, stateCode, lgas }) => (
                    <div key={state} className="min-h-[220px]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black text-emerald-400/90 uppercase tracking-widest border border-emerald-500/30 px-2 py-0.5 rounded">
                          {stateCode}
                        </span>
                        <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-tight">{state}</span>
                      </div>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={lgas} layout="vertical" margin={{ left: 8, right: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="territory"
                            width={90}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 9, fontWeight: 700 }}
                          />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#10B981', fontWeight: 900 }}
                            formatter={(value: any) => formatCurrency(value)}
                          />
                          <Bar dataKey="ggr" radius={[0, 4, 4, 0]}>
                            {lgas.map((entry, index) => (
                              <Cell key={`cell-${state}-${index}`} fill={entry.color} fillOpacity={0.8} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ))}
                </div>
                )}
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
                <div className="space-y-8 overflow-x-auto">
                  {buyingPowerDataByState.map(({ state, stateCode, lgas }) => (
                    <div key={state}>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-black text-blue-400/90 uppercase tracking-widest border border-blue-500/30 px-2 py-1 rounded-md">
                          {stateCode}
                        </span>
                        <h5 className="text-sm font-black text-white m-0 uppercase tracking-tight">{state}</h5>
                      </div>
                      <Table
                        dataSource={lgas}
                        columns={buyingPowerColumns}
                        pagination={false}
                        rowKey="territory"
                        className="industrial-table mb-6"
                        scroll={{ x: 'max-content' }}
                        size="small"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full flex flex-col">
                <h4 className="text-xl bold-heading text-white mb-8 uppercase italic tracking-tight">Spend Distribution</h4>
                <div className="space-y-8 flex-1 min-h-0">
                  {buyingPowerDataByState.map(({ state, stateCode, lgas }) => (
                    <div key={state} className="min-h-[220px]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-[10px] font-black text-blue-400/90 uppercase tracking-widest border border-blue-500/30 px-2 py-0.5 rounded">
                          {stateCode}
                        </span>
                        <span className="text-xs font-bold text-[#94A3B8] uppercase tracking-tight">{state}</span>
                      </div>
                      <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={lgas} layout="vertical" margin={{ left: 8, right: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                          <XAxis type="number" hide />
                          <YAxis
                            type="category"
                            dataKey="territory"
                            width={90}
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#64748B', fontSize: 9, fontWeight: 700 }}
                          />
                          <Tooltip
                            contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                            itemStyle={{ color: '#3B82F6', fontWeight: 900 }}
                            formatter={(value: any) => formatCurrency(value)}
                          />
                          <Bar dataKey="totalSpend" radius={[0, 4, 4, 0]}>
                            {lgas.map((entry, index) => (
                              <Cell key={`cell-${state}-${index}`} fill={entry.color} fillOpacity={0.8} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ))}
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
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">
            {user?.state_name || 'Regional'} Overview
          </h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Location-based Revenue Analysis for {user?.state_name || 'Jurisdiction'}
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
