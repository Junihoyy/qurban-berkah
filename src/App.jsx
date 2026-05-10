import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/admin/LoginPage'
import DashboardPage from './pages/admin/DashboardPage'
import HewanPage from './pages/admin/HewanPage'
import TambahPage from './pages/admin/TambahPage'
import ProtectedRoute from './components/ProtectedRoute'

function AdminRedirect() {
  const isLoggedIn = localStorage.getItem('qurban_admin') === 'true'
  return <Navigate to={isLoggedIn ? '/admin/dashboard' : '/admin/login'} replace />
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<HomePage />} />

      {/* Admin redirect */}
      <Route path="/admin" element={<AdminRedirect />} />

      {/* Admin auth */}
      <Route path="/admin/login" element={<LoginPage />} />

      {/* Admin protected routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute><DashboardPage /></ProtectedRoute>
      } />
      <Route path="/admin/hewan" element={
        <ProtectedRoute><HewanPage /></ProtectedRoute>
      } />
      <Route path="/admin/tambah" element={
        <ProtectedRoute><TambahPage /></ProtectedRoute>
      } />

      {/* 404 fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
