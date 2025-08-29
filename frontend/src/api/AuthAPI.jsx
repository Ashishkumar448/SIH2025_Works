import axiosInstance from './axiosInstance';

export const AuthAPI = {
  // Auth endpoints
  signup: async (email, password) => {
    return await axiosInstance.post('/api/auth/signup', { email, password });
  },

  signin: async (email, password) => {
    return await axiosInstance.post('/api/auth/signin', { email, password });
  },

  signout: async () => {
    return await axiosInstance.post('/api/auth/signout');
  },

  // Verification endpoints
  sendVerificationCode: async (email) => {
    return await axiosInstance.patch('/api/auth/send-verification-code', { email });
  },

  verifyVerificationCode: async (email, providedCode) => {
    return await axiosInstance.patch('/api/auth/verify-verification-code', { 
      email, 
      providedCode 
    });
  },

  // Password management
  changePassword: async (oldPassword, newPassword) => {
    return await axiosInstance.patch('/api/auth/change-password', { 
      oldPassword, 
      newPassword 
    });
  },

  sendForgotPasswordCode: async (email) => {
    return await axiosInstance.patch('/api/auth/send-forgot-password-code', { email });
  },

  verifyForgotPasswordCode: async (email, providedCode, newPassword) => {
    return await axiosInstance.patch('/api/auth/verify-forgot-password-code', { 
      email, 
      providedCode, 
      newPassword 
    });
  }
};
