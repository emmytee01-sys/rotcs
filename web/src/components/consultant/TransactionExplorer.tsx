import { Card, Typography, Input, Table, Tag, Button } from 'antd'
import { Search } from 'lucide-react'
import { useState } from 'react'

const { Title } = Typography

// Mock transaction data
const mockTransactions = [
  {
    id: 'TXN-2026-001-4521',
    gameId: 'SLOT-789',
    playerHash: 'a3f5e8d9c2b1',
    wager: 5000,
    payout: 12000,
    timestamp: '2026-01-04 08:45:23',
    territory: 'Lagos Island',
    operator: 'Bet9ja',
  },
  {
    id: 'TXN-2026-001-4522',
    gameId: 'SPORT-456',
    playerHash: 'b7c2d4e6f8a1',
    wager: 10000,
    payout: 0,
    timestamp: '2026-01-04 08:46:15',
    territory: 'Ikeja',
    operator: 'SportyBet',
  },
  {
    id: 'TXN-2026-001-4523',
    gameId: 'SLOT-123',
    playerHash: 'c9e1f3a5b7d2',
    wager: 2000,
    payout: 8000,
    timestamp: '2026-01-04 08:47:02',
    territory: 'Lekki',
    operator: '1xBet',
  },
]

const TransactionExplorer = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState(mockTransactions)

  const handleSearch = () => {
    if (!searchQuery) {
      setResults(mockTransactions)
      return
    }

    const filtered = mockTransactions.filter(
      (tx) =>
        tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.gameId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.playerHash.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setResults(filtered)
  }

  const columns = [
    {
      title: 'Transaction ID',
      dataIndex: 'id',
      key: 'id',
      render: (text: string) => <span className="font-mono text-xs">{text}</span>,
    },
    {
      title: 'Game ID',
      dataIndex: 'gameId',
      key: 'gameId',
      render: (text: string) => <Tag>{text}</Tag>,
    },
    {
      title: 'Player Hash',
      dataIndex: 'playerHash',
      key: 'playerHash',
      render: (text: string) => <span className="font-mono text-xs text-gray-500">{text}</span>,
    },
    {
      title: 'Wager',
      dataIndex: 'wager',
      key: 'wager',
      render: (amount: number) => `₦${amount.toLocaleString()}`,
    },
    {
      title: 'Payout',
      dataIndex: 'payout',
      key: 'payout',
      render: (amount: number) => (
        <span className={amount > 0 ? 'text-green-600' : 'text-gray-400'}>
          ₦{amount.toLocaleString()}
        </span>
      ),
    },
    {
      title: 'Territory',
      dataIndex: 'territory',
      key: 'territory',
    },
    {
      title: 'Operator',
      dataIndex: 'operator',
      key: 'operator',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => <span className="text-xs text-gray-500">{text}</span>,
    },
  ]

  return (
    <Card>
      <Title level={4}>Transaction Explorer</Title>
      <div className="mb-4 flex gap-2">
        <Input
          placeholder="Search by Bet ID, Player Hash, or Game ID"
          prefix={<Search size={16} />}
          size="large"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button type="primary" onClick={handleSearch}>
          Search
        </Button>
      </div>
      <Table
        dataSource={results}
        columns={columns}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        scroll={{ x: 1200 }}
      />
    </Card>
  )
}

export default TransactionExplorer
