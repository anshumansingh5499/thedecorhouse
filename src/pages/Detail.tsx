import { useEffect, useState, useCallback } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { projects } from '../data/projects'
import { ParallaxImg } from '../components/Parallax'
import BeforeAfter from '../components/BeforeAfter'
import { SplitText } from '../components/Reveal'
export default function Detail() {
  const { slug } = useParams(); const i = projects.findIndex(p => p.slug === slug)
  const [lb, setLb] = useState<number | null>(null)
  const p = projects[i]; const next = projects[(i + 1) % projects.length]
  const go = useCallback((d: number) => setLb(v => (v === null ? v : (v + d + 3) % 3)), [])
  useEffect(() => {
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') setLb(null); if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [go])
  useEffect(() => { document.title = p ? `${p.title} — The Decor House` : 'The Decor House' }, [p])
  if (!p) return <Navigate to="/projects" replace />
  const meta = [['Location', p.location], ['Year', String(p.year)], ['Area', p.area], ['Role', p.role]]
  return (
    <>
      <div className="h-screen"><motion.img layoutId={`img-${p.slug}`} src={p.img} alt={p.title} className="h-full w-full object-cover" /></div>
      <section className="grid gap-10 px-6 py-24 md:grid-cols-12 md:px-10">
        <h1 className="font-display text-hero leading-[0.95] md:col-span-8"><SplitText text={p.title} /></h1>
        <dl className="space-y-3 self-end text-sm md:col-span-4">{meta.map(([k, v]) => <div key={k} className="flex justify-between border-b border-stone pb-2"><dt className="text-moss">{k}</dt><dd>{v}</dd></div>)}</dl>
        <p className="font-display text-3xl leading-snug md:col-span-6 md:col-start-5">{p.summary}</p>
      </section>
      <div className="grid items-start gap-6 px-6 md:grid-cols-12 md:px-10">
        <div className="overflow-hidden md:col-span-7" data-cursor="Zoom" onClick={() => setLb(0)}><ParallaxImg src={p.gallery[0]} alt={`${p.title} interior 1`} className="aspect-[4/5]" /></div>
        <div className="overflow-hidden md:col-span-4 md:col-start-9 md:mt-40" data-cursor="Zoom" onClick={() => setLb(1)}><ParallaxImg src={p.gallery[1]} alt={`${p.title} interior 2`} className="aspect-[3/4]" /></div>
      </div>
      <div className="px-6 py-24 md:px-10"><div data-cursor="Zoom" onClick={() => setLb(2)}><ParallaxImg src={p.gallery[2]} alt={`${p.title} interior 3`} className="aspect-[21/9]" /></div></div>
      <section className="px-6 pb-24 md:px-10"><BeforeAfter before={p.before} after={p.img} /></section>
      <Link to={`/projects/${next.slug}`} data-cursor="Next" className="group relative block h-[70vh] overflow-hidden bg-ink text-bone">
        <img src={next.img} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-0 transition-all duration-[1200ms] ease-expo group-hover:scale-100 group-hover:opacity-60" />
        <div className="relative grid h-full place-items-center text-center"><div><p className="mb-4 text-sm text-stone">Next project</p><p className="font-display text-hero leading-none">{next.title}</p></div></div>
      </Link>
      <AnimatePresence>{lb !== null && (
        <motion.div role="dialog" aria-modal="true" aria-label="Image viewer" className="fixed inset-0 z-[85] grid place-items-center bg-ink/95" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLb(null)}
          drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={(_, d) => { if (Math.abs(d.offset.x) > 80) go(d.offset.x < 0 ? 1 : -1) }}>
          <img src={p.gallery[lb]} alt={`${p.title} interior ${lb + 1}`} className="max-h-[88vh] max-w-[92vw] object-contain" onClick={e => e.stopPropagation()} />
          <button className="link absolute right-8 top-6 text-bone" onClick={() => setLb(null)}>Close</button>
        </motion.div>)}</AnimatePresence>
    </>
  )
}
