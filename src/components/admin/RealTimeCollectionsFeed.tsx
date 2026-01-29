import { Card, Typography, Badge, Pagination, Tag } from 'antd'
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

const { Title, Text } = Typography

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
    <Card className="shadow-sm">
      {/* Header with Title and Live Badge */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <Title level={4} className="m-0 flex items-center gap-2">
          <TrendingUp size={20} className="sm:w-6 sm:h-6" />
          <span className="text-base sm:text-lg">Real-Time Betting Activity Feed</span>
        </Title>
        <div className="flex items-center gap-2 sm:gap-4">
          <Text className="text-xs sm:text-sm text-gray-600">
            {filteredRecords.length} record{filteredRecords.length !== 1 ? 's' : ''}
          </Text>
          <Badge status="processing" text="Live" className="text-sm sm:text-base" />
        </div>
      </div>

      <div className="space-y-2">
        {currentRecords.length > 0 ? (
          currentRecords.map((record) => (
            <div
              key={record.id}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all border-l-4"
              style={{
                animation: record.time === 'Just now' ? 'slideIn 0.4s ease-out' : 'none',
                background: '#f9fafb',
                borderLeftColor: record.outcome === 'win' ? '#10b981' : '#ef4444',
              }}
            >
              <div className="flex items-start gap-3 sm:gap-4 flex-1 w-full">
                {/* Company Avatar */}
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0"
                  style={{ background: '#059669' }}
                >
                  {record.company.charAt(0)}
                </div>
                
                {/* Betting Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                    <Text strong className="text-sm sm:text-base">{record.playerName}</Text>
                    <Text type="secondary" className="text-xs">• {record.company}</Text>
                    <Tag color="blue" className="text-xs">{record.state}</Tag>
                  </div>
                  <Text className="text-xs sm:text-sm text-gray-600 block truncate">{record.betType}</Text>
                </div>
              </div>

              {/* Stake & Outcome */}
              <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {record.outcome === 'win' ? (
                      <ArrowUpRight size={14} className="text-green-600" />
                    ) : (
                      <ArrowDownRight size={14} className="text-red-600" />
                    )}
                    <Tag color={record.outcome === 'win' ? 'success' : 'error'} className="m-0 text-xs">
                      {record.outcome.toUpperCase()}
                    </Tag>
                  </div>
                  <div className="space-y-0.5">
                    <Text className="text-xs text-gray-500 block">Stake: ₦{record.stake.toLocaleString()}</Text>
                    {record.outcome === 'win' && (
                      <Text className="text-xs sm:text-sm font-bold text-green-600 block">
                        +₦{record.payout.toLocaleString()}
                      </Text>
                    )}
                  </div>
                </div>
                
                {/* Timestamp */}
                <Text type="secondary" className="text-xs flex-shrink-0">
                  {record.time}
                </Text>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <Text type="secondary">No betting records found for the selected filters</Text>
          </div>
        )}
      </div>

      {filteredRecords.length > pageSize && (
        <div className="mt-6 flex justify-center">
          <Pagination
            current={currentPage}
            total={filteredRecords.length}
            pageSize={pageSize}
            onChange={setCurrentPage}
            showSizeChanger={false}
          />
        </div>
      )}
    </Card>
  )
}

export default RealTimeCollectionsFeed
