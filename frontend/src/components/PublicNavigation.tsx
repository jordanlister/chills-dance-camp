import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChillsLogo from './ChillsLogo';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const PublicNavigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    setShowLoginModal(true);
    setIsMenuOpen(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    setIsMenuOpen(false);
  };

  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const navItems = [
    { name: 'Home', path: '/', isLink: true },
    { name: 'About', path: '/about', isLink: true },
    { name: 'Instructors', path: '/instructors', isLink: true },
    { name: 'Venue', path: '/venue', isLink: true },
    { name: 'Schedule', path: '/schedule', isLink: true },
    { name: 'Register', action: handleRegisterClick, isLink: false },
    { name: 'Login', action: handleLoginClick, isLink: false },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-90 backdrop-blur-md border-b border-white border-opacity-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <ChillsLogo size="small" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.isLink ? (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ) : (
                <button
                  key={item.name}
                  onClick={item.action}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
                >
                  {item.name}
                </button>
              )
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white border-opacity-10">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                item.isLink ? (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-5"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={item.action}
                    className="text-gray-300 hover:text-white transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-5 text-left"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={handleSwitchToRegister}
      />
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </nav>
  );
};

export default PublicNavigation;