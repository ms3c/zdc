export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="#0a3a46" />
      <path d="M16 54V30a16 16 0 0 1 32 0v24" fill="none" stroke="#d4a24c" strokeWidth="5" />
      <path
        d="M27 34l-5 5 5 5M37 34l5 5-5 5"
        fill="none"
        stroke="#2ec4b6"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
