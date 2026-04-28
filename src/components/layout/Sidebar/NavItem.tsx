import Link from "next/link"
import type { LucideIcon } from "lucide-react"

interface NavItemProps {
  icon: LucideIcon
  label: string
  href: string
  isActive?: boolean
  isCollapsed: boolean
  className?: string
}

export function NavItem({ icon: Icon, label, href, isActive, isCollapsed, className = "" }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={`w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl transition-colors relative group ${
        isActive ? className || "text-black bg-neutral-200" : "text-neutral-500 hover:text-white hover:bg-[var(--app-control-hover)]"
      }`}
      title={isCollapsed ? label : undefined}
    >
      <Icon size={isActive ? 20 : 18} strokeWidth={1.5} />
      {isCollapsed && (
        <div className="absolute left-14 px-2 py-1 bg-[var(--app-control)] text-white text-sm rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          {label}
        </div>
      )}
    </Link>
  )
}
