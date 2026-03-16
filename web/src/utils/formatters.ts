/**
 * Formats a number with comma separators.
 * Example: 168000 -> "168,000"
 */
export const formatNumber = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null) return '0'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0'
  return new Intl.NumberFormat('en-US').format(num)
}

/**
 * Formats a currency value with the Naira symbol and smart scaling.
 * Supports "Million" and "Billion" helper words.
 * 
 * Examples:
 * 1620000000 -> "₦1.62 Billion"
 * 243000000 -> "₦243 Million"
 * 1234 -> "₦1,234"
 */
export const formatCurrency = (
  value: number | string | undefined | null,
  options: { 
    showSymbol?: boolean; 
    compact?: boolean; 
    scaling?: 'auto' | 'none' | 'million' | 'billion'
  } = {}
): string => {
  const { showSymbol = true, scaling = 'auto' } = options
  if (value === undefined || value === null) return showSymbol ? '₦0' : '0'
  
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return showSymbol ? '₦0' : '0'

  const symbol = showSymbol ? '₦' : ''
  
  if (scaling === 'none') {
    return `${symbol}${formatNumber(num)}`
  }

  // Handle auto-scaling or specific scaling
  if (scaling === 'billion' || (scaling === 'auto' && Math.abs(num) >= 1_000_000_000)) {
    const scaled = num / 1_000_000_000
    return `${symbol}${scaled.toLocaleString('en-US', { maximumFractionDigits: 2 })} Billion`
  }

  if (scaling === 'million' || (scaling === 'auto' && Math.abs(num) >= 1_000_000)) {
    const scaled = num / 1_000_000
    return `${symbol}${scaled.toLocaleString('en-US', { maximumFractionDigits: 1 })} Million`
  }

  return `${symbol}${formatNumber(num)}`
}

/**
 * Concise version for tables/charts if needed
 * Example: 1.6B, 243M
 */
export const formatCompact = (value: number | string | undefined | null): string => {
  if (value === undefined || value === null) return '0'
  const num = typeof value === 'string' ? parseFloat(value) : value
  if (isNaN(num)) return '0'
  
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(num)
}
