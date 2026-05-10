import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Shop', href: '#shop' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href) => {
    setIsMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: '#1a6b3a',
          boxShadow: isScrolled ? '0 2px 20px rgba(0,0,0,0.2)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-lg font-bold"
                style={{ backgroundColor: '#c9a84c', color: '#0d4a27' }}
              >
                🌙
              </div>
              <span className="text-white font-bold text-lg tracking-tight">
                Qurban Berkah
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-[#c9a84c]"
                  style={{ color: 'rgba(255,255,255,0.85)' }}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Right: LIVE badge + hamburger */}
            <div className="flex items-center gap-3">
              {/* LIVE Badge */}
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-bold"
                style={{ backgroundColor: '#e53e3e' }}
              >
                <span className="w-2 h-2 rounded-full bg-white pulse-dot inline-block" />
                LIVE
              </div>

              {/* Mobile hamburger */}
              <button
                className="md:hidden text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                aria-label="Toggle menu"
              >
                {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsMobileOpen(false)}
        />

        {/* Drawer from right */}
        <div
          className={`absolute top-0 right-0 h-full w-64 transition-transform duration-300 ${
            isMobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ backgroundColor: '#0d4a27' }}
        >
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <span className="text-white font-bold">Menu</span>
            <button
              className="text-white p-1 rounded hover:bg-white/10"
              onClick={() => setIsMobileOpen(false)}
            >
              <X size={20} />
            </button>
          </div>
          <div className="p-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-4 py-3 rounded-lg text-sm font-medium transition-all hover:bg-white/10"
                style={{ color: 'rgba(255,255,255,0.85)' }}
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
