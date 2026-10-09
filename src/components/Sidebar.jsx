import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, ShoppingBag, ClipboardList, PlusCircle,
  ArrowLeftRight, BarChart3, User, LogOut, Moon, Sun, Menu, X,
  Leaf, ChevronRight, Languages
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const NAV_KEYS = [
  { path: '/dashboard',         icon: LayoutDashboard, key: 'nav_dashboard' },
  { path: '/marketplace',       icon: ShoppingBag,     key: 'nav_marketplace' },
  { path: '/material-requests', icon: ClipboardList,   key: 'nav_material_requests' },
  { path: '/add-material',      icon: PlusCircle,      key: 'nav_add_material' },
  { path: '/exchanges',         icon: ArrowLeftRight,  key: 'nav_exchanges' },
  { path: '/impact',            icon: BarChart3,       key: 'nav_impact' },
  { path: '/profile',           icon: User,            key: 'nav_profile' },
];

export default function Sidebar() {
  const { currentUser, theme, toggleTheme, lang, toggleLang, tr, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileOpen(false);
  };

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '20px 0' }}>
      {/* Logo */}
      <div style={{ padding: '0 20px 20px', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
          <div style={{
            width: '36px', height: '36px', background: 'var(--accent)',
            borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Leaf size={20} color="#0f1410" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '17px', letterSpacing: '-0.3px', color: 'var(--text)' }}>
              MaterialMatch
            </div>
            <div style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
              {lang === 'hi' ? 'परिपत्र अर्थव्यवस्था' : 'Circular Economy'}
            </div>
          </div>
        </div>
      </div>

      {/* User info */}
      {currentUser && (
        <div style={{
          margin: '16px 12px', padding: '12px',
          background: 'var(--surface-2)', borderRadius: '10px', border: '1px solid var(--border)',
        }}>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)', marginBottom: '2px' }}>
            {currentUser.name}
          </div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
            {currentUser.type} · {currentUser.city}
          </div>
        </div>
      )}

      {/* Nav links */}
      <nav style={{ flex: 1, padding: '8px 12px', overflowY: 'auto' }}>
        {NAV_KEYS.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setMobileOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', borderRadius: '8px', marginBottom: '2px',
              fontWeight: 600, fontSize: '14px',
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-dim)' : 'transparent',
              border: isActive ? '1px solid var(--glass-border)' : '1px solid transparent',
              textDecoration: 'none', transition: 'all 0.2s',
            })}
            className="sidebar-link"
          >
            {({ isActive }) => (
              <>
                <item.icon size={18} />
                <span style={{ flex: 1 }}>{tr(item.key)}</span>
                {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Bottom controls */}
      <div style={{ padding: '12px', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {/* Language toggle */}
        <button
          onClick={toggleLang}
          className="btn btn-secondary btn-sm"
          style={{ justifyContent: 'flex-start', gap: '10px', width: '100%' }}
          title={lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
        >
          <Languages size={16} />
          <span style={{ flex: 1 }}>{lang === 'en' ? 'हिंदी में बदलें' : 'Switch to English'}</span>
          <span style={{
            fontSize: '10px', fontWeight: 700, padding: '2px 6px',
            background: 'var(--accent-dim)', color: 'var(--accent)',
            borderRadius: '4px', letterSpacing: '0.5px',
          }}>
            {lang === 'en' ? 'HI' : 'EN'}
          </span>
        </button>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-secondary btn-sm"
          style={{ justifyContent: 'flex-start', gap: '10px', width: '100%' }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          {theme === 'dark' ? tr('nav_light_mode') : tr('nav_dark_mode')}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="btn btn-ghost btn-sm"
          style={{ justifyContent: 'flex-start', gap: '10px', width: '100%', color: 'var(--red)' }}
        >
          <LogOut size={16} />
          {tr('nav_logout')}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside style={{
        width: '260px', background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)',
        position: 'fixed', top: 0, left: 0, bottom: 0,
        zIndex: 100, transition: 'background var(--transition)',
        display: 'flex', flexDirection: 'column',
      }} className="sidebar-desktop">
        <SidebarContent />
      </aside>

      {/* Mobile topbar */}
      <div style={{
        display: 'none', position: 'fixed', top: 0, left: 0, right: 0,
        height: '60px', background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)', zIndex: 200,
        alignItems: 'center', justifyContent: 'space-between', padding: '0 16px',
      }} className="mobile-topbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '30px', height: '30px', background: 'var(--accent)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Leaf size={16} color="#0f1410" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '16px' }}>MaterialMatch</span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={toggleLang} className="btn btn-ghost btn-sm" style={{ padding: '6px', fontSize: '11px', fontWeight: 700 }}>
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </button>
          <button onClick={toggleTheme} className="btn btn-ghost btn-sm" style={{ padding: '6px' }}>
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setMobileOpen(true)} className="btn btn-ghost btn-sm" style={{ padding: '6px' }}>
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}
            onClick={() => setMobileOpen(false)}
          />
          <div style={{
            position: 'absolute', top: 0, left: 0, bottom: 0, width: '280px',
            background: 'var(--bg-secondary)', animation: 'slideInLeft 0.25s ease',
            display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px' }}>
              <button onClick={() => setMobileOpen(false)} className="btn btn-ghost btn-sm" style={{ padding: '6px' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      <style>{`
        .sidebar-link:hover:not([class*="active"]) {
          background: var(--surface-2) !important;
          color: var(--text) !important;
        }
        @media (max-width: 1024px) {
          .sidebar-desktop { display: none !important; }
          .mobile-topbar { display: flex !important; }
          .main-content { margin-left: 0 !important; padding-top: 60px; }
        }
      `}</style>
    </>
  );
}
