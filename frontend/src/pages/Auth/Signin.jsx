import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthAPI } from '../../api/AuthAPI';
import AuthLayout from '../../layout/AuthLayout';
import InputField from '../../components/common/inputfield';
import Button from '../../components/common/button';

const Signin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await AuthAPI.signin(formData.email, formData.password);
      
      if (response.data.success) {
        const { token } = response.data;
        
        const userData = {
          email: formData.email,
          verified: false,
        };
        
        login(token, userData);
        navigate(from, { replace: true });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Sign In" 
      subtitle="Welcome back! Please sign in to your account"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <Button
          type="submit"
          loading={loading}
          loadingText="Signing in..."
          className="w-full"
        >
          Sign In
        </Button>

        <div className="text-center space-y-2">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/sign-up" className="text-blue-600 hover:text-blue-500">
              Sign up
            </Link>
          </p>
          <p className="text-sm">
            <Link to="/auth/forgot-password" className="text-blue-600 hover:text-blue-500">
              Forgot your password?
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signin;
