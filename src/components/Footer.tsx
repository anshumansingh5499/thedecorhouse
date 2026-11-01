import { useRef } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import Marquee from './Marquee'
export default function Footer() {
  const m = useRef<HTMLAnchorElement>(null)
  const pull = (e: React.MouseEvent) => { const r = m.current!.getBoundingClientRect(); m.current!.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px,${(e.clientY - r.top - r.height / 2) * 0.3}px)` }
  return (
    <footer className="bg-ink text-bone pt-32 overflow-hidden">
      <div className="px-6 md:px-10">
        <Logo className="mb-10" />
        <p className="text-stone max-w-sm mb-8">Planning a house, a hotel or an office? Tell us about the site and the brief.</p>
        <a ref={m} onMouseMove={pull} onMouseLeave={() => { m.current!.style.transform = '' }} href="mailto:hello@thedecorhouse.in" className="inline-block font-display text-big transition-transform duration-300 hover:text-clay">7068094114</a>
      </div>
      <Marquee className="mt-24 border-y border-bone/20 py-6 font-display text-4xl" items={['Instagram', 'Pinterest', 'LinkedIn', 'Behance']} />
      <div className="flex justify-between px-6 md:px-10 py-6 text-sm text-stone">
        <span>© 2026 The Decor House</span><Link to="/contact" className="link">Start a project</Link>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="link">Back to top</button>
      </div>
      <p className="font-display text-hero leading-none text-center select-none">The Decor House</p>
    </footer>
  )
}
