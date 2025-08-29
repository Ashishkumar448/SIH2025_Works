import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';

// Layouts
import MainLayout from '../layout/mainLayout';

// Components
import ProtectedRoute from './ProtectedRoute';

// Pages
import Home from '../pages/Home/Home';
import Dashboard from '../pages/Dashboard/Dashboard';

// Auth Pages
import Signin from '../pages/Auth/Signin';
import Signup from '../pages/Auth/Signup';
import VerifyAccount from '../pages/Auth/VerifyAccount';
import ChangePassword from '../pages/Auth/ChangePassword';
import ForgotPassword from '../pages/Auth/ForgotPassword';

const AppRoute = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              <MainLayout>
                <Home />
              </MainLayout>
            } 
          />

          {/* Auth Routes (public, redirect if authenticated) */}
          <Route 
            path="/auth/signin" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Signin />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <Signup />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth/forgot-password" 
            element={
              <ProtectedRoute requireAuth={false}>
                <ForgotPassword />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes (require authentication) */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth/verify" 
            element={
              <ProtectedRoute>
                <VerifyAccount />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/auth/change-password" 
            element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>
            } 
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoute;
