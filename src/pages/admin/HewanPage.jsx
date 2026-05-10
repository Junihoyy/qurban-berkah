import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import AdminSidebar from '../../components/AdminSidebar'
import AnimalForm from '../../components/AnimalForm'
import ToastNotification, { useToast } from '../../components/ToastNotification'
import { formatRupiah } from '../../utils/formatRupiah'
import { Search, Pencil, Trash2, CheckCircle, XCircle, X, ChevronLeft, ChevronRight } from 'lucide-react'

const PAGE_SIZE = 10

export default function HewanPage() {
  const [animals, setAnimals] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [editAnimal, setEditAnimal] = useState(null)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [deletingId, setDeletingId] = useState(null)
  const [togglingId, setTogglingId] = useState(null)
  const { toasts, addToast, removeToast } = useToast()

  const fetchAnimals = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('animals').select('*').order('created_at', { ascending: false })
    setAnimals(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchAnimals() }, [fetchAnimals])

  const filtered = animals.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const handleSearch = (val) => { setSearch(val); setPage(1) }

  const handleToggle = async (animal) => {
    setTogglingId(animal.id)
    const { error } = await supabase
      .from('animals')
      .update({ is_sold: !animal.is_sold })
      .eq('id', animal.id)
    if (error) {
      addToast('Gagal mengubah status.', 'error')
    } else {
      setAnimals((prev) =>
        prev.map((a) => a.id === animal.id ? { ...a, is_sold: !a.is_sold } : a)
      )
      addToast(`Status "${animal.name}" diperbarui.`, 'success')
    }
    setTogglingId(null)
  }

  const handleDelete = async () => {
    if (!deleteTarget) return
    setDeletingId(deleteTarget.id)
    const { error } = await supabase.from('animals').delete().eq('id', deleteTarget.id)
    if (error) {
      addToast('Gagal menghapus hewan.', 'error')
    } else {
      setAnimals((prev) => prev.filter((a) => a.id !== deleteTarget.id))
      addToast(`"${deleteTarget.name}" berhasil dihapus.`, 'success')
    }
    setDeleteTarget(null)
    setDeletingId(null)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <AdminSidebar />
      <ToastNotification toasts={toasts} removeToast={removeToast} />

      <main className="md:ml-60 pb-20 md:pb-0">
        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="mb-5">
            <h1 className="font-bold text-gray-900" style={{ fontSize: '18px' }}>Kelola Hewan</h1>
            <p className="text-gray-500 mt-0.5" style={{ fontSize: '13px' }}>Daftar seluruh hewan qurban</p>
          </div>

          {/* Search bar */}
          <div className="relative mb-4 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama hewan..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full bg-white focus:outline-none transition-all"
              style={{
                paddingLeft: '34px',
                paddingRight: '14px',
                paddingTop: '8px',
                paddingBottom: '8px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '13px',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = '#1a6b3a')}
              onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
            />
          </div>

          {/* Table */}
          <div
            className="bg-white overflow-hidden"
            style={{
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-10 text-center text-gray-400" style={{ fontSize: '13px' }}>Memuat data...</div>
              ) : paginated.length === 0 ? (
                <div className="p-10 text-center text-gray-400" style={{ fontSize: '13px' }}>
                  {search ? 'Tidak ditemukan hasil pencarian' : 'Belum ada hewan'}
                </div>
              ) : (
                <table className="w-full" style={{ fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f9fafb', textAlign: 'left' }}>
                      {['No', 'Foto', 'Nama', 'Tipe', 'Harga', 'Tinggi', 'Berat', 'Status', 'Aksi'].map((h) => (
                        <th
                          key={h}
                          className="font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                          style={{ padding: '10px 16px', fontSize: '11px' }}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {paginated.map((a, i) => (
                      <tr
                        key={a.id}
                        style={{ borderTop: '1px solid #f3f4f6', transition: 'background 150ms' }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0fdf4')}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        <td className="text-gray-400" style={{ padding: '10px 16px' }}>
                          {(page - 1) * PAGE_SIZE + i + 1}
                        </td>
                        <td style={{ padding: '10px 16px' }}>
                          <div
                            className="rounded-lg overflow-hidden flex items-center justify-center shrink-0"
                            style={{ width: '38px', height: '38px', backgroundColor: '#f3f4f6' }}
                          >
                            {a.photo_url
                              ? <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                              : <span style={{ fontSize: '18px' }}>{a.type === 'kambing' ? '🐐' : '🐑'}</span>
                            }
                          </div>
                        </td>
                        <td
                          className="font-medium text-gray-800"
                          style={{ padding: '10px 16px', maxWidth: '140px' }}
                        >
                          <p className="truncate">{a.name}</p>
                        </td>
                        <td style={{ padding: '10px 16px' }}>
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
                        <td
                          className="font-semibold whitespace-nowrap"
                          style={{ padding: '10px 16px', color: '#1a6b3a' }}
                        >
                          {formatRupiah(a.price)}
                        </td>
                        <td className="text-gray-600" style={{ padding: '10px 16px' }}>{a.height_cm} cm</td>
                        <td className="text-gray-600" style={{ padding: '10px 16px' }}>{a.weight_kg} kg</td>
                        <td style={{ padding: '10px 16px' }}>
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
                        <td style={{ padding: '10px 16px' }}>
                          <div className="flex items-center gap-1.5">
                            {/* Toggle */}
                            <button
                              onClick={() => handleToggle(a)}
                              disabled={togglingId === a.id}
                              className="p-1.5 rounded-lg border transition-all hover:scale-110 disabled:opacity-50"
                              style={{
                                borderColor: a.is_sold ? '#fecaca' : '#bbf7d0',
                                backgroundColor: a.is_sold ? '#fff5f5' : '#f0fdf4',
                              }}
                              title={a.is_sold ? 'Tandai Tersedia' : 'Tandai Terjual'}
                            >
                              {a.is_sold
                                ? <XCircle size={14} style={{ color: '#e53e3e' }} />
                                : <CheckCircle size={14} style={{ color: '#1a6b3a' }} />
                              }
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditAnimal(a)}
                              className="p-1.5 rounded-lg border transition-all hover:scale-110"
                              style={{
                                borderColor: '#bfdbfe',
                                backgroundColor: '#eff6ff',
                                color: '#3b82f6',
                              }}
                              title="Edit"
                            >
                              <Pencil size={14} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteTarget(a)}
                              className="p-1.5 rounded-lg border transition-all hover:scale-110"
                              style={{
                                borderColor: '#fecaca',
                                backgroundColor: '#fee2e2',
                                color: '#991b1b',
                              }}
                              title="Hapus"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {!loading && filtered.length > PAGE_SIZE && (
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ borderTop: '1px solid #f3f4f6' }}
              >
                <p className="text-gray-500" style={{ fontSize: '12px' }}>
                  Halaman <span className="font-semibold">{page}</span> dari <span className="font-semibold">{totalPages}</span>
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft size={13} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editAnimal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white w-full max-w-lg"
            style={{ borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: '1px solid #e5e7eb' }}
            >
              <h2 className="font-semibold text-gray-900" style={{ fontSize: '15px' }}>Edit Hewan</h2>
              <button
                onClick={() => setEditAnimal(null)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X size={17} />
              </button>
            </div>
            <div className="p-6">
              <AnimalForm
                initialData={editAnimal}
                addToast={addToast}
                onSuccess={() => { setEditAnimal(null); fetchAnimals() }}
                onCancel={() => setEditAnimal(null)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm Modal */}
      {deleteTarget && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div
            className="bg-white w-full max-w-sm p-6 text-center"
            style={{ borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
              style={{ backgroundColor: '#fee2e2' }}
            >
              <Trash2 size={22} style={{ color: '#991b1b' }} />
            </div>
            <h2 className="font-bold text-gray-900 mb-2" style={{ fontSize: '15px' }}>Hapus Hewan?</h2>
            <p className="text-gray-500 mb-6" style={{ fontSize: '13px' }}>
              Yakin ingin menghapus <span className="font-semibold text-gray-800">"{deleteTarget.name}"</span>? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  fontSize: '13px',
                }}
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={!!deletingId}
                className="flex-1 font-semibold text-white transition-all disabled:opacity-60"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#e53e3e',
                  fontSize: '13px',
                }}
              >
                {deletingId ? 'Menghapus...' : 'Ya, Hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
