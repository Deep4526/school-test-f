import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, Users, GraduationCap, Settings, LogOut, Megaphone, Calendar, Award, ShieldCheck, Heart, CreditCard, BookOpen, BookHeart, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/notices', label: 'Notices', icon: Megaphone },
  { path: '/admin/admissions', label: 'Admissions', icon: FileText },
  { path: '/admin/students', label: 'Students', icon: Users },
  { path: '/admin/classes', label: 'Classes', icon: BookOpen },
  { path: '/admin/academics', label: 'Academics', icon: BookOpen },
  { path: '/admin/teachers', label: 'Teachers', icon: GraduationCap },
  { path: '/admin/exams', label: 'Exams', icon: Calendar },
  { path: '/admin/results', label: 'Results', icon: Award },
  { path: '/admin/certificates', label: 'Certificates', icon: ShieldCheck },
  { path: '/admin/library', label: 'Library', icon: BookOpen },
  { path: '/admin/content', label: 'Content & Media', icon: BookHeart },
  { path: '/admin/community', label: 'Community', icon: Users },
  { path: '/admin/misc', label: 'Misc Content', icon: BookOpen },
  { path: '/admin/donations', label: 'Donations', icon: Heart },
  { path: '/admin/payments', label: 'Fee Payments', icon: CreditCard },
  { path: '/admin/settings', label: 'Settings', icon: Settings },
];

const Sidebar = ({ mobileOpen = false, onClose = () => {} }) => {
  const location = useLocation();
  const { user, logout } = useAuth();

  return (
    <aside className={`
      w-64 bg-primary text-white flex flex-col fixed left-0 top-0 h-full z-40
      transition-transform duration-300 ease-in-out
      ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      md:translate-x-0
    `}>
      {/* Header */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-accent">Admin Panel</h2>
          <p className="text-xs text-white/60 mt-0.5">Welcome, {user?.name}</p>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-accent text-primary-dark'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
            >
              <item.icon size={17} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout — bottom of sidebar */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-white/80 hover:bg-red-500/20 hover:text-red-300 w-full transition-colors"
        >
          <LogOut size={17} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
