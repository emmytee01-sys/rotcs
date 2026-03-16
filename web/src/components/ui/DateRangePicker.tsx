import { DatePicker, Space } from 'antd'
import { Calendar } from 'lucide-react'
import { Dayjs } from 'dayjs'

const { RangePicker } = DatePicker

interface DateRangePickerProps {
  onChange: (dates: [Dayjs | null, Dayjs | null] | null) => void
  value?: [Dayjs | null, Dayjs | null]
  placeholder?: [string, string]
  allowClear?: boolean
}

export const DateRangePicker = ({
  onChange,
  value,
  placeholder = ['Start Date', 'End Date'],
  allowClear = true,
}: DateRangePickerProps) => {
  return (
    <Space>
      <Calendar size={16} className="text-gray-400" />
      <RangePicker
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        allowClear={allowClear}
        format="YYYY-MM-DD"
      />
    </Space>
  )
}

export default DateRangePicker
