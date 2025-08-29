import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return (
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-900">Welcome Back!</h1>
        <p className="text-lg text-gray-600">
          Hello <span className="font-medium">{user?.email}</span>, you're successfully signed in.
        </p>
        <div className="space-x-4">
          <Link 
            to="/dashboard" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition duration-200"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">Welcome to Auth App</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          A complete authentication system with signup, signin, email verification, and password management features.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">New User?</h3>
          <p className="text-gray-600 mb-4">Create an account to get started with our platform.</p>
          <Link 
            to="/auth/signup" 
            className="block bg-green-500 hover:bg-green-600 text-white text-center px-6 py-3 rounded-lg transition duration-200"
          >
            Sign Up
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3">Already have an account?</h3>
          <p className="text-gray-600 mb-4">Sign in to access your dashboard and account settings.</p>
          <Link 
            to="/auth/signin" 
            className="block bg-blue-500 hover:bg-blue-600 text-white text-center px-6 py-3 rounded-lg transition duration-200"
          >
            Sign In
          </Link>
        </div>
      </div>

      <div className="bg-gray-100 p-6 rounded-lg max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div>
            <h4 className="font-medium mb-2">🔐 Secure Authentication</h4>
            <p className="text-sm text-gray-600">JWT-based authentication with secure token management</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">✉️ Email Verification</h4>
            <p className="text-sm text-gray-600">Verify your account with email-based verification codes</p>
          </div>
          <div>
            <h4 className="font-medium mb-2">🔑 Password Management</h4>
            <p className="text-sm text-gray-600">Change passwords and reset forgotten passwords easily</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
