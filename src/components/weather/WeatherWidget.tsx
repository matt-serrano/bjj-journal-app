import type { WeatherData } from "@/types"

interface WeatherWidgetProps {
  data: WeatherData
}

export function WeatherWidget({ data: _data }: WeatherWidgetProps) {
  return <div className="h-56 sm:h-64 bg-gray-900 rounded-xl sm:rounded-2xl" aria-label="Blank weather panel" />
}
