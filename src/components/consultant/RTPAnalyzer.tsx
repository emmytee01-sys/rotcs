import { Card, Typography, Input, Button, Descriptions, Progress, Alert } from 'antd'
import { Gamepad2, TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'

const { Title, Text } = Typography

// Mock RTP data
const mockRTPData = {
  gameId: 'SLOT-789',
  gameName: 'Mega Fortune Slots',
  operator: 'Bet9ja',
  configuredRTP: 96.5,
  actualRTP: 94.2,
  totalWagers: 15000000,
  totalPayouts: 14130000,
  transactionCount: 8420,
  trend: [
    { period: 'Week 1', rtp: 96.8 },
    { period: 'Week 2', rtp: 95.9 },
    { period: 'Week 3', rtp: 94.5 },
    { period: 'Week 4', rtp: 94.2 },
  ],
}

const RTPAnalyzer = () => {
  const [gameId, setGameId] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [data, setData] = useState<typeof mockRTPData | null>(null)

  const handleAnalyze = () => {
    setAnalyzing(true)
    // Simulate API call
    setTimeout(() => {
      setData(mockRTPData)
      setAnalyzing(false)
    }, 1000)
  }

  const rtpDeviation = data ? Math.abs(data.configuredRTP - data.actualRTP) : 0
  const isAnomaly = rtpDeviation > 2.0

  return (
    <Card>
      <Title level={4}>
        <Gamepad2 className="inline mr-2" size={20} />
        Deep-dive into specific game IDs to detect anomalies
      </Title>

      <div className="mb-6 flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Enter Game ID to analyze (e.g., SLOT-789)"
          prefix={<Gamepad2 size={16} />}
          size="large"
          value={gameId}
          onChange={(e) => setGameId(e.target.value)}
          onPressEnter={handleAnalyze}
          className="flex-1"
        />
        <Button type="primary" size="large" className="w-full sm:w-auto" onClick={handleAnalyze} loading={analyzing}>
          Analyze
        </Button>
      </div>

      {data && (
        <div>
          {isAnomaly && (
            <Alert
              message="RTP Anomaly Detected"
              description={`The actual RTP (${data.actualRTP}%) deviates significantly from the configured RTP (${data.configuredRTP}%). This requires investigation.`}
              type="error"
              icon={<AlertTriangle />}
              showIcon
              className="mb-4"
            />
          )}

          <div className="overflow-x-auto mb-6">
            <Descriptions bordered column={2}>
              <Descriptions.Item label="Game ID">{data.gameId}</Descriptions.Item>
              <Descriptions.Item label="Game Name">{data.gameName}</Descriptions.Item>
              <Descriptions.Item label="Operator">{data.operator}</Descriptions.Item>
              <Descriptions.Item label="Transactions">{data.transactionCount.toLocaleString()}</Descriptions.Item>
              <Descriptions.Item label="Total Wagers">
                ₦{(data.totalWagers / 1000000).toFixed(1)}M
              </Descriptions.Item>
              <Descriptions.Item label="Total Payouts">
                ₦{(data.totalPayouts / 1000000).toFixed(1)}M
              </Descriptions.Item>
              <Descriptions.Item label="Configured RTP">
                <div className="flex items-center gap-2">
                  <Progress
                    percent={data.configuredRTP}
                    size="small"
                    strokeColor="#52c41a"
                    format={(percent) => `${percent}%`}
                  />
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Actual RTP">
                <div className="flex items-center gap-2">
                  <Progress
                    percent={data.actualRTP}
                    size="small"
                    strokeColor={isAnomaly ? '#ff4d4f' : '#1890ff'}
                    format={(percent) => `${percent}%`}
                  />
                  {data.actualRTP < data.configuredRTP ? (
                    <TrendingDown size={16} className="text-red-500" />
                  ) : (
                    <TrendingUp size={16} className="text-green-500" />
                  )}
                </div>
              </Descriptions.Item>
              <Descriptions.Item label="Deviation" span={2}>
                <Text className={isAnomaly ? 'text-red-600 font-bold' : 'text-gray-600'}>
                  {rtpDeviation.toFixed(2)}% {isAnomaly && '(CRITICAL)'}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <Title level={5}>RTP Trend (Last 4 Weeks)</Title>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="period" />
              <YAxis domain={[90, 100]} />
              <Tooltip formatter={(value: any) => `${value}%`} />
              <ReferenceLine y={data.configuredRTP} stroke="#52c41a" strokeDasharray="3 3" label="Configured" />
              <Line type="monotone" dataKey="rtp" stroke="#1890ff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {!data && !analyzing && (
        <div className="text-center py-12 text-gray-400">
          <Gamepad2 size={64} className="mx-auto mb-4" />
          <div className="text-center">
            <Text type="secondary">Enter a Game ID and click Analyze to view RTP analysis</Text>
          </div>
        </div>
      )}
    </Card>
  )
}

export default RTPAnalyzer
