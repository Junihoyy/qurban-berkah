import { Ruler, Weight, MessageCircle } from 'lucide-react'
import { formatRupiah } from '../utils/formatRupiah'
import { generateWhatsAppLink } from '../utils/whatsappLink'

export default function AnimalCard({ animal }) {
  const isSold = animal.is_sold
  const isKambing = animal.type?.toLowerCase() === 'kambing'

  const waLink = generateWhatsAppLink(animal)

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 overflow-hidden card-hover"
      style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
    >
      {/* Photo */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
        {animal.photo_url ? (
          <img
            src={animal.photo_url}
            alt={animal.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center"
            style={{ backgroundColor: '#f3f4f6' }}
          >
            <span className="text-5xl">{isKambing ? '🐐' : '🐑'}</span>
            <span className="text-xs text-gray-400 mt-2">Foto belum tersedia</span>
          </div>
        )}

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
            <span
              className="px-4 py-2 text-white font-bold text-sm tracking-widest rounded-lg"
              style={{ backgroundColor: '#e53e3e', letterSpacing: '0.15em' }}
            >
              TERJUAL
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Badge tipe */}
        <span className={isKambing ? 'badge-kambing' : 'badge-domba'}>
          {isKambing ? '🐐 Kambing' : '🐑 Domba'}
        </span>

        {/* Nama */}
        <h3 className="font-semibold text-gray-900 mt-2 mb-2 text-sm leading-snug line-clamp-2">
          {animal.name}
        </h3>

        {/* Spesifikasi */}
        <div className="space-y-1 mb-3">
          {animal.height_cm && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Ruler size={12} className="text-gray-400 shrink-0" />
              <span>Tinggi: {animal.height_cm} cm</span>
            </div>
          )}
          {animal.weight_kg && (
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Weight size={12} className="text-gray-400 shrink-0" />
              <span>Berat: {animal.weight_kg} kg</span>
            </div>
          )}
        </div>

        {/* Harga */}
        <div
          className="text-base font-bold mb-3"
          style={{ color: isSold ? '#9ca3af' : '#1a6b3a' }}
        >
          {formatRupiah(animal.price)}
        </div>

        {/* CTA Button */}
        {isSold ? (
          <button
            disabled
            className="w-full py-2.5 rounded-lg text-sm font-semibold cursor-not-allowed"
            style={{ backgroundColor: '#f3f4f6', color: '#9ca3af' }}
          >
            Habis Terjual
          </button>
        ) : (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            style={{ backgroundColor: '#25d366' }}
          >
            <MessageCircle size={15} />
            Pesan via WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
