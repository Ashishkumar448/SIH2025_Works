// Removed complex validations since backend handles them
export const validator = {
  // Basic client-side checks only
  isEmpty: (value) => !value || value.trim() === '',
  
  isEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
};
