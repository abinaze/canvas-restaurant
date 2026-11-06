/** lucide-react no longer ships brand icons, so these two are drawn here (24px, stroke style). */
interface P { size?: number; className?: string }

export function Instagram({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Facebook({ size = 24, className }: P) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14 8.5h2.5V5H14a4 4 0 0 0-4 4v2H7.5v3.5H10V21h3.5v-6.5H16l.5-3.5h-3V9.2c0-.4.3-.7.7-.7z" />
    </svg>
  );
}
