import { useEffect, useRef, useState } from 'react'
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null), ring = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState(''), [hover, setHover] = useState(false)
  useEffect(() => {
    if (!window.matchMedia('(pointer:fine)').matches) return
    let x = 0, y = 0, rx = 0, ry = 0, raf = 0
    const move = (e: MouseEvent) => {
      x = e.clientX; y = e.clientY
      const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor],a,button')
      setLabel(t?.dataset.cursor ?? ''); setHover(!!t)
    }
    const loop = () => {
      rx += (x - rx) * 0.15; ry += (y - ry) * 0.15
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`
      raf = requestAnimationFrame(loop)
    }
    window.addEventListener('mousemove', move); loop()
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf) }
  }, [])
  const size = hover ? (label ? 'h-20 w-20 -ml-10 -mt-10' : 'h-14 w-14 -ml-7 -mt-7') : 'h-8 w-8 -ml-4 -mt-4'
  return (
    <div className="hidden [@media(pointer:fine)]:block pointer-events-none fixed inset-0 z-[95]">
      <div ref={dot} className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-clay" />
      <div ref={ring} className="absolute top-0 left-0"><div className={`grid place-items-center rounded-full border border-clay text-[11px] text-ink transition-all duration-500 ease-expo ${size} ${label ? 'bg-bone/90' : ''}`}>{label}</div></div>
    </div>
  )
}
