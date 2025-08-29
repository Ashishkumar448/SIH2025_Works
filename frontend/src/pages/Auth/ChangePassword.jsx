import React, { useState } from 'react';
import { AuthAPI } from '../../api/AuthAPI';
import AuthLayout from '../../layout/AuthLayout';
import InputField from '../../components/common/inputfield';
import Button from '../../components/common/button';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await AuthAPI.changePassword(formData.oldPassword, formData.newPassword);
      
      if (response.data.success) {
        setSuccess(response.data.message || 'Password changed successfully');
        setFormData({
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Change Password" 
      subtitle="Update your account password"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <InputField
          label="Current Password"
          type="password"
          name="oldPassword"
          value={formData.oldPassword}
          onChange={handleChange}
          placeholder="Enter current password"
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

        <Button
          type="submit"
          loading={loading}
          loadingText="Changing password..."
          className="w-full"
        >
          Change Password
        </Button>

        <div className="text-center">
          <a href="/dashboard" className="text-blue-600 hover:text-blue-500 text-sm">
            Back to Dashboard
          </a>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ChangePassword;
