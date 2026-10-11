'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowDown, ChevronRight, Heart, Mail, Music2, Pause, Play, Sparkles, X } from 'lucide-react'

const memories = [
  { date: 'AGO 2024', title: 'Nuestros comienzos', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1723767202167-wbawoSY0oxsF6w46LpdEYYGoXHSQWk.jpg', secret: 'El inicio de nuestra pequeña galaxia. Ese día el universo decidió acercarnos.' },
  { date: 'MAY 2025', title: 'De fiesta juntos', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250504-WA0204-O6ZDiqOD0m9JZy1yvL4fe9u2w7pfmR.jpg', secret: 'Entre sombreros, regalos y sonrisas, celebramos otro recuerdo para nuestra galaxia.' },
  { date: 'JUN 2025', title: 'Un beso eterno', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG-20250619-WA0037-BylpSVnuWSADCS7u3wXEwWhcLg5bF1.jpg', secret: 'Un beso que hizo que todos los planetas se alinearan por un instante.' },
  { date: 'JUN 2025', title: 'Cabeza con cabeza', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20250620_120532-HhvN9bsC1dCbvCcLwZMlCSqSOLoo4w.jpg', secret: 'No necesitamos decir nada cuando nuestros corazones ya hablan el mismo idioma.' },
  { date: 'OCT 2025', title: 'Risas infinitas', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20251027_161903-kvPFyMyv0KN89aF4FigzTnLmcq9Tgz.jpg', secret: 'Tu risa es mi constelación favorita. Siempre encuentro el camino de regreso a ella.' },
  { date: 'NOV 2025', title: 'Para siempre', image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20251103_172535-QLU18UOWsV3vttTfmBaifkyYRuHY5W.jpg', secret: 'Tu abrazo convierte cualquier paisaje en nuestro lugar favorito.' },
]

function TimeCounter() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const values = useMemo(() => {
    const diff = Math.max(0, now - new Date('2024-08-06T00:00:00').getTime())
    const seconds = Math.floor(diff / 1000)
    return [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60]
  }, [now])
  return <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{values.map((value, index) => <div key={index} className="counter-card"><strong>{String(value).padStart(2, '0')}</strong><span>{['DÍAS', 'HORAS', 'MINUTOS', 'SEGUNDOS'][index]}</span></div>)}</div>
}

export default function Page() {
  const [selectedMemory, setSelectedMemory] = useState<typeof memories[number] | null>(null)
  const [flippedMemory, setFlippedMemory] = useState<string | null>(null)
  const [letterOpen, setLetterOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try { await audio.play(); setPlaying(true) } catch { setPlaying(false) }
    } else {
      audio.pause()
      setPlaying(false)
    }
  }

  return (
    <main className="galaxy-page">
      <div className="stars" aria-hidden="true" />
      <section className="hero section-shell">
        <div className="hero-orbit orbit-one" aria-hidden="true" /><div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><span>✦</span> TÚ <Heart className="inline-icon" fill="currentColor" /> YO</div>
          <p className="kicker">Una historia escrita entre estrellas</p>
          <h1>Nuestra <em>Galaxia</em></h1>
          <p className="hero-subtitle">Un Universo Juntos</p>
          <div className="date-pill"><span /> 6 DE AGOSTO DE 2024 <span /></div>
          <button className="explore-button" onClick={() => document.getElementById('tiempo')?.scrollIntoView({ behavior: 'smooth' })} aria-label="Explorar nuestra historia">EXPLORAR <ArrowDown /></button>
        </div>
        <div className="scroll-hint" aria-hidden="true"><span>↓</span></div>
      </section>

      <section id="tiempo" className="section-shell time-section">
        <div className="section-heading"><p className="section-label">DESDE QUE EL UNIVERSO NOS UNIÓ</p><h2>Nuestro tiempo <em>juntos</em></h2><div className="heading-line" /></div>
        <TimeCounter />
        <p className="romantic-line">Y cada segundo que pasa, te quiero un poquito más.</p>
      </section>

      <section className="section-shell memories-section">
        <div className="section-heading left-heading"><p className="section-label">NUESTROS MOMENTOS</p><h2>Constelación de <em>recuerdos</em></h2><p className="instruction"><Sparkles /> TOCA CADA FOTO PARA DESCUBRIR SU SECRETO</p></div>
        <div className="memory-grid">{memories.map((memory, index) => <button key={memory.title} className={`memory-card card-${index + 1} ${flippedMemory === memory.title ? 'is-flipped' : ''}`} onClick={() => setFlippedMemory((current) => current === memory.title ? null : memory.title)} aria-label={`${memory.title}. Toca para ${flippedMemory === memory.title ? 'ver la foto' : 'leer el recuerdo'}`}><span className="memory-card-inner"><span className="memory-face memory-front"><img src={memory.image} alt={memory.title} /><span className="memory-shade" /><span className="memory-copy"><small>{memory.date}</small><strong>{memory.title}</strong><ChevronRight /></span></span><span className="memory-face memory-back"><span className="back-date">{memory.date}</span><strong>{memory.title}</strong><span>{memory.secret}</span><span className="back-hint">TOCA PARA VOLVER A LA FOTO</span></span></span></button>)}</div>
      </section>

      <section className="letter-section section-shell">
        <div className="letter-glow" aria-hidden="true" /><div className="section-heading"><p className="section-label">MENSAJE DESDE LAS ESTRELLAS</p><h2>Una carta <em>para ti</em></h2></div>
        <button className="letter-card" onClick={() => setLetterOpen(true)}><div className="mail-icon"><Mail /></div><div><span>ABRIR CARTA ESPACIAL</span><strong>Toca para leer</strong></div><ChevronRight /></button>
      </section>

      <footer><Heart fill="currentColor" /> Hecho con <span>♥</span> para Tú &amp; Yo <Heart fill="currentColor" /></footer>
      <audio ref={audioRef} loop preload="none" src="/audio/photograph-piano-cover.mp3" />
      <button className={`music-player ${playing ? 'is-playing' : ''}`} onClick={toggleMusic} aria-pressed={playing}><span className="music-button">{playing ? <Pause /> : <Play />}</span><span><small>{playing ? 'REPRODUCIENDO' : 'NUESTRA CANCIÓN'}</small><strong>Una canción para nosotros</strong></span><Music2 className="music-note" /></button>

      {(selectedMemory || letterOpen) && <div className="modal-backdrop" role="presentation" onClick={() => { setSelectedMemory(null); setLetterOpen(false) }}><div className="modal-card" role="dialog" aria-modal="true" aria-label={selectedMemory?.title ?? 'Carta para ti'} onClick={(event) => event.stopPropagation()}><button className="modal-close" onClick={() => { setSelectedMemory(null); setLetterOpen(false) }} aria-label="Cerrar"><X /></button>{selectedMemory && <><img src={selectedMemory.image} alt="" /><small>{selectedMemory.date}</small><h2>{selectedMemory.title}</h2><p>{selectedMemory.secret}</p></>}{letterOpen && <><div className="modal-letter-icon"><Mail /></div><small>DESDE MI CORAZÓN</small><h2>Para mi persona favorita</h2><p>Desde que llegaste, mis días tienen una luz distinta. Gracias por cada abrazo, cada risa y cada instante en el que elegimos encontrarnos. Me encanta construir este universo contigo, descubrir nuevos planetas en cada aventura y volver siempre a casa en tu mirada.</p><p>Prometo seguir cuidando nuestra galaxia, celebrar tus sueños y recordarte que, entre miles de millones de estrellas, tú siempre serás mi lugar favorito.</p><p className="signature">Con todo mi amor, siempre.</p></>}</div></div>}
    </main>
  )
}
