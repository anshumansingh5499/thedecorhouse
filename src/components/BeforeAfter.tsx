import { useCallback, useEffect, useRef, useState } from 'react'
import { animate } from 'framer-motion'
export default function BeforeAfter({ before, after }: { before: string; after: string }) {
  const box = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(50), [teased, setTeased] = useState(false)
  const set = useCallback((cx: number) => { const r = box.current!.getBoundingClientRect(); setP(Math.min(100, Math.max(0, ((cx - r.left) / r.width) * 100))) }, [])
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !teased) { setTeased(true); animate(50, 78, { duration: 1, onUpdate: setP, onComplete: () => { animate(78, 50, { type: 'spring', stiffness: 80, damping: 12, onUpdate: setP }) } }) }
    }, { threshold: 0.6 })
    io.observe(box.current!); return () => io.disconnect()
  }, [teased])
  return (
    <div ref={box} data-cursor="Drag" className="relative aspect-[16/9] w-full select-none touch-none overflow-hidden"
      onPointerDown={e => { e.currentTarget.setPointerCapture(e.pointerId); set(e.clientX) }}
      onPointerMove={e => { if (e.buttons === 1) set(e.clientX) }}>
      <img src={after} alt="After renovation" className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img src={before} alt="Before renovation" className="absolute inset-0 h-full w-full object-cover grayscale" style={{ clipPath: `inset(0 ${100 - p}% 0 0)` }} draggable={false} />
      <span className="absolute left-4 top-4 bg-bone px-3 py-1 text-xs transition-opacity" style={{ opacity: p > 15 ? 1 : 0 }}>Before</span>
      <span className="absolute right-4 top-4 bg-ink px-3 py-1 text-xs text-bone transition-opacity" style={{ opacity: p < 85 ? 1 : 0 }}>After</span>
      <div role="slider" tabIndex={0} aria-label="Before and after comparison" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(p)}
        onKeyDown={e => { if (e.key === 'ArrowLeft') setP(v => Math.max(0, v - 4)); if (e.key === 'ArrowRight') setP(v => Math.min(100, v + 4)) }}
        className="absolute inset-y-0 w-px bg-bone" style={{ left: `${p}%` }}>
        <div className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bone text-xs text-ink shadow-lg">⟷</div>
      </div>
    </div>
  )
}
