import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { websocketService } from './services/websocket';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import DarkVeil from './components/DarkVeil';

// Pages
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import InstructorsPage from './pages/InstructorsPage';
import VenuePage from './pages/VenuePage';
import PoliciesPage from './pages/PoliciesPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import SchedulePage from './pages/SchedulePage';
import ProfilePage from './pages/ProfilePage';
import TeachersPage from './pages/TeachersPage';
import VideographerPage from './pages/VideographerPage';
import AdminPage from './pages/AdminPage';

import { UserRole } from './types';

function App() {
  const { isAuthenticated, isLoading, user, loadUser } = useAuthStore();

  useEffect(() => {
    // Load user on app start to verify token validity
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    // Connect WebSocket when authenticated
    if (isAuthenticated && user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        websocketService.connect(token);
      }
    } else {
      websocketService.disconnect();
    }

    // Cleanup on unmount
    return () => {
      websocketService.disconnect();
    };
  }, [isAuthenticated, user]);

  // Only show loading spinner for initial auth check on protected routes
  if (isLoading && (window.location.pathname === '/' || window.location.pathname.startsWith('/dashboard'))) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black relative">
        {/* WebGL Background */}
        <div className="fixed inset-0 z-0" style={{ width: '100vw', height: '100vh', left: 0, top: 0 }}>
          <DarkVeil 
            hueShift={20}
            speed={0.8}
            warpAmount={0.1}
            resolutionScale={0.8}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10">
          <Routes>
          {/* Public routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LandingPage />
              )
            } 
          />
          <Route 
            path="/about" 
            element={<AboutPage />} 
          />
          <Route 
            path="/instructors" 
            element={<InstructorsPage />} 
          />
          <Route 
            path="/venue" 
            element={<VenuePage />} 
          />
          <Route 
            path="/policies" 
            element={<PoliciesPage />} 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <LoginPage />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <RegisterPage />
              )
            } 
          />
          
          {/* Public schedule route */}
          <Route path="/schedule" element={<SchedulePage />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="schedule" element={<SchedulePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="teachers" element={<TeachersPage />} />
            
            {/* Videographer routes */}
            <Route
              path="videographer"
              element={
                <ProtectedRoute requiredRole={UserRole.VIDEOGRAPHER}>
                  <VideographerPage />
                </ProtectedRoute>
              }
            />
            
            {/* Admin routes */}
            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRole={UserRole.ADMIN}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;