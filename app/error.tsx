"use client"

import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] p-6 text-white">
      <div className="max-w-sm text-center">
        <img src="/images/logo.png" alt="BJJ Journal" className="mx-auto mb-6 h-20 w-20 object-contain" />
        <h1 className="font-title mb-2 text-3xl">Something went wrong</h1>
        <p className="font-subtitle mb-6 text-sm text-gray-400">The app hit a temporary error. Try reloading this view.</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-950 transition-colors hover:bg-white"
        >
          Try again
        </button>
      </div>
    </main>
  )
}
