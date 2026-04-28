import { NavItem } from "./NavItem"
import { Activity, BookOpen, Scale } from "lucide-react"

const navItems = [
  { icon: Activity, label: "Analysis", isActive: true, className: "bg-pink-300 text-gray-900" },
  { icon: BookOpen, label: "Journal" },
  { icon: Scale, label: "Weight Loss" },
]

interface NavItemsProps {
  isCollapsed: boolean
}

export function NavItems({ isCollapsed }: NavItemsProps) {
  return (
    <div className="flex-1 min-h-0 w-full flex flex-col items-center">
      <div className="flex flex-col items-center space-y-4 sm:space-y-6 mt-4 flex-1 min-h-0">
        {navItems.map((item) => (
          <NavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={item.isActive}
            isCollapsed={isCollapsed}
            className={item.className}
          />
        ))}
      </div>
    </div>
  )
}
