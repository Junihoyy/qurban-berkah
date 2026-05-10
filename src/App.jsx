import { useEffect, useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import HewanPage from './pages/admin/HewanPage'
import TambahPage from './pages/admin/TambahPage'
import ProtectedRoute from './components/ProtectedRoute'
import { supabase } from './lib/supabase'

function KelolaQurbanRedirect() {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
  }, [])

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-[#f0fdf4]">Memuat...</div>

  return <Navigate to={session ? '/kelola-qurban/dashboard' : '/kelola-qurban/login'} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />

      {/* Admin redirect */}
      <Route path="/kelola-qurban" element={<KelolaQurbanRedirect />} />

      {/* Admin auth */}
      <Route path="/kelola-qurban/login" element={<LoginPage />} />

      {/* Admin protected routes */}
      <Route path="/kelola-qurban/dashboard" element={
        <ProtectedRoute><DashboardPage /></ProtectedRoute>
      } />
      <Route path="/kelola-qurban/hewan" element={
        <ProtectedRoute><HewanPage /></ProtectedRoute>
      } />
      <Route path="/kelola-qurban/tambah" element={
        <ProtectedRoute><TambahPage /></ProtectedRoute>
      } />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
