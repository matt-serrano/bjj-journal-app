import Link from "next/link"
import Image from "next/image"


export default function LandingPage() {
  return (
    <div className="relative z-10 flex h-screen flex-col overflow-hidden bg-[#121212]">
      {/* Background mat texture */}
      <div className="absolute inset-0 mix-blend-luminosity">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-neutral-500/60" />
      </div>

      {/* Nav bar */}
      <nav className="relative z-20 flex items-center justify-between border-b-2 border-[#1e1e1e] bg-[#121212]/40 px-6 py-5 backdrop-blur-sm sm:px-12">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="GrappleLog logo"
            width={69}
            height={52}
            className="h-auto w-[52px] sm:w-[69px]"
          />
          <span className="font-title text-3xl tracking-wide text-white sm:text-4xl">
            GrappleLog.
          </span>
        </div>
        <Link
          href="/dashboard"
          className="rounded-xl bg-[#b10404] px-6 py-2.5 font-title text-xl tracking-wide text-white transition-colors hover:bg-[#d41a1a] sm:text-2xl"
        >
          Log In / Sign Up
        </Link>
      </nav>

      {/* Hero content */}
      <main className="relative z-10 flex flex-col items-center px-4 pt-2 text-center sm:pt-4">
        <h1 className="font-title text-5xl tracking-wide text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] sm:text-7xl md:text-8xl lg:text-[96px]">
          Train. Log. Improve.
        </h1>
        <p className="mt-1 font-title text-xl tracking-wide text-white sm:text-3xl md:text-4xl">
          Stop forgetting techniques, Start building your system.
        </p>

        {/* Laptop mockup — tight below subtitle, clipped at viewport bottom */}
        <Image
          src="/images/laptop-mockup.png"
          alt="GrappleLog dashboard preview"
          width={1199}
          height={1199}
          className="-mt-52 h-auto w-full max-w-6xl sm:-mt-72"
          priority
        />
      </main>
    </div>
  )
}
