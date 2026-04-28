export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--app-bg)] p-6 text-white">
      <div className="max-w-sm text-center">
        <img src="/images/logo.png" alt="BJJ Journal" className="mx-auto mb-6 h-20 w-20 object-contain" />
        <h1 className="mb-2 font-[var(--font-bebas)] text-3xl font-normal">Page not found</h1>
        <p className="text-sm text-gray-400">This view is not available.</p>
      </div>
    </main>
  )
}
