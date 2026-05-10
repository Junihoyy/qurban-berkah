import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, List, PlusCircle, LogOut } from 'lucide-react'

const menuItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Kelola Hewan', href: '/admin/hewan', icon: List },
  { label: 'Tambah Hewan', href: '/admin/tambah', icon: PlusCircle },
]

export default function AdminSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('qurban_admin')
    navigate('/admin/login')
  }

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <aside
        className="hidden md:flex flex-col fixed top-0 left-0 h-full w-60 z-30"
        style={{ backgroundColor: '#1a6b3a' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-lg shrink-0"
            style={{ backgroundColor: '#c9a84c' }}
          >
            🌙
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">Qurban Berkah</p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>Panel Admin</p>
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
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`
              }
              style={({ isActive }) =>
                isActive ? { backgroundColor: 'rgba(255,255,255,0.15)' } : {}
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium transition-all text-white/70 hover:text-white hover:bg-white/10"
          >
            <LogOut size={17} />
            Keluar
          </button>
        </div>
      </aside>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t"
        style={{ backgroundColor: '#1a6b3a', borderColor: 'rgba(255,255,255,0.15)' }}
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
          className="flex flex-col items-center gap-1 px-4 py-3 text-xs font-medium text-white/60"
        >
          <LogOut size={20} />
          <span>Keluar</span>
        </button>
      </nav>
    </>
  )
}
