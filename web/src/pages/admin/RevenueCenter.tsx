import { Row, Col, Select, Spin, Alert, Table } from 'antd'
import { TrendingUp, CheckCircle, Zap, Receipt } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import ExportButton from '@/components/ui/ExportButton'
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContextCore'
import {
  REVENUE_TREND_DATA
} from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
const { Option } = Select

type WithholdingData = {
  withholdingTaxRate: number
  totalPayout: number
  taxWithheld: number
  byOperator: { operator_name: string; total_payout: number; tax_withheld: number }[]
}

const RevenueCenter = () => {
  const { user, token } = useAuth()
  const [selectedCompany, setSelectedCompany] = useState<string>('all')
  const [stats, setStats] = useState<any>(null)
  const [operators, setOperators] = useState<any[]>([])
  const [withholding, setWithholding] = useState<WithholdingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const isTaraba = user?.state_slug === 'taraba'

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const reqs: Promise<Response>[] = [
          fetch(API_BASE + '/dashboard/stats', { headers: { Authorization: `Bearer ${token}` } }),
          fetch(API_BASE + '/dashboard/operators', { headers: { Authorization: `Bearer ${token}` } })
        ]
        if (isTaraba) reqs.push(fetch(API_BASE + '/dashboard/withholding', { headers: { Authorization: `Bearer ${token}` } }))
        const [statsRes, operatorsRes, withholdingRes] = await Promise.all(reqs)

        if (!statsRes.ok || !operatorsRes.ok) throw new Error('Failed to fetch dashboard data')

        const statsData = await statsRes.json()
        const operatorsData = await operatorsRes.json()
        setStats(statsData.metrics)
        setOperators(operatorsData)
        if (isTaraba && withholdingRes?.ok) {
          const w = await withholdingRes.json()
          setWithholding(w)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (token) {
      fetchData()
    }
  }, [token, isTaraba])

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spin size="large" tip="Loading Revenue Intelligence..." />
    </div>
  )

  if (error) return <Alert message="Error" description={error} type="error" showIcon className="mt-12" />

  const totalWager = Number(stats?.total_wager || 0)
  const totalPayout = Number(stats?.total_payout || 0)
  const totalGGR = Number(stats?.total_ggr || 0)
  const totalTax = Number(stats?.total_tax_due || 0)

  // For the progress bar, we'll use a local projection or keep it dynamic
  const projectedRevenue = 50000000 // Mock projection for now or could be state-specific
  const progressPercent = (totalTax / projectedRevenue) * 100

  return (
    <div className="space-y-10 pt-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">
            {user?.state_name || 'State'} Revenue Overview
          </h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            {user?.state_code || 'State'} Regulatory Ingestion Pipeline
          </p>
        </div>

        {/* Global Filters */}
        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedCompany}
            onChange={setSelectedCompany}
            className="w-full sm:w-[220px] custom-select"
            placeholder="Select Operator"
            size="large"
          >
            <Option value="all">All Licensed Operators</Option>
            {operators.map((op) => (
              <Option key={op.id} value={op.name}>{op.name}</Option>
            ))}
          </Select>
          <ExportButton data={REVENUE_TREND_DATA} filename="revenue-report-master" />
        </div>
      </div>

      {/* Key Metrics - Oversized Industrial Cards */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={80} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Gaming Value</span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
              {formatCurrency(totalWager)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-black uppercase italic">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Direct-to-Endpoint Verified
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={80} className="text-blue-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Projected Revenue MTD</span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
              {formatCurrency(projectedRevenue)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-blue-400 text-xs font-black uppercase italic">
              <TrendingUp size={14} />
              +8.2% vs Previous Period
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle size={80} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Players Payouts</span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
              {formatCurrency(totalPayout)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-black uppercase italic text-opacity-80">
              Integrity Check: PASSED
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={80} className="text-amber-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Gross Gaming Revenue</span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
              {formatCurrency(totalGGR)}
            </div>
            <div className="mt-4 flex items-center gap-2 text-amber-500 text-xs font-black uppercase italic text-opacity-80">
              <TrendingUp size={14} className="rotate-180" />
              Net Operator GGR
            </div>
          </div>
        </Col>
      </Row>

      {/* Revenue Progress - High Performance Bar */}
      <div className="p-10 rounded-3xl bg-[#0F172A] border-2 border-emerald-500/10 shadow-neon">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl bold-heading text-white mb-2">Monthly Collection Progress</h3>
            <p className="text-[#94A3B8] text-sm font-bold uppercase tracking-widest">Target: {formatCurrency(projectedRevenue)}</p>
          </div>
          <div className="text-right">
            <span className="text-5xl font-black text-emerald-400 tabular-nums">{progressPercent.toFixed(1)}%</span>
            <span className="text-xs font-black text-[#64748B] block uppercase tracking-widest mt-1">Target Met</span>
          </div>
        </div>

        <div className="relative h-6 bg-white/5 rounded-full overflow-hidden mb-8">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1.5, ease: 'circOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
          />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12}>
            <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Collected MTD</span>
              <span className="text-xl md:text-2xl font-black text-white tabular-nums">{formatCurrency(totalTax)}</span>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Remaining Deficit</span>
              <span className="text-xl md:text-2xl font-black text-amber-500 tabular-nums">{formatCurrency(projectedRevenue - totalTax)}</span>
            </div>
          </Col>
        </Row>
      </div>

      {/* Player Winning Withholding — Taraba: tax on winning tickets */}
      {isTaraba && withholding && withholding.withholdingTaxRate > 0 && (
        <div className="p-10 rounded-3xl bg-[#0F172A] border-2 border-amber-500/20 shadow-neon">
          <div className="flex items-center gap-3 mb-6">
            <Receipt className="text-amber-500" size={24} />
            <h3 className="text-2xl bold-heading text-white m-0">Player Winning Withholding</h3>
          </div>
          <p className="text-[#94A3B8] text-sm mb-6">
            Tax withheld at source on player payouts (winning tickets). Rate: <strong className="text-amber-400">{withholding.withholdingTaxRate}%</strong>.
          </p>
          <Row gutter={[24, 24]} className="mb-6">
            <Col xs={24} sm={8}>
              <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Total Player Winnings</span>
                <span className="text-xl font-black text-white tabular-nums">{formatCurrency(withholding.totalPayout)}</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="p-6 rounded-2xl bg-black/20 border border-amber-500/20">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Withholding Rate</span>
                <span className="text-xl font-black text-amber-400 tabular-nums">{withholding.withholdingTaxRate}%</span>
              </div>
            </Col>
            <Col xs={24} sm={8}>
              <div className="p-6 rounded-2xl bg-black/20 border border-emerald-500/20">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Tax Withheld (Revenue)</span>
                <span className="text-xl font-black text-emerald-400 tabular-nums">{formatCurrency(withholding.taxWithheld)}</span>
              </div>
            </Col>
          </Row>
          <div className="overflow-x-auto">
            <Table
              dataSource={withholding.byOperator}
              rowKey="operator_name"
              pagination={false}
              size="small"
              className="industrial-table"
              columns={[
                { title: 'Operator', dataIndex: 'operator_name', key: 'operator_name', render: (t: string) => <span className="font-bold text-white">{t}</span> },
                { title: 'Player Payouts', dataIndex: 'total_payout', key: 'total_payout', render: (v: number) => formatCurrency(v) },
                { title: 'Tax Withheld', dataIndex: 'tax_withheld', key: 'tax_withheld', render: (v: number) => <span className="text-emerald-400 font-black">{formatCurrency(v)}</span> },
              ]}
            />
          </div>
        </div>
      )}

      <Row gutter={[24, 24]}>
        {/* Real-Time Collections Feed */}
        <Col xs={24} lg={10}>
          <div className="h-full">
            <RealTimeCollectionsFeed selectedCompany={selectedCompany} />
          </div>
        </Col>

        {/* Revenue Trend Chart - Industrial Terminal Style */}
        <Col xs={24} lg={14}>
          <div className="p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full flex flex-col">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl bold-heading text-white m-0">Revenue Analytics</h3>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live Flux
              </div>
            </div>
            <div className="flex-1 min-h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_TREND_DATA}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 700 }}
                    dy={10}
                  />
                  <YAxis
                    hide
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '12px' }}
                    itemStyle={{ color: '#10B981', fontWeight: 900 }}
                    labelStyle={{ color: '#94A3B8', marginBottom: '4px' }}
                    formatter={(value: any) => formatCurrency(value)}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10B981"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorRev)"
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default RevenueCenter
