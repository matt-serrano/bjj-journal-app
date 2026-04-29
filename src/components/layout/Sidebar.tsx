"use client"

import { Activity, BookOpen, Bot, Scale, UserRound } from "lucide-react"
import { useEffect, useState } from "react"

const navItems = [
  { icon: Activity, label: "Analysis", targetId: "analysis" },
  { icon: BookOpen, label: "Journal", targetId: "journal" },
  { icon: Scale, label: "Weight Loss", targetId: "weight-loss" },
  { icon: Bot, label: "AI Agent", targetId: "ai-agent" },
]

export function Sidebar() {
  const [activeSection, setActiveSection] = useState(navItems[0].targetId)

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.targetId))
      .filter((section): section is HTMLElement => Boolean(section))

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id)
        }
      },
      {
        root: document.querySelector("[data-dashboard-scroll]"),
        threshold: [0.35, 0.55],
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (targetId: string) => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-dashboard-scroll]")
    const targetSection = document.getElementById(targetId)

    if (!scrollContainer || !targetSection) {
      return
    }

    const containerTop = scrollContainer.getBoundingClientRect().top
    const targetTop = targetSection.getBoundingClientRect().top
    const targetScrollTop = scrollContainer.scrollTop + targetTop - containerTop - 24

    scrollContainer.scrollTo({
      top: Math.max(targetScrollTop, 0),
      behavior: "smooth",
    })

    window.history.replaceState(null, "", `#${targetId}`)
    setActiveSection(targetId)
  }

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-[var(--app-sidebar)] flex flex-col items-center gap-5 pb-8 pt-5 overflow-y-auto scrollbar-hide">
      <div className="h-9 w-12 flex-shrink-0 overflow-hidden">
        <img src="/images/logo.png" alt="BJJ Journal" className="h-full w-full object-contain" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-6">
        <div className="flex flex-col items-center space-y-6">
          {navItems.map(({ icon: Icon, label, targetId }) => (
            <button
              key={label}
              type="button"
              onClick={() => scrollToSection(targetId)}
              aria-label={label}
              aria-current={activeSection === targetId ? "page" : undefined}
              className={`relative w-12 h-12 flex items-center justify-center rounded-xl transition-colors flex-shrink-0 ${
                activeSection === targetId
                  ? "text-white"
                  : "text-neutral-500 hover:text-white hover:bg-[var(--app-control-hover)]"
              }`}
              title={label}
            >
              <Icon size={20} strokeWidth={activeSection === targetId ? 2.6 : 1.5} />
              {activeSection === targetId && (
                <span className="absolute bottom-1.5 h-0.5 w-6 rounded-full bg-white" aria-hidden="true" />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="relative w-9 h-9 rounded-full bg-[var(--app-control)] text-neutral-400 flex-shrink-0 flex items-center justify-center">
        <UserRound size={18} strokeWidth={1.6} aria-label="User profile" />
      </div>
    </nav>
  )
}
