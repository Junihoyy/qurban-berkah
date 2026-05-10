import { Ruler, Weight, MessageCircle } from 'lucide-react'
import { formatRupiah } from '../utils/formatRupiah'
import { generateWhatsAppLink } from '../utils/whatsappLink'

export default function AnimalCard({ animal }) {
  const isSold = animal.is_sold
  const isKambing = animal.type?.toLowerCase() === 'kambing'
  const waLink = generateWhatsAppLink(animal)

  return (
    <div
      className="bg-white overflow-hidden"
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        cursor: 'default',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-3px)'
        e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.14)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)'
      }}
    >
      {/* Photo — height 140px */}
      <div className="relative w-full overflow-hidden" style={{ height: '140px', borderRadius: '12px 12px 0 0' }}>
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
            <span className="text-4xl">{isKambing ? '🐐' : '🐑'}</span>
            <span className="text-xs text-gray-400 mt-1">Foto belum tersedia</span>
          </div>
        )}

        {/* Sold overlay */}
        {isSold && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
            <span
              className="px-4 py-1.5 text-white font-bold tracking-widest rounded"
              style={{ backgroundColor: '#e53e3e', fontSize: '12px' }}
            >
              TERJUAL
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        {/* Badge tipe */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full font-medium"
          style={{
            backgroundColor: isKambing ? '#e8f5e9' : '#fff8e1',
            color: isKambing ? '#1a6b3a' : '#8a6200',
            fontSize: '10px',
          }}
        >
          {isKambing ? '🐐 Kambing' : '🐑 Domba'}
        </span>

        {/* Nama */}
        <h3 className="font-semibold text-gray-900 mt-1.5 mb-1.5 line-clamp-2 leading-snug" style={{ fontSize: '14px' }}>
          {animal.name}
        </h3>

        {/* Spesifikasi */}
        <div className="space-y-0.5 mb-2">
          {animal.height_cm && (
            <div className="flex items-center gap-1.5" style={{ color: '#6b7280', fontSize: '12px' }}>
              <Ruler size={11} className="shrink-0" style={{ color: '#9ca3af' }} />
              <span>Tinggi: {animal.height_cm} cm</span>
            </div>
          )}
          {animal.weight_kg && (
            <div className="flex items-center gap-1.5" style={{ color: '#6b7280', fontSize: '12px' }}>
              <Weight size={11} className="shrink-0" style={{ color: '#9ca3af' }} />
              <span>Berat: {animal.weight_kg} kg</span>
            </div>
          )}
        </div>

        {/* Harga */}
        <div
          className="font-bold mb-2.5"
          style={{ color: isSold ? '#9ca3af' : '#1a6b3a', fontSize: '16px' }}
        >
          {formatRupiah(animal.price)}
        </div>

        {/* CTA Button */}
        {isSold ? (
          <button
            disabled
            className="w-full font-semibold rounded-lg cursor-not-allowed"
            style={{
              backgroundColor: '#f3f4f6',
              color: '#9ca3af',
              padding: '9px',
              fontSize: '13px',
            }}
          >
            Habis Terjual
          </button>
        ) : (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full font-semibold text-white rounded-lg transition-all duration-200 hover:opacity-90 hover:scale-[1.01] active:scale-[0.98]"
            style={{
              backgroundColor: '#25d366',
              padding: '9px',
              fontSize: '13px',
            }}
          >
            <MessageCircle size={14} />
            Pesan via WhatsApp
          </a>
        )}
      </div>
    </div>
  )
}
