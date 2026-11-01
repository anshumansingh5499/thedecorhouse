import { useEffect, useRef } from 'react'
export default function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const el = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let x = 0, dir = 1, last = window.scrollY, raf = 0
    const loop = () => {
      const v = window.scrollY - last; last = window.scrollY
      if (Math.abs(v) > 1) dir = v > 0 ? 1 : -1
      x -= (0.6 + Math.min(Math.abs(v) * 0.15, 8)) * dir
      const w = el.current!.scrollWidth / 4
      if (x <= -w) x += w
      if (x > 0) x -= w
      el.current!.style.transform = `translateX(${x}px)`; raf = requestAnimationFrame(loop)
    }
    loop(); return () => cancelAnimationFrame(raf)
  }, [])
  const row = [...items, ...items, ...items, ...items]
  return <div className={`overflow-hidden whitespace-nowrap ${className}`}><div ref={el} className="inline-flex gap-16 will-change-transform">{row.map((t, i) => <span key={i}>{t}</span>)}</div></div>
}
