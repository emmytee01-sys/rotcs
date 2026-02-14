import { Table, Tag, Button } from 'antd'
import { FileText, AlertCircle, Download, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import DisputeFormModal from '@/components/operator/DisputeFormModal'
import InvoicePreviewModal from '@/components/operator/InvoicePreviewModal'

const billingData = [
  {
    id: 'INV-2025-12-001',
    period: 'December 2025',
    ggr: 320000000,
    taxDue: 48000000,
    taxPaid: 48000000,
    status: 'paid',
    paidDate: '2026-01-02',
    prn: 'PRN-2025-12-001',
  },
  {
    id: 'INV-2025-11-001',
    period: 'November 2025',
    ggr: 298000000,
    taxDue: 44700000,
    taxPaid: 44700000,
    status: 'paid',
    paidDate: '2025-12-03',
    prn: 'PRN-2025-11-001',
  },
  {
    id: 'INV-2025-10-001',
    period: 'October 2025',
    ggr: 315000000,
    taxDue: 47250000,
    taxPaid: 47250000,
    status: 'paid',
    paidDate: '2025-11-02',
    prn: 'PRN-2025-10-001',
  },
]

const Billing = () => {
  const [disputeModalVisible, setDisputeModalVisible] = useState(false)
  const [invoiceModalVisible, setInvoiceModalVisible] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice)
    setInvoiceModalVisible(true)
  }

  const columns = [
    {
      title: 'Period',
      dataIndex: 'period',
      key: 'period',
      render: (text: string) => <span className="font-bold text-white">{text}</span>,
    },
    {
      title: 'TGV',
      dataIndex: 'ggr',
      key: 'ggr',
      render: (ggr: number) => <span className="text-white">₦{(ggr / 1000000).toFixed(1)}M</span>,
    },
    {
      title: 'Tax Due',
      dataIndex: 'taxDue',
      key: 'taxDue',
      render: (taxDue: number) => <span className="text-white">₦{(taxDue / 1000000).toFixed(1)}M</span>,
    },
    {
      title: 'PRN',
      dataIndex: 'prn',
      key: 'prn',
      render: (prn: string) => <span className="text-[#64748B] font-mono text-xs">{prn}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'paid' ? 'success' : 'warning'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Paid Date',
      dataIndex: 'paidDate',
      key: 'paidDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" size="small" onClick={() => handleViewInvoice(record)}>
          View Invoice
        </Button>
      ),
    },
  ]

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl md:text-5xl bold-heading text-white mb-2 uppercase tracking-tight">Billing History</h1>
        <p className="text-[#94A3B8] font-bold text-sm tracking-widest uppercase italic border-l-2 border-emerald-500 pl-4">
          Jurisdictional Invoicing & Tax Payment Records
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-emerald-500/30 transition-all shadow-2xl mb-8">
        <div className="flex flex-wrap justify-between items-center gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <FileText size={20} className="text-emerald-500" />
            </div>
            <h3 className="text-xl bold-heading text-white m-0 uppercase tracking-tight">Invoice History</h3>
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition-all text-xs font-black uppercase tracking-widest shadow-neon">
            <Download size={14} />
            Export Records
          </button>
        </div>
        <div className="overflow-x-auto">
          <Table
            dataSource={billingData}
            columns={columns}
            pagination={{ pageSize: 10 }}
            rowKey="id"
            scroll={{ x: 'max-content' }}
            className="custom-table"
          />
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-black/40 border-2 border-white/[0.05] relative overflow-hidden group hover:border-amber-500/30 transition-all shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <AlertCircle size={20} className="text-amber-500" />
          </div>
          <h3 className="text-xl bold-heading text-white m-0 uppercase tracking-tight">Dispute Mechanism</h3>
        </div>
        <div className="bg-amber-500/5 border-2 border-amber-500/20 rounded-2xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <AlertCircle size={120} className="text-amber-500" />
          </div>
          <p className="text-[#94A3B8] font-bold text-sm mb-6 leading-relaxed relative z-10">
            If you believe there is a discrepancy in the calculated TGV or tax liability, 
            you can raise a tactical dispute for review by the regulatory oversight team.
            Evidence must be submitted via the reconciliation portal.
          </p>
          <div className="relative z-10 flex gap-4">
            <button 
              onClick={() => setDisputeModalVisible(true)}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              Raise a Dispute
            </button>
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-transparent border border-[#64748B]/30 text-[#64748B] hover:text-[#94A3B8] transition-all text-[10px] font-black uppercase tracking-widest">
              Review Guidelines
              <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </div>

      <DisputeFormModal
        visible={disputeModalVisible}
        onClose={() => setDisputeModalVisible(false)}
        period="January 2026"
        calculatedTGV={320000000}
        reportedTGV={318000000}
      />

      <InvoicePreviewModal
        visible={invoiceModalVisible}
        onClose={() => setInvoiceModalVisible(false)}
        invoice={selectedInvoice}
      />
    </div>
  )
}

export default Billing
