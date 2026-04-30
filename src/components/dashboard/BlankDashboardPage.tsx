import { Sidebar } from "@/src/components/layout/Sidebar"
import { EnergyPanel } from "@/src/components/energy/EnergyPanel"
import { WeatherWidget } from "@/src/components/weather/WeatherWidget"
import type { ReactNode } from "react"

const weatherData = {
  temperature: 16,
  windSpeed: 30,
  windSpeedChange: 6,
  pressure: 720,
  pressureChange: -20,
  rainChance: 60,
}

interface BlankDashboardPageProps {
  title: string
  children?: ReactNode
  showSidePanels?: boolean
}

const beltColorClasses = {
  white: "bg-white",
  blue: "bg-blue-600",
  purple: "bg-purple-700",
  brown: "bg-amber-900",
  black: "bg-neutral-950",
}

type BeltColor = keyof typeof beltColorClasses

function BeltIcon({ color }: { color: BeltColor }) {
  return (
    <span
      className="relative inline-flex h-5 w-28 items-center overflow-hidden rounded-sm border border-white/20 bg-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] sm:h-6 sm:w-36"
      aria-label={`${color} belt`}
      title={`${color} belt`}
    >
      <span className={`h-full flex-[4] rounded-l-sm ${beltColorClasses[color]}`} />
      {/* TODO: Render up to four stripe markers here from the user's saved stripe count when profile logic is added. */}
      <span className="h-full flex-[2.4] border-l border-r border-white/20 bg-black" />
      <span className={`h-full flex-[1] rounded-r-sm ${beltColorClasses[color]}`} />
    </span>
  )
}

function BlankContent({ title }: { title: string }) {
  return (
    <section className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12" aria-label={`${title} blank content`}>
      <div className="min-h-64 rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-7">
        <div className="h-full min-h-44 rounded-xl bg-[var(--app-panel-soft)]" />
      </div>
      <div className="min-h-64 rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-5">
        <div className="h-full min-h-44 rounded-xl bg-[var(--app-panel-soft)]" />
      </div>
      <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-12">
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,500px)_1fr]">
          <div className="h-80 rounded-xl bg-[var(--app-panel-soft)]" />
          <div className="space-y-3">
            <div className="h-20 rounded-xl bg-[var(--app-panel-soft)]" />
            <div className="h-20 rounded-xl bg-[var(--app-panel-soft)]" />
            <div className="h-20 rounded-xl bg-[var(--app-panel-soft)]" />
            <div className="h-16 rounded-xl border border-dashed border-[var(--app-border)]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export function BlankDashboardPage({ title, children, showSidePanels = true }: BlankDashboardPageProps) {
  // TODO: Replace this hard-coded value with the authenticated user's saved belt colour.
  // Keep the value constrained to BeltColor so future profile logic can only pass supported belt states.
  const userBeltColor: BeltColor = "blue"

  return (
    <div className="relative z-10 h-screen bg-transparent text-white flex overflow-hidden">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main
        data-dashboard-scroll
        className="flex-1 h-screen p-3 sm:p-4 md:p-6 lg:p-8 lg:ml-20 overflow-y-auto scrollbar-hide scroll-smooth"
      >
        <div className={`${showSidePanels ? "max-w-7xl mx-auto" : "max-w-6xl mx-auto"} space-y-4 sm:space-y-6`}>
          <div className="flex flex-col xl:grid xl:grid-cols-12 xl:gap-8">
            {showSidePanels && (
              <div className="xl:col-span-3 space-y-4 md:space-y-6 xl:space-y-8 xl:h-[calc(100vh-4rem)]">
                <WeatherWidget data={weatherData} />
                <div className="flex-grow">
                  <EnergyPanel />
                </div>
              </div>
            )}

            <div className={`${showSidePanels ? "xl:col-span-9" : "xl:col-span-12"} space-y-4 sm:space-y-6 md:space-y-8`}>
              <div className="flex items-center justify-between gap-4 mt-6 xl:mt-0">
                <div className="flex flex-wrap items-center gap-3 lg:flex-shrink-0">
                  <h1 className="font-title text-3xl sm:text-4xl">{title}</h1>
                  {/* TODO: Re-enable with <BeltIcon color={userBeltColor} /> once belt display is part of the profile UI. */}
                </div>
              </div>

              {children || <BlankContent title={title} />}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
