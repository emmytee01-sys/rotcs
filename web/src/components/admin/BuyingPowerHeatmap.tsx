import { Card, Typography } from 'antd'
import { TrendingUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    google: any;
  }
}

const { Title, Text } = Typography

// Mock data for buying power heatmap points - weights spread out for visible color differentiation
const buyingPowerData = [
  { lat: 6.5244, lng: 3.3792, weight: 0.6, spend: 450000000, territory: 'Lagos Island' }, // Medium (Blue)
  { lat: 6.6018, lng: 3.3515, weight: 0.2, spend: 180000000, territory: 'Ikeja' }, // Low (Cyan)
  { lat: 6.4281, lng: 3.4219, weight: 1.0, spend: 680000000, territory: 'Victoria Island' }, // High (Red)
  { lat: 6.4698, lng: 3.5852, weight: 0.5, spend: 380000000, territory: 'Lekki' }, // Medium (Blue)
  { lat: 6.4969, lng: 3.3841, weight: 0.15, spend: 150000000, territory: 'Surulere' }, // Low (Cyan)
  { lat: 6.5056, lng: 3.3784, weight: 0.9, spend: 620000000, territory: 'Yaba' }, // High (Red)
]

const BuyingPowerHeatmap = () => {
  const mapContainer = useRef<HTMLDivElement>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      setMapError('Google Maps API key not found. Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.')
      return
    }

    const initMap = async () => {
      try {
        if (!window.google) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script')
            script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=visualization&v=weekly`
            script.async = true
            script.defer = true

            script.onload = () => resolve()
            script.onerror = () => reject(new Error('Failed to load Google Maps script'))
            document.head.appendChild(script)
          })
        }

        if (!mapContainer.current || !window.google) return

        // Create the map
        const map = new window.google.maps.Map(mapContainer.current, {
          center: { lat: 6.5244, lng: 3.3792 }, // Lagos, Nigeria
          zoom: 11,
          mapTypeId: 'satellite',
          mapTypeControl: true,
          streetViewControl: false,
          fullscreenControl: true,
        })

        // Create heatmap layer
        const heatmapPoints = buyingPowerData.map(
          (point) => ({
            location: new window.google.maps.LatLng(point.lat, point.lng),
            weight: point.weight,
          })
        )

        new window.google.maps.visualization.HeatmapLayer({
          data: heatmapPoints,
          map: map,
          radius: 50,
          opacity: 0.6,
          gradient: [
            'rgba(0, 255, 255, 0)',      // Transparent cyan
            'rgba(0, 255, 255, 0.3)',    // Light cyan (low spending)
            'rgba(100, 200, 255, 0.5)',  // Light blue
            'rgba(0, 100, 255, 0.7)',    // Blue (medium spending)
            'rgba(100, 50, 200, 0.85)',  // Purple-blue
            'rgba(150, 0, 150, 0.9)',    // Purple
            'rgba(255, 0, 0, 1)'         // Red (high spending)
          ]
        })

        // Add markers for high-spending areas
        buyingPowerData.forEach((point) => {
          const marker = new window.google.maps.Marker({
            position: { lat: point.lat, lng: point.lng },
            map: map,
            title: point.territory,
          })

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; color: #000000; font-family: sans-serif;">
                <h3 style="margin: 0 0 8px 0; font-weight: bold; color: #000000; border-bottom: 1px solid #eee; padding-bottom: 4px;">${point.territory}</h3>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Total Spend:</strong> ₦${(point.spend / 1000000).toFixed(1)}M</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Spend Level:</strong> ${(point.weight * 100).toFixed(0)}%</p>
                <p style="margin: 4px 0; font-size: 13px;"><strong>Transactions:</strong> ${Math.floor(point.weight * 10000).toLocaleString()}</p>
              </div>
            `,
          })

          marker.addListener('click', () => {
            infoWindow.open(map, marker)
          })
        })
      } catch (error) {
        console.error('Error loading Google Maps:', error)
        setMapError('Failed to load Google Maps. Please check your API key and internet connection.')
      }
    }

    initMap()
  }, [])

  return (
    <Card className="mt-6">
      <Title level={4}>
        <TrendingUp className="inline mr-2" size={20} />
        Regional Spend Heatmap
      </Title>
      {mapError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center h-[300px] md:h-[500px] flex items-center justify-center">
          <div>
            <TrendingUp size={64} className="text-red-400 mx-auto mb-4" />
            <Text className="text-red-600 block mb-2">{mapError}</Text>
            <Text type="secondary" className="text-sm">
              Configuration required for full map access.
            </Text>
          </div>
        </div>
      ) : (
        <div
          ref={mapContainer}
          className="rounded-lg h-[300px] md:h-[500px] w-full"
        />
      )}
      <div className="mt-4 flex gap-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-600 rounded"></div>
          <Text className="text-xs">High Spending</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <Text className="text-xs">Medium Spending</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-cyan-400 rounded"></div>
          <Text className="text-xs">Low Spending</Text>
        </div>
      </div>
    </Card>
  )
}

export default BuyingPowerHeatmap
