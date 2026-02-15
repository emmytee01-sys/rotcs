// Centralized Mock Data Source
// This file serves as the single source of truth for all mock data across the application
// to ensure consistency in presentations and demos

// ============================================================================
// CONSTANTS
// ============================================================================

export const COMPANIES = ['Bet9ja', 'SportyBet', '1xBet', 'BetKing', '22Bet', 'NairaBet']

export const NIGERIAN_STATES = [
  'Lagos', 'Kano', 'Rivers', 'Kaduna', 'Oyo', 'Abuja', 'Anambra',
  'Delta', 'Edo', 'Enugu', 'Imo', 'Ogun', 'Ondo', 'Osun', 'Plateau'
]

export const BET_TYPES = [
  'Football - Premier League',
  'Football - La Liga',
  'Football - Serie A',
  'Basketball - NBA',
  'Tennis - ATP',
  'Virtual Racing',
  'Virtual Football',
  'Cricket - IPL',
  'Boxing',
  'Horse Racing',
]

export const PLAYER_NAMES = [
  'Chidi O.', 'Amaka N.', 'Tunde A.', 'Ngozi M.', 'Ibrahim K.',
  'Blessing U.', 'Emeka P.', 'Fatima S.', 'Oluwaseun D.', 'Chioma E.',
  'Adebayo L.', 'Zainab H.', 'Chukwuma I.', 'Aisha B.', 'Kunle F.'
]

// ============================================================================
// OPERATOR DATA - Single Source of Truth
// ============================================================================

export interface OperatorData {
  id: number
  name: string
  status: 'compliant' | 'warning' | 'default'
  ggr: number // Total Gaming Value (TGV)
  taxDue: number
  taxPaid: number
  lastPayment: string
}

export const OPERATORS: OperatorData[] = [
  {
    id: 1,
    name: 'Bet9ja',
    status: 'compliant',
    ggr: 450000000,
    taxDue: 13500000, // 450M * 0.3 * 0.1
    taxPaid: 13500000,
    lastPayment: '2026-01-01',
  },
  {
    id: 2,
    name: 'SportyBet',
    status: 'compliant',
    ggr: 380000000,
    taxDue: 11400000, // 380M * 0.03
    taxPaid: 11400000,
    lastPayment: '2026-01-01',
  },
  {
    id: 3,
    name: '1xBet',
    status: 'warning',
    ggr: 320000000,
    taxDue: 9600000, // 320M * 0.03
    taxPaid: 9000000,
    lastPayment: '2025-12-28',
  },
  {
    id: 4,
    name: 'BetKing',
    status: 'compliant',
    ggr: 290000000,
    taxDue: 8700000, // 290M * 0.03
    taxPaid: 8700000,
    lastPayment: '2026-01-02',
  },
  {
    id: 5,
    name: 'NairaBet',
    status: 'default',
    ggr: 180000000,
    taxDue: 5400000, // 180M * 0.03
    taxPaid: 3000000,
    lastPayment: '2025-12-15',
  },
  {
    id: 6,
    name: '22Bet',
    status: 'compliant',
    ggr: 250000000,
    taxDue: 7500000, // 250M * 0.03
    taxPaid: 7500000,
    lastPayment: '2026-01-01',
  },
]

// ============================================================================
// CALCULATED REVENUE METRICS
// ============================================================================

export const PLAYER_WIN_RATIO = 0.7 // 70% of TGV goes to players
export const NET_REVENUE_TAX_RATE = 0.1 // 10% tax on (TGV - Wins)

// Total Gaming Value across all operators
export const TOTAL_MARKET_TGV = OPERATORS.reduce((sum, op) => sum + op.ggr, 0)

// Total player wins (approximately 70% of TGV based on industry standards)
export const TOTAL_PLAYER_WINS = Math.round(TOTAL_MARKET_TGV * PLAYER_WIN_RATIO)

// Net revenue (GGR) = TGV - Wins
export const TOTAL_NET_REVENUE = TOTAL_MARKET_TGV - TOTAL_PLAYER_WINS

// Total tax due (10% of Net Revenue)
export const TOTAL_TAX_DUE = Math.round(TOTAL_NET_REVENUE * NET_REVENUE_TAX_RATE)

// Total tax collected (assuming ~95% collection rate for demo purposes)
export const TOTAL_TAX_COLLECTED = Math.round(TOTAL_TAX_DUE * 0.95)

// Projected monthly revenue target
export const PROJECTED_REVENUE = Math.round(TOTAL_TAX_DUE * 1.2)

// Revenue trend data (6 months)
export const REVENUE_TREND_DATA = [
  { month: 'Jan', revenue: 45000000 },
  { month: 'Feb', revenue: 52000000 },
  { month: 'Mar', revenue: 48000000 },
  { month: 'Apr', revenue: 61000000 },
  { month: 'May', revenue: 55000000 },
  { month: 'Jun', revenue: 67000000 },
]

// ============================================================================
// GEOSPATIAL DATA
// ============================================================================

export interface TerritorialData {
  territory: string
  users: number
  ggr: number
  penetration: number
  color: string
}

export const TERRITORIAL_DATA: TerritorialData[] = [
  { territory: 'Victoria Island', users: 32000, ggr: 280000000, penetration: 12.5, color: '#1890ff' },
  { territory: 'Ikeja', users: 28000, ggr: 245000000, penetration: 9.8, color: '#52c41a' },
  { territory: 'Lekki', users: 25000, ggr: 220000000, penetration: 11.2, color: '#fa8c16' },
  { territory: 'Ikoyi', users: 22000, ggr: 195000000, penetration: 10.5, color: '#eb2f96' },
  { territory: 'Surulere', users: 18000, ggr: 160000000, penetration: 7.5, color: '#722ed1' },
  { territory: 'Yaba', users: 15000, ggr: 140000000, penetration: 8.9, color: '#13c2c2' },
]

export interface BuyingPowerData {
  territory: string
  totalSpend: number
  transactions: number
  avgOrderValue: number
  color: string
}

export const BUYING_POWER_DATA: BuyingPowerData[] = [
  { territory: 'Victoria Island', totalSpend: 480000000, transactions: 9500, avgOrderValue: 50526, color: '#1890ff' },
  { territory: 'Ikeja', totalSpend: 420000000, transactions: 8200, avgOrderValue: 51220, color: '#52c41a' },
  { territory: 'Lekki', totalSpend: 380000000, transactions: 7800, avgOrderValue: 48718, color: '#fa8c16' },
  { territory: 'Ikoyi', totalSpend: 340000000, transactions: 6900, avgOrderValue: 49275, color: '#eb2f96' },
  { territory: 'Surulere', totalSpend: 280000000, transactions: 5500, avgOrderValue: 50909, color: '#722ed1' },
  { territory: 'Yaba', totalSpend: 180000000, transactions: 4000, avgOrderValue: 45000, color: '#13c2c2' },
]

// ============================================================================
// BETTING RECORDS DATA
// ============================================================================

export interface BettingRecord {
  id: number
  playerName: string
  company: string
  betType: string
  stake: number
  outcome: 'win' | 'loss'
  payout: number
  time: string
  state: string
}

export const INITIAL_BETTING_RECORDS: BettingRecord[] = [
  { id: 1, playerName: 'Chidi O.', company: 'SportyBet', betType: 'Football - Premier League', stake: 5000, outcome: 'win', payout: 12500, time: 'Just now', state: 'Lagos' },
  { id: 2, playerName: 'Amaka N.', company: 'Bet9ja', betType: 'Virtual Racing', stake: 2000, outcome: 'loss', payout: 0, time: 'Just now', state: 'Abuja' },
  { id: 3, playerName: 'Tunde A.', company: 'BetKing', betType: 'Basketball - NBA', stake: 10000, outcome: 'win', payout: 18000, time: '1 min ago', state: 'Lagos' },
  { id: 4, playerName: 'Ngozi M.', company: 'NairaBet', betType: 'Tennis - ATP', stake: 3500, outcome: 'win', payout: 7000, time: '2 mins ago', state: 'Rivers' },
  { id: 5, playerName: 'Ibrahim K.', company: '1xBet', betType: 'Football - La Liga', stake: 8000, outcome: 'loss', payout: 0, time: '3 mins ago', state: 'Kano' },
  { id: 6, playerName: 'Blessing U.', company: 'SportyBet', betType: 'Virtual Football', stake: 1500, outcome: 'win', payout: 4500, time: '5 mins ago', state: 'Oyo' },
  { id: 7, playerName: 'Emeka P.', company: 'Bet9ja', betType: 'Cricket - IPL', stake: 6000, outcome: 'loss', payout: 0, time: '7 mins ago', state: 'Anambra' },
  { id: 8, playerName: 'Fatima S.', company: '22Bet', betType: 'Football - Serie A', stake: 12000, outcome: 'win', payout: 24000, time: '10 mins ago', state: 'Kaduna' },
  { id: 9, playerName: 'Oluwaseun D.', company: 'BetKing', betType: 'Boxing', stake: 4000, outcome: 'win', payout: 9200, time: '12 mins ago', state: 'Lagos' },
  { id: 10, playerName: 'Chioma E.', company: 'NairaBet', betType: 'Horse Racing', stake: 7500, outcome: 'loss', payout: 0, time: '15 mins ago', state: 'Enugu' },
]

// Multi-state breakdown (5 states with consistent data)
export const CONSULTANT_STATES = [
  { id: 'lagos', name: 'Lagos State', status: 'healthy', collectionRate: 98, operators: 12, tgv: 1620000000, users: 168000 },
  { id: 'ogun', name: 'Ogun State', status: 'warning', collectionRate: 85, operators: 8, tgv: 850000000, users: 95000 },
  { id: 'rivers', name: 'Rivers State', status: 'healthy', collectionRate: 95, operators: 10, tgv: 1240000000, users: 142000 },
  { id: 'kano', name: 'Kano State', status: 'healthy', collectionRate: 92, operators: 7, tgv: 920000000, users: 108000 },
  { id: 'oyo', name: 'Oyo State', status: 'critical', collectionRate: 65, operators: 6, tgv: 650000000, users: 78000 },
]

// ============================================================================
// CONSULTANT MULTI-STATE DATA (Aggregated from States)
// ============================================================================

export const CONSULTANT_TOTAL_TGV = CONSULTANT_STATES.reduce((sum, s) => sum + s.tgv, 0)
export const CONSULTANT_PLAYER_WINS = Math.round(CONSULTANT_TOTAL_TGV * PLAYER_WIN_RATIO)
export const CONSULTANT_NET_REVENUE = CONSULTANT_TOTAL_TGV - CONSULTANT_PLAYER_WINS
export const CONSULTANT_TAX_DUE = Math.round(CONSULTANT_NET_REVENUE * NET_REVENUE_TAX_RATE)
export const CONSULTANT_TAX_COLLECTED = Math.round(CONSULTANT_TAX_DUE * 0.95) // Aggregated collection
export const CONSULTANT_PROJECTED_REVENUE = Math.round(CONSULTANT_TAX_DUE * 1.2)

// Multi-state territorial data (aggregated across states)
export const CONSULTANT_TERRITORIAL_DATA: TerritorialData[] = [
  { territory: 'Lagos Metro', users: 160000, ggr: 1400000000, penetration: 12.5, color: '#1890ff' },
  { territory: 'Ogun Industrial', users: 140000, ggr: 1225000000, penetration: 9.8, color: '#52c41a' },
  { territory: 'Rivers Port', users: 125000, ggr: 1100000000, penetration: 11.2, color: '#fa8c16' },
  { territory: 'Kano Commercial', users: 110000, ggr: 975000000, penetration: 10.5, color: '#eb2f96' },
  { territory: 'Oyo Central', users: 90000, ggr: 800000000, penetration: 7.5, color: '#722ed1' },
  { territory: 'Multi-State Rural', users: 75000, ggr: 700000000, penetration: 8.9, color: '#13c2c2' },
]

// Multi-state buying power data
export const CONSULTANT_BUYING_POWER_DATA: BuyingPowerData[] = [
  { territory: 'Lagos Metro', totalSpend: 2400000000, transactions: 47500, avgOrderValue: 50526, color: '#1890ff' },
  { territory: 'Ogun Industrial', totalSpend: 2100000000, transactions: 41000, avgOrderValue: 51220, color: '#52c41a' },
  { territory: 'Rivers Port', totalSpend: 1900000000, transactions: 39000, avgOrderValue: 48718, color: '#fa8c16' },
  { territory: 'Kano Commercial', totalSpend: 1700000000, transactions: 34500, avgOrderValue: 49275, color: '#eb2f96' },
  { territory: 'Oyo Central', totalSpend: 1400000000, transactions: 27500, avgOrderValue: 50909, color: '#722ed1' },
  { territory: 'Multi-State Rural', totalSpend: 900000000, transactions: 20000, avgOrderValue: 45000, color: '#13c2c2' },
]

// ============================================================================
// ANOMALY DETECTION & FRAUD DATA
// ============================================================================

export interface FraudAlert {
  id: string
  type: 'suspicious_volume' | 'unauthorized_access' | 'tax_gap' | 'high_win_ratio'
  severity: 'critical' | 'warning' | 'info'
  operator: string
  description: string
  time: string
  status: 'active' | 'investigating' | 'resolved'
  region: string
}

export const FRAUD_ALERTS: FraudAlert[] = [
  {
    id: 'AL-001',
    type: 'suspicious_volume',
    severity: 'critical',
    operator: '1xBet',
    description: 'Abnormal GGR spike detected in Lekki sector. 400% above 24h average.',
    time: '2 mins ago',
    status: 'active',
    region: 'Lagos'
  },
  {
    id: 'AL-002',
    type: 'unauthorized_access',
    severity: 'warning',
    operator: 'NairaBet',
    description: 'Attempted endpoint bypass from unauthorized IP range.',
    time: '15 mins ago',
    status: 'investigating',
    region: 'Ogun'
  },
  {
    id: 'AL-003',
    type: 'high_win_ratio',
    severity: 'critical',
    operator: 'SportyBet',
    description: 'Win ratio anomaly: 98.5% payouts detected on Virtual Racing endpoint.',
    time: '45 mins ago',
    status: 'active',
    region: 'Rivers'
  },
  {
    id: 'AL-004',
    type: 'tax_gap',
    severity: 'warning',
    operator: 'Bet9ja',
    description: 'Minor variance in reported GGR vs real-time endpoint stream.',
    time: '2 hours ago',
    status: 'investigating',
    region: 'Lagos'
  },
  {
    id: 'AL-005',
    type: 'suspicious_volume',
    severity: 'info',
    operator: 'BetKing',
    description: 'Higher than usual betting volume detected during off-peak hours.',
    time: '4 hours ago',
    status: 'resolved',
    region: 'Kano'
  }
]

export const RISK_SCORE_DATA = [
  { region: 'Lagos', score: 12 },
  { region: 'Ogun', score: 38 },
  { region: 'Rivers', score: 25 },
  { region: 'Kano', score: 18 },
  { region: 'Oyo', score: 65 },
]

export const FRAUD_TYPE_DISTRIBUTION = [
  { name: 'GGR Spikes', value: 45 },
  { name: 'Unauthorized Access', value: 20 },
  { name: 'Payout Anomalies', value: 25 },
  { name: 'Tax Under-reporting', value: 10 },
]
