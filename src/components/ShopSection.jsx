import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import FilterBar from './FilterBar'
import AnimalCard from './AnimalCard'
import SkeletonCard from './SkeletonCard'

function EmptyState({ hasFilter }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
      <div
        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
        style={{ backgroundColor: '#e8f5e9' }}
      >
        <span className="text-4xl">{hasFilter ? '🔍' : '🐐'}</span>
      </div>
      <h3 className="font-semibold text-gray-700 mb-1" style={{ fontSize: '14px' }}>
        {hasFilter ? 'Tidak ada hewan yang sesuai filter' : 'Belum ada hewan tersedia'}
      </h3>
      <p className="text-gray-400" style={{ fontSize: '13px' }}>
        {hasFilter ? 'Coba ubah filter pencarian Anda' : 'Silakan cek kembali nanti'}
      </p>
    </div>
  )
}

function filterByPrice(price, range) {
  if (range === 'all') return true
  if (range === 'under2') return price < 2_000_000
  if (range === '2to3') return price >= 2_000_000 && price <= 3_000_000
  if (range === '3to5') return price > 3_000_000 && price <= 5_000_000
  if (range === 'above5') return price > 5_000_000
  return true
}

export default function ShopSection() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [priceFilter, setPriceFilter] = useState('all')

  const fetchAnimals = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('animals')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setAnimals(data)
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchAnimals()

    const channel = supabase
      .channel('animals-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'animals' }, () => {
        fetchAnimals()
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [fetchAnimals])

  const filtered = animals.filter((a) => {
    const matchSearch = a.name?.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'all' || a.type?.toLowerCase() === typeFilter
    const matchPrice = filterByPrice(a.price, priceFilter)
    return matchSearch && matchType && matchPrice
  })

  const hasFilter = search !== '' || typeFilter !== 'all' || priceFilter !== 'all'

  return (
    <section id="shop" className="py-8 sm:py-12" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-8">
          <p
            className="font-semibold uppercase tracking-wider mb-1"
            style={{ color: '#1a6b3a', fontSize: '11px' }}
          >
            — Pilihan Terbaik
          </p>
          <h2 className="font-semibold text-gray-900" style={{ fontSize: '20px' }}>
            Shop Hewan Qurban
          </h2>
          <p className="text-gray-500 mt-1" style={{ fontSize: '13px' }}>
            Temukan hewan qurban sesuai budget Anda
          </p>
        </div>

        {/* Filter */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          priceFilter={priceFilter}
          setPriceFilter={setPriceFilter}
        />

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : filtered.length === 0 ? (
            <EmptyState hasFilter={hasFilter} />
          ) : (
            filtered.map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))
          )}
        </div>

        {/* Results count */}
        {!loading && filtered.length > 0 && (
          <p className="text-center text-gray-400 mt-5" style={{ fontSize: '13px' }}>
            Menampilkan <span className="font-semibold" style={{ color: '#1a6b3a' }}>{filtered.length}</span> hewan
          </p>
        )}
      </div>
    </section>
  )
}
