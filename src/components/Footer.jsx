import { generateWhatsAppGeneral } from '../utils/whatsappLink'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Shop', href: '#shop' },
  { label: 'FAQ', href: '#faq' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const handleNavClick = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ backgroundColor: '#0d4a27' }}>
      {/* Top separator */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Kolom 1 — Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg"
                style={{ backgroundColor: '#c9a84c' }}
              >
                🌙
              </div>
              <span className="text-white font-bold text-lg">Qurban Berkah</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Langsung dari Peternak, Terpercaya & Terawat. Kami hadir untuk membantu Anda menunaikan ibadah qurban dengan hewan pilihan terbaik.
            </p>
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(201,168,76,0.2)', color: '#c9a84c', border: '1px solid rgba(201,168,76,0.3)' }}
              >
                ✦ Idul Adha 1446 H
              </span>
            </div>
          </div>

          {/* Kolom 2 — Navigasi */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Navigasi
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm transition-colors hover:text-white text-left"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/kelola-qurban"
                  className="text-sm transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.55)' }}
                >
                  Panel Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 — Kontak */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Kontak
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">📱</span>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>WhatsApp</p>
                  <a
                    href={generateWhatsAppGeneral()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                  >
                    +62 857-1601-1258
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">⏰</span>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Jam Operasional</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    Senin – Minggu, 07.00 – 21.00 WIB
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-base mt-0.5">📍</span>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Lokasi</p>
                  <p className="text-sm" style={{ color: 'rgba(255,255,255,0.75)' }}>
                    Indonesia
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-12 pt-6 text-center text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)' }}
        >
          © {year} Qurban Berkah. Seluruh hak dilindungi undang-undang.
        </div>
      </div>
    </footer>
  )
}
