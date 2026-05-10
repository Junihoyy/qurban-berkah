import { MessageCircle } from 'lucide-react'
import { generateWhatsAppGeneral } from '../utils/whatsappLink'

const trustItems = [
  '✓ Terpercaya & Bersertifikat',
  '⚡ Respon Cepat via WA',
  '🚚 Layanan Antar ke Lokasi',
]

export default function CTASection() {
  return (
    <section
      className="relative overflow-hidden text-center"
      style={{ backgroundColor: '#1a6b3a', padding: '40px 20px' }}
    >
      {/* Decorative circles */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(201,168,76,0.10) 0%, transparent 70%)',
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

      <div className="relative max-w-xl mx-auto">
        {/* Title */}
        <h2 className="font-bold text-white mb-3" style={{ fontSize: 'clamp(22px, 4vw, 32px)' }}>
          Jangan Sampai Kehabisan! 🐐
        </h2>
        <p
          className="mb-8 leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}
        >
          Stok terbatas — amankan hewan qurban pilihan Anda sekarang sebelum kehabisan
        </p>

        {/* CTA button */}
        <a
          href={generateWhatsAppGeneral()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 font-bold rounded-xl transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            backgroundColor: '#c9a84c',
            color: '#0d4a27',
            padding: '14px 28px',
            fontSize: '15px',
            boxShadow: '0 4px 20px rgba(201,168,76,0.4)',
          }}
        >
          <MessageCircle size={20} />
          Pesan Sekarang via WhatsApp
        </a>

        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-8">
          {trustItems.map((item) => (
            <span
              key={item}
              style={{ color: 'rgba(255,255,255,0.65)', fontSize: '12px' }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
