import { useState } from 'react'
import { SplitText } from '../components/Reveal'
import { ParallaxImg } from '../components/Parallax'
const press = [['Architectural Digest India', 'Home of the Year, 2024', 'photo-1600585154340-be6161a56a0c'], ['Dezeen', 'Studio to watch, 2023', 'photo-1618221195710-dd6b41faaea6'], ['Wallpaper*', 'Design Awards shortlist, 2023', 'photo-1566073771259-6a8506099945']]
const team = [['Meera Tripathi', 'Principal architect', 'photo-1573496359142-b8d87734a5a2'], ['Arjun Rao', 'Interior lead', 'photo-1560250097-0b93528c311a'], ['Sana Qureshi', 'Project director', 'photo-1580489944761-15a19d654956']]
export default function About() {
  const [h, setH] = useState<number | null>(null), [pos, setPos] = useState({ x: 0, y: 0 })
  return (
    <section className="px-6 pb-32 pt-40 md:px-10" onMouseMove={e => setPos({ x: e.clientX, y: e.clientY })}>
      <h1 className="max-w-6xl font-display text-hero leading-[0.95]"><SplitText text="Fifteen years of making quiet buildings." /></h1>
      <div className="mt-20 grid gap-10 md:grid-cols-12">
        <ParallaxImg src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=80" alt="Founder Meera Tripathi" className="aspect-[3/4] md:col-span-5" />
        <p className="self-end font-display text-3xl leading-snug md:col-span-6 md:col-start-7">The Decor House began with one small apartment near Assi Ghat. Today a team of nineteen designs homes, hotels and workplaces across India, always starting from the same questions: where does the light fall, and what will you touch every day?</p>
      </div>
      <h2 className="mt-40 font-display text-big">Press and awards</h2>
      <ul className="mt-8">{press.map(([a, b, img], i) => <li key={a} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)} className={`flex justify-between border-t border-stone py-6 text-xl transition-opacity ${h !== null && h !== i ? 'opacity-30' : ''}`}><span>{a}</span><span className="text-moss">{b}</span>
        {h === i && <img src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=500&q=70`} alt="" className="pointer-events-none fixed z-40 h-56 w-72 object-cover" style={{ left: pos.x + 24, top: pos.y - 112 }} />}</li>)}</ul>
      <h2 className="mt-40 font-display text-big">Team</h2>
      <div className="mt-8 grid gap-6 md:grid-cols-3">{team.map(([n, r, img]) => <figure key={n} className="group"><div className="aspect-[3/4] overflow-hidden"><img src={`https://images.unsplash.com/${img}?auto=format&fit=crop&w=800&q=80`} alt={n} className="h-full w-full object-cover grayscale transition-all duration-1000 ease-expo group-hover:scale-105 group-hover:grayscale-0" loading="lazy" /></div><figcaption className="mt-3"><span className="font-display text-2xl">{n}</span><span className="ml-3 text-sm text-moss">{r}</span></figcaption></figure>)}</div>
    </section>
  )
}
