import { motion } from 'framer-motion'
import { expo } from '../lib/ease'
export function SplitText({ text, className = '', delay = 0 }: { text: string; className?: string; delay?: number }) {
  return <span className={className} aria-label={text}>{text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.12em] mr-[0.25em]" aria-hidden>
      <motion.span className="inline-block" initial={{ y: '110%' }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 1.1, ease: expo, delay: delay + i * 0.06 }}>{w}</motion.span>
    </span>))}</span>
}
