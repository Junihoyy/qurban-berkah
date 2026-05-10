import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import AdminSidebar from '../../components/AdminSidebar'
import { formatRupiah } from '../../utils/formatRupiah'
import { Package, CheckCircle, XCircle, PlusCircle } from 'lucide-react'

function StatCard({ icon: Icon, label, value, color, bgColor }) {
  return (
    <div
      className="bg-white"
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-gray-500" style={{ fontSize: '13px' }}>{label}</p>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: bgColor }}
        >
          <Icon size={18} style={{ color }} />
        </div>
      </div>
      <p className="font-bold text-gray-900" style={{ fontSize: '28px' }}>{value}</p>
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

      <main className="md:ml-60 pb-20 md:pb-0">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-bold text-gray-900" style={{ fontSize: '18px' }}>Dashboard</h1>
              <p className="text-gray-500 mt-0.5" style={{ fontSize: '13px' }}>Ringkasan data hewan qurban</p>
            </div>
            <Link
              to="/kelola-qurban/tambah"
              className="flex items-center gap-2 text-white font-semibold transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: '#1a6b3a',
                borderRadius: '8px',
                padding: '8px 16px',
                fontSize: '13px',
              }}
            >
              <PlusCircle size={15} />
              Tambah Hewan
            </Link>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <StatCard icon={Package} label="Total Hewan" value={loading ? '–' : total}
              color="#3b82f6" bgColor="#eff6ff" />
            <StatCard icon={CheckCircle} label="Tersedia" value={loading ? '–' : tersedia}
              color="#1a6b3a" bgColor="#f0fdf4" />
            <StatCard icon={XCircle} label="Terjual" value={loading ? '–' : terjual}
              color="#e53e3e" bgColor="#fff5f5" />
          </div>

          {/* Recent animals table */}
          <div
            className="bg-white overflow-hidden"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div
              className="flex items-center justify-between px-5 py-3.5"
              style={{ borderBottom: '1px solid #f3f4f6' }}
            >
              <h2 className="font-semibold text-gray-900" style={{ fontSize: '13px' }}>5 Hewan Terbaru</h2>
              <Link
                to="/kelola-qurban/hewan"
                className="font-medium hover:underline"
                style={{ color: '#1a6b3a', fontSize: '12px' }}
              >
                Lihat semua →
              </Link>
            </div>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-400" style={{ fontSize: '13px' }}>Memuat data...</div>
              ) : recent.length === 0 ? (
                <div className="p-8 text-center text-gray-400" style={{ fontSize: '13px' }}>Belum ada data hewan</div>
              ) : (
                <table className="w-full" style={{ fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                      {['Hewan', 'Tipe', 'Harga', 'Status'].map((h) => (
                        <th
                          key={h}
                          className="font-semibold text-gray-500 uppercase tracking-wide"
                          style={{ padding: '10px 20px', fontSize: '11px' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((a) => (
                      <tr
                        key={a.id}
                        style={{ borderTop: '1px solid #f3f4f6', transition: 'background 150ms' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td style={{ padding: '10px 20px' }}>
                          <div className="flex items-center gap-3">
                            <div
                              className="rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                              style={{ width: '36px', height: '36px', backgroundColor: '#f3f4f6' }}
                            >
                              {a.photo_url
                                ? <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                                : <span className="text-base">{a.type === 'kambing' ? '🐐' : '🐑'}</span>
                              }
                            </div>
                            <span className="font-medium text-gray-800">{a.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: '10px 20px' }}>
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: a.type === 'kambing' ? '#e8f5e9' : '#fff8e1',
                              color: a.type === 'kambing' ? '#1a6b3a' : '#8a6200',
                              fontSize: '11px',
                            }}
                          >
                            {a.type === 'kambing' ? 'Kambing' : 'Domba'}
                          </span>
                        </td>
                        <td className="font-semibold" style={{ padding: '10px 20px', color: '#1a6b3a' }}>
                          {formatRupiah(a.price)}
                        </td>
                        <td style={{ padding: '10px 20px' }}>
                          <span
                            className="inline-block px-2.5 py-0.5 rounded-full font-medium"
                            style={{
                              backgroundColor: a.is_sold ? '#fee2e2' : '#dcfce7',
                              color: a.is_sold ? '#991b1b' : '#166534',
                              fontSize: '11px',
                            }}
                          >
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
