import { ChevronDown } from 'lucide-react'

const PRICE_OPTIONS = [
  { label: 'Semua Harga', value: 'all' },
  { label: 'Di bawah Rp 2 juta', value: 'under2' },
  { label: 'Rp 2 juta – Rp 3 juta', value: '2to3' },
  { label: 'Rp 3 juta – Rp 5 juta', value: '3to5' },
  { label: 'Di atas Rp 5 juta', value: 'above5' },
]

const TYPE_OPTIONS = [
  { label: 'Semua', value: 'all' },
  { label: '🐐 Kambing', value: 'kambing' },
  { label: '🐑 Domba', value: 'domba' },
]

export default function FilterBar({ search, setSearch, typeFilter, setTypeFilter, priceFilter, setPriceFilter }) {
  return (
    <div
      className="bg-white mb-6 space-y-3"
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      {/* Search input */}
      <input
        type="text"
        placeholder="🔍 Cari nama hewan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full focus:outline-none transition-all"
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          padding: '9px 14px',
          fontSize: '13px',
          color: '#374151',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = '#1a6b3a')}
        onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
      />

      {/* Type toggle + price dropdown */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type toggle buttons */}
        <div className="flex gap-1.5 flex-wrap">
          {TYPE_OPTIONS.map((opt) => {
            const isActive = typeFilter === opt.value
            return (
              <button
                key={opt.value}
                onClick={() => setTypeFilter(opt.value)}
                className="font-medium transition-all duration-150"
                style={{
                  padding: '6px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  border: isActive ? 'none' : '1px solid #e5e7eb',
                  backgroundColor: isActive ? '#1a6b3a' : 'white',
                  color: isActive ? 'white' : '#6b7280',
                }}
              >
                {opt.label}
              </button>
            )
          })}
        </div>

        {/* Price dropdown */}
        <div className="relative ml-auto">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="appearance-none bg-white cursor-pointer focus:outline-none"
            style={{
              padding: '6px 32px 6px 12px',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontSize: '13px',
              color: '#6b7280',
            }}
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
