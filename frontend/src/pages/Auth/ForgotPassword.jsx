import React, { useState } from 'react';
import { AuthAPI } from '../../api/AuthAPI';
import { Link } from 'react-router-dom';
import AuthLayout from '../../layout/AuthLayout';
import InputField from '../../components/common/inputfield';
import Button from '../../components/common/button';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthAPI.sendForgotPasswordCode(email);
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Password reset code sent to your email');
        setStep(2);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send reset code');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthAPI.verifyForgotPasswordCode(
        email, 
        formData.verificationCode, 
        formData.newPassword
      );
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Password reset successfully! You can now sign in.');
        setTimeout(() => {
          window.location.href = '/auth/sign-in';
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    if (error) setError('');
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle={step === 1 ? "Enter your email to receive a reset code" : "Enter the code and your new password"}
    >
      {step === 1 ? (
        <form onSubmit={handleSendCode} className="space-y-6">
          <div className="text-center mb-6">
            <div className="text-blue-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m0 0a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 00-2-2m0 0H9a2 2 0 00-2 2v0m4 0V3" />
              </svg>
            </div>
          </div>

          <InputField
            label="Email Address"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
            loadingText="Sending code..."
            className="w-full"
          >
            Send Reset Code
          </Button>
        </form>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-6">
          <div className="text-center text-sm text-gray-600 mb-4">
            Reset code sent to: <strong>{email}</strong>
          </div>

          <InputField
            label="Verification Code"
            type="text"
            name="verificationCode"
            value={formData.verificationCode}
            onChange={handleChange}
            placeholder="Enter 6-digit code"
            maxLength={6}
            required
          />

          <InputField
            label="New Password"
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            required
          />

          <InputField
            label="Confirm New Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm new password"
            required
          />

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
              {success}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              loading={loading}
              loadingText="Resetting password..."
              className="w-full"
              variant="success"
            >
              Reset Password
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setStep(1);
                setError('');
                setSuccess('');
                setFormData({
                  verificationCode: '',
                  newPassword: '',
                  confirmPassword: ''
                });
              }}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </form>
      )}

      <div className="text-center mt-6">
        <p className="text-sm text-gray-600">
          Remember your password?{' '}
          <Link to="/auth/sign-in" className="text-blue-600 hover:text-blue-500">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
