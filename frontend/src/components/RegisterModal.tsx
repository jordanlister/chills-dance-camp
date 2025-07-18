import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import GradientText from './GradientText';
import { UserRole } from '../types';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: UserRole.STUDENT
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, isLoading, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return;
    }

    try {
      const [firstName, ...lastNameParts] = formData.name.split(' ');
      const lastName = lastNameParts.join(' ') || '';
      
      await register({
        email: formData.email,
        password: formData.password,
        firstName,
        lastName,
        role: formData.role
      });
      onClose();
    } catch (error) {
      // Error is handled by the store
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'role' ? value as UserRole : value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ paddingTop: '60px', paddingBottom: '20px' }}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
        onClick={onClose}
        style={{
          animation: 'fadeIn 0.3s ease-out'
        }}
      />
      
      {/* Modal */}
      <div 
        className="relative w-full max-w-sm sm:max-w-lg bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/20 p-6 sm:p-8 shadow-2xl my-auto mx-4"
        style={{
          animation: 'modalSlideIn 0.4s ease-out',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          maxHeight: 'calc(100vh - 120px)',
          overflowY: 'auto',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.8), rgba(30, 30, 30, 0.85))'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <GradientText
            colors={["#ff6b6b", "#ee5a6f", "#c44569", "#9a4560", "#ff6b6b"]}
            animationSpeed={3}
            className="text-2xl font-bold mb-2"
          >
            Join the Camp
          </GradientText>
          <p className="text-gray-400">Create your account to get started</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Password Mismatch Error */}
        {formData.password !== formData.confirmPassword && formData.confirmPassword && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-sm">
            Passwords do not match
          </div>
        )}

        {/* Google Login Button */}
        <div className="mb-4">
          <button
            type="button"
            onClick={() => {
              // TODO: Implement Google OAuth
              console.log('Google register clicked');
            }}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:transform hover:scale-105 flex items-center justify-center gap-3"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="mb-4 flex items-center">
          <div className="flex-1 border-t border-white/20"></div>
          <span className="px-4 text-sm text-gray-400">or</span>
          <div className="flex-1 border-t border-white/20"></div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter your full name"
              required
              style={{
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200"
              placeholder="Enter your email"
              required
              style={{
                backdropFilter: 'blur(10px)'
              }}
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-1">
              I am a...
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200"
              style={{
                backdropFilter: 'blur(10px)'
              }}
            >
              <option value={UserRole.STUDENT} className="bg-gray-800">Student</option>
              <option value={UserRole.TEACHER} className="bg-gray-800">Teacher</option>
              <option value={UserRole.VIDEOGRAPHER} className="bg-gray-800">Videographer</option>
            </select>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Enter your password"
                required
                style={{
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-200"
                placeholder="Confirm your password"
                required
                style={{
                  backdropFilter: 'blur(10px)'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || formData.password !== formData.confirmPassword}
            className="w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 hover:transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 107, 107, 0.4), rgba(238, 90, 111, 0.5))',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              boxShadow: '0 8px 32px rgba(255, 107, 107, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-4 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-primary-400 hover:text-primary-300 transition-colors duration-200 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterModal;