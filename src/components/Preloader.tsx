import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Logo from './Logo'
import { expo } from '../lib/ease'
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [n, setN] = useState(0)
  useEffect(() => { const id = setInterval(() => setN(v => (v >= 100 ? 100 : v + 2)), 30); return () => clearInterval(id) }, [])
  useEffect(() => { if (n === 100) { const t = setTimeout(onDone, 1100); return () => clearTimeout(t) } }, [n, onDone])
  return (
    <motion.div className="fixed inset-0 z-[100] bg-ink text-bone flex flex-col justify-between p-8" animate={n === 100 ? { clipPath: 'inset(0 0 100% 0)' } : {}} transition={{ duration: 0.9, ease: expo, delay: 0.2 }}>
      <Logo className="scale-125 origin-left" />
      <p className="font-display text-hero leading-none self-end tabular-nums">{n}</p>
    </motion.div>
  )
}
