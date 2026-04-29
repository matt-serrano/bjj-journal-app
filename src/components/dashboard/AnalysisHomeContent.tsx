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
      <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-control)] text-neutral-200">
              <Bot size={18} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-[var(--font-bebas)] text-2xl font-normal">Analysis</h2>
              <p className="text-sm text-neutral-400">Slide {activeSlide + 1} of {analysisSlides.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-control)] text-neutral-300 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-control)] text-neutral-300 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-44 rounded-xl bg-[var(--app-panel-soft)] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3 text-neutral-300">
            <TrendingUp size={18} strokeWidth={1.6} />
            <span className="text-sm font-medium">{currentSlide.title}</span>
          </div>
          <div className="font-[var(--font-bebas)] text-4xl font-normal text-white">{currentSlide.metric}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">{currentSlide.detail}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-control)] text-neutral-200">
            <ClipboardList size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-[var(--font-bebas)] text-2xl font-normal">Today&apos;s Summary</h2>
            <p className="text-sm text-neutral-400">{formattedDate}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Today&apos;s Entry</div>
          <p className="text-sm leading-6 text-neutral-300">
            No journal entry has been written for today yet. Once an entry is saved, this panel can summarize the
            session focus, mood, notes, and follow-up actions.
          </p>
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--app-control)] text-neutral-200">
            <CalendarDays size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-[var(--font-bebas)] text-2xl font-normal">Journal Logs</h2>
            <p className="text-sm text-neutral-400">
              {new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(today)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,520px)_1fr]">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_36%,rgba(0,0,0,0.14)_100%)] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:p-4">
            <div className="grid grid-cols-7 gap-1.5 text-center text-xs font-medium uppercase tracking-[0.14em] text-neutral-500 sm:gap-2 sm:tracking-[0.18em]">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <div key={`${day}-${index}`} className="py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="mt-2 grid grid-cols-7 gap-1.5 text-center sm:gap-2">
              {monthDays.map((day, index) => {
                const isToday = day === today.getDate()
                const hasEntry = day !== null && journalEntryDays.has(day)

                return (
                  <div
                    key={`${day || "empty"}-${index}`}
                    className={`relative flex aspect-square min-h-9 items-center justify-center rounded-lg text-sm transition-colors sm:rounded-xl ${
                      day
                        ? "border border-white/5 bg-white/[0.045] text-neutral-300 hover:border-white/15 hover:bg-white/[0.075] hover:text-white"
                        : "bg-transparent"
                    } ${
                      isToday
                        ? "border-neutral-200/80 bg-white/[0.13] text-white shadow-[0_0_24px_rgba(255,255,255,0.12)] ring-1 ring-white/40"
                        : ""
                    }`}
                  >
                    <span className={isToday ? "font-semibold" : ""}>{day}</span>
                    {hasEntry && (
                      <span className="absolute bottom-1.5 h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.65)]" />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1 xl:grid-rows-3">
            {journalEntries.map((entry) => (
              <div key={entry.day} className="flex min-h-28 flex-col justify-center rounded-xl bg-[var(--app-panel-soft)] p-4">
                <div className="mb-1 text-xs uppercase text-neutral-400">April {entry.day}</div>
                <div className="font-medium text-white">{entry.title}</div>
                <div className="mt-1 text-sm text-neutral-400">{entry.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
