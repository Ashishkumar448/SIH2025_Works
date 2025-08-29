import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../services/storage';
import { decodeJWT, isTokenExpired } from '../utils/jwtHelper';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = () => {
    try {
      const storedToken = storage.getToken();
      const storedUser = storage.getUser();

      if (storedToken && storedUser && !isTokenExpired(storedToken)) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
      } else {
        // Clear expired or invalid data
        storage.clearStorage();
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
      storage.clearStorage();
    } finally {
      setLoading(false);
    }
  };

  const login = (authToken, userData) => {
    try {
      // Decode JWT to get user info
      const decodedToken = decodeJWT(authToken);
      
      // Merge decoded info with provided userData
      const enrichedUserData = {
        ...userData,
        userId: decodedToken?.userId,
        verified: decodedToken?.verified || userData.verified || false,
      };

      storage.setToken(authToken);
      storage.setUser(enrichedUserData);
      setToken(authToken);
      setUser(enrichedUserData);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const logout = () => {
    storage.clearStorage();
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (userData) => {
    storage.setUser(userData);
    setUser(userData);
  };

  const value = {
    user,
    token,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
