import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, X } from 'lucide-react'

export default function ToastNotification({ toasts, removeToast }) {
  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} removeToast={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, removeToast }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Trigger enter animation
    const t1 = setTimeout(() => setVisible(true), 10)
    // Auto-dismiss after 3.5s
    const t2 = setTimeout(() => {
      setVisible(false)
      setTimeout(() => removeToast(toast.id), 300)
    }, 3500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [toast.id, removeToast])

  const isSuccess = toast.type === 'success'

  return (
    <div
      className="flex items-start gap-3 p-4 rounded-xl shadow-xl pointer-events-auto transition-all duration-300"
      style={{
        backgroundColor: '#fff',
        border: `1px solid ${isSuccess ? '#d1fae5' : '#fee2e2'}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }}
    >
      {isSuccess
        ? <CheckCircle size={20} className="shrink-0 mt-0.5" style={{ color: '#1a6b3a' }} />
        : <XCircle size={20} className="shrink-0 mt-0.5" style={{ color: '#e53e3e' }} />
      }
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">
          {isSuccess ? 'Berhasil!' : 'Gagal!'}
        </p>
        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{toast.message}</p>
      </div>
      <button
        onClick={() => { setVisible(false); setTimeout(() => removeToast(toast.id), 300) }}
        className="shrink-0 p-1 rounded hover:bg-gray-100 transition-colors"
      >
        <X size={14} className="text-gray-400" />
      </button>
    </div>
  )
}

// Hook to manage toasts
export function useToast() {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return { toasts, addToast, removeToast }
}
