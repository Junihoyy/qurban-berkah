import { generateWhatsAppGeneral } from '../utils/whatsappLink'

const stats = [
  { value: '50+', label: 'Hewan' },
  { value: '200+', label: 'Pelanggan' },
  { value: '5 Thn', label: 'Pengalaman' },
]

const badges = [
  '✅ Sehat & Terawat',
  '⚖️ Berat Terukur',
  '🚚 Bisa Antar',
]

export default function HeroSection() {
  const handleShopClick = () => {
    const el = document.querySelector('#shop')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center overflow-hidden pt-14"
      style={{
        background: 'linear-gradient(135deg, #1a6b3a 0%, #0d4a27 100%)',
      }}
    >
      {/* Decorative blur circles */}
      <div
        className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        {/* Pill tag */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium"
          style={{
            backgroundColor: 'rgba(201,168,76,0.15)',
            border: '1px solid rgba(201,168,76,0.4)',
            color: '#c9a84c',
          }}
        >
          ✦ Idul Adha 1446 H
        </div>

        {/* H1 */}
        <h1
          className="font-bold text-white leading-tight mb-5"
          style={{ fontSize: 'clamp(28px, 5vw, 52px)' }}
        >
          Hewan Qurban{' '}
          <span style={{ color: '#c9a84c' }}>Terpercaya</span>
          ,<br className="hidden sm:block" /> Langsung dari Peternak
        </h1>

        {/* Subtitle */}
        <p
          className="max-w-xl mx-auto mb-8 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}
        >
          Langsung dari Peternak, Terpercaya &amp; Terawat — pilih hewan qurban terbaik dengan bobot terukur dan harga transparan.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
          <button
            onClick={handleShopClick}
            className="font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              backgroundColor: '#c9a84c',
              color: '#0d4a27',
              padding: '10px 20px',
              fontSize: '14px',
            }}
          >
            Lihat Hewan Qurban
          </button>
          <a
            href={generateWhatsAppGeneral()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold rounded-lg transition-all duration-200 hover:bg-white hover:text-primary hover:scale-[1.02] active:scale-[0.98]"
            style={{
              border: '1px solid rgba(255,255,255,0.85)',
              color: 'white',
              padding: '10px 20px',
              fontSize: '14px',
            }}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Badges keunggulan */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {badges.map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 rounded-full font-medium"
              style={{
                backgroundColor: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.80)',
                fontSize: '13px',
              }}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div
          className="inline-flex flex-wrap justify-center gap-0 rounded-2xl px-4 py-3"
          style={{
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="px-5 text-center">
                <div className="text-xl font-bold" style={{ color: '#c9a84c' }}>
                  {stat.value}
                </div>
                <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.60)' }}>
                  {stat.label}
                </div>
              </div>
              {i < stats.length - 1 && (
                <div className="w-px h-8 self-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 60L1440 60L1440 20C1200 60 960 0 720 20C480 40 240 0 0 20L0 60Z" fill="#f9fafb" />
        </svg>
      </div>
    </section>
  )
}
