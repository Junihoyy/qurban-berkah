import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminSidebar from '../../components/AdminSidebar'
import { formatRupiah } from '../../utils/formatRupiah'
import { Package, CheckCircle, XCircle, PlusCircle } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color, bgColor }) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-200" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: bgColor }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default function DashboardPage() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('animals')
        .select('*')
        .order('created_at', { ascending: false })
      setAnimals(data || [])
      setLoading(false)
    }
    fetch()
  }, [])

  const total = animals.length
  const tersedia = animals.filter((a) => !a.is_sold).length
  const terjual = animals.filter((a) => a.is_sold).length
  const recent = animals.slice(0, 5)

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <AdminSidebar />

      {/* Main content offset for sidebar */}
      <main className="md:ml-60 pb-20 md:pb-0">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-sm text-gray-500 mt-0.5">Ringkasan data hewan qurban</p>
            </div>
            <Link
              to="/kelola-qurban/tambah"
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all hover:scale-[1.02]"
              style={{ backgroundColor: '#1a6b3a' }}
            >
              <PlusCircle size={16} />
              Tambah Hewan
            </Link>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <StatCard icon={Package} label="Total Hewan" value={loading ? '...' : total}
              color="#3b82f6" bgColor="#eff6ff" />
            <StatCard icon={CheckCircle} label="Tersedia" value={loading ? '...' : tersedia}
              color="#1a6b3a" bgColor="#f0fdf4" />
            <StatCard icon={XCircle} label="Terjual" value={loading ? '...' : terjual}
              color="#e53e3e" bgColor="#fff5f5" />
          </div>

          {/* Recent animals table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-semibold text-gray-900">5 Hewan Terbaru</h2>
              <Link to="/kelola-qurban/hewan" className="text-xs font-medium text-primary hover:underline">
                Lihat semua →
              </Link>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-sm text-gray-400">Memuat data...</div>
              ) : recent.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-400">Belum ada data hewan</div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Hewan</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Tipe</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Harga</th>
                      <th className="px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {recent.map((a) => (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                              {a.photo_url
                                ? <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                                : <span className="text-lg">{a.type === 'kambing' ? '🐐' : '🐑'}</span>
                              }
                            </div>
                            <span className="font-medium text-gray-800">{a.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-3">
                          <span className={a.type === 'kambing' ? 'badge-kambing' : 'badge-domba'}>
                            {a.type === 'kambing' ? 'Kambing' : 'Domba'}
                          </span>
                        </td>
                        <td className="px-5 py-3 font-semibold" style={{ color: '#1a6b3a' }}>
                          {formatRupiah(a.price)}
                        </td>
                        <td className="px-5 py-3">
                          <span className={a.is_sold ? 'badge-sold' : 'badge-available'}>
                            {a.is_sold ? 'Terjual' : 'Tersedia'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
