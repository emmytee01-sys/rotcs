import { Row, Col, Progress, Tag, Table } from 'antd'
import { ShieldAlert, Zap, TrendingUp, AlertTriangle } from 'lucide-react'
import { 
  FRAUD_ALERTS, 
  RISK_SCORE_DATA, 
  FRAUD_TYPE_DISTRIBUTION 
} from '@/utils/mockData'
import { 
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const AnomalyDetection = () => {
  const activeAlerts = FRAUD_ALERTS.filter(a => a.status === 'active').length
  const COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']

  const columns = [
    {
      title: 'ALERT ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="text-white font-black">{text}</span>
    },
    {
      title: 'TYPE',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span className="uppercase text-[10px] font-black tracking-widest text-[#94A3B8]">
          {type.replace('_', ' ')}
        </span>
      )
    },
    {
      title: 'SEVERITY',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={severity === 'critical' ? 'red' : severity === 'warning' ? 'orange' : 'blue'} className="rounded-full px-4 border-none font-black text-[10px] uppercase">
          {severity}
        </Tag>
      )
    },
    {
      title: 'OPERATOR',
      dataIndex: 'operator',
      key: 'operator',
      render: (text: string) => <span className="text-emerald-400 font-bold tracking-tight italic">{text}</span>
    },
    {
      title: 'STATUS',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${status === 'active' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`} />
          <span className="uppercase text-[10px] font-black text-white/50">{status}</span>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6 md:space-y-10 pt-6 md:pt-12">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Anomaly Detection</h1>
          <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-red-500 pl-4">
            Sentinel-X Real-time Threat Intelligence
          </p>
        </div>

        <div className="flex items-center gap-4 bg-red-500/10 border border-red-500/20 px-6 py-3 rounded-2xl shadow-[0_0_20px_rgba(239,68,68,0.2)]">
          <ShieldAlert className="text-red-500" />
          <div>
            <span className="text-xs font-black text-red-500 uppercase tracking-widest block leading-none">Global Risk Level</span>
            <span className="text-2xl font-black text-white leading-none">ELEVATED</span>
          </div>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div className="p-4 md:p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.05] shadow-2xl space-y-6 md:space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl bold-heading text-white m-0">Live Threat Feed</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-black text-[#64748B] uppercase tracking-widest">{activeAlerts} Active Anomalies</span>
                <span className="animate-ping w-2 h-2 rounded-full bg-red-500" />
              </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
              <Table 
                dataSource={FRAUD_ALERTS} 
                columns={columns} 
                pagination={false}
                className="custom-table min-w-[600px] lg:min-w-0"
                rowClassName="hover:bg-red-500/5 transition-colors cursor-pointer"
              />
            </div>
          </div>
        </Col>

        <Col xs={24} lg={8}>
          <div className="p-6 md:p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] shadow-2xl space-y-8 h-full">
            <h3 className="text-xl bold-heading text-white m-0 uppercase tracking-widest">Regional Risk Scores</h3>
            <div className="space-y-6">
              {RISK_SCORE_DATA.map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-xs font-black uppercase tracking-widest text-[#64748B]">
                    <span>{item.region}</span>
                    <span className={item.score > 50 ? 'text-red-500' : 'text-white'}>{item.score}% Risk</span>
                  </div>
                  <Progress 
                    percent={item.score} 
                    showInfo={false} 
                    strokeColor={item.score > 50 ? '#EF4444' : '#10B981'} 
                    trailColor="rgba(255,255,255,0.05)"
                    strokeWidth={8}
                    className="m-0"
                  />
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 rounded-2xl bg-red-500/5 border border-red-500/10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={20} className="text-amber-500" />
                <span className="text-sm font-black text-white uppercase italic">System Insight</span>
              </div>
              <p className="text-xs font-medium text-[#94A3B8] leading-relaxed">
                Risk scores are calculated based on GGR flux, endpoint stability, and historical compliance patterns. Oyo sector requires immediate audit due to tax-gap warnings.
              </p>
            </div>
          </div>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <div className="p-6 md:p-8 rounded-3xl bg-[#0F172A] border-2 border-white/[0.03] shadow-2xl h-full">
            <h3 className="text-xl bold-heading text-white mb-10">Anomaly Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={FRAUD_TYPE_DISTRIBUTION}
                    innerRadius={80}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {FRAUD_TYPE_DISTRIBUTION.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                    itemStyle={{ fontWeight: 900 }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              {FRAUD_TYPE_DISTRIBUTION.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                  <span className="text-[10px] font-black text-[#64748B] uppercase tracking-widest">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div className="p-6 md:p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] shadow-2xl h-full flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-6 border border-emerald-500/20">
              <Zap size={40} className="text-emerald-500" />
            </div>
            <h3 className="text-2xl bold-heading text-white mb-4">Predictive Integrity</h3>
            <p className="text-[#94A3B8] font-medium leading-relaxed max-w-md mx-auto mb-8">
              Sentinel-X AI is training on current patterns to predict future fraud attempts. Current prediction accuracy: <span className="text-emerald-400 font-black">94.2%</span>.
            </p>
            <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-6 py-2 rounded-full border border-emerald-500/20">
              <TrendingUp size={14} />
              Model Improving
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AnomalyDetection
