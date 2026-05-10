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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ padding: '28px 20px' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Kolom 1 — Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-base shrink-0"
                style={{ backgroundColor: '#c9a84c' }}
              >
                🌙
              </div>
              <span className="font-semibold" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                Qurban Berkah
              </span>
            </div>
            <p
              className="leading-relaxed mb-3"
              style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}
            >
              Langsung dari Peternak, Terpercaya &amp; Terawat. Kami hadir untuk membantu Anda menunaikan ibadah qurban dengan hewan pilihan terbaik.
            </p>
            <div
              className="inline-flex items-center px-3 py-1.5 rounded-full"
              style={{
                backgroundColor: 'rgba(201,168,76,0.15)',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#c9a84c',
                fontSize: '11px',
                fontWeight: '500',
              }}
            >
              ✦ Idul Adha 1446 H
            </div>
          </div>

          {/* Kolom 2 — Navigasi */}
          <div>
            <h4
              className="uppercase tracking-wider mb-3"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '600' }}
            >
              Navigasi
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-left transition-colors hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/kelola-qurban"
                  className="transition-colors hover:text-white"
                  style={{ color: 'rgba(255,255,255,0.55)', fontSize: '13px' }}
                >
                  Panel Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3 — Kontak */}
          <div>
            <h4
              className="uppercase tracking-wider mb-3"
              style={{ color: 'rgba(255,255,255,0.85)', fontSize: '11px', fontWeight: '600' }}
            >
              Kontak
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="text-sm mt-0.5">📱</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px' }} className="mb-0.5">WhatsApp</p>
                  <a
                    href={generateWhatsAppGeneral()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}
                  >
                    +62 857-1601-1258
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sm mt-0.5">⏰</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px' }} className="mb-0.5">Jam Operasional</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>
                    Senin – Minggu, 07.00 – 21.00 WIB
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sm mt-0.5">📍</span>
                <div>
                  <p style={{ color: 'rgba(255,255,255,0.40)', fontSize: '11px' }} className="mb-0.5">Lokasi</p>
                  <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '13px' }}>Indonesia</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          className="mt-8 pt-5 text-center"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}
        >
          © {year} Qurban Berkah. Seluruh hak dilindungi undang-undang.
        </div>
      </div>
    </footer>
  )
}
