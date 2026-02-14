import { Modal } from 'antd'
import { FileText, Download, CheckCircle, ShieldCheck } from 'lucide-react'
import { toast } from '@/utils/notifications'

interface InvoicePreviewModalProps {
  visible: boolean
  onClose: () => void
  invoice: {
    id: string
    period: string
    ggr: number
    taxDue: number
    prn: string
    status: string
    paidDate?: string
  } | null
}

const InvoicePreviewModal = ({ visible, onClose, invoice }: InvoicePreviewModalProps) => {
  if (!invoice) return null

  const handleDownloadPDF = () => {
    toast.success('Downloading invoice PDF...')
    console.log('Downloading invoice:', invoice.id)
  }

  const handleDownloadReceipt = () => {
    toast.success('Downloading payment receipt...')
    console.log('Downloading receipt for:', invoice.id)
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
      <div className="bg-[#0F172A] border-2 border-emerald-500/20 rounded-[32px] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.1)]">
        {/* Header Section */}
        <div className="relative p-10 bg-[radial-gradient(circle_at_top_right,_#10B98115,_transparent)] overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent pointer-events-none" />
          
          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <FileText size={16} className="text-emerald-500" />
                </div>
                <span className="text-[10px] font-black tracking-[0.4em] text-emerald-500/70 uppercase">Official Report</span>
              </div>
              <h2 className="text-3xl bold-heading text-white m-0 tracking-tighter uppercase italic">Tax Invoice</h2>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-1">Status</span>
              <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest inline-flex items-center gap-2 ${
                invoice.status === 'paid' 
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400' 
                  : 'bg-amber-500/10 border border-amber-500/20 text-amber-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${invoice.status === 'paid' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                {invoice.status.toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="px-10 py-6 space-y-8">
          {/* Main Info Grid */}
          <div className="grid grid-cols-2 gap-8 p-8 rounded-2xl bg-black/20 border border-white/5">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase block mb-1">Invoice ID</span>
                <span className="text-sm font-black text-white uppercase tracking-wider">{invoice.id}</span>
              </div>
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase block mb-1">Tax Period</span>
                <span className="text-sm font-black text-[#94A3B8] uppercase tracking-wider">{invoice.period}</span>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase block mb-1">Payment Ref (PRN)</span>
                <span className="text-sm font-black text-emerald-400 font-mono tracking-widest uppercase">{invoice.prn}</span>
              </div>
              <div>
                <span className="text-[10px] font-black tracking-[0.2em] text-[#475569] uppercase block mb-1">Revenue Code</span>
                <span className="text-sm font-black text-[#94A3B8] font-mono tracking-widest uppercase">07081999</span>
              </div>
            </div>
          </div>

          {/* Tax Calculation Card */}
          <div className="relative p-1 bg-gradient-to-br from-emerald-500/30 to-blue-500/30 rounded-3xl group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/50 to-blue-500/50 blur opacity-20 group-hover:opacity-40 transition-opacity pointer-events-none" />
            <div className="bg-[#050811] rounded-[22px] p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <ShieldCheck size={160} className="text-emerald-500" />
              </div>
              
              <div className="space-y-4 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase">Total Gaming Value (TGV)</span>
                  <span className="text-lg font-black text-white tabular-nums tracking-tight">₦{(invoice.ggr / 1000000).toFixed(2)}M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase">Regulatory Tax Rate</span>
                  <span className="text-lg font-black text-[#94A3B8] tabular-nums tracking-tight">15.00%</span>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-emerald-500 uppercase block mb-1">Final Tax Liability</span>
                    <span className="text-4xl font-black text-white tabular-nums tracking-tighter">₦{(invoice.taxDue / 1000000).toFixed(2)}M</span>
                  </div>
                  <div className="pb-1">
                     <span className="text-[10px] font-black text-blue-500/50 italic uppercase tracking-widest">Sovereign Reporting System v4.2</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Instructions if Unpaid */}
          {invoice.status !== 'paid' && (
            <div className="p-8 rounded-2xl bg-amber-500/5 border border-amber-500/10">
              <h4 className="text-[10px] font-black tracking-[0.3em] text-amber-500 uppercase mt-0 mb-4 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                Payment Steps
              </h4>
              <ul className="m-0 p-0 list-none space-y-2">
                <li className="text-[11px] font-bold text-[#94A3B8] flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-amber-500/30" />
                  Execute payment using PRN: <span className="text-white font-mono">{invoice.prn}</span>
                </li>
                <li className="text-[11px] font-bold text-[#94A3B8] flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-amber-500/30" />
                  Payments should be settled within 48 hours.
                </li>
                <li className="text-[11px] font-bold text-[#94A3B8] flex items-center gap-3">
                  <span className="w-4 h-[1px] bg-amber-500/30" />
                  Verify revenue code <span className="text-white font-mono">07081999</span> at point of sale.
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-10 bg-black/40 border-t border-white/5 flex gap-4">
          <button 
            onClick={handleDownloadPDF}
            className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-xs font-black uppercase tracking-[0.2em]"
          >
            <Download size={16} />
            Download PDF
          </button>
          {invoice.status === 'paid' && (
            <button 
              onClick={handleDownloadReceipt}
              className="flex-1 flex items-center justify-center gap-2 h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-[0.2em] shadow-neon"
            >
               <CheckCircle size={16} />
              Download Receipt
            </button>
          )}
          <button 
            onClick={onClose}
            className="px-8 h-14 rounded-2xl bg-transparent border border-white/5 text-[#64748B] hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em]"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default InvoicePreviewModal
