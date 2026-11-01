interface Props { className?: string }
export default function Logo({ className = '' }: Props) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`} aria-label="The Decor House, Varanasi">
      <span className="flex items-baseline gap-2">
        <span className="font-script text-3xl text-clay">The</span>
        <span className="font-logo text-2xl uppercase tracking-[0.28em]">Decor House</span>
      </span>
      <span className="mt-2 flex w-full items-center gap-3 text-[9px] tracking-[0.5em]">
        <span className="h-px flex-1 bg-current opacity-40" />Varanasi<span className="h-px flex-1 bg-current opacity-40" />
      </span>
    </span>
  )
}
