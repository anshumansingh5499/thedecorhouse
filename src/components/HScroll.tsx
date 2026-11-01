import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from '../data/projects'
gsap.registerPlugin(ScrollTrigger)
export default function HScroll() {
  const sec = useRef<HTMLElement>(null), track = useRef<HTMLDivElement>(null), bar = useRef<HTMLDivElement>(null)
  const [idx, setIdx] = useState(1)
  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(min-width:768px) and (prefers-reduced-motion:no-preference)', () => {
      const dist = () => track.current!.scrollWidth - window.innerWidth
      const tween = gsap.to(track.current, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: sec.current, pin: true, scrub: 1, anticipatePin: 1, end: () => '+=' + dist(), invalidateOnRefresh: true,
        onUpdate: s => { setIdx(Math.min(projects.length, Math.floor(s.progress * projects.length) + 1)); if (bar.current) bar.current.style.transform = `scaleX(${s.progress})` } } })
      gsap.utils.toArray<HTMLElement>('.hs-img').forEach(img => gsap.to(img, { x: 60, ease: 'none', scrollTrigger: { trigger: img, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true } }))
    })
    return () => mm.revert()
  }, [])
  return (
    <section ref={sec} className="relative flex flex-col justify-center overflow-hidden bg-bone py-20 md:h-screen md:py-0">
      <div className="mb-8 flex items-end justify-between px-6 md:px-10">
        <h2 className="font-display text-big">Selected work</h2>
        <p className="hidden font-display text-2xl tabular-nums md:block">{String(idx).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</p>
      </div>
      <div ref={track} className="flex w-full flex-col gap-10 px-6 md:w-max md:flex-row md:gap-16 md:px-10">
        {projects.map((p, i) => (
          <Link key={p.slug} to={`/projects/${p.slug}`} data-cursor="View" className={`group shrink-0 md:w-[42vw] ${i % 2 ? 'md:mt-16' : ''}`}>
            <div className="aspect-[4/5] overflow-hidden md:aspect-auto md:h-[56vh]"><img src={p.img} alt={p.title} className="hs-img -ml-[7%] h-full w-[115%] max-w-none object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-105" loading="lazy" /></div>
            <div className="mt-4 flex items-baseline justify-between"><h3 className="font-display text-3xl">{p.title}</h3><span className="text-sm text-moss">{p.location}, {p.year}</span></div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-10 left-10 right-10 hidden h-px bg-stone md:block"><div ref={bar} className="h-full origin-left scale-x-0 bg-ink" /></div>
    </section>
  )
}
