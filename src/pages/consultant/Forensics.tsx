import { Tabs } from 'antd'
import { Activity, Search } from 'lucide-react'
import RTPAnalyzer from '@/components/consultant/RTPAnalyzer'
import TransactionExplorer from '@/components/consultant/TransactionExplorer'

const Forensics = () => {
  return (
    <div className="mt-8">
      <Tabs
        defaultActiveKey="rtp"
        items={[
          {
            key: 'rtp',
            label: (
              <span className="flex items-center gap-2">
                <Activity size={16} />
                RTP Analyzer
              </span>
            ),
            children: <RTPAnalyzer />,
          },
          {
            key: 'transactions',
            label: (
              <span className="flex items-center gap-2">
                <Search size={16} />
                Transaction Explorer
              </span>
            ),
            children: <TransactionExplorer />,
          },
        ]}
      />
    </div>
  )
}

export default Forensics
