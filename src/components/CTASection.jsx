import { MessageCircle } from 'lucide-react'
import { generateWhatsAppGeneral } from '../utils/whatsappLink'

const trustBadges = ['✓ Terpercaya', '⚡ Respon Cepat', '🚚 Bisa Antar']

export default function CTASection() {
  return (
    <section
      className="py-20 relative overflow-hidden"
      style={{ backgroundColor: '#1a6b3a' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)',
          transform: 'translate(30%, -30%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
          transform: 'translate(-30%, 30%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
          Jangan Sampai Kehabisan! 🐐
        </h2>
        <p
          className="text-base sm:text-lg mb-8 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)' }}
        >
          Stok terbatas — amankan hewan qurban pilihan Anda sekarang sebelum kehabisan
        </p>

        {/* CTA button */}
        <a
          href={generateWhatsAppGeneral()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            backgroundColor: '#c9a84c',
            color: '#0d4a27',
            boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
          }}
        >
          <MessageCircle size={20} />
          Pesan Sekarang via WhatsApp
        </a>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
          {trustBadges.map((badge) => (
            <span key={badge} className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
              {badge}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
