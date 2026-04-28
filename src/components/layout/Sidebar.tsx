"use client"

import Link from "next/link"
import { Activity, BookOpen, Scale, UserRound } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Activity, label: "Analysis", href: "/" },
  { icon: BookOpen, label: "Journal", href: "/journal" },
  { icon: Scale, label: "Weight Loss", href: "/weight-loss" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-screen w-20 bg-gray-900 flex flex-col items-center py-8 overflow-y-auto scrollbar-hide">
      <div className="mb-4 h-12 w-12 flex-shrink-0 overflow-hidden">
        <img src="/images/logo.png" alt="BJJ Journal" className="h-full w-full object-contain" />
      </div>

      <div className="flex flex-col items-center space-y-6 flex-1 min-h-0">
        <div className="flex flex-col items-center space-y-6">
          {navItems.map(({ icon: Icon, label, href }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className={`w-12 h-12 flex items-center justify-center rounded-xl transition-colors flex-shrink-0 ${
                pathname === href ? "bg-pink-300 text-gray-900" : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
              title={label}
            >
              <Icon size={20} strokeWidth={1.5} />
            </Link>
          ))}
        </div>
      </div>

      <div className="relative w-9 h-9 rounded-full bg-gray-800 text-gray-400 flex-shrink-0 flex items-center justify-center">
        <UserRound size={18} strokeWidth={1.6} aria-label="User profile" />
      </div>
    </nav>
  )
}
