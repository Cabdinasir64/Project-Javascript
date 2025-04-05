import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  HomeIcon,
  UserGroupIcon,
  AcademicCapIcon,
  BookOpenIcon,
  ClipboardIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', icon: HomeIcon, path: '/' },
  { name: 'Students', icon: UserGroupIcon, path: '/students' },
  { name: 'Teachers', icon: AcademicCapIcon, path: '/teachers' },
  { name: 'Classes', icon: BookOpenIcon, path: '/classes' },
  { name: 'Attendance', icon: ClipboardIcon, path: '/attendance' },
];

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <h1 className="text-xl font-bold text-primary-600">School Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
                  location.pathname === item.path
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <img
                src={user?.profileImage || '/default-avatar.png'}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <button
                  onClick={logout}
                  className="text-sm text-red-500 hover:text-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;