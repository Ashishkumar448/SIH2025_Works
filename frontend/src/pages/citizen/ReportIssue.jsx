import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Camera, Upload, AlertCircle, Phone, Mail, User, FileText, Tag, Navigation } from 'lucide-react';

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    priority: 'medium',
    location: '',
    address: '',
    contactName: '',
    contactPhone: '',
    contactEmail: '',
    photos: []
  });
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [gpsLoading, setGpsLoading] = useState(false);
  const navigate = useNavigate();

  const categories = [
    'Road and Transportation',
    'Water Supply',
    'Waste Management',
    'Street Lighting',
    'Drainage and Sewerage',
    'Public Safety',
    'Parks and Recreation',
    'Building and Construction',
    'Noise Pollution',
    'Other'
  ];

  const priorities = [
    { value: 'low', label: 'Low', color: 'text-green-600' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600' },
    { value: 'high', label: 'High', color: 'text-orange-600' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600' }
  ];

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.photos.length > 5) {
      setError('Maximum 5 photos allowed');
      return;
    }

    const newPhotos = files.map(file => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name
    }));

    setFormData({
      ...formData,
      photos: [...formData.photos, ...newPhotos]
    });
  };

  const removePhoto = (index) => {
    const newPhotos = [...formData.photos];
    URL.revokeObjectURL(newPhotos[index].url);
    newPhotos.splice(index, 1);
    setFormData({
      ...formData,
      photos: newPhotos
    });
  };

  const getCurrentLocation = () => {
    setGpsLoading(true);
    setError('');

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by this browser');
      setGpsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        setFormData({
          ...formData,
          location: `${latitude}, ${longitude}`
        });
        setGpsLoading(false);
      },
      (error) => {
        setError('Unable to retrieve location. Please enter manually.');
        setGpsLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Issue title is required');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Issue description is required');
      return false;
    }
    if (!formData.category) {
      setError('Please select a category');
      return false;
    }
    if (!formData.address.trim()) {
      setError('Address is required');
      return false;
    }
    if (!formData.contactName.trim()) {
      setError('Contact name is required');
      return false;
    }
    if (!formData.contactPhone.trim()) {
      setError('Contact phone is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const submitFormData = new FormData();

      // Append text data
      Object.keys(formData).forEach(key => {
        if (key !== 'photos') {
          submitFormData.append(key, formData[key]);
        }
      });

      // Append location data
      if (currentLocation) {
        submitFormData.append('latitude', currentLocation.latitude);
        submitFormData.append('longitude', currentLocation.longitude);
      }

      // Append photos
      formData.photos.forEach((photo, index) => {
        submitFormData.append('photos', photo.file);
      });

      
      const response = await fetch('http://localhost:8000/re/report/report-issue', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitFormData
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Issue reported successfully! You will receive updates on your registered email.');
        // Reset form
        setFormData({
          title: '',
          description: '',
          category: '',
          priority: 'medium',
          location: '',
          address: '',
          contactName: '',
          contactPhone: '',
          contactEmail: '',
          photos: []
        });
        setCurrentLocation(null);
        
        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/home');
        }, 3000);
      } else {
        setError(data.message || 'Failed to report issue');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Report issue error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white flex items-center">
              <AlertCircle className="mr-3" />
              Report Civic Issue
            </h1>
            <p className="text-orange-100 mt-1">Help make your community better by reporting issues</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Issue Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                <FileText className="inline w-4 h-4 mr-1" />
                Issue Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Brief description of the issue"
                value={formData.title}
                onChange={handleChange}
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.title.length}/100 characters</p>
            </div>

            {/* Category and Priority */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  <Tag className="inline w-4 h-4 mr-1" />
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                  Priority Level
                </label>
                <select
                  id="priority"
                  name="priority"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  {priorities.map(priority => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                placeholder="Provide detailed information about the issue..."
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
              />
              <p className="text-sm text-gray-500 mt-1">{formData.description.length}/500 characters</p>
            </div>

            {/* Location Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="mr-2" />
                Location Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Full address of the issue location"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    GPS Coordinates
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      placeholder="Latitude, Longitude"
                      value={formData.location}
                      onChange={handleChange}
                      readOnly
                    />
                    <button
                      type="button"
                      onClick={getCurrentLocation}
                      disabled={gpsLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
                    >
                      {gpsLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <Navigation className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Camera className="inline w-4 h-4 mr-1" />
                Photos (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  id="photos"
                  name="photos"
                  multiple
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
                <label
                  htmlFor="photos"
                  className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                >
                  <Upload className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-600">Click to upload photos (Max 5)</span>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo.url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="mr-2" />
                Contact Information
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Your full name"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline w-4 h-4 mr-1" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline w-4 h-4 mr-1" />
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="your.email@example.com"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 px-6 rounded-md font-semibold hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  'Submit Issue Report'
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 rounded-md font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;
