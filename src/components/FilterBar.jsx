import { Search, ChevronDown } from 'lucide-react'

const PRICE_OPTIONS = [
  { label: 'Semua Harga', value: 'all' },
  { label: 'Di bawah Rp 2 juta', value: 'under2' },
  { label: 'Rp 2 juta – Rp 3 juta', value: '2to3' },
  { label: 'Rp 3 juta – Rp 5 juta', value: '3to5' },
  { label: 'Di atas Rp 5 juta', value: 'above5' },
]

export default function FilterBar({ search, setSearch, typeFilter, setTypeFilter, priceFilter, setPriceFilter }) {
  const typeOptions = [
    { label: 'Semua', value: 'all' },
    { label: '🐐 Kambing', value: 'kambing' },
    { label: '🐑 Domba', value: 'domba' },
  ]

  return (
    <div
      className="bg-white rounded-xl p-4 mb-8 space-y-3"
      style={{ border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
    >
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="🔍 Cari nama hewan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
        />
      </div>

      {/* Type toggle + price dropdown */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type toggles */}
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          {typeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setTypeFilter(opt.value)}
              className={`px-3 py-2 text-sm font-medium transition-all duration-150 ${
                typeFilter === opt.value
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Price dropdown */}
        <div className="relative ml-auto">
          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="appearance-none pl-3 pr-8 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all cursor-pointer"
          >
            {PRICE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  )
}
