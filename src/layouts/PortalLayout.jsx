import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LayoutDashboard, Award, CreditCard, Bell, LogOut, User } from 'lucide-react';

const PortalLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isStudent = user?.role === 'student';
  
  const studentMenu = [
    { path: '/student', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/student/results', label: 'My Results', icon: Award },
    { path: '/student/fees', label: 'Fee Status', icon: CreditCard },
    { path: '/student/notices', label: 'Notices', icon: Bell },
  ];

  const parentMenu = [
    { path: '/parent', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/parent/children', label: 'My Children', icon: User },
    { path: '/parent/results', label: 'Children Results', icon: Award },
    { path: '/parent/notices', label: 'Notices', icon: Bell },
  ];

  const menu = isStudent ? studentMenu : parentMenu;
  const portalType = isStudent ? 'Student' : 'Parent';

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col fixed h-full hidden md:flex">
        <div className="p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-accent">{portalType} Portal</h2>
          <p className="text-xs text-white/70 mt-1">Welcome, {user?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent text-primary-dark' : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={() => { logout(); navigate('/login'); }} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-white/80 hover:bg-red-500/20 hover:text-red-300 transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PortalLayout;