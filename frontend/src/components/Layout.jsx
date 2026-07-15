import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { useNotificationStore } from '../store/foodStore';
import { useEffect, useState } from 'react';
import {
  Home,
  Plus,
  Heart,
  Settings,
  Bell,
  Leaf,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const { fetchNotifications, unreadCount } = useNotificationStore();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(() => fetchNotifications(), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: Plus, label: 'Add Food', path: '/add-food' },
    { icon: Heart, label: 'Donate', path: '/donations' },
    { icon: Bell, label: 'Notifications', path: '/notifications', badge: unreadCount },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="flex h-screen bg-8te-light">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 bg-8te-dark text-8te-light">
        {/* Logo */}
        <div className="p-6 border-b-2 border-8te-yellow">
          <Link to="/dashboard" className="flex items-center gap-2">
            <Leaf className="text-8te-yellow" size={32} />
            <span className="text-3xl font-bold text-8te-yellow">8te</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map(({ icon: Icon, label, path, badge }) => (
            <Link
              key={path}
              to={path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-8te-yellow hover:text-8te-dark transition-colors relative"
            >
              <Icon size={20} />
              <span>{label}</span>
              {badge > 0 && (
                <span className="absolute right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Info */}
        <div className="p-4 border-t-2 border-8te-yellow">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Logged in as</p>
            <p className="font-semibold text-8te-yellow">{user?.name}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-8te-dark text-8te-light p-4 flex items-center justify-between z-50">
        <div className="flex items-center gap-2">
          <Leaf className="text-8te-yellow" size={24} />
          <span className="text-2xl font-bold text-8te-yellow">8te</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-8te-yellow"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-8te-dark text-8te-light p-4 space-y-2 z-40 max-h-[calc(100vh-64px)] overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path, badge }) => (
            <Link
              key={path}
              to={path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-8te-yellow hover:text-8te-dark transition-colors relative block"
            >
              <Icon size={20} />
              <span>{label}</span>
              {badge > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {badge}
                </span>
              )}
            </Link>
          ))}
          <hr className="border-gray-600 my-4" />
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto pt-16 md:pt-0">
        <Outlet />
      </div>
    </div>
  );
}
