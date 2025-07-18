import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import { websocketService } from './services/websocket';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';

// Pages
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
    // Load user on app start
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Routes>
          {/* Public routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <LoginPage />
              )
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <RegisterPage />
              )
            } 
          />

          {/* Protected routes */}
          <Route
            path="/"
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
    </Router>
  );
}

export default App;