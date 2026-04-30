"use client"

import { Activity, BookOpen, Bot, Scale, UserRound } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const navItems = [
  { icon: Activity, label: "Analysis", targetId: "analysis" },
  { icon: BookOpen, label: "Journal", targetId: "journal" },
  { icon: Scale, label: "Weight Loss", targetId: "weight-loss" },
  { icon: Bot, label: "AI Agent", targetId: "ai-agent" },
]

function getSectionScrollTop(scrollContainer: HTMLElement, targetSection: HTMLElement) {
  const containerRect = scrollContainer.getBoundingClientRect()
  const targetRect = targetSection.getBoundingClientRect()

  return (
    scrollContainer.scrollTop +
    targetRect.top -
    containerRect.top -
    (scrollContainer.clientHeight - targetSection.offsetHeight) / 2
  )
}

function canScrollLocally(target: EventTarget | null, deltaY: number) {
  if (!(target instanceof Element)) {
    return false
  }

  if (target.closest("input, textarea, select, [contenteditable='true']")) {
    return true
  }

  const localScrollContainer = target.closest<HTMLElement>("[data-local-scroll]")

  if (!localScrollContainer) {
    return false
  }

  const canScrollUp = localScrollContainer.scrollTop > 0
  const canScrollDown =
    localScrollContainer.scrollTop + localScrollContainer.clientHeight < localScrollContainer.scrollHeight - 1

  return deltaY > 0 ? canScrollDown : canScrollUp
}

export function Sidebar() {
  const [activeSection, setActiveSection] = useState(navItems[0].targetId)
  const activeSectionRef = useRef(navItems[0].targetId)
  const lockedSectionRef = useRef<string | null>(null)
  const lockReleaseTimeoutRef = useRef<number | null>(null)
  const wheelLockedRef = useRef(false)

  const setCurrentSection = (targetId: string) => {
    activeSectionRef.current = targetId
    setActiveSection(targetId)
  }

  const lockCurrentSection = (targetId: string) => {
    lockedSectionRef.current = targetId

    if (lockReleaseTimeoutRef.current !== null) {
      window.clearTimeout(lockReleaseTimeoutRef.current)
    }

    lockReleaseTimeoutRef.current = window.setTimeout(() => {
      lockedSectionRef.current = null
      wheelLockedRef.current = false
    }, 700)
  }

  useEffect(() => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-dashboard-scroll]")

    if (!scrollContainer) {
      return
    }

    let frameId: number | null = null

    const updateActiveSection = () => {
      frameId = null

      if (lockedSectionRef.current) {
        setCurrentSection(lockedSectionRef.current)
        return
      }

      const containerRect = scrollContainer.getBoundingClientRect()
      const visibleSection = navItems
        .map((item) => {
          const section = document.getElementById(item.targetId)

          if (!section) {
            return null
          }

          const sectionRect = section.getBoundingClientRect()
          const visibleTop = Math.max(sectionRect.top, containerRect.top)
          const visibleBottom = Math.min(sectionRect.bottom, containerRect.bottom)

          return {
            targetId: item.targetId,
            visibleHeight: Math.max(0, visibleBottom - visibleTop),
          }
        })
        .filter((section): section is { targetId: string; visibleHeight: number } => Boolean(section))
        .sort((a, b) => b.visibleHeight - a.visibleHeight)[0]

      if (visibleSection?.visibleHeight) {
        setCurrentSection(visibleSection.targetId)
      }
    }

    const requestActiveSectionUpdate = () => {
      if (frameId !== null) {
        return
      }

      frameId = window.requestAnimationFrame(updateActiveSection)
    }

    const scrollToSectionByIndex = (targetIndex: number) => {
      const targetItem = navItems[targetIndex]
      const targetSection = document.getElementById(targetItem.targetId)

      if (!targetSection) {
        return false
      }

      lockCurrentSection(targetItem.targetId)
      setCurrentSection(targetItem.targetId)
      window.history.replaceState(null, "", `#${targetItem.targetId}`)
      scrollContainer.scrollTo({
        top: Math.max(getSectionScrollTop(scrollContainer, targetSection), 0),
        behavior: "smooth",
      })

      return true
    }

    const handleWheel = (event: WheelEvent) => {
      if (canScrollLocally(event.target, event.deltaY) || Math.abs(event.deltaY) < 8) {
        return
      }

      event.preventDefault()

      if (wheelLockedRef.current) {
        return
      }

      const currentIndex = Math.max(
        navItems.findIndex((item) => item.targetId === activeSectionRef.current),
        0,
      )
      const nextIndex = Math.min(
        Math.max(currentIndex + (event.deltaY > 0 ? 1 : -1), 0),
        navItems.length - 1,
      )

      if (nextIndex === currentIndex) {
        return
      }

      wheelLockedRef.current = true

      if (!scrollToSectionByIndex(nextIndex)) {
        wheelLockedRef.current = false
      }
    }

    updateActiveSection()
    scrollContainer.addEventListener("scroll", requestActiveSectionUpdate, { passive: true })
    scrollContainer.addEventListener("wheel", handleWheel, { passive: false })
    document.addEventListener("scroll", requestActiveSectionUpdate, true)
    window.addEventListener("resize", requestActiveSectionUpdate)
    window.addEventListener("hashchange", requestActiveSectionUpdate)
    const syncIntervalId = window.setInterval(requestActiveSectionUpdate, 250)

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId)
      }

      if (lockReleaseTimeoutRef.current !== null) {
        window.clearTimeout(lockReleaseTimeoutRef.current)
      }

      window.clearInterval(syncIntervalId)
      scrollContainer.removeEventListener("scroll", requestActiveSectionUpdate)
      scrollContainer.removeEventListener("wheel", handleWheel)
      document.removeEventListener("scroll", requestActiveSectionUpdate, true)
      window.removeEventListener("resize", requestActiveSectionUpdate)
      window.removeEventListener("hashchange", requestActiveSectionUpdate)
    }
  }, [])

  const scrollToSection = (targetId: string) => {
    const scrollContainer = document.querySelector<HTMLElement>("[data-dashboard-scroll]")
    const targetSection = document.getElementById(targetId)

    if (!scrollContainer || !targetSection) {
      return false
    }

    lockCurrentSection(targetId)
    scrollContainer.scrollTo({
      top: Math.max(getSectionScrollTop(scrollContainer, targetSection), 0),
      behavior: "smooth",
    })

    window.history.replaceState(null, "", `#${targetId}`)
    setCurrentSection(targetId)
    return true
  }

  return (
    <nav className="fixed left-0 top-0 z-50 h-screen w-20 bg-[var(--app-sidebar)] flex flex-col items-center gap-5 pb-8 pt-5 overflow-y-auto scrollbar-hide">
      <div className="h-9 w-12 flex-shrink-0 overflow-hidden">
        <img src="/images/logo.png" alt="BJJ Journal" className="h-full w-full object-contain" />
      </div>

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center space-y-6">
        <div className="flex flex-col items-center space-y-6">
          {navItems.map(({ icon: Icon, label, targetId }) => (
            <a
              key={label}
              href={`#${targetId}`}
              onClick={(event) => {
                if (scrollToSection(targetId)) {
                  event.preventDefault()
                }
              }}
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
            </a>
          ))}
        </div>
      </div>

      <div className="relative w-9 h-9 rounded-full bg-[var(--app-control)] text-neutral-400 flex-shrink-0 flex items-center justify-center">
        <UserRound size={18} strokeWidth={1.6} aria-label="User profile" />
      </div>
    </nav>
  )
}
