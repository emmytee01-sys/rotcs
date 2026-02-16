import { Row, Col, Select } from 'antd'
import { TrendingUp, CheckCircle } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import ExportButton from '@/components/ui/ExportButton'
import { useState } from 'react'
import { 
  COMPANIES, 
  TOTAL_MARKET_TGV, 
  TOTAL_PLAYER_WINS, 
  PROJECTED_REVENUE, 
  REVENUE_TREND_DATA,
  TOTAL_TAX_COLLECTED,
  TOTAL_NET_REVENUE 
} from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'
import { Zap } from 'lucide-react'

const { Option } = Select

const RevenueCenter = () => {
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  const collectedMTD = TOTAL_TAX_COLLECTED
  const projectedRevenue = PROJECTED_REVENUE
  const progressPercent = (collectedMTD / projectedRevenue) * 100

  return (
    <div className="space-y-10 pt-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Revenue Overview</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Real-time Tax and Revenue Monitoring
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
            {COMPANIES.map((company) => (
              <Option key={company} value={company}>{company}</Option>
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
              {formatCurrency(TOTAL_MARKET_TGV)}
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
              {formatCurrency(TOTAL_PLAYER_WINS)}
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
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Player Loss</span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter drop-shadow-lg">
              {formatCurrency(TOTAL_NET_REVENUE)}
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
              <span className="text-xl md:text-2xl font-black text-white tabular-nums">{formatCurrency(collectedMTD)}</span>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-2">Remaining Deficit</span>
              <span className="text-xl md:text-2xl font-black text-amber-500 tabular-nums">{formatCurrency(projectedRevenue - collectedMTD)}</span>
            </div>
          </Col>
        </Row>
      </div>

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
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
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
