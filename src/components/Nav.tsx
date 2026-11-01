import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from './Logo'
import { expo } from '../lib/ease'
const links = [['Projects', '/projects'], ['About', '/about'], ['Contact', '/contact']]
export default function Nav() {
  const [hidden, setHidden] = useState(false), [open, setOpen] = useState(false)
  useEffect(() => {
    let last = 0
    const f = () => { const y = window.scrollY; setHidden(y > last && y > 120); last = y }
    window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f)
  }, [])
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k) }, [])
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-[70] flex justify-between items-center px-6 md:px-10 py-6 mix-blend-difference text-bone transition-transform duration-700 ease-expo ${hidden && !open ? '-translate-y-full' : ''}`}>
        <Link to="/" aria-label="The Decor House, home" onClick={() => setOpen(false)}><Logo /></Link>
        <button onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Toggle menu" className="text-sm link">{open ? 'Close' : 'Menu'}</button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.nav className="fixed inset-0 z-[65] bg-ink text-bone flex flex-col justify-center px-6 md:px-10" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.8, ease: expo }}>
            {links.map(([l, to], i) => (
              <div key={to} className="overflow-hidden">
                <motion.div initial={{ y: '110%' }} animate={{ y: 0, transition: { delay: 0.3 + i * 0.08, duration: 0.9, ease: expo } }}>
                  <Link to={to} onClick={() => setOpen(false)} className="font-display text-hero leading-[1.05] hover:text-clay transition-colors">{l}</Link>
                </motion.div>
              </div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
