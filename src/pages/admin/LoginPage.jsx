import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, EyeOff, Lock, User } from 'lucide-react'

import { supabase } from '../../lib/supabase'

export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    
    const { error } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    })

    if (error) {
      setError(error.message === 'Invalid login credentials' ? 'Email atau password salah.' : error.message)
      setLoading(false)
    } else {
      navigate('/kelola-qurban/dashboard')
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: '#f0fdf4' }}
    >
      {/* Decorative blobs */}
      <div
        className="fixed top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(26,107,58,0.08) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />
      <div
        className="fixed bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }}
      />

      <div
        className="relative w-full max-w-md bg-white rounded-2xl p-8"
        style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}
      >
        {/* Logo & title */}
        <div className="text-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4"
            style={{ backgroundColor: '#1a6b3a' }}
          >
            🌙
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500 mt-1">Qurban Berkah — Masuk untuk melanjutkan</p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-lg mb-5 text-sm"
            style={{ backgroundColor: '#fee2e2', color: '#e53e3e', border: '1px solid #fecaca' }}
          >
            <span>⚠️</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                placeholder="admin@example.com"
                required
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
                placeholder="••••••••"
                required
                className="input-field pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.01] active:scale-[0.99] mt-2 disabled:opacity-60"
            style={{ backgroundColor: '#1a6b3a' }}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Memverifikasi...
              </span>
            ) : 'Masuk'}
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          Hanya untuk admin yang berwenang
        </p>
      </div>
    </div>
  )
}
