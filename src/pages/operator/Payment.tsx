import { Card, Typography, Button, Descriptions, Steps, Radio, Space, Tag, Modal } from 'antd'
import { CreditCard, FileText, CheckCircle, Download } from 'lucide-react'
import { useState } from 'react'
import TaxClearanceCertificate from '@/components/operator/TaxClearanceCertificate'

const { Title, Text } = Typography

const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState<'web' | 'branch'>('web')
  const [currentStep, setCurrentStep] = useState(0)
  const [certificateVisible, setCertificateVisible] = useState(false)

  const taxDue = 48000000
  const prn = 'PRN-2026-01-001'
  const revenueCode = '07081999'

  const handleGenerateInvoice = () => {
    setCurrentStep(1)
  }

  const handlePay = () => {
    if (paymentMethod === 'branch') {
      // Simulate PDF download for branch payment
      const invoiceContent = `
TAX PAYMENT INVOICE
===================

Payment Reference Number: ${prn}
Revenue Code: ${revenueCode}

Operator: Bet9ja Nigeria Limited
Period: January 2026
TGV: ₦320,000,000
Tax Rate: 15%
Tax Due: ₦${(taxDue / 1000000).toFixed(1)}M

Please present this invoice at any bank branch to complete your payment.
      `.trim()

      const blob = new Blob([invoiceContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `Tax_Invoice_${prn}.txt`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      // Show success modal
      Modal.success({
        title: 'Invoice Downloaded Successfully!',
        icon: <Download size={24} className="text-green-500" />,
        content: (
          <div className="mt-4">
            <Text className="block mb-2">
              Your tax payment invoice has been downloaded.
            </Text>
            <Text className="block text-gray-600">
              Please present this invoice at any bank branch to complete your payment.
            </Text>
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <Text strong className="block mb-1">Payment Reference Number:</Text>
              <Text className="font-mono text-lg">{prn}</Text>
            </div>
          </div>
        ),
        okText: 'Got it',
        width: 500,
      })
      return
    }

    // For web payment, proceed with payment processing
    setCurrentStep(2)
    // Simulate payment processing
    setTimeout(() => {
      setCurrentStep(3)
    }, 2000)
  }

  return (
    <div>
      <Title level={2}>Payment</Title>
      <Text type="secondary">Process tax payments for current period</Text>

      <Card className="mt-6">
        <Steps current={currentStep} className="mb-8">
          <Steps.Step title="Review" description="Verify tax liability" />
          <Steps.Step title="Generate Invoice" description="Create payment invoice" />
          <Steps.Step title="Payment" description="Complete payment" />
          <Steps.Step title="Confirmation" description="Receipt generated" />
        </Steps>

        {currentStep === 0 && (
          <div>
            <Title level={4}>Current Period Tax Liability</Title>
            <div className="overflow-x-auto">
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Period">January 2026</Descriptions.Item>
                <Descriptions.Item label="TGV">₦320,000,000</Descriptions.Item>
                <Descriptions.Item label="Tax Rate">15%</Descriptions.Item>
                <Descriptions.Item label="Tax Due">
                  <Text strong className="text-blue-600 text-lg">₦{(taxDue / 1000000).toFixed(1)}M</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Revenue Code">
                  <Text className="font-mono">{ revenueCode}</Text>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="mt-6 text-center">
              <Button type="primary" size="large" className="w-full sm:w-auto" onClick={handleGenerateInvoice}>
                Generate Invoice & Proceed to Payment
              </Button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div>
            <Title level={4}>Select Payment Method</Title>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
              <Text strong>Payment Reference Number (PRN): </Text>
              <Text className="font-mono text-lg">{prn}</Text>
            </div>

            <Radio.Group
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full"
            >
              <Space direction="vertical" className="w-full">
                <Card
                  hoverable
                  className={paymentMethod === 'web' ? 'border-2 border-blue-500' : ''}
                  onClick={() => setPaymentMethod('web')}
                >
                  <Radio value="web">
                    <div className="flex items-center gap-3">
                      <CreditCard size={24} className="text-blue-500" />
                      <div>
                        <Text strong>Web Pay</Text>
                        <br />
                        <Text type="secondary" className="text-xs">
                          Pay immediately via card or bank transfer
                        </Text>
                      </div>
                    </div>
                  </Radio>
                </Card>

                <Card
                  hoverable
                  className={paymentMethod === 'branch' ? 'border-2 border-blue-500' : ''}
                  onClick={() => setPaymentMethod('branch')}
                >
                  <Radio value="branch">
                    <div className="flex items-center gap-3">
                      <FileText size={24} className="text-green-500" />
                      <div>
                        <Text strong>Branch Pay</Text>
                        <br />
                        <Text type="secondary" className="text-xs">
                          Print invoice and pay at any bank branch
                        </Text>
                      </div>
                    </div>
                  </Radio>
                </Card>
              </Space>
            </Radio.Group>

            <div className="mt-6 text-center">
              <Button type="primary" size="large" className="w-full sm:w-auto" onClick={handlePay}>
                {paymentMethod === 'web' ? 'Proceed to Payment Gateway' : 'Download Invoice PDF'}
              </Button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <Title level={4}>Processing Payment...</Title>
            <Text type="secondary">Please wait while we confirm your payment</Text>
          </div>
        )}

        {currentStep === 3 && (
          <div className="text-center py-12">
            <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
            <Title level={3} className="text-green-600">Payment Successful!</Title>
            <Text type="secondary" className="block mb-6">
              Your tax payment has been processed successfully
            </Text>
            <div className="overflow-x-auto">
              <Descriptions bordered column={1} className="max-w-md mx-auto">
                <Descriptions.Item label="PRN">{prn}</Descriptions.Item>
                <Descriptions.Item label="Amount Paid">₦{(taxDue / 1000000).toFixed(1)}M</Descriptions.Item>
                <Descriptions.Item label="Payment Date">{new Date().toLocaleDateString()}</Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color="success">PAID</Tag>
                </Descriptions.Item>
              </Descriptions>
            </div>
            <div className="mt-6">
              <Button type="primary" size="large" className="w-full sm:w-auto" onClick={() => setCertificateVisible(true)}>
                Download Tax Clearance Certificate
              </Button>
            </div>
          </div>
        )}
      </Card>

      <TaxClearanceCertificate
        visible={certificateVisible}
        onClose={() => setCertificateVisible(false)}
        certificate={{
          certificateNumber: 'TCC-2026-001-BET9JA',
          operatorName: 'Bet9ja Nigeria Limited',
          period: 'January 2026',
          taxPaid: taxDue,
          issueDate: new Date().toLocaleDateString(),
        }}
      />
    </div>
  )
}

export default Payment
