import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Sidebar from '../components/admin/Sidebar';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* ── Sidebar (desktop: fixed, mobile: overlay) ── */}
      <Sidebar mobileOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

      {/* Mobile overlay backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* ── Right side ── */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">

        {/* Slim top bar — only mobile hamburger + logout */}
        <header className="sticky top-0 z-20 bg-white border-b border-gray-200 h-14 flex items-center justify-between px-4">
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            aria-label="Toggle menu"
          >
            {mobileSidebarOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Desktop: page title placeholder */}
          <span className="hidden md:block text-sm font-medium text-gray-500">Admin Dashboard</span>

          {/* User info + Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User size={15} className="text-white" />
              </div>
              <span className="hidden sm:block font-medium">{user?.name}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg text-sm font-medium transition"
            >
              <LogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default AdminLayout;

