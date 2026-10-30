import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import {
  Shield, Sparkles, SprayCan, Droplets, Lightbulb, Settings,
  MessageCircle, Car, Wrench, CheckCircle, Menu, X, MapPin
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const WHATSAPP_URL = 'https://wa.me/5511999999999?text=Ol%C3%A1%2C%20vi%20o%20site%20da%20Challenger%20e%20gostaria%20de%20agendar%20um%20servi%C3%A7o'

const HERO_IMG = 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1400&q=80&auto=format'
const GALLERY_1 = 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format'
const GALLERY_2 = 'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&q=80&auto=format'
const GALLERY_3 = 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format'

const services = [
  { icon: Shield, title: 'Vitrificação', desc: 'Camada de proteção cerâmica que mantém o brilho de showroom por meses. Seu carro blindado contra chuva ácida, poeira e raios UV.' },
  { icon: Sparkles, title: 'Polimento', desc: 'Remoção de riscos, marcas de uso e oxidação. A pintura volta ao estado de fábrica com acabamento espelhado.' },
  { icon: SprayCan, title: 'Higienização', desc: 'Limpeza profunda de estofados, painéis e carpetes. Elimina odores, bactérias e ácaros do interior do veículo.' },
  { icon: Droplets, title: 'Lavagem Detalhada', desc: 'Lavagem manual com produtos premium e secagem com flanela de microfibra. Cada canto do carro recebe atenção.' },
  { icon: Lightbulb, title: 'Restauração de Faróis', desc: 'Faróis amarelados e opacos voltam a ter a transparência original. Mais segurança na estrada, visual de carro novo.' },
  { icon: Settings, title: 'Limpeza de Motor', desc: 'Motor limpo funciona melhor, esquenta menos e valoriza seu carro na revenda. Limpeza técnica sem dano elétrico.' },
]

const steps = [
  { num: '01', icon: MessageCircle, title: 'Chama no WhatsApp', desc: 'Diz o que seu carro precisa e a gente agenda.' },
  { num: '02', icon: Car, title: 'Traga seu Veículo', desc: 'Av. Água Fria, 924, Zona Norte de SP.' },
  { num: '03', icon: Wrench, title: 'Execução Profissional', desc: 'Produtos de alta qualidade e atenção a cada detalhe.' },
  { num: '04', icon: CheckCircle, title: 'Carro Transformado', desc: 'Seu carro sai daqui diferente. Garantido.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useGSAP(() => {
    // Hero content fade in
    gsap.from('.hero-content > *', {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2,
    })

    // Stats counter animation
    gsap.utils.toArray<HTMLElement>('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.value || '0')
      if (isNaN(target)) return
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.fromTo(el, { innerText: '0' }, {
            innerText: target,
            duration: 1.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            onUpdate() { el.textContent = '+' + Math.round(parseFloat(el.innerText)) },
          })
        },
      })
    })

    // Reveal sections on scroll
    gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => {
      gsap.from(el, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      })
    })

    // Service cards stagger
    ScrollTrigger.create({
      trigger: '#servicos',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.from('.service-card', {
          y: 40,
          opacity: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
        })
      },
    })

    // Gallery images
    ScrollTrigger.create({
      trigger: '#galeria',
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.from('.gallery-img', {
          scale: 0.95,
          opacity: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power2.out',
        })
      },
    })

    // Steps
    ScrollTrigger.create({
      trigger: '.steps-grid',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.from('.step-item', {
          y: 30,
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: 'power2.out',
        })
      },
    })
  }, { scope: mainRef })

  const scrollTo = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div ref={mainRef}>
      {/* HEADER */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerScrolled ? 'bg-canvas/95 backdrop-blur-md border-b border-hairline' : 'bg-transparent'}`}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between">
          <a href="#" className="flex items-center gap-1" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
            <span className="text-base sm:text-lg font-bold text-ink tracking-tight">CHALLENGER</span>
            <span className="text-gold font-bold text-base sm:text-lg">·</span>
            <span className="text-base sm:text-lg font-bold text-gold tracking-tight">DETAIL</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {['Serviços', 'Galeria', 'Contato'].map(item => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))} className="text-sm font-medium text-body hover:text-gold transition-colors bg-transparent border-0 cursor-pointer">
                {item}
              </button>
            ))}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-gold text-on-gold font-semibold text-xs uppercase tracking-[1.5px] px-6 py-3 hover:bg-gold-hover transition-colors">
              AGENDAR AGORA
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-ink bg-transparent border-0 p-2 cursor-pointer" aria-label="Menu">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-canvas/98 backdrop-blur-xl border-t border-hairline">
            <div className="px-4 py-6 flex flex-col gap-4">
              {['Serviços', 'Galeria', 'Contato'].map(item => (
                <button key={item} onClick={() => scrollTo(item.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''))} className="text-left text-base font-medium text-body hover:text-gold transition-colors bg-transparent border-0 cursor-pointer py-2">
                  {item}
                </button>
              ))}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-gold text-on-gold font-semibold text-sm uppercase tracking-[1.5px] px-6 py-3.5 text-center mt-2 hover:bg-gold-hover transition-colors">
                AGENDAR AGORA
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* HERO */}
        <section className="relative w-full min-h-svh overflow-hidden flex items-end sm:items-center" id="hero">
          <img src={HERO_IMG} alt="Carro escuro em estúdio de estética automotiva" className="absolute inset-0 w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/80 to-transparent max-md:bg-gradient-to-t max-md:from-canvas max-md:via-canvas/70 max-md:to-canvas/20" />
          {/* noise overlay — anti-cara-de-IA microdetalhe */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%270 0 256 256%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.9%27 numOctaves=%274%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")', backgroundRepeat: 'repeat' }} />

          <div className="hero-content relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full pb-16 sm:pb-0 sm:pt-0">
            <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] text-gold mb-3 sm:mb-4">
              Estética Automotiva Premium
            </p>
            <div className="w-10 h-[2px] bg-gold mb-4 sm:mb-5" />
            <h1 className="text-[2rem] sm:text-5xl lg:text-[64px] font-extrabold text-ink leading-[1.08] tracking-tight sm:tracking-[-1.5px]">
              Seu carro merece<br />o tratamento Challenger
            </h1>
            <p className="text-base sm:text-lg text-body max-w-[520px] leading-relaxed mt-4 sm:mt-5">
              Vitrificação, polimento e proteção completa na Zona Norte de São Paulo. Mais de 350 avaliações 5 estrelas.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-gold text-on-gold text-sm font-semibold uppercase tracking-[1.5px] px-8 py-3.5 hover:bg-gold-hover transition-colors inline-flex items-center justify-center gap-2">
                Agendar Agora <span aria-hidden>→</span>
              </a>
              <button onClick={() => scrollTo('servicos')} className="border border-gold text-gold bg-transparent text-sm font-semibold uppercase tracking-[1.5px] px-8 py-3.5 hover:bg-gold/10 transition-colors cursor-pointer inline-flex items-center justify-center gap-2">
                Ver Serviços <span aria-hidden>↓</span>
              </button>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="w-full bg-surface border-y border-hairline">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-3 gap-4 sm:gap-0">
            <div className="flex flex-col items-center text-center">
              <div className="stat-num text-2xl sm:text-[48px] font-extrabold text-ink leading-none" data-value="350">+350</div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase text-body tracking-[2px] sm:tracking-[2.5px] mt-1.5 sm:mt-2">
                Avaliações 5★
              </div>
            </div>
            <div className="flex flex-col items-center text-center border-x border-hairline">
              <div className="text-2xl sm:text-[48px] font-extrabold text-ink leading-none">6</div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase text-body tracking-[2px] sm:tracking-[2.5px] mt-1.5 sm:mt-2">
                Serviços
              </div>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <MapPin size={16} className="text-gold sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-lg font-bold text-ink">Zona Norte</span>
              </div>
              <div className="text-[10px] sm:text-xs font-semibold uppercase text-body tracking-[2px] sm:tracking-[2.5px] mt-1.5 sm:mt-2">
                Av. Água Fria, SP
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="bg-canvas py-16 sm:py-24" id="servicos">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="reveal">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] text-gold block">
                O que fazemos
              </span>
              <h2 className="text-2xl sm:text-[40px] font-bold text-ink tracking-tight mt-2 sm:mt-3 mb-8 sm:mb-12">
                Nossos Serviços
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {services.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="service-card bg-surface border border-hairline p-6 sm:p-8 flex flex-col hover:border-gold/40 transition-colors duration-300 group">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-canvas border border-hairline flex items-center justify-center mb-4 sm:mb-5">
                    <Icon size={20} className="text-ink sm:w-6 sm:h-6" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-ink mb-1.5 sm:mb-2 group-hover:text-gold transition-colors">
                    {title}
                  </h3>
                  <p className="text-sm sm:text-base text-body leading-relaxed flex-1">
                    {desc}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="bg-canvas py-16 sm:py-24" id="galeria">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="reveal">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] text-gold block">
                Resultados Reais
              </span>
              <h2 className="text-2xl sm:text-[40px] font-bold text-ink tracking-tight mt-2 sm:mt-3">
                Transformações que Falam por Si
              </h2>
            </div>
            {/* Asymmetric grid — anti-cara-de-IA: gap irregular */}
            <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-3 sm:gap-4 md:h-[420px]">
              <div className="gallery-img h-56 sm:h-72 md:h-full border border-hairline overflow-hidden">
                <img src={GALLERY_1} alt="Carro escuro brilhando após polimento" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
              </div>
              <div className="flex flex-col gap-3 sm:gap-4 md:h-full">
                <div className="gallery-img h-40 sm:h-48 md:flex-1 border border-hairline overflow-hidden">
                  <img src={GALLERY_2} alt="Close-up de capô vitrificado" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                </div>
                <div className="gallery-img h-40 sm:h-48 md:flex-1 border border-hairline overflow-hidden">
                  <img src={GALLERY_3} alt="Interior higienizado" className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                </div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-muted italic mt-4 sm:mt-6">
              Mais de 350 clientes satisfeitos na Zona Norte de SP
            </p>
          </div>
        </section>

        {/* FULL-BLEED SURPRISE — anti-cara-de-IA princípio 6 */}
        <section className="w-full bg-gold py-6 sm:py-8 reveal">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
            <p className="text-on-gold text-lg sm:text-2xl font-bold tracking-tight text-center sm:text-left">
              Seu carro não é genérico. O tratamento também não.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-on-gold text-gold text-xs sm:text-sm font-bold uppercase tracking-[1.5px] px-6 py-3 hover:bg-canvas/90 transition-colors whitespace-nowrap">
              Agendar →
            </a>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-surface border-t border-hairline py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="reveal text-center">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] text-gold block">
                Simples Assim
              </span>
              <h2 className="text-2xl sm:text-[40px] font-bold text-ink tracking-tight mt-2 sm:mt-3">
                Como Funciona
              </h2>
            </div>
            <div className="steps-grid mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {steps.map(({ num, icon: Icon, title, desc }) => (
                <div key={num} className="step-item flex flex-col items-center text-center">
                  <span className="text-sm font-semibold text-gold mb-2">{num}</span>
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-canvas border border-hairline flex items-center justify-center mb-4">
                    <Icon size={24} className="text-ink sm:w-7 sm:h-7" strokeWidth={1.75} />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-ink mb-1">{title}</h3>
                  <p className="text-xs sm:text-sm text-body leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-canvas py-16 sm:py-24" id="contato">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center reveal">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[2.5px] text-gold block">
              Não Espere
            </span>
            <h2 className="text-2xl sm:text-[40px] font-bold text-ink tracking-tight mt-2 sm:mt-3">
              Agende o Tratamento do Seu Carro
            </h2>
            <p className="text-base sm:text-lg text-body max-w-[480px] mx-auto leading-relaxed mt-3 sm:mt-4">
              Fale direto com a equipe Challenger pelo WhatsApp. Sem complicação.
            </p>
            <div className="mt-6 sm:mt-8">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="bg-gold text-on-gold text-sm sm:text-base font-bold uppercase tracking-wider px-10 sm:px-12 py-4 sm:py-[18px] hover:bg-gold-hover transition-colors inline-block shadow-[0_4px_24px_rgba(201,168,76,0.2)]">
                Chamar no WhatsApp →
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-canvas border-t border-hairline py-8 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 sm:gap-0">
          <div>
            <div className="text-base font-bold tracking-tight">
              <span className="text-ink">CHALLENGER</span>
              <span className="text-gold mx-1">·</span>
              <span className="text-gold">DETAIL</span>
            </div>
            <p className="text-sm text-body mt-1.5">Av. Água Fria, 924 — São Paulo, SP</p>
            <a href="https://instagram.com/challenger_detail" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-gold transition-colors mt-0.5 inline-flex items-center gap-1">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> @challenger_detail
            </a>
          </div>
          <div className="text-xs text-muted">
            © 2026 Challenger Estética Automotiva
          </div>
        </div>
      </footer>

      {/* WHATSAPP STICKY */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
        aria-label="WhatsApp"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

export default App
