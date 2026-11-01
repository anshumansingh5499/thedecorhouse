import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
export function ParallaxImg({ src, alt, className = '', amount = 12 }: { src: string; alt: string; className?: string; amount?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`])
  return <div ref={ref} className={`overflow-hidden ${className}`}><motion.img src={src} alt={alt} style={{ y, scale: 1.25 }} className="h-full w-full object-cover" loading="lazy" /></div>
}
