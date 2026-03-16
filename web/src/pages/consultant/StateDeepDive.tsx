import { useState } from 'react'
import { Row, Col } from 'antd'
import { MapPin, Users, ArrowLeft, TrendingUp, CheckCircle } from 'lucide-react'
import DataReconciliationViewer from '@/components/consultant/DataReconciliationViewer'
import APIIngestionLogs from '@/components/consultant/APIIngestionLogs'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import { PLAYER_WIN_RATIO, NET_REVENUE_TAX_RATE, CONSULTANT_STATES } from '@/utils/mockData'

const StateDeepDive = () => {
  const [selectedState, setSelectedState] = useState<string | null>(null)

  const currentState = CONSULTANT_STATES.find(s => s.id === selectedState)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'green'
      case 'warning': return 'orange'
      case 'critical': return 'red'
      default: return 'default'
    }
  }

  const handleStateSelect = (stateId: string) => {
    setSelectedState(stateId)
  }

  const handleBackToStates = () => {
    setSelectedState(null)
  }

  return (
    <div>
      {!selectedState ? (
        <>
          {/* State Selection View */}
          <div className="mb-10">
            <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">State Deep Dive</h1>
            <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
              Select a state for detailed reporting
            </p>
          </div>

          <Row gutter={[16, 16]}>
            {CONSULTANT_STATES.map(state => (
              <Col xs={24} sm={12} lg={8} key={state.id}>
                <div 
                  onClick={() => handleStateSelect(state.id)}
                  className="cursor-pointer p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl"
                  style={{ borderLeft: `4px solid ${getStatusColor(state.status) === 'green' ? '#10B981' : getStatusColor(state.status) === 'orange' ? '#F59E0B' : '#EF4444'}` }}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-3">
                      <MapPin size={24} className="text-blue-500" />
                      <h3 className="text-2xl bold-heading text-white m-0 tracking-tight">{state.name}</h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 text-emerald-400`}>
                      {state.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Total TGV</span>
                      <span className="text-xl font-black text-white tabular-nums">{formatCurrency(state.tgv)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Active Users</span>
                      <span className="text-lg font-black text-[#94A3B8] tabular-nums">{formatNumber(state.users)}</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[10px] font-black text-emerald-500/70 uppercase tracking-[0.2em]">Deployment Active</span>
                    <ArrowLeft size={16} className="text-emerald-500 rotate-180 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <>
          {/* State Detail View */}
          <div className="mb-10">
            <button 
              onClick={handleBackToStates}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[#64748B] hover:text-white hover:bg-white/10 transition-all mb-6 text-[10px] font-black uppercase tracking-widest"
            >
              <ArrowLeft size={14} />
              Back to Overview
            </button>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">{currentState?.name} Analysis</h1>
                <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
                  State-wide revenue matching and data verification
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Status: {currentState?.status.toUpperCase()}
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 rounded-2xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Total TGV</span>
                <div className="text-3xl font-black text-white tabular-nums">{formatCurrency(currentState?.tgv || 0)}</div>
                <TrendingUp size={40} className="absolute -bottom-2 -right-2 text-blue-500 opacity-10" />
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 rounded-2xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Tax Collected</span>
                <div className="text-3xl font-black text-emerald-400 tabular-nums">
                  {formatCurrency(currentState ? Math.round(currentState.tgv * (1 - PLAYER_WIN_RATIO) * NET_REVENUE_TAX_RATE) : 0)}
                </div>
                <CheckCircle size={40} className="absolute -bottom-2 -right-2 text-emerald-500 opacity-10" />
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 rounded-2xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Active Users</span>
                <div className="text-3xl font-black text-white tabular-nums">{formatNumber(currentState?.users || 0)}</div>
                <Users size={40} className="absolute -bottom-2 -right-2 text-white opacity-10" />
              </div>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <div className="p-6 rounded-2xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Operators</span>
                <div className="text-3xl font-black text-blue-400 tabular-nums">{currentState?.operators}</div>
                <MapPin size={40} className="absolute -bottom-2 -right-2 text-blue-500 opacity-10" />
              </div>
            </Col>
          </Row>

          <div className="mt-6">
            <DataReconciliationViewer />
          </div>

          <div className="mt-6">
            <APIIngestionLogs />
          </div>
        </>
      )}
    </div>
  )
}

export default StateDeepDive
