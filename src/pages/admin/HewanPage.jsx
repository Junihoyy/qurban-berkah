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

  // Client-side filter + pagination
  const filtered = animals.filter((a) =>
    a.name?.toLowerCase().includes(search.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSearch = (val) => { setSearch(val); setPage(1) }

  // Toggle sold status
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

  // Delete animal
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
        <div className="p-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold text-gray-900">Kelola Hewan</h1>
            <p className="text-sm text-gray-500 mt-0.5">Daftar seluruh hewan qurban</p>
          </div>

          {/* Search bar */}
          <div className="relative mb-4 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Cari nama hewan..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div className="overflow-x-auto">
              {loading ? (
                <div className="p-10 text-center text-sm text-gray-400">Memuat data...</div>
              ) : paginated.length === 0 ? (
                <div className="p-10 text-center text-sm text-gray-400">
                  {search ? 'Tidak ditemukan hasil pencarian' : 'Belum ada hewan'}
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-left">
                      {['No', 'Foto', 'Nama', 'Tipe', 'Harga', 'Tinggi', 'Berat', 'Status', 'Aksi'].map((h) => (
                        <th key={h} className="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {paginated.map((a, i) => (
                      <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-500">{(page - 1) * PAGE_SIZE + i + 1}</td>
                        <td className="px-4 py-3">
                          <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center shrink-0">
                            {a.photo_url
                              ? <img src={a.photo_url} alt={a.name} className="w-full h-full object-cover" />
                              : <span className="text-xl">{a.type === 'kambing' ? '🐐' : '🐑'}</span>
                            }
                          </div>
                        </td>
                        <td className="px-4 py-3 font-medium text-gray-800 max-w-[140px]">
                          <p className="truncate">{a.name}</p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={a.type === 'kambing' ? 'badge-kambing' : 'badge-domba'}>
                            {a.type === 'kambing' ? 'Kambing' : 'Domba'}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold whitespace-nowrap" style={{ color: '#1a6b3a' }}>
                          {formatRupiah(a.price)}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{a.height_cm} cm</td>
                        <td className="px-4 py-3 text-gray-600">{a.weight_kg} kg</td>
                        <td className="px-4 py-3">
                          <span className={a.is_sold ? 'badge-sold' : 'badge-available'}>
                            {a.is_sold ? 'Terjual' : 'Tersedia'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1.5">
                            {/* Toggle status */}
                            <button
                              onClick={() => handleToggle(a)}
                              disabled={togglingId === a.id}
                              className="p-2 rounded-lg border transition-all hover:scale-110 disabled:opacity-50"
                              style={{
                                borderColor: a.is_sold ? '#fecaca' : '#d1fae5',
                                backgroundColor: a.is_sold ? '#fff5f5' : '#f0fdf4',
                              }}
                              title={a.is_sold ? 'Tandai Tersedia' : 'Tandai Terjual'}
                            >
                              {a.is_sold
                                ? <XCircle size={15} style={{ color: '#e53e3e' }} />
                                : <CheckCircle size={15} style={{ color: '#1a6b3a' }} />
                              }
                            </button>

                            {/* Edit */}
                            <button
                              onClick={() => setEditAnimal(a)}
                              className="p-2 rounded-lg border border-blue-100 bg-blue-50 text-blue-600 transition-all hover:scale-110"
                              title="Edit"
                            >
                              <Pencil size={15} />
                            </button>

                            {/* Delete */}
                            <button
                              onClick={() => setDeleteTarget(a)}
                              className="p-2 rounded-lg border border-red-100 bg-red-50 text-red-500 transition-all hover:scale-110"
                              title="Hapus"
                            >
                              <Trash2 size={15} />
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
              <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Halaman <span className="font-semibold">{page}</span> dari <span className="font-semibold">{totalPages}</span>
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-1.5 rounded border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Edit Modal */}
      {editAnimal && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-10 overflow-y-auto" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">Edit Hewan</h2>
              <button onClick={() => setEditAnimal(null)} className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                <X size={18} className="text-gray-500" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <Trash2 size={24} style={{ color: '#e53e3e' }} />
            </div>
            <h2 className="text-base font-bold text-gray-900 mb-2">Hapus Hewan?</h2>
            <p className="text-sm text-gray-500 mb-6">
              Yakin ingin menghapus <span className="font-semibold text-gray-800">"{deleteTarget.name}"</span>? Tindakan ini tidak bisa dibatalkan.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-lg border border-gray-300 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={!!deletingId}
                className="flex-1 py-2.5 rounded-lg text-sm font-semibold text-white transition-all disabled:opacity-60"
                style={{ backgroundColor: '#e53e3e' }}
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
