import { Modal } from 'antd'
import { Award, Download, ShieldCheck, CheckCircle } from 'lucide-react'
import { toast } from '@/utils/notifications'

interface TaxClearanceCertificateProps {
  visible: boolean
  onClose: () => void
  certificate: {
    certificateNumber: string
    operatorName: string
    period: string
    taxPaid: number
    issueDate: string
  } | null
}

const TaxClearanceCertificate = ({ visible, onClose, certificate }: TaxClearanceCertificateProps) => {
  if (!certificate) return null

  const handleDownload = () => {
    toast.success('Downloading Tax Clearance Certificate...')
    console.log('Downloading certificate:', certificate.certificateNumber)
  }

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      width={700}
      footer={null}
      closeIcon={null}
      centered
      className="sovereign-modal"
      styles={{
        mask: {
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(2, 6, 23, 0.85)',
        },
        content: {
          padding: 0,
          background: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <div className="bg-[#050811] border-4 border-emerald-500/30 rounded-[40px] overflow-hidden relative group">
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 opacity-50" />
        
        {/* Decorative Border Internal */}
        <div className="absolute inset-4 border border-emerald-500/10 rounded-[32px] pointer-events-none" />
        
        <div className="relative z-10 p-12">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-neon">
              <Award size={48} className="text-emerald-500" />
            </div>
            <h1 className="text-4xl bold-heading text-white m-0 tracking-tighter uppercase italic">Tax Clearance</h1>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="h-[1px] w-8 bg-emerald-500/30" />
              <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500/70 uppercase italic">Sovereign Protocol Settlement</span>
              <span className="h-[1px] w-8 bg-emerald-500/30" />
            </div>
          </div>

          {/* Certificate Content */}
          <div className="space-y-8 text-center bg-black/40 p-10 rounded-[32px] border border-white/5 backdrop-blur-sm">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase mb-4 italic">The Regulatory Authority hereby certifies that</p>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight italic mb-2">{certificate.operatorName}</h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                <CheckCircle size={10} /> Verified Status
              </div>
            </div>

            <div className="py-6 border-y border-white/5">
              <p className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase mb-4 italic">Has fulfilled all tax obligations for</p>
              <span className="text-xl font-black text-emerald-500 uppercase tracking-[0.2em] italic">{certificate.period}</span>
            </div>

            <div className="grid grid-cols-2 gap-8 text-left">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                <span className="text-[9px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-1 relative z-10">Certificate ID</span>
                <span className="text-xs font-black text-white font-mono tracking-widest relative z-10 uppercase">{certificate.certificateNumber}</span>
              </div>
              <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group/item">
                <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                <span className="text-[9px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-1 relative z-10">Transmission Date</span>
                <span className="text-xs font-black text-white tracking-wider relative z-10">{certificate.issueDate}</span>
              </div>
              <div className="col-span-2 p-8 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden group/item">
                <div className="absolute top-0 right-0 p-6 opacity-[0.03] z-0">
                  <ShieldCheck size={100} className="text-emerald-500" />
                </div>
                <span className="text-[9px] font-black tracking-[0.2em] text-emerald-500 uppercase block mb-2 relative z-10">Settled Revenue Load</span>
                <span className="text-4xl font-black text-white tabular-nums tracking-tighter relative z-10">₦{(certificate.taxPaid / 1_000_000).toFixed(2)}M</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex gap-4">
            <button 
              onClick={handleDownload}
              className="flex-1 h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-[0.3em] shadow-neon flex items-center justify-center gap-3"
            >
              <Download size={18} />
              Acquire Digital Intel
            </button>
            <button 
              onClick={onClose}
              className="px-8 h-16 rounded-2xl bg-transparent border border-white/10 text-[#64748B] hover:text-white hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-[0.3em]"
            >
              System Close
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[8px] font-black text-[#1E293B] uppercase tracking-[0.5em] m-0 italic">Secure Settlement Verification System v4.1 // ROTCS-SOVEREIGN-CLEARANCE</p>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default TaxClearanceCertificate
