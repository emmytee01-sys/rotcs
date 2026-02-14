import { Pagination } from 'antd'
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { 
  COMPANIES, 
  NIGERIAN_STATES, 
  BET_TYPES, 
  PLAYER_NAMES, 
  INITIAL_BETTING_RECORDS,
  BettingRecord 
} from '@/utils/mockData'


interface RealTimeCollectionsFeedProps {
  selectedState?: string
  selectedCompany: string
}

const RealTimeCollectionsFeed = ({ selectedState, selectedCompany }: RealTimeCollectionsFeedProps) => {
  const [records, setRecords] = useState<BettingRecord[]>(INITIAL_BETTING_RECORDS)
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5

  // Simulate real-time betting activity
  useEffect(() => {
    const interval = setInterval(() => {
      // Add new betting record randomly
      if (Math.random() > 0.6) {
        const stake = Math.floor(Math.random() * 15000) + 1000
        const isWin = Math.random() > 0.5
        const multiplier = isWin ? (Math.random() * 2 + 1.5) : 0
        
        const newRecord: BettingRecord = {
          id: Date.now(),
          playerName: PLAYER_NAMES[Math.floor(Math.random() * PLAYER_NAMES.length)],
          company: COMPANIES[Math.floor(Math.random() * COMPANIES.length)],
          betType: BET_TYPES[Math.floor(Math.random() * BET_TYPES.length)],
          stake: stake,
          outcome: isWin ? 'win' : 'loss',
          payout: Math.floor(stake * multiplier),
          time: 'Just now',
          state: NIGERIAN_STATES[Math.floor(Math.random() * NIGERIAN_STATES.length)],
        }
        setRecords((prev) => [newRecord, ...prev])
        setCurrentPage(1)
      }
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Filter records based on selected state and company
  const filteredRecords = records.filter((record) => {
    const stateMatch = !selectedState || selectedState === 'all' || record.state === selectedState
    const companyMatch = selectedCompany === 'all' || record.company === selectedCompany
    return stateMatch && companyMatch
  })

  // Get current page items
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentRecords = filteredRecords.slice(startIndex, endIndex)

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedState, selectedCompany])

  return (
    <div className="bg-[#0F172A] rounded-3xl border-2 border-white/[0.03] shadow-2xl overflow-hidden flex flex-col h-full">
      {/* Header with Title and Live Badge */}
      <div className="p-6 md:p-8 border-b border-white/[0.05] flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <TrendingUp size={20} className="text-emerald-500" />
          </div>
          <div>
            <h4 className="text-lg bold-heading text-white m-0 uppercase tracking-tight">Live Transactions</h4>
            <span className="text-[10px] font-black text-[#64748B] uppercase tracking-[0.2em]">Live Feed</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            LIVE AUDIT
          </div>
          <span className="text-xs font-black text-[#64748B] uppercase tabular-nums">
            {filteredRecords.length} EVENTS
          </span>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-3 flex-1 overflow-y-auto max-h-[600px] scrollbar-hide">
        {currentRecords.length > 0 ? (
          currentRecords.map((record) => (
            <div
              key={record.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl bg-black/40 border-2 border-transparent hover:border-emerald-500/20 transition-all cursor-pointer group relative overflow-hidden"
              style={{
                animation: record.time === 'Just now' ? 'slideIn 0.4s ease-out' : 'none',
              }}
            >
              {/* Outcome Indicator Line */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 ${record.outcome === 'win' ? 'bg-emerald-500 shadow-[0_0_10px_#10B981]' : 'bg-red-500 shadow-[0_0_10px_#EF4444]'}`} />
              
              <div className="flex items-center gap-4 flex-1 w-full">
                {/* Company Avatar - Industrial Style */}
                <div
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-xl flex-shrink-0 group-hover:bg-emerald-500/10 group-hover:border-emerald-500/30 transition-all"
                >
                  {record.company.charAt(0)}
                </div>
                
                {/* Betting Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-black text-white uppercase tracking-tight truncate">{record.playerName}</span>
                    <span className="text-[10px] font-black text-emerald-400/80 uppercase tracking-widest bg-emerald-500/10 px-1.5 py-0.5 rounded-md">{record.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#64748B] uppercase truncate">{record.betType}</span>
                    <span className="text-[10px] text-white/20">|</span>
                    <span className="text-[10px] font-bold text-white uppercase opacity-40">{record.company}</span>
                  </div>
                </div>
              </div>

              {/* Stake & Outcome - High Contrast */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="text-right">
                  <span className="text-[10px] font-black text-[#64748B] uppercase block">STAKE</span>
                  <span className="text-sm font-black text-white tabular-nums">₦{record.stake.toLocaleString()}</span>
                </div>
                
                <div className="text-right min-w-[100px]">
                  {record.outcome === 'win' ? (
                    <>
                      <span className="text-[10px] font-black text-emerald-500 uppercase flex items-center justify-end gap-1">
                        <ArrowUpRight size={10} /> PAYOUT
                      </span>
                      <span className="text-lg font-black text-emerald-400 tabular-nums">+₦{record.payout.toLocaleString()}</span>
                    </>
                  ) : (
                    <>
                      <span className="text-[10px] font-black text-red-500 uppercase flex items-center justify-end gap-1">
                        <ArrowDownRight size={10} /> LOSS
                      </span>
                      <span className="text-lg font-black text-slate-500 tabular-nums">₦0.00</span>
                    </>
                  )}
                </div>

                <div className="hidden md:block w-[1px] h-8 bg-white/10" />

                <div className="text-right">
                  <span className="block text-[10px] font-black text-[#64748B] uppercase tracking-tighter">{record.time}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-black/20 rounded-3xl border border-dashed border-white/10">
            <span className="text-[#64748B] font-bold tracking-widest uppercase">No Active Data Received</span>
          </div>
        )}
      </div>

      {filteredRecords.length > pageSize && (
        <div className="p-6 border-t border-white/[0.05] flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredRecords.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
            className="custom-pagination"
          />
        </div>
      )}
    </div>
  )
}

export default RealTimeCollectionsFeed
