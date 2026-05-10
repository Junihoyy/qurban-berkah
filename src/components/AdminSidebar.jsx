import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, List, PlusCircle, LogOut } from 'lucide-react'
import { supabase } from '../lib/supabase'

const menuItems = [
  { label: 'Dashboard', href: '/kelola-qurban/dashboard', icon: LayoutDashboard },
  { label: 'Kelola Hewan', href: '/kelola-qurban/hewan', icon: List },
  { label: 'Tambah Hewan', href: '/kelola-qurban/tambah', icon: PlusCircle },
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const [adminEmail, setAdminEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        setAdminEmail(session.user.email)
      }
    })
  }, [])

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Apakah yakin ingin logout?')
    if (!confirmLogout) return
    await supabase.auth.signOut()
    navigate('/kelola-qurban/login')
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full z-30"
        style={{ backgroundColor: '#1a6b3a', width: '240px' }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-2.5 px-5 py-5"
          style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{ backgroundColor: '#c9a84c' }}
          >
            🌙
          </div>
          <div className="overflow-hidden">
            <p className="text-white font-semibold text-sm leading-tight">Qurban Berkah</p>
            <p
              className="truncate text-xs mt-0.5"
              style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '150px' }}
            >
              {adminEmail || 'Panel Admin'}
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map(({ label, href, icon: Icon }) => (
            <NavLink
              key={href}
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'text-white'
                    : 'hover:text-white hover:bg-white/10'
                }`
              }
              style={({ isActive }) => ({
                color: isActive ? 'white' : 'rgba(255,255,255,0.80)',
                backgroundColor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
              })}
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout — merah muda */}
        <div className="px-3 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              backgroundColor: 'rgba(254,226,226,0.15)',
              color: '#fca5a5',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(254,226,226,0.25)'
              e.currentTarget.style.color = '#fecaca'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(254,226,226,0.15)'
              e.currentTarget.style.color = '#fca5a5'
            }}
          >
            <LogOut size={16} />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around"
        style={{
          backgroundColor: '#1a6b3a',
          borderTop: '1px solid rgba(255,255,255,0.15)',
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {menuItems.map(({ label, href, icon: Icon }) => (
          <NavLink
            key={href}
            to={href}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-[#c9a84c]' : 'text-white/60'
              }`
            }
          >
            <Icon size={20} />
            <span>{label.split(' ')[0]}</span>
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium"
          style={{ color: '#fca5a5' }}
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </nav>
    </>
  )
}
