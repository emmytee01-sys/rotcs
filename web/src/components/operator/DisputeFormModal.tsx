import { Modal, Form, Input, Select, Button } from 'antd'
import { AlertCircle } from 'lucide-react'
import { toast } from '@/utils/notifications'

const { TextArea } = Input
const { Option } = Select

interface DisputeFormModalProps {
  visible: boolean
  onClose: () => void
  period: string
  calculatedTGV: number
  reportedTGV: number
}

const DisputeFormModal = ({ visible, onClose, period, calculatedTGV, reportedTGV }: DisputeFormModalProps) => {
  const [form] = Form.useForm()

  const handleSubmit = (values: any) => {
    console.log('Dispute submitted:', values)
    toast.success('Dispute submitted successfully. The regulatory team will review your submission.')
    form.resetFields()
    onClose()
  }

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <AlertCircle size={20} className="text-orange-500" />
          <span>Raise TGV Dispute</span>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={600}
    >
      <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Period:</span>
            <span className="ml-2 font-semibold">{period}</span>
          </div>
          <div>
            <span className="text-gray-600">Calculated TGV:</span>
            <span className="ml-2 font-semibold">₦{(calculatedTGV / 1000000).toFixed(1)}M</span>
          </div>
          <div>
            <span className="text-gray-600">Your Reported TGV:</span>
            <span className="ml-2 font-semibold">₦{(reportedTGV / 1000000).toFixed(1)}M</span>
          </div>
          <div>
            <span className="text-gray-600">Discrepancy:</span>
            <span className="ml-2 font-semibold text-orange-600">
              ₦{Math.abs((calculatedTGV - reportedTGV) / 1000000).toFixed(1)}M
            </span>
          </div>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Dispute Category"
          name="category"
          rules={[{ required: true, message: 'Please select a category' }]}
        >
          <Select placeholder="Select dispute category">
            <Option value="data_ingestion">Data Ingestion Error</Option>
            <Option value="calculation">Calculation Methodology</Option>
            <Option value="deductibles">Deductibles Not Applied</Option>
            <Option value="technical">Technical Issue</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Detailed Explanation"
          name="explanation"
          rules={[
            { required: true, message: 'Please provide a detailed explanation' },
            { min: 50, message: 'Explanation must be at least 50 characters' },
          ]}
        >
          <TextArea
            rows={6}
            placeholder="Provide a detailed explanation of the discrepancy, including any supporting evidence or documentation references..."
          />
        </Form.Item>

        <Form.Item label="Supporting Document Reference (Optional)" name="documentRef">
          <Input placeholder="e.g., Invoice #12345, Report ID, etc." />
        </Form.Item>

        <Form.Item label="Contact Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input placeholder="your.email@operator.com" />
        </Form.Item>

        <Form.Item className="mb-0">
          <div className="flex justify-end gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" htmlType="submit">
              Submit Dispute
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default DisputeFormModal
