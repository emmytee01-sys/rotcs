import { Row, Col, Progress, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Activity, Search, FileSearch, MousePointerClick } from 'lucide-react'
import { 
  FRAUD_ALERTS, 
  CONSULTANT_TERRITORIAL_DATA 
} from '@/utils/mockData'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts'

const ConsultantAnomalyDetection = () => {
  const navigate = useNavigate()
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  return (
    <div className="space-y-6 md:space-y-10 pt-6 md:pt-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Forensic Anomalies</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-blue-500 pl-4">
            Cross-State Fraud Pattern Analysis
          </p>
        </div>

        <div className="flex items-center gap-4 bg-blue-500/10 border border-blue-500/20 px-6 py-3 rounded-2xl">
          <Activity className="text-blue-500" />
          <div>
            <span className="text-xs font-black text-blue-500 uppercase tracking-widest block leading-none">Detection Engine</span>
            <span className="text-2xl font-black text-white leading-none">ACTIVE V2.4</span>
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={15}>
          <div className="p-6 md:p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.05] shadow-2xl space-y-6 md:space-y-8">
            <h3 className="text-xl md:text-2xl bold-heading text-white m-0">Suspicious Volume Patterns (Aggregated)</h3>
            <div className="h-[250px] md:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CONSULTANT_TERRITORIAL_DATA}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="territory" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 10, fontWeight: 900 }}
                  />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="ggr" radius={[8, 8, 0, 0]}>
                    {CONSULTANT_TERRITORIAL_DATA.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Search className="text-[#94A3B8]" size={20} />
                <span className="text-sm font-black text-white uppercase italic">Volume Deep Dive</span>
              </div>
              <Button 
                type="primary" 
                onClick={() => navigate('/consultant/forensics')}
                className="w-full sm:w-auto bg-blue-600 border-none font-black text-[10px] uppercase rounded-lg h-9"
              >
                Open Forensics
              </Button>
            </div>
          </div>
        </Col>

        <Col xs={24} lg={9}>
          <div className="p-6 md:p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] shadow-2xl h-full flex flex-col">
            <h3 className="text-xl bold-heading text-white m-0 uppercase tracking-widest mb-8">Active Forensic Cases</h3>
            <div className="flex-1 space-y-6 overflow-y-auto">
              {FRAUD_ALERTS.slice(0, 4).map((alert, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-[#0F172A] border border-white/[0.05] hover:border-blue-500/30 transition-all group">
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{alert.id}</span>
                    <span className="text-[10px] font-black text-blue-400 uppercase italic">{alert.time}</span>
                  </div>
                  <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1 group-hover:text-blue-400 transition-colors">{alert.operator} - {alert.type.replace('_', ' ')}</h4>
                  <p className="text-xs text-[#94A3B8] font-medium leading-relaxed mb-4">{alert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${alert.severity === 'critical' ? 'bg-red-500' : 'bg-blue-500'}`} />
                       <span className="text-[9px] font-black text-white/40 uppercase">{alert.status}</span>
                    </div>
                    <MousePointerClick size={14} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>

      <div className="p-6 md:p-10 rounded-3xl bg-gradient-to-r from-blue-900/20 to-[#0F172A] border-2 border-blue-500/10 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
          <div className="max-w-xl">
             <div className="flex items-center gap-3 mb-4">
               <FileSearch size={32} className="text-blue-400 shrink-0" />
               <h3 className="text-2xl md:text-3xl bold-heading text-white m-0 tracking-tight text-pretty">Pattern Correlation</h3>
             </div>
             <p className="text-lg font-medium text-[#94A3B8] leading-relaxed">
               We've identified a 0.88 correlation between <span className="text-white">Virtual Footbal peaks</span> in Kano and <span className="text-white">Unauthorized Access</span> attempts in Lagos. This suggests a coordinated syndicate operation.
             </p>
          </div>
          <div className="shrink-0">
             <div className="text-center p-8 rounded-3xl bg-black/40 border-2 border-white/5 backdrop-blur-md">
               <span className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.4em] block mb-2">Cross-Platform Linkage</span>
               <span className="text-4xl md:text-6xl font-black text-white tabular-nums">88<span className="text-xl md:text-2xl text-blue-400">%</span></span>
               <div className="mt-4 flex flex-col items-center gap-1">
                 <span className="text-xs font-black text-blue-400 uppercase italic">HIGH CONFIDENCE</span>
                 <Progress percent={88} showInfo={false} strokeColor="#3B82F6" trailColor="rgba(255,255,255,0.05)" strokeWidth={4} />
               </div>
             </div>
          </div>
        </div>
        {/* Decorative Grid */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default ConsultantAnomalyDetection
