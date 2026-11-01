import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, LayoutGroup } from 'framer-motion'
import { projects, Category } from '../data/projects'
import { expo } from '../lib/ease'
const cats: ('All' | Category)[] = ['All', 'Residential', 'Commercial', 'Hospitality', 'Architecture']
export default function Projects() {
  const [cat, setCat] = useState<'All' | Category>('All'), [grid, setGrid] = useState(true), [hov, setHov] = useState<string | null>(null)
  const list = projects.filter(p => cat === 'All' || p.category === cat)
  return (
    <section className="min-h-screen px-6 pb-32 pt-40 md:px-10">
      <h1 className="font-display text-hero leading-none">Projects</h1>
      <div className="mt-12 flex flex-wrap justify-between gap-4 border-y border-stone py-4 text-sm">
        <div className="flex flex-wrap gap-6">{cats.map(c => <button key={c} onClick={() => setCat(c)} className={`link ${cat === c ? 'font-medium' : 'text-moss'}`}>{c}</button>)}</div>
        <button onClick={() => setGrid(g => !g)} className="link">{grid ? 'List view' : 'Grid view'}</button>
      </div>
      <LayoutGroup>
        <motion.div layout className={grid ? 'mt-12 grid gap-x-8 gap-y-16 md:grid-cols-2' : 'mt-12 flex flex-col'}>
          {list.map(p => (
            <motion.div layout key={p.slug} transition={{ duration: 0.8, ease: expo }} onMouseEnter={() => setHov(p.slug)} onMouseLeave={() => setHov(null)} className={`transition-opacity duration-500 ${hov && hov !== p.slug ? 'opacity-40' : ''}`}>
              <Link to={`/projects/${p.slug}`} data-cursor="View" className={`group ${grid ? 'block' : 'flex items-center justify-between gap-6 border-b border-stone py-6'}`}>
                <div className={`overflow-hidden ${grid ? 'aspect-[4/3]' : 'h-24 w-40 shrink-0'}`}><motion.img layoutId={`img-${p.slug}`} src={p.img} alt={p.title} className="h-full w-full object-cover transition-transform duration-[1200ms] ease-expo group-hover:scale-[1.08]" loading="lazy" /></div>
                <div className={`flex items-baseline justify-between ${grid ? 'mt-4' : 'flex-1'}`}><h2 className="font-display text-3xl md:text-4xl">{p.title}</h2><span className="text-sm text-moss">{p.category}, {p.year}</span></div>
              </Link>
            </motion.div>))}
        </motion.div>
      </LayoutGroup>
    </section>
  )
}
