export function UserProfile() {
  return (
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-red-500">
      <img
        src="/images/logo.png"
        alt="BJJ Journal"
        className="w-full h-full object-contain"
        onError={(event) => {
          event.currentTarget.style.display = "none"
        }}
      />
    </div>
  )
}
