import { UserRound } from "lucide-react"

export function UserProfile() {
  return (
    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[var(--app-control)] text-neutral-400 flex items-center justify-center">
      <UserRound size={18} strokeWidth={1.6} aria-label="User profile" />
    </div>
  )
}
