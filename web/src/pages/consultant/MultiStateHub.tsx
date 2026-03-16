import { Select, Row, Col } from 'antd'
import { Globe, TrendingUp, CheckCircle } from 'lucide-react'
import ComparativeAnalytics from '@/components/consultant/ComparativeAnalytics'
import RealTimeCollectionsFeed from '@/components/admin/RealTimeCollectionsFeed'
import { useState } from 'react'
import { 
  COMPANIES,
  CONSULTANT_TOTAL_TGV,
  CONSULTANT_TAX_COLLECTED,
  CONSULTANT_PLAYER_WINS,
  CONSULTANT_STATES,
  CONSULTANT_NET_REVENUE
} from '@/utils/mockData'
import { formatCurrency } from '@/utils/formatters'
import { Zap } from 'lucide-react'

const { Option } = Select


const MultiStateHub = () => {
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedCompany, setSelectedCompany] = useState<string>('all')

  return (
    <div>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Regional Hub</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Multi-state revenue monitoring and reporting
          </p>
        </div>
        <div className="flex flex-wrap gap-4">
          <Select
            value={selectedState}
            onChange={setSelectedState}
            className="w-full sm:w-[220px] custom-select"
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
            className="w-full sm:w-[220px] custom-select"
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
      <Row gutter={[24, 24]} className="mb-10">
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Gaming Value</span>
            <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
              {formatCurrency(CONSULTANT_TOTAL_TGV)}
            </div>
            <div className="mt-4 text-emerald-400 text-[10px] font-black uppercase italic">
              Verified Across 5 States
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <TrendingUp size={80} className="text-blue-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Tax Collected</span>
            <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
              {formatCurrency(CONSULTANT_TAX_COLLECTED)}
            </div>
            <div className="mt-4 text-blue-400 text-[10px] font-black uppercase italic">
              Multi-State Aggregated
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <CheckCircle size={80} className="text-emerald-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Player Wins</span>
            <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
              {formatCurrency(CONSULTANT_PLAYER_WINS)}
            </div>
            <div className="mt-4 text-emerald-400 text-[10px] font-black uppercase italic">
              Integrity Verified
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <Zap size={80} className="text-amber-500" />
            </div>
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Total Player Loss</span>
            <div className="text-4xl font-black text-white tabular-nums tracking-tighter">
              {formatCurrency(CONSULTANT_NET_REVENUE)}
            </div>
            <div className="mt-4 text-amber-500 text-[10px] font-black uppercase italic">
              Portfolio Net GGR
            </div>
          </div>
        </Col>
      </Row>

      {/* Portfolio Health Summary */}
      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] flex items-center gap-4 transition-all hover:border-emerald-500/20">
            <Globe size={32} className="text-blue-500 opacity-50" />
            <div>
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Total States</span>
              <div className="text-2xl font-black text-white">{CONSULTANT_STATES.length}</div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] flex items-center gap-4 transition-all hover:border-emerald-500/20">
            <CheckCircle size={32} className="text-emerald-500 opacity-50" />
            <div>
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Compliant</span>
              <div className="text-2xl font-black text-emerald-400">
                {CONSULTANT_STATES.filter(s => s.status === 'healthy').length}
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] flex items-center gap-4 transition-all hover:border-emerald-500/20">
            <TrendingUp size={32} className="text-blue-400 opacity-50" />
            <div>
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Avg Compliance</span>
              <div className="text-2xl font-black text-blue-400">
                {Math.round(CONSULTANT_STATES.reduce((sum, s) => sum + s.collectionRate, 0) / CONSULTANT_STATES.length)}%
              </div>
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] flex items-center gap-4 transition-all hover:border-emerald-500/20">
            <Globe size={32} className="text-amber-500 opacity-50" />
            <div>
              <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Total Operators</span>
              <div className="text-2xl font-black text-amber-500">
                {CONSULTANT_STATES.reduce((sum, s) => sum + s.operators, 0)}
              </div>
            </div>
          </div>
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
