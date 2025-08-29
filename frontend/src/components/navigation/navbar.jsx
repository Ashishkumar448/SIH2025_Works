import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthAPI } from '../../api/AuthAPI';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      await AuthAPI.signout();
      logout();
      navigate('/');
    } catch (error) {
      console.error('Signout error:', error);
      // Still logout locally even if API call fails
      logout();
      navigate('/');
    }
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="text-xl font-bold hover:text-blue-200">
            Auth App
          </a>
          
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-3">
                  <span className="text-sm">Welcome, {user?.email}</span>
                  {!user?.verified && (
                    <span className="bg-red-500 text-xs px-2 py-1 rounded">
                      Unverified
                    </span>
                  )}
                </div>
                <a 
                  href="/dashboard" 
                  className="hover:text-blue-200 transition duration-200"
                >
                  Dashboard
                </a>
                <button
                  onClick={handleSignout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-200"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <a 
                  href="/auth/signin" 
                  className="hover:text-blue-200 transition duration-200"
                >
                  Sign In
                </a>
                <a 
                  href="/auth/signup" 
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition duration-200"
                >
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
