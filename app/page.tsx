import { Sidebar } from "@/src/components/layout/Sidebar"
import { WeatherWidget } from "@/src/components/weather/WeatherWidget"
import { EnergyPanel } from "@/src/components/energy/EnergyPanel"

const weatherData = {
  temperature: 16,
  windSpeed: 30,
  windSpeedChange: 6,
  pressure: 720,
  pressureChange: -20,
  rainChance: 60,
}

export default function Page() {
  return (
    <div className="h-screen bg-gray-950 text-white flex overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 h-screen p-3 sm:p-4 md:p-6 lg:p-8 lg:ml-20 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6 md:space-y-8">
          <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-8">
            {/* Left Column - Weather and Energy */}
            <div className="xl:col-span-3 space-y-4 md:space-y-6 xl:space-y-8 xl:h-[calc(100vh-4rem)]">
              <WeatherWidget data={weatherData} />
              <div className="flex-grow">
                <EnergyPanel />
              </div>
            </div>

            {/* Main Content */}
            <div className="xl:col-span-9 space-y-4 sm:space-y-6 md:space-y-8">
              <div className="flex items-center justify-between gap-4 mt-6 xl:mt-0">
                <h1 className="text-2xl sm:text-3xl font-bold lg:flex-shrink-0">Hi Ann!</h1>
              </div>

              <section className="space-y-4 sm:space-y-6 md:space-y-8" aria-label="Blank dashboard content">
                <div className="h-56 sm:h-64 md:h-72 lg:h-80 xl:h-96 rounded-2xl sm:rounded-3xl bg-gray-900" />
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                  <div className="aspect-square rounded-2xl bg-gray-900" />
                  <div className="aspect-square rounded-2xl bg-gray-900" />
                  <div className="aspect-square rounded-2xl bg-gray-900" />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
