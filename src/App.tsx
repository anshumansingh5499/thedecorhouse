import { useEffect, useState, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Preloader from './components/Preloader'
import { expo } from './lib/ease'
const Home = lazy(() => import('./pages/Home'))
const Projects = lazy(() => import('./pages/Projects'))
const Detail = lazy(() => import('./pages/Detail'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const loc = useLocation()
  const [loaded, setLoaded] = useState(sessionStorage.getItem('seen') === '1')
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09 })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (t: number) => lenis.raf(t * 1000)
    gsap.ticker.add(tick); gsap.ticker.lagSmoothing(0)
    return () => { gsap.ticker.remove(tick); lenis.destroy() }
  }, [])
  const title = loc.pathname === '/' ? 'The Decor House' : loc.pathname.split('/')[1]
  return (
    <>
      {!loaded && <Preloader onDone={() => { sessionStorage.setItem('seen', '1'); setLoaded(true) }} />}
      <Cursor /><Nav />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={loc.pathname} onAnimationStart={() => window.scrollTo(0, 0)}>
          <Suspense fallback={null}>
            <Routes location={loc}>
              <Route path="/" element={<Home />} /><Route path="/projects" element={<Projects />} />
              <Route path="/projects/:slug" element={<Detail />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
          <Footer />
          <motion.div className="fixed inset-0 z-[80] bg-ink text-bone grid place-items-center pointer-events-none" initial={{ y: '100%' }} animate={{ y: '-100%', transition: { duration: 1, ease: expo, delay: 0.1 } }} exit={{ y: 0, transition: { duration: 0.7, ease: expo } }}>
            <span className="font-display text-big capitalize">{title}</span>
          </motion.div>
        </motion.main>
      </AnimatePresence>
    </>
  )
}
