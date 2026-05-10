import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'
import AnimalForm from '../../components/AnimalForm'
import ToastNotification, { useToast } from '../../components/ToastNotification'
import { ArrowLeft } from 'lucide-react'

export default function TambahPage() {
  const navigate = useNavigate()
  const { toasts, addToast, removeToast } = useToast()

  const handleSuccess = () => {
    setTimeout(() => navigate('/admin/hewan'), 1500)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
      <AdminSidebar />
      <ToastNotification toasts={toasts} removeToast={removeToast} />

      <main className="md:ml-60 pb-20 md:pb-0">
        <div className="p-6 max-w-2xl">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => navigate('/admin/hewan')}
              className="p-2 rounded-lg border border-gray-200 bg-white text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Tambah Hewan Qurban</h1>
              <p className="text-sm text-gray-500 mt-0.5">Isi data hewan qurban baru</p>
            </div>
          </div>

          {/* Form card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <AnimalForm
              addToast={addToast}
              onSuccess={handleSuccess}
              onCancel={() => navigate('/admin/hewan')}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
