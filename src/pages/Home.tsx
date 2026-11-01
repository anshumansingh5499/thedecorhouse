import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useMotionValueEvent, AnimatePresence, MotionValue } from 'framer-motion'
import { SplitText } from '../components/Reveal'
import { ParallaxImg } from '../components/Parallax'
import HScroll from '../components/HScroll'
import BeforeAfter from '../components/BeforeAfter'
import { projects } from '../data/projects'
import { expo } from '../lib/ease'

const intro = 'We design houses, hotels and workplaces that feel settled before anyone moves in. Light, stone, timber and proportion do most of the work.'
function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const o = useTransform(p, [i / n, (i + 1) / n], [0.2, 1])
  return <motion.span style={{ opacity: o }} className="mr-[0.28em] inline-block">{w}</motion.span>
}
const services: [string, string][] = [['Interior design', projects[1].img], ['Architecture', projects[4].img], ['Furniture and joinery', projects[2].img], ['Renovation', projects[5].img]]
const steps = ['Concept', 'Design', 'Build', 'Handover']
const stepText = ['We walk the site and write the brief together.', 'Plans, models and material samples, reviewed in person.', 'Our team manages trades and details on site.', 'Keys, a care guide and a one-year walkthrough.']
const quotes = [['They listened for months before drawing a line. The house feels like it was always there.', 'Anika R., Sarnath'], ['Our guests ask who designed the lobby before they ask about the rooms.', 'Daniel M., Maison Sel']]

export default function Home() {
  const hero = useRef<HTMLElement>(null), intr = useRef<HTMLParagraphElement>(null), proc = useRef<HTMLElement>(null)
  const { scrollYProgress: hp } = useScroll({ target: hero, offset: ['start start', 'end start'] })
  const hy = useTransform(hp, [0, 1], ['0%', '30%']), ht = useTransform(hp, [0, 1], ['0%', '-40%'])
  const { scrollYProgress: ip } = useScroll({ target: intr, offset: ['start 0.85', 'end 0.4'] })
  const { scrollYProgress: pp } = useScroll({ target: proc, offset: ['start start', 'end end'] })
  const [active, setActive] = useState(0), [svc, setSvc] = useState(0), [q, setQ] = useState(0)
  useMotionValueEvent(pp, 'change', v => setActive(Math.min(steps.length - 1, Math.floor(v * steps.length))))
  const words = intro.split(' ')
  const ba = projects[1]
  return (
    <>
      <section ref={hero} className="relative h-screen overflow-hidden bg-ink text-bone">
        <motion.img src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=2400&q=80" alt="Sunlit living room with oak floors" style={{ y: hy }} className="absolute inset-0 h-[120%] w-full object-cover opacity-70" />
        <motion.div style={{ y: ht }} className="relative flex h-full flex-col justify-end px-6 pb-16 md:px-10">
          <h1 className="font-display text-hero font-light leading-[0.9]"><SplitText text="Rooms that" delay={1.6} /><br /><SplitText text="hold still." delay={1.8} /></h1>
          <p className="mt-8 max-w-sm text-stone">The Decor House is an interior design and architecture studio in Varanasi.</p>
        </motion.div>
      </section>
      <section className="px-6 py-40 md:px-10"><p ref={intr} className="max-w-6xl font-display text-big leading-[1.1]">{words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={ip} />)}</p></section>
      <HScroll />
      <section className="px-6 py-40 md:px-10">
        <div className="mb-10 flex items-end justify-between"><h2 className="max-w-xl font-display text-big">A loft, before and after</h2><p className="hidden text-sm text-moss md:block">{ba.title}, {ba.location}</p></div>
        <BeforeAfter before={ba.before} after={ba.img} />
      </section>
      <section className="grid gap-10 bg-ink px-6 py-32 text-bone md:grid-cols-2 md:px-10">
        <ul>{services.map(([s], i) => (
          <li key={s} onMouseEnter={() => setSvc(i)}><Link to="/projects" className={`block border-t border-bone/20 py-6 font-display text-big transition-opacity duration-500 ${svc === i ? 'opacity-100' : 'opacity-35'}`}>{s}</Link></li>))}
        </ul>
        <div className="sticky top-24 hidden aspect-[4/5] self-start overflow-hidden md:block">
          <AnimatePresence><motion.img key={svc} src={services[svc][1]} alt={services[svc][0]} className="absolute inset-0 h-full w-full object-cover" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.9, ease: expo }} /></AnimatePresence>
        </div>
      </section>
      <section ref={proc} className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen flex-col justify-center px-6 md:px-10">
          <div className="relative mb-16 h-px bg-stone"><motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-ink" style={{ scaleX: pp }} /></div>
          <div className="grid gap-8 md:grid-cols-4">{steps.map((s, i) => (
            <div key={s} className={`transition-opacity duration-700 ${active >= i ? 'opacity-100' : 'opacity-20'}`}><p className="mb-3 text-sm text-moss">Step {i + 1}</p><h3 className="font-display text-big">{s}</h3><p className="mt-3 max-w-[24ch] text-sm">{stepText[i]}</p></div>))}</div>
        </div>
      </section>
      <section className="bg-stone/40 px-6 py-32 text-center md:px-10">
        <AnimatePresence mode="wait"><motion.blockquote key={q} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-4xl"><p className="font-display text-big leading-tight">“{quotes[q][0]}”</p><footer className="mt-6 text-sm text-moss">{quotes[q][1]}</footer></motion.blockquote></AnimatePresence>
        <button onClick={() => setQ((q + 1) % quotes.length)} className="link mt-10 text-sm">Next quote</button>
      </section>
      <ParallaxImg src={projects[0].gallery[0]} alt="Interior with floor-to-ceiling windows" className="h-[80vh]" />
    </>
  )
}
