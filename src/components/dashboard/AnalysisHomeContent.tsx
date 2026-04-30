"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  Bot,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Mic,
  Paperclip,
  PenLine,
  Plus,
  Scale,
  Send,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react"

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

const weightStats = [
  { label: "Current Weight", value: "184.6 lb", detail: "Updated from the latest weekly check-in." },
  { label: "Monthly Change", value: "-3.2 lb", detail: "Steady trend with no sharp fluctuation flagged." },
  { label: "Goal Pace", value: "On Track", detail: "Projected progress aligns with the current target window." },
]

const aiAgentCards = [
  "Summarize recent journal patterns",
  "Build a guard retention drilling plan",
  "Connect weight trend with training load",
]

const initialChatThreads = [
  {
    id: "open-mat-recap",
    title: "Open mat recap",
    detail: "Guard retention notes",
    showSuggestions: true,
    messages: [
      {
        role: "assistant",
        content: "I can help turn recent journal notes, readiness, and weight trends into a focused training plan.",
      },
      { role: "user", content: "What should I focus on for my next session?" },
      {
        role: "assistant",
        content:
          "Prioritize guard retention reactions, then finish with moderate rounds. Keep recovery work light because your readiness is strong, but the weight trend suggests staying consistent rather than chasing volume.",
      },
    ],
  },
  {
    id: "weight-check-in",
    title: "Weight check-in",
    detail: "Trend and recovery plan",
    showSuggestions: true,
    messages: [
      {
        role: "assistant",
        content:
          "Your recent weight trend is gradual. Keep the next session technical, hydrate well, and avoid turning every round into a conditioning test.",
      },
    ],
  },
  {
    id: "half-guard-passing",
    title: "Half guard passing",
    detail: "Drill sequence ideas",
    showSuggestions: true,
    messages: [
      {
        role: "assistant",
        content:
          "Start with knee shield clearing, move into cross-face pressure, then finish with three reps each of knee cut and backstep options.",
      },
    ],
  },
  {
    id: "competition-prep",
    title: "Competition prep",
    detail: "Taper week priorities",
    showSuggestions: true,
    messages: [
      {
        role: "assistant",
        content:
          "This week should sharpen timing, not chase exhaustion. Keep rounds specific, review first grips, and protect sleep.",
      },
    ],
  },
]

const sectionViewportClass =
  "h-[calc(100svh-1.5rem)] snap-center scroll-mt-0 overflow-y-auto scrollbar-hide sm:h-[calc(100svh-2rem)] md:h-[calc(100svh-3rem)] lg:h-[calc(100svh-4rem)]"

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
  const [chatThreads, setChatThreads] = useState(initialChatThreads)
  const [activeThreadId, setActiveThreadId] = useState(initialChatThreads[0].id)
  const [chatInput, setChatInput] = useState("")
  const [attachedFileName, setAttachedFileName] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [typingThreadIds, setTypingThreadIds] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const chatInputRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const replyTimeoutsRef = useRef<number[]>([])
  const speechRecognitionRef = useRef<any>(null)
  const today = useMemo(() => new Date(todayIso), [todayIso])
  const monthDays = useMemo(() => getMonthDays(today), [today])
  const currentSlide = analysisSlides[activeSlide]
  const activeThread = chatThreads.find((thread) => thread.id === activeThreadId) || chatThreads[0]
  const isActiveThreadTyping = typingThreadIds.includes(activeThread.id)
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

  useEffect(() => {
    return () => {
      replyTimeoutsRef.current.forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  useEffect(() => {
    const messagesContainer = messagesContainerRef.current

    if (!messagesContainer) {
      return
    }

    messagesContainer.scrollTo({
      top: messagesContainer.scrollHeight,
      behavior: "smooth",
    })
  }, [activeThread.messages.length, activeThreadId, isActiveThreadTyping])

  const goToJournalSection = () => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-dashboard-scroll]")
    const journalSection = document.getElementById("journal")

    if (!scrollContainer || !journalSection) {
      return
    }

    const containerRect = scrollContainer.getBoundingClientRect()
    const journalRect = journalSection.getBoundingClientRect()
    const targetScrollTop =
      scrollContainer.scrollTop +
      journalRect.top -
      containerRect.top -
      (scrollContainer.clientHeight - journalSection.offsetHeight) / 2

    scrollContainer.scrollTo({
      top: Math.max(targetScrollTop, 0),
      behavior: "smooth",
    })

    window.history.replaceState(null, "", "#journal")
  }

  const getAgentReply = (prompt: string) => {
    const normalizedPrompt = prompt.toLowerCase()

    if (normalizedPrompt.includes("weight")) {
      return "Your weight trend looks steady. Pair a technical session with moderate rounds, then log hydration, mood, and recovery so the next recommendation has better context."
    }

    if (normalizedPrompt.includes("guard")) {
      return "Make guard retention the main block: five minutes on hip frames, five on knee shield recovery, then three positional rounds starting from almost-passed positions."
    }

    if (normalizedPrompt.includes("journal") || normalizedPrompt.includes("summarize")) {
      return "Your recent notes point toward guard retention and half guard passing. The next useful journal entry should capture what broke first under pressure."
    }

    return "I would keep the next session focused and measurable: one technical theme, two constraints for sparring, and one short journal note right after training."
  }

  const sendMessage = (message = chatInput) => {
    const trimmedMessage = message.trim()

    if ((!trimmedMessage && !attachedFileName) || isActiveThreadTyping) {
      return
    }

    const threadId = activeThreadId
    const content = attachedFileName ? `${trimmedMessage || "Review this file"}\nAttached: ${attachedFileName}` : trimmedMessage
    const reply = getAgentReply(content)

    setChatThreads((currentThreads) =>
      currentThreads.map((thread) =>
        thread.id === threadId
          ? {
              ...thread,
              title: thread.title === "New chat" ? content.split("\n")[0].slice(0, 34) || "New chat" : thread.title,
              detail: "Thinking...",
              showSuggestions: false,
              messages: [
                ...thread.messages,
                { role: "user", content },
              ],
            }
          : thread,
      ),
    )
    setTypingThreadIds((currentThreadIds) =>
      currentThreadIds.includes(threadId) ? currentThreadIds : [...currentThreadIds, threadId],
    )

    setChatInput("")
    setAttachedFileName("")
    setIsListening(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }

    const replyTimeoutId = window.setTimeout(() => {
      setChatThreads((currentThreads) =>
        currentThreads.map((thread) =>
          thread.id === threadId
            ? {
                ...thread,
                detail: "Updated just now",
                messages: [...thread.messages, { role: "assistant", content: reply }],
              }
            : thread,
        ),
      )
      setTypingThreadIds((currentThreadIds) => currentThreadIds.filter((currentThreadId) => currentThreadId !== threadId))
    }, 850)

    replyTimeoutsRef.current.push(replyTimeoutId)
  }

  const startNewChat = () => {
    const id = `new-chat-${Date.now()}`

    setChatThreads((currentThreads) => [
      {
        id,
        title: "New chat",
        detail: "Ready for a prompt",
        showSuggestions: true,
        messages: [
          {
            role: "assistant",
            content: "Start with a training question, journal note, or weight trend and I will help shape it into a plan.",
          },
        ],
      },
      ...currentThreads,
    ])
    setActiveThreadId(id)
    setChatInput("")
    setAttachedFileName("")
    setIsListening(false)
    window.requestAnimationFrame(() => chatInputRef.current?.focus())
  }

  const selectChatThread = (threadId: string) => {
    setActiveThreadId(threadId)
    setChatInput("")
    setAttachedFileName("")
    setIsListening(false)

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const toggleVoicePrompt = () => {
    if (isListening) {
      speechRecognitionRef.current?.stop?.()
      setIsListening(false)
      return
    }

    const SpeechRecognition =
      typeof window !== "undefined" && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)

    if (!SpeechRecognition) {
      setChatInput((current) => current || "Voice note: ")
      setIsListening((current) => !current)
      return
    }

    const recognition = new SpeechRecognition()
    speechRecognitionRef.current = recognition
    recognition.continuous = false
    recognition.interimResults = false
    recognition.lang = "en-US"
    recognition.onresult = (event: any) => {
      const transcript = event.results?.[0]?.[0]?.transcript

      if (transcript) {
        setChatInput((current) => `${current}${current ? " " : ""}${transcript}`)
      }
    }
    recognition.onend = () => setIsListening(false)
    recognition.onerror = () => setIsListening(false)
    recognition.start()
    setIsListening(true)
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <section
        id="analysis"
        className={`${sectionViewportClass} grid grid-cols-1 gap-4 sm:gap-5 xl:grid-cols-12 xl:grid-rows-[auto_1fr]`}
        aria-label="Analysis dashboard content"
      >
        <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-7">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
              <Bot size={18} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-title text-2xl">Analysis</h2>
              <p className="font-subtitle text-sm text-neutral-400">Slide {activeSlide + 1} of {analysisSlides.length}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-300 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next analysis slide"
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-300 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="min-h-44 rounded-xl bg-[var(--app-panel-soft)] p-4 sm:p-5">
          <div className="mb-3 flex items-center gap-3 text-neutral-300">
            <TrendingUp size={18} strokeWidth={1.6} />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">{currentSlide.title}</span>
          </div>
          <div className="font-title text-4xl text-white">{currentSlide.metric}</div>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-300">{currentSlide.detail}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
            <ClipboardList size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-title text-2xl">Today&apos;s Summary</h2>
            <p className="font-subtitle text-sm text-neutral-400">{formattedDate}</p>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-black/35 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
          <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Today&apos;s Entry</div>
          <p className="text-sm leading-6 text-neutral-300">
            No journal entry has been written for today yet. Once an entry is saved, this panel can summarize the
            session focus, mood, notes, and follow-up actions.
          </p>
          <button
            type="button"
            onClick={goToJournalSection}
            className="mt-4 inline-flex h-9 items-center gap-2 rounded-xl bg-[var(--app-control)] px-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
          >
            <PenLine size={16} strokeWidth={1.7} />
            <span>Write Journal</span>
          </button>
        </div>
      </div>

      <div className="flex min-h-0 flex-col rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5 xl:col-span-12">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
            <Sparkles size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-title text-2xl">Next Focus</h2>
            <p className="font-subtitle text-sm text-neutral-400">Suggested priority from today&apos;s dashboard signals</p>
          </div>
        </div>

        <div className="grid flex-1 gap-3 md:grid-cols-3">
          <div className="flex min-h-36 flex-col justify-center rounded-xl bg-[var(--app-panel-soft)] p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Technique</div>
            <p className="text-sm leading-6 text-neutral-300">Spend the first block on guard retention reactions.</p>
          </div>
          <div className="flex min-h-36 flex-col justify-center rounded-xl bg-[var(--app-panel-soft)] p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Recovery</div>
            <p className="text-sm leading-6 text-neutral-300">Keep the session moderate and leave room for mobility work.</p>
          </div>
          <div className="flex min-h-36 flex-col justify-center rounded-xl bg-[var(--app-panel-soft)] p-4">
            <div className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Journal Prompt</div>
            <p className="text-sm leading-6 text-neutral-300">Note one position that felt sharper and one that needs reps.</p>
          </div>
        </div>
      </div>
      </section>

      <section
        id="journal"
        className={`${sectionViewportClass} rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5`}
        aria-label="Journal logs"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
            <CalendarDays size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-title text-2xl">Journal Logs</h2>
            <p className="font-subtitle text-sm text-neutral-400">
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
                <div className="font-title text-base text-white">{entry.title}</div>
                <div className="mt-1 text-sm text-neutral-400">{entry.detail}</div>
              </div>
            ))}
          </div>
        </div>

      </section>

      <section
        id="weight-loss"
        className={`${sectionViewportClass} rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5`}
        aria-label="Weight loss dashboard"
      >
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
            <Scale size={18} strokeWidth={1.6} />
          </div>
          <div>
            <h2 className="font-title text-2xl">Weight Loss</h2>
            <p className="font-subtitle text-sm text-neutral-400">Progress, pace, and next checkpoint</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {weightStats.map((stat) => (
            <div key={stat.label} className="min-h-40 rounded-xl bg-[var(--app-panel-soft)] p-4">
              <div className="mb-3 flex items-center gap-2 text-neutral-400">
                <Target size={16} strokeWidth={1.6} />
                <span className="text-xs font-medium uppercase tracking-[0.18em]">{stat.label}</span>
              </div>
              <div className="font-title text-4xl leading-none text-white">{stat.value}</div>
              <p className="mt-3 text-sm leading-6 text-neutral-400">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="ai-agent"
        className={`${sectionViewportClass} flex flex-col rounded-2xl bg-[var(--app-panel)] p-4 sm:p-5`}
        aria-label="AI agent dashboard"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
              <Bot size={18} strokeWidth={1.6} />
            </div>
            <div>
              <h2 className="font-title text-2xl">AI Agent</h2>
              <p className="text-sm text-neutral-400">Training assistant and journal companion</p>
            </div>
          </div>
          <button
            type="button"
            onClick={startNewChat}
            className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-xl bg-[var(--app-control)] px-3 text-sm font-medium text-neutral-200 transition-colors hover:bg-[var(--app-control-hover)] hover:text-white"
          >
            <Plus size={16} strokeWidth={1.8} />
            <span>New Chat</span>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="flex min-h-0 flex-col overflow-hidden rounded-2xl bg-black/35 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center text-neutral-300">
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Training Chat</span>
              </div>
            </div>

            <div ref={messagesContainerRef} className="flex-1 space-y-4 overflow-y-auto p-4 scrollbar-hide">
              {activeThread.messages.map((message, index) =>
                message.role === "user" ? (
                  <div key={`${activeThread.id}-${index}`} className="flex justify-end animate-chat-in">
                    <div className="max-w-[78%] whitespace-pre-line rounded-2xl rounded-tr-md bg-neutral-200 px-4 py-3 text-sm leading-6 text-neutral-950">
                      {message.content}
                    </div>
                  </div>
                ) : (
                  <div key={`${activeThread.id}-${index}`} className="flex gap-3 animate-chat-in">
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
                      <Bot size={16} strokeWidth={1.6} />
                    </div>
                    <div className="max-w-[78%] whitespace-pre-line rounded-2xl rounded-tl-md bg-[var(--app-panel-soft)] px-4 py-3 text-sm leading-6 text-neutral-300">
                      {message.content}
                    </div>
                  </div>
                ),
              )}
              {isActiveThreadTyping && (
                <div className="flex gap-3 animate-chat-in" aria-label="Assistant is typing">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--app-control)] text-neutral-200">
                    <Bot size={16} strokeWidth={1.6} />
                  </div>
                  <div className="flex h-11 items-center gap-1.5 rounded-2xl rounded-tl-md bg-[var(--app-panel-soft)] px-4">
                    <span className="typing-dot" />
                    <span className="typing-dot [animation-delay:120ms]" />
                    <span className="typing-dot [animation-delay:240ms]" />
                  </div>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 p-3 sm:p-4">
              {activeThread.showSuggestions && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {aiAgentCards.map((prompt) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => sendMessage(prompt)}
                      disabled={isActiveThreadTyping}
                      className="cursor-pointer rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-neutral-300 transition-colors hover:bg-white/[0.08] hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              <form
                className="flex min-h-12 items-end gap-2 rounded-2xl border border-white/10 bg-[var(--app-panel-soft)] p-2"
                onSubmit={(event) => {
                  event.preventDefault()
                  sendMessage()
                }}
              >
                <input
                  id="ai-chat-file-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(event) => setAttachedFileName(event.target.files?.[0]?.name || "")}
                />
                <label
                  htmlFor="ai-chat-file-upload"
                  aria-label="Attach context"
                  className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl text-neutral-400 transition-colors hover:bg-[var(--app-control)] hover:text-white"
                >
                  <Paperclip size={18} strokeWidth={1.7} />
                </label>
                <div className="flex flex-1 flex-col">
                  {attachedFileName && (
                    <span className="px-1 pt-1 text-xs text-neutral-500">Attached: {attachedFileName}</span>
                  )}
                  <textarea
                    ref={chatInputRef}
                    rows={1}
                    value={chatInput}
                    onChange={(event) => setChatInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault()
                        sendMessage()
                      }
                    }}
                    placeholder={isListening ? "Listening... type or tap mic to stop" : "Ask about training, journal notes, or weight trends"}
                    className="max-h-24 min-h-9 resize-none bg-transparent px-1 py-2 text-sm leading-5 text-neutral-200 outline-none placeholder:text-neutral-500"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Voice prompt"
                  onClick={toggleVoicePrompt}
                  className={`hidden h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl transition-colors sm:flex ${
                    isListening
                      ? "bg-neutral-200 text-neutral-950"
                      : "text-neutral-400 hover:bg-[var(--app-control)] hover:text-white"
                  }`}
                >
                  <Mic size={18} strokeWidth={1.7} />
                </button>
                <button
                  type="submit"
                  aria-label="Send prompt"
                  disabled={isActiveThreadTyping || (!chatInput.trim() && !attachedFileName)}
                  className="flex h-9 w-9 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-neutral-200 text-neutral-950 transition-colors hover:bg-white disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-500"
                >
                  <Send size={17} strokeWidth={1.8} />
                </button>
              </form>
            </div>
          </div>

          <aside className="flex min-h-0 flex-col overflow-hidden rounded-2xl bg-[var(--app-panel-soft)]">
            <div className="border-b border-white/10 px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-neutral-500">Recent Chats</p>
            </div>

            <div className="grid min-h-0 gap-2 overflow-y-auto p-4 pr-2 scrollbar-thin">
              {chatThreads.map((thread) => (
                <button
                  key={thread.id}
                  type="button"
                  onClick={() => selectChatThread(thread.id)}
                  className={`cursor-pointer rounded-xl px-3 py-3 text-left transition-colors ${
                    thread.id === activeThreadId
                      ? "bg-neutral-200 text-neutral-950"
                      : "bg-black/35 text-neutral-300 hover:bg-black/50 hover:text-white"
                  }`}
                >
                  <span className="block text-sm font-medium">{thread.title}</span>
                  <span className={`mt-1 block text-xs ${thread.id === activeThreadId ? "text-neutral-600" : "text-neutral-500"}`}>
                    {thread.detail}
                  </span>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
