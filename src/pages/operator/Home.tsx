import { Row, Col, Progress } from 'antd'
import { CheckCircle } from 'lucide-react'

const OperatorHome = () => {
  const taxDue = 48000000
  const taxPaid = 48000000
  const complianceScore = 98

  return (
    <div>
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Welcome, Operator</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
            Tactical Liability Oversight & Compliance Intel
          </p>
        </div>

      {/* Tax Liability Counter */}
      <Row gutter={[24, 24]} className="mt-10">
        <Col xs={24} md={12}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Current Period Tax Liability</span>
            <div className="text-5xl font-black text-white tabular-nums tracking-tighter">
              ₦{taxDue.toLocaleString()}
            </div>
            <div className="mt-6 text-blue-400 text-[10px] font-black uppercase italic border-l border-blue-500/50 pl-3">
              Real-time calculations based on ingestion feed
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl">
            <div className="flex items-center justify-between gap-8">
              <div className="flex-1">
                <span className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase block mb-4">Compliance Scorecard</span>
                <div className="text-5xl font-black text-emerald-400 tabular-nums tracking-tighter">
                  {complianceScore}%
                </div>
                <div className="mt-6 flex gap-4">
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500/70 uppercase">On Time</span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                    <CheckCircle size={12} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500/70 uppercase">Uptime Valid</span>
                  </div>
                </div>
              </div>
              <div className="shrink-0 scale-125 origin-right pr-4">
                <Progress
                  type="circle"
                  percent={complianceScore}
                  strokeWidth={12}
                  strokeColor="#10B981"
                  trailColor="rgba(255,255,255,0.05)"
                  format={() => (
                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest leading-none">
                      Secured
                    </div>
                  )}
                  width={80}
                />
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[24, 24]} className="mt-6">
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] hover:border-emerald-500/20 transition-all shadow-xl">
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">TGV (MTD)</span>
            <div className="text-2xl font-black text-white tabular-nums">₦320.0M</div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] hover:border-emerald-500/20 transition-all shadow-xl">
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Tax Paid</span>
            <div className="text-2xl font-black text-emerald-400 tabular-nums">₦{taxPaid.toLocaleString()}</div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-[#0F172A] border-2 border-white/[0.03] hover:border-emerald-500/20 transition-all shadow-xl">
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest block mb-1">Outstanding</span>
            <div className={`text-2xl font-black tabular-nums ${taxDue > taxPaid ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
              ₦{(taxDue - taxPaid).toLocaleString()}
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="p-6 rounded-2xl bg-black border-2 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all">
            <span className="text-[10px] font-black text-emerald-500/60 tracking-widest block mb-1 uppercase italic">Next Payment Due</span>
            <div className="text-2xl font-black text-white tracking-widest uppercase">JAN 15</div>
          </div>
        </Col>
      </Row>

      {/* Status Indicators */}
      <div className="mt-10 p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05]">
        <h3 className="text-xl bold-heading text-white mb-6 uppercase tracking-tight">System Status Deployment</h3>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={8}>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">API Endpoint</span>
                <span className="text-xs font-black text-white uppercase italic">Active</span>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">Data Ingestion</span>
                <span className="text-xs font-black text-white uppercase italic">Synced</span>
              </div>
            </div>
          </Col>
          <Col xs={24} sm={8}>
            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-white/5 border border-white/5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">License Status</span>
                <span className="text-xs font-black text-white uppercase italic">Verified</span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default OperatorHome
