"use client"

import { useCallback, useEffect, useRef } from "react"
import Script from "next/script"

const PARTICLE_CONTAINER_ID = "particles-js"
const PARTICLE_CONFIG_PATH = "/vendor/particles/particles.json"

declare global {
  interface Window {
    particlesJS?: {
      load: (tagId: string, pathConfigJson: string, callback?: () => void) => void
    }
  }
}

export function ParticleBackground() {
  const retryTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const loadInProgressRef = useRef(false)

  const clearPendingRetry = useCallback(() => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current)
      retryTimeoutRef.current = null
    }
  }, [])

  const hasParticleCanvas = useCallback(() => {
    const container = document.getElementById(PARTICLE_CONTAINER_ID)
    const canvas = container?.querySelector("canvas")

    return Boolean(canvas?.isConnected)
  }, [])

  const loadParticles = useCallback(() => {
    if (typeof window === "undefined") {
      return
    }

    const container = document.getElementById(PARTICLE_CONTAINER_ID)

    if (!container || !window.particlesJS) {
      clearPendingRetry()
      retryTimeoutRef.current = setTimeout(loadParticles, 250)
      return
    }

    if (hasParticleCanvas() || loadInProgressRef.current) {
      return
    }

    loadInProgressRef.current = true
    window.particlesJS.load(PARTICLE_CONTAINER_ID, PARTICLE_CONFIG_PATH, () => {
      loadInProgressRef.current = false
    })

    window.setTimeout(() => {
      loadInProgressRef.current = false
    }, 2000)
  }, [clearPendingRetry, hasParticleCanvas])

  useEffect(() => {
    loadParticles()

    const restoreParticles = () => {
      if (!hasParticleCanvas()) {
        loadParticles()
      }
    }

    const restoreWhenVisible = () => {
      if (document.visibilityState === "visible") {
        restoreParticles()
      }
    }

    const observer = new MutationObserver(restoreParticles)
    const container = document.getElementById(PARTICLE_CONTAINER_ID)

    if (container) {
      observer.observe(container, { childList: true })
    }

    window.addEventListener("focus", restoreParticles)
    window.addEventListener("resize", restoreParticles)
    document.addEventListener("visibilitychange", restoreWhenVisible)

    const guardInterval = window.setInterval(restoreParticles, 5000)

    return () => {
      clearPendingRetry()
      observer.disconnect()
      window.removeEventListener("focus", restoreParticles)
      window.removeEventListener("resize", restoreParticles)
      document.removeEventListener("visibilitychange", restoreWhenVisible)
      window.clearInterval(guardInterval)
    }
  }, [clearPendingRetry, hasParticleCanvas, loadParticles])

  return (
    <>
      <div
        id={PARTICLE_CONTAINER_ID}
        className="pointer-events-none fixed inset-0 z-0 min-h-screen opacity-60"
        aria-hidden="true"
      />
      <Script
        id="particles-js-script"
        src="/vendor/particles/particles.min.js"
        strategy="afterInteractive"
        onLoad={loadParticles}
        onReady={loadParticles}
      />
    </>
  )
}
