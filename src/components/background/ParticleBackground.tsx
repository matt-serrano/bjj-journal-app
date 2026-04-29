"use client"

import Script from "next/script"

declare global {
  interface Window {
    particlesJS?: {
      load: (tagId: string, pathConfigJson: string, callback?: () => void) => void
    }
  }
}

export function ParticleBackground() {
  const loadParticles = () => {
    window.particlesJS?.load("particles-js", "/vendor/particles/particles.json")
  }

  return (
    <>
      <div id="particles-js" className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden="true" />
      <Script src="/vendor/particles/particles.min.js" strategy="afterInteractive" onLoad={loadParticles} />
    </>
  )
}
