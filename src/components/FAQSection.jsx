import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'Apakah hewan sudah memenuhi syarat qurban?',
    a: 'Ya, semua hewan qurban kami telah memenuhi syarat syariat Islam. Kambing/domba berusia minimal 1 tahun, sehat, tidak cacat, dan dalam kondisi prima. Setiap hewan diperiksa oleh peternak berpengalaman sebelum dijual.',
  },
  {
    q: 'Bagaimana cara pemesanan dan pembayaran?',
    a: 'Pemesanan dilakukan melalui WhatsApp. Setelah sepakat, kami akan mengirimkan nomor rekening untuk pembayaran DP minimal 50%. Pelunasan dilakukan H-3 sebelum Idul Adha. Kami menerima transfer bank, QRIS, dan tunai.',
  },
  {
    q: 'Apakah bisa diantar ke lokasi?',
    a: 'Bisa! Kami menyediakan layanan antar untuk wilayah Jabodetabek dan sekitarnya. Biaya pengiriman disesuaikan dengan jarak. Silakan hubungi kami via WhatsApp untuk informasi tarif antar ke lokasi Anda.',
  },
  {
    q: 'Kapan batas waktu pemesanan?',
    a: 'Batas waktu pemesanan adalah H-7 sebelum Idul Adha atau selama stok masih tersedia. Kami sangat menyarankan memesan lebih awal karena stok terbatas dan cepat habis setiap tahunnya.',
  },
  {
    q: 'Apakah ada garansi kesehatan hewan?',
    a: 'Tentu! Kami memberikan garansi bahwa hewan dalam kondisi sehat saat diserahkan. Setiap hewan dilengkapi surat keterangan sehat dari dokter hewan. Jika ada masalah kesehatan sebelum penyerahan, kami akan ganti dengan hewan lain.',
  },
  {
    q: 'Bagaimana jika hewan yang saya pesan terjual ke orang lain?',
    a: 'Tidak akan terjadi! Setelah Anda melakukan pembayaran DP, hewan langsung kami tandai "Sudah Dipesan" dan tidak akan dijual ke pihak lain. Itulah mengapa kami sarankan segera konfirmasi setelah memilih hewan favorit Anda.',
  },
]

function FAQItem({ item, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-4 py-5 text-left"
      >
        <span
          className="text-sm font-semibold leading-snug transition-colors duration-200"
          style={{ color: isOpen ? '#1a6b3a' : '#1a1a1a' }}
        >
          {item.q}
        </span>
        <ChevronDown
          size={18}
          className="shrink-0 mt-0.5 text-gray-400 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Accordion content */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? '400px' : '0px', opacity: isOpen ? 1 : 0 }}
      >
        <p className="pb-5 text-sm leading-relaxed" style={{ color: '#6b7280' }}>
          {item.a}
        </p>
      </div>
    </div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-tag">— Pertanyaan Umum</p>
          <h2 className="section-title">FAQ</h2>
          <p className="text-sm text-gray-500 mt-2">Jawaban atas pertanyaan yang sering ditanyakan</p>
        </div>

        {/* Accordion */}
        <div
          className="rounded-xl border border-gray-200 px-6"
          style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
        >
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
