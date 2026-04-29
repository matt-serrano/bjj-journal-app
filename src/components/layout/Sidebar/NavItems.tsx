"use client"

import { NavItem } from "./NavItem"
import { Activity, BookOpen, Bot, Scale } from "lucide-react"
import { usePathname } from "next/navigation"

const navItems = [
  { icon: Activity, label: "Analysis", href: "/", className: "bg-neutral-200 text-black" },
  { icon: BookOpen, label: "Journal", href: "/journal" },
  { icon: Scale, label: "Weight Loss", href: "/weight-loss" },
  { icon: Bot, label: "AI Agent", href: "/ai-agent" },
]

interface NavItemsProps {
  isCollapsed: boolean
}

export function NavItems({ isCollapsed }: NavItemsProps) {
  const pathname = usePathname()

  return (
    <div className="flex-1 min-h-0 w-full flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 mt-4 flex-1 min-h-0">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            href={item.href}
            isActive={pathname === item.href}
            isCollapsed={isCollapsed}
            className={item.className}
          />
        ))}
      </div>
    </div>
  )
}
