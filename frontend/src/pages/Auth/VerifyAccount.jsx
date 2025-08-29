import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { AuthAPI } from '../../api/AuthAPI';
import AuthLayout from '../../layout/AuthLayout';
import InputField from '../../components/common/inputfield';
import Button from '../../components/common/button';

const VerifyAccount = () => {
  const { user, updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendCode = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthAPI.sendVerificationCode(user.email);
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Verification code sent to your email');
        setStep(2);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to send verification code');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthAPI.verifyVerificationCode(user.email, verificationCode);
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Account verified successfully');
        
        updateUser({ ...user, verified: true });
        
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  if (user?.verified) {
    return (
      <AuthLayout title="Account Verified" subtitle="Your account is already verified!">
        <div className="text-center space-y-4">
          <div className="text-green-600">
            <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Your account has been successfully verified!</p>
          <Button onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Verify Account" 
      subtitle={step === 1 ? "Send verification code to your email" : "Enter the verification code"}
    >
      {step === 1 ? (
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-blue-600 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600">
              We'll send a verification code to <strong>{user?.email}</strong>
            </p>
          </div>

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
            onClick={handleSendCode}
            loading={loading}
            loadingText="Sending code..."
            className="w-full"
          >
            Send Verification Code
          </Button>
        </div>
      ) : (
        <form onSubmit={handleVerifyCode} className="space-y-6">
          <InputField
            label="Verification Code"
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter 6-digit code"
            maxLength={6}
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
              loadingText="Verifying..."
              className="w-full"
              variant="success"
            >
              Verify Code
            </Button>

            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setStep(1);
                setError('');
                setSuccess('');
                setVerificationCode('');
              }}
              className="w-full"
            >
              Back
            </Button>
          </div>
        </form>
      )}
    </AuthLayout>
  );
};

export default VerifyAccount;
