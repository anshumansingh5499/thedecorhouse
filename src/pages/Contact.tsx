import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { SplitText } from '../components/Reveal'

// Change these two values to update where enquiries go.
const COUNTRY_CODE = '91'
const WHATSAPP_NUMBER = '7068094114'

type F = { name: string; email: string; brief: string }

const buildLink = (f: F) => {
  const text = `New enquiry from The Decor House website\n\nName: ${f.name.trim()}\nEmail: ${f.email.trim()}\nProject: ${f.brief.trim()}`
  return `https://wa.me/${COUNTRY_CODE}${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export default function Contact() {
  const [f, setF] = useState<F>({ name: '', email: '', brief: '' }), [err, setErr] = useState<Partial<F>>({}), [done, setDone] = useState(false)
  const submit = (e: FormEvent) => {
    e.preventDefault(); const er: Partial<F> = {}
    if (f.name.trim().length < 2) er.name = 'Enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(f.email)) er.email = 'Enter a valid email address.'
    if (f.brief.trim().length < 20) er.brief = 'Tell us a little more (20 characters or more).'
    setErr(er)
    if (!Object.keys(er).length) { window.open(buildLink(f), '_blank', 'noopener'); setDone(true) }
  }
  const fields: [keyof F, string][] = [['name', 'Your name'], ['email', 'Email address'], ['brief', 'About the project']]
  const cls = 'peer w-full border-b border-ink/40 bg-transparent pb-2 pt-6 text-xl outline-none transition-colors focus:border-clay'
  return (
    <section className="min-h-screen px-6 pb-32 pt-40 md:px-10">
      <h1 className="font-display text-hero leading-none"><SplitText text="Let’s talk." /></h1>
      {done ? (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mt-20 max-w-3xl">
          <p className="font-display text-big">Thank you, {f.name.split(' ')[0]}. Your message is ready in WhatsApp.</p>
          <p className="mt-4 text-moss">Press send in WhatsApp to deliver it to us. If it did not open, use the button below.</p>
          <a href={buildLink(f)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block rounded-full bg-ink px-10 py-5 text-bone transition-colors hover:bg-clay">Open WhatsApp</a>
        </motion.div>
      ) : (
        <form onSubmit={submit} noValidate className="mt-20 max-w-3xl space-y-12">
          {fields.map(([k, label]) => (
            <div key={k} className="relative">
              {k === 'brief' ? <textarea id={k} rows={3} placeholder=" " value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} className={cls} /> : <input id={k} placeholder=" " value={f[k]} onChange={e => setF({ ...f, [k]: e.target.value })} className={cls} />}
              <label htmlFor={k} className="pointer-events-none absolute left-0 top-6 text-moss transition-all peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs">{label}</label>
              {err[k] && <p role="alert" className="mt-2 text-sm text-red-700">{err[k]}</p>}
            </div>))}
          <button className="rounded-full bg-ink px-10 py-5 text-bone transition-colors hover:bg-clay">Send on WhatsApp</button>
        </form>
      )}
    </section>
  )
}