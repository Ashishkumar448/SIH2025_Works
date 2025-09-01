import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [sendingCode, setSendingCode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [countdown, setCountdown] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a token, redirect to login if not
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const getAuthToken = () => {
    return localStorage.getItem('authToken');
  };

  const handleSendCode = async () => {
    setSendingCode(true);
    setError('');
    setSuccess('');

    try {
      const token = getAuthToken();
      const response = await fetch('/auth/send-verification-code', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
        // ✅ No body needed - email comes from JWT token
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Verification code sent to your email!');
        setCountdown(60); // 60 second cooldown
      } else {
        setError(data.message || 'Failed to send verification code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Send code error:', error);
    } finally {
      setSendingCode(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = getAuthToken();
      const response = await fetch('/auth/verify-verification-code', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ code: verificationCode }) // ✅ Only send verification code
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Email verified successfully!');
        
        // Update token if new one is provided
        if (data.token) {
          localStorage.setItem('authToken', data.token);
        }
        
        // Redirect to home after a brief delay
        setTimeout(() => {
          navigate('/home'); // Changed from '/dashboard' to '/home'
        }, 1500);
      } else {
        setError(data.message || 'Invalid verification code');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Verify code error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      const token = getAuthToken();
      await fetch('/auth/signout', { // ✅ Fixed: Changed from '/api/signout' to '/auth/signout'
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      console.error('Signout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verify your email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            We've sent a verification code to your email address
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleVerifyCode}>
          <div>
            <label htmlFor="verificationCode" className="sr-only">
              Verification Code
            </label>
            <input
              id="verificationCode"
              name="verificationCode"
              type="text"
              required
              className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center text-lg tracking-widest"
              placeholder="Enter verification code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              maxLength={6}
            />
          </div>

          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          {success && (
            <div className="text-green-600 text-sm text-center">{success}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading || !verificationCode.trim()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleSendCode}
              disabled={sendingCode || countdown > 0}
              className="text-sm text-indigo-600 hover:text-indigo-500 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {sendingCode 
                ? 'Sending...' 
                : countdown > 0 
                  ? `Resend code in ${countdown}s`
                  : 'Resend code'
              }
            </button>

            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-500"
            >
              Sign out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
