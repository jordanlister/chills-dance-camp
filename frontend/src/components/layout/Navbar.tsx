import { useState } from 'react';
import { Menu, X, Bell, User, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav className="bg-black bg-opacity-90 border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="ml-4 lg:ml-0">
              <h1 className="text-xl font-bold gradient-text">Chills Dance Camp</h1>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10">
              <Bell size={20} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-md text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-10"
              >
                <User size={20} />
                <span className="hidden sm:block text-sm font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 bg-opacity-95 rounded-md shadow-lg py-1 z-50 border border-gray-700">
                  <div className="px-4 py-2 text-sm text-gray-400 border-b border-gray-700">
                    {user?.email}
                  </div>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-300 hover:bg-white hover:bg-opacity-10"
                  >
                    Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white hover:bg-opacity-10 flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Sign out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-900 bg-opacity-95 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
            >
              Dashboard
            </a>
            <a
              href="/schedule"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
            >
              Schedule
            </a>
            <a
              href="/teachers"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-10"
            >
              Teachers
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;