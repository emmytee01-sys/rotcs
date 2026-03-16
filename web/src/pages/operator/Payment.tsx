import { Modal } from 'antd'
import { CreditCard, CheckCircle, Download, ShieldCheck, ChevronRight, Wallet, Banknote, AlertCircle, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import TaxClearanceCertificate from '@/components/operator/TaxClearanceCertificate'
import { formatCurrency } from '@/utils/formatters'
import { jsPDF } from 'jspdf'

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<'web' | 'branch'>('web')
  const [currentStep, setCurrentStep] = useState(0)
  const [certificateVisible, setCertificateVisible] = useState(false)
  const [successModalVisible, setSuccessModalVisible] = useState(false)

  const taxDue = 48000000
  const prn = 'PRN-2026-01-001'
  const revenueCode = '07081999'

  const steps = [
    { title: 'Tax Review', sub: 'Confirm Liability' },
    { title: 'Invoicing', sub: 'Generate PRN' },
    { title: 'Payment', sub: 'Process Pay' },
    { title: 'Clearance', sub: 'Final Receipt' },
  ]

  const handleGenerateInvoice = () => {
    setCurrentStep(1)
  }

  const handleDownloadInvoice = () => {
    const doc = new jsPDF()
    const timestamp = new Date().toLocaleString()

    // Professional Header
    doc.setFillColor(15, 23, 42) // Obsidian
    doc.rect(0, 0, 210, 40, 'F')
    
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(22)
    doc.text('ROTCS', 20, 25)
    
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.text('REGULATORY OVERSIGHT & TAX CALCULATION SYSTEM', 20, 32)

    // Invoice Title
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    doc.text('TAX PAYMENT INVOICE', 20, 55)
    
    doc.setDrawColor(16, 185, 129) // Emerald
    doc.setLineWidth(1)
    doc.line(20, 58, 80, 58)

    // Data Grid
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139) // Slate-500
    doc.text('PAYMENT REFERENCE', 20, 75)
    doc.setTextColor(15, 23, 42)
    doc.setFont('courier', 'bold')
    doc.setFontSize(14)
    doc.text(prn, 20, 82)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(10)
    doc.setTextColor(100, 116, 139)
    doc.text('REVENUE CODE', 120, 75)
    doc.setTextColor(15, 23, 42)
    doc.setFont('courier', 'bold')
    doc.text(revenueCode, 120, 82)

    // Detailed Table
    const details = [
      ['OPERATOR', 'Bet9ja Nigeria Limited'],
      ['BILLING PERIOD', 'January 2026'],
      ['GROSS VOLUME (TGV)', 'N320,000,000'],
      ['TAX RATE', '15%'],
    ]

    let yPos = 100
    details.forEach(([label, value]) => {
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(100, 116, 139)
      doc.setFontSize(8)
      doc.text(label, 20, yPos)
      
      doc.setTextColor(15, 23, 42)
      doc.setFontSize(10)
      doc.text(value, 20, yPos + 6)
      
      yPos += 20
    })

    // Total Section
    doc.setFillColor(248, 250, 252)
    doc.rect(110, 100, 80, 46, 'F')
    doc.setDrawColor(226, 232, 240)
    doc.rect(110, 100, 80, 46, 'S')

    doc.setTextColor(16, 185, 129)
    doc.setFontSize(8)
    doc.setFont('helvetica', 'bold')
    doc.text('TOTAL TAX LIABILITY', 115, 110)
    
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(18)
    doc.text(`N${(taxDue / 1000000).toFixed(1)}M`, 115, 125)
    
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(`N${taxDue.toLocaleString()}.00`, 115, 135)

    // Bank Instructions
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(15, 23, 42)
    doc.setFontSize(11)
    doc.text('BANKING INSTRUCTIONS', 20, 190)
    
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(71, 85, 105)
    doc.text('1. Present this document at any commercial bank branch.', 20, 198)
    doc.text('2. Ensure the PRN matches the transaction reference on your teller.', 20, 204)
    doc.text('3. Payment will be verified within 24 tactical hours.', 20, 210)

    // Footer
    doc.setFontSize(8)
    doc.setTextColor(148, 163, 184)
    doc.text(`Generated on: ${timestamp}`, 20, 280)
    doc.text('SOVEREIGN REGULATORY TRANSMISSION V2.1', 135, 280)

    doc.save(`Invoice_${prn}.pdf`)
  }

  const handlePay = () => {
    if (paymentMethod === 'branch') {
      handleDownloadInvoice()
      setSuccessModalVisible(true)
      return
    }

    setCurrentStep(2)
    setTimeout(() => {
      setCurrentStep(3)
    }, 2000)
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Payment Portal</h1>
        <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
          Tax Settlement & Revenue Management
        </p>
      </div>

      {/* Custom Step Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-12 p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-transparent pointer-events-none" />
        {steps.map((step, idx) => (
          <div key={idx} className="flex items-center gap-4 relative z-10">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all duration-500 ${
              idx <= currentStep 
                ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-500 shadow-neon-sm' 
                : 'bg-white/5 border-white/10 text-[#475569]'
            }`}>
              {idx < currentStep ? <CheckCircle size={20} /> : <span className="font-black italic">{idx + 1}</span>}
            </div>
            <div className="hidden md:block">
              <div className={`text-[10px] font-black uppercase tracking-widest leading-none mb-1 ${idx <= currentStep ? 'text-white' : 'text-[#475569]'}`}>
                {step.title}
              </div>
              <div className={`text-[9px] font-bold uppercase tracking-tighter ${idx <= currentStep ? 'text-emerald-500/70' : 'text-[#475569]'}`}>
                {step.sub}
              </div>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight size={16} className={`mx-2 ${idx < currentStep ? 'text-emerald-500/50' : 'text-[#1E293B]'}`} />
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Interface */}
        <div className="lg:col-span-2 space-y-8">
          {currentStep === 0 && (
            <div className="p-10 rounded-[32px] bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <ShieldCheck size={24} className="text-blue-500" />
                </div>
                <h3 className="text-2xl bold-heading text-white m-0 uppercase tracking-tight italic">Confirm Tax Liability</h3>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Billing Period</span>
                    <span className="text-lg font-black text-white italic">JANUARY 2026</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] font-black tracking-[0.2em] text-[#64748B] uppercase block mb-2">Revenue Code</span>
                    <span className="text-lg font-black text-[#94A3B8] font-mono tracking-widest">{revenueCode}</span>
                  </div>
                </div>

                <div className="p-8 rounded-3xl bg-emerald-500/5 border-2 border-emerald-500/20 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                    <Wallet size={120} className="text-emerald-500" />
                  </div>
                  <span className="text-[10px] font-black tracking-[0.3em] text-emerald-500 uppercase block mb-4">Final Calculated Liability</span>
                  <div className="text-6xl font-black text-white tabular-nums tracking-tighter mb-4">
                    {formatCurrency(taxDue)}
                  </div>
                  <p className="text-[#64748B] text-[10px] font-bold uppercase italic tracking-widest max-w-sm m-0">
                    Calculated via sovereign ingestion feed. This figure is finalized and ready for transmission.
                  </p>
                </div>

                <button 
                  onClick={handleGenerateInvoice}
                  className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-[0.3em] shadow-neon flex items-center justify-center gap-3"
                >
                  Generate Invoice & Proceed
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="p-10 rounded-[32px] bg-black/40 border-2 border-white/[0.05] relative overflow-hidden">
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <CreditCard size={24} className="text-blue-500" />
                </div>
                <h3 className="text-2xl bold-heading text-white m-0 uppercase tracking-tight italic">Payment Method</h3>
              </div>

              <div className="p-8 rounded-2xl bg-blue-500/5 border border-blue-500/20 mb-8">
                <span className="text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase block mb-2">Payment Reference (PRN)</span>
                <span className="text-2xl font-black text-white font-mono tracking-[0.2em] uppercase">{prn}</span>
              </div>

              <div className="space-y-4 mb-10">
                <div 
                  onClick={() => setPaymentMethod('web')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-center justify-between ${
                    paymentMethod === 'web' 
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-neon-sm' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      paymentMethod === 'web' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-[#475569]'
                    }`}>
                      <CreditCard size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white m-0 uppercase tracking-tight italic transition-colors">Pay Online</h4>
                      <p className="text-[10px] font-bold text-[#64748B] m-0 uppercase tracking-widest mt-1">Instant payment via card or bank transfer</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    paymentMethod === 'web' ? 'border-emerald-500 bg-emerald-500' : 'border-white/10'
                  }`}>
                    {paymentMethod === 'web' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('branch')}
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer group flex items-center justify-between ${
                    paymentMethod === 'branch' 
                      ? 'bg-emerald-500/10 border-emerald-500/40 shadow-neon-sm' 
                      : 'bg-white/5 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                      paymentMethod === 'branch' ? 'bg-emerald-500 text-white' : 'bg-white/5 text-[#475569]'
                    }`}>
                      <Banknote size={28} />
                    </div>
                    <div>
                      <h4 className="text-lg font-black text-white m-0 uppercase tracking-tight italic">Bank Branch</h4>
                      <p className="text-[10px] font-bold text-[#64748B] m-0 uppercase tracking-widest mt-1">Deposit at any bank branch using an invoice</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    paymentMethod === 'branch' ? 'border-emerald-500 bg-emerald-500' : 'border-white/10'
                  }`}>
                    {paymentMethod === 'branch' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              </div>

              <button 
                onClick={handlePay}
                className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-[0.3em] shadow-neon"
              >
                {paymentMethod === 'web' ? 'Pay Online Now' : 'Download Payment Invoice'}
              </button>
            </div>
          )}

          {currentStep === 2 && (
            <div className="p-20 rounded-[32px] bg-black/40 border-2 border-white/[0.05] text-center relative overflow-hidden">
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.1),_transparent)] pointer-events-none" />
               <div className="w-24 h-24 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mx-auto mb-8 relative z-10" />
                <h3 className="text-2xl bold-heading text-white m-0 uppercase tracking-widest italic relative z-10 animate-pulse">Processing Payment...</h3>
                <p className="text-[#64748B] text-[10px] font-bold uppercase tracking-[0.4em] mt-4 relative z-10">Verifying payment with banking partners</p>
            </div>
          )}

          {currentStep === 3 && (
            <div className="p-12 rounded-[40px] bg-emerald-500/5 border-2 border-emerald-500/20 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.2),_transparent)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-neon animate-bounce">
                <CheckCircle size={48} className="text-white" />
              </div>
               <h3 className="text-4xl bold-heading text-white mb-2 uppercase tracking-tighter italic">Payment Successful</h3>
              <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase mb-12">Tax Liability successfully cleared for current period</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto mb-12">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-left">
                  <span className="text-[9px] font-black text-[#64748B] uppercase block mb-1">Receipt ID</span>
                  <span className="text-xs font-black text-white font-mono tracking-widest">{prn}</span>
                </div>
                <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-left">
                  <span className="text-[9px] font-black text-[#64748B] uppercase block mb-1">Amount Settled</span>
                  <span className="text-xs font-black text-emerald-400 tracking-wider">₦{(taxDue / 1_000_000).toFixed(1)}M</span>
                </div>
              </div>

              <button 
                onClick={() => setCertificateVisible(true)}
                className="w-full h-16 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-[0.3em] shadow-neon flex items-center justify-center gap-3 relative z-10"
              >
                <Download size={18} />
                Acquire Tax Clearance Certificate
              </button>
            </div>
          )}
        </div>

        {/* Sidebar Intel */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden shadow-2xl">
            <h4 className="text-[10px] font-black tracking-[0.3em] text-[#64748B] uppercase mt-0 mb-6 flex items-center gap-2">
               <AlertCircle size={14} className="text-emerald-500" />
              Payment Guide
            </h4>
            <div className="space-y-6">
              <div>
                 <h5 className="text-[11px] font-black text-white uppercase italic mb-2 tracking-widest">Online Payment</h5>
                <p className="text-[11px] leading-relaxed text-[#64748B] font-bold m-0 uppercase">Instant verification and receipt generation.</p>
              </div>
              <div className="pt-6 border-t border-white/5">
                <h5 className="text-[11px] font-black text-white uppercase italic mb-2 tracking-widest">Branch Settlement</h5>
                <p className="text-[11px] leading-relaxed text-[#64748B] font-bold m-0 uppercase">Download invoice and present at any commercial node. Processing delay: 24 tactical hours.</p>
              </div>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] font-black text-[#475569] uppercase tracking-widest">Policy Manual v2.1</span>
                <ExternalLink size={12} className="text-[#475569]" />
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-transparent border-2 border-blue-500/20 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <ShieldCheck size={20} className="text-blue-500" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Secure Link</span>
            </div>
            <p className="text-[10px] font-bold text-blue-400/70 uppercase tracking-widest italic m-0">All transmissions are encrypted via dual-factor sovereign handshakes.</p>
          </div>
        </div>
      </div>

      <TaxClearanceCertificate
        visible={certificateVisible}
        onClose={() => setCertificateVisible(false)}
        certificate={{
          certificateNumber: `TCC-2026-001-${prn.split('-').pop()}`,
          operatorName: 'Bet9ja Nigeria Limited',
          period: 'January 2026',
          taxPaid: taxDue,
          issueDate: new Date().toLocaleDateString(),
        }}
      />

      {/* Invoice Success Modal */}
      <Modal
        open={successModalVisible}
        onCancel={() => setSuccessModalVisible(false)}
        footer={null}
        closeIcon={null}
        centered
        width={500}
        styles={{
          mask: { backdropFilter: 'blur(8px)', backgroundColor: 'rgba(2, 6, 23, 0.8)' },
          content: { padding: 0, background: 'transparent', boxShadow: 'none' }
        }}
      >
        <div className="bg-[#0F172A] border-2 border-emerald-500/20 rounded-[32px] overflow-hidden shadow-neon-lg">
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Download size={32} className="text-emerald-500 animate-bounce" />
            </div>
             <h3 className="text-2xl bold-heading text-white mb-2 uppercase tracking-tight italic">Invoice Ready</h3>
             <p className="text-[#94A3B8] font-bold text-[11px] uppercase tracking-widest mb-10 leading-relaxed">
              Your payment invoice has been downloaded. Please present this document at any bank branch to complete your settlement.
            </p>
            
            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 text-left mb-10 relative group overflow-hidden">
               <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
               <span className="text-[9px] font-black text-[#64748B] uppercase block mb-1">Payment Reference (PRN)</span>
               <span className="text-xl font-black text-white font-mono tracking-[0.1em]">{prn}</span>
            </div>

            <button 
              onClick={() => {
                setSuccessModalVisible(false)
                setCurrentStep(0)
              }}
              className="w-full h-14 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-[0.4em]"
            >
              System Return
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Payment
