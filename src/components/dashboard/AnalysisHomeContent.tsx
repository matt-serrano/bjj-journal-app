"use client"

import { useMemo, useState } from "react"
import { Bot, CalendarDays, ChevronLeft, ChevronRight, ClipboardList, TrendingUp } from "lucide-react"

const analysisSlides = [
  {
    title: "AI Training Readiness",
    metric: "82%",
    detail: "Consistent sessions and steady recovery suggest a strong day for technical drilling.",
  },
  {
    title: "Journal Pattern Scan",
    metric: "4 notes",
    detail: "Guard retention and passing entries appear most often in this week's journal data.",
  },
  {
    title: "Weight Trend Signal",
    metric: "-1.2 lb",
    detail: "Seven-day movement is gradual, with no sharp fluctuation flagged in the log.",
  },
]

const journalEntryDays = new Set([2, 5, 9, 14, 18, 22, 27])

const journalEntries = [
  { day: 27, title: "Evening Open Mat", detail: "Light rounds, guard retention notes" },
  { day: 22, title: "No-Gi Class", detail: "Front headlock entries and escapes" },
  { day: 18, title: "Drilling Session", detail: "Passing chains from half guard" },
]

interface AnalysisHomeContentProps {
  todayIso: string
}

function getMonthDays(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const startOffset = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  return Array.from({ length: startOffset + daysInMonth }, (_, index) => {
    const day = index - startOffset + 1
    return day > 0 ? day : null
  })
}

export function AnalysisHomeContent({ todayIso }: AnalysisHomeContentProps) {
  const [activeSlide, setActiveSlide] = useState(0)
  const today = useMemo(() => new Date(todayIso), [todayIso])
  const monthDays = useMemo(() => getMonthDays(today), [today])
  const currentSlide = analysisSlides[activeSlide]
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(today)

  const goToPreviousSlide = () => {
    setActiveSlide((current) => (current === 0 ? analysisSlides.length - 1 : current - 1))
  }

  const goToNextSlide = () => {
    setActiveSlide((current) => (current === analysisSlides.length - 1 ? 0 : current + 1))
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12" aria-label="Analysis dashboard content">
      <div className="rounded-2xl bg-gray-900 p-4 sm:p-5 xl:col-span-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-pink-300">
              <Bot size={18} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-[var(--font-bebas)] text-2xl font-normal">AI And Data Analysis</h2>
              <p className="text-sm text-gray-400">Slide {activeSlide + 1} of {analysisSlides.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition-colors hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-gray-300 transition-colors hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-44 rounded-xl bg-gray-950/60 p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3 text-pink-300">
            <TrendingUp size={18} strokeWidth={1.6} />
            <span className="text-sm font-medium">{currentSlide.title}</span>
          </div>
          <div className="font-[var(--font-bebas)] text-4xl font-normal text-white">{currentSlide.metric}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-300">{currentSlide.detail}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900 p-4 sm:p-5 xl:col-span-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-green-300">
            <ClipboardList size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-[var(--font-bebas)] text-2xl font-normal">Today&apos;s Summary</h2>
            <p className="text-sm text-gray-400">{formattedDate}</p>
          </div>
        </div>

        <div className="space-y-3 text-sm leading-6 text-gray-300">
          <p>
            No journal entry has been written for today yet. Once an entry is saved, this panel can summarize the
            session focus, mood, notes, and follow-up actions.
          </p>
          <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-gray-950/60 p-3">
                <div className="text-xs uppercase text-gray-500">Entries</div>
                <div className="mt-2 font-[var(--font-bebas)] text-3xl text-white">0</div>
              </div>
              <div className="rounded-xl bg-gray-950/60 p-3">
              <div className="text-xs uppercase text-gray-500">Status</div>
              <div className="mt-2 font-[var(--font-bebas)] text-3xl text-white">Open</div>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-gray-900 p-4 sm:p-5 xl:col-span-12">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 text-blue-300">
              <CalendarDays size={18} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-[var(--font-bebas)] text-2xl font-normal">Journal Calendar</h2>
              <p className="text-sm text-gray-400">
                {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(today)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,500px)_1fr]">
            <div className="grid grid-cols-7 gap-2 text-center text-xs text-gray-500">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="py-1">
                  {day}
                </div>
              ))}
              {monthDays.map((day, index) => {
                const isToday = day === today.getDate()
                const hasEntry = day !== null && journalEntryDays.has(day)

                return (
                  <div
                    key={`${day || "empty"}-${index}`}
                    className={`relative flex h-10 items-center justify-center rounded-lg text-sm sm:h-11 ${
                      day ? "bg-gray-800 text-gray-300" : "bg-transparent"
                    } ${isToday ? "ring-2 ring-pink-300 text-white" : ""}`}
                  >
                    {day}
                    {hasEntry && <span className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-blue-300" />}
                  </div>
                )
              })}
            </div>

            <div className="space-y-3">
              {journalEntries.map((entry) => (
                <div key={entry.day} className="rounded-xl bg-gray-950/60 p-3">
                  <div className="mb-1 text-xs uppercase text-blue-300">April {entry.day}</div>
                  <div className="font-medium text-white">{entry.title}</div>
                  <div className="mt-1 text-sm text-gray-400">{entry.detail}</div>
                </div>
              ))}
              <div className="rounded-xl border border-dashed border-gray-700 p-3 text-sm text-gray-500">
                Days with blue dots contain journal entries.
              </div>
            </div>
          </div>
      </div>
    </section>
  )
}
