import React from 'react';
import Spinner from '../loader/spinner';

const Button = ({ 
  children, 
  type = 'button',
  variant = 'primary',
  loading = false,
  loadingText = 'Loading...',
  disabled = false,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'border-transparent text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-100',
    danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
    success: 'border-transparent text-white bg-green-600 hover:bg-green-700 focus:ring-green-500 disabled:bg-green-300',
  };

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
      {...props}
    >
      {loading && (
        <div className="mr-2">
          <Spinner size="sm" />
        </div>
      )}
      {loading ? loadingText : children}
    </button>
  );
};

export default Button;
