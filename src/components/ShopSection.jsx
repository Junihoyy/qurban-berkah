import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import FilterBar from './FilterBar'
import AnimalCard from './AnimalCard'
import SkeletonCard from './SkeletonCard'

function EmptyState({ hasFilter }) {
  return (
    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
      <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-4 opacity-40">
        <circle cx="60" cy="60" r="55" fill="#e8f5e9" />
        <text x="50%" y="54%" dominantBaseline="middle" textAnchor="middle" fontSize="48">
          {hasFilter ? '🔍' : '🐐'}
        </text>
      </svg>
      <h3 className="text-base font-semibold text-gray-700 mb-1">
        {hasFilter ? 'Tidak ada hewan yang sesuai filter' : 'Belum ada hewan tersedia'}
      </h3>
      <p className="text-sm text-gray-400">
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

    // Realtime subscription
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
    <section id="shop" className="py-20" style={{ backgroundColor: '#f9fafb' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <p className="section-tag">— Pilihan Terbaik</p>
          <h2 className="section-title">Shop Hewan Qurban</h2>
          <p className="text-sm text-gray-500 mt-2">Temukan hewan qurban sesuai budget Anda</p>
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
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5">
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
          <p className="text-center text-sm text-gray-400 mt-6">
            Menampilkan <span className="font-semibold text-primary">{filtered.length}</span> hewan
          </p>
        )}
      </div>
    </section>
  )
}
