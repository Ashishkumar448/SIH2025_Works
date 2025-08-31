import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Star, 
  Send, 
  ArrowLeft, 
  ThumbsUp, 
  ThumbsDown,
  AlertCircle,
  CheckCircle,
  User,
  Calendar
} from 'lucide-react';

const Feedback = () => {
  const [feedbackType, setFeedbackType] = useState('general');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [feedbackData, setFeedbackData] = useState({
    title: '',
    message: '',
    category: 'service',
    anonymous: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [userReports, setUserReports] = useState([]);
  const navigate = useNavigate();

  // Mock resolved reports for feedback
  const mockResolvedReports = [
    {
      id: 1,
      title: "Street Light Issue",
      resolvedDate: "2025-08-25",
      category: "Street Lighting",
      hasFeedback: false
    },
    {
      id: 2,
      title: "Road Pothole",
      resolvedDate: "2025-08-20",
      category: "Road and Transportation", 
      hasFeedback: true
    }
  ];

  const feedbackCategories = [
    'service', 'resolution-quality', 'response-time', 'platform', 'suggestion'
  ];

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }
    setUserReports(mockResolvedReports);
  }, [navigate]);

  const handleChange = (e) => {
    setFeedbackData({
      ...feedbackData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!feedbackData.title.trim() || !feedbackData.message.trim()) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    if (feedbackType === 'report' && rating === 0) {
      setError('Please provide a rating');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/report/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          type: feedbackType,
          rating: rating,
          ...feedbackData
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Thank you for your feedback! It helps us improve our services.');
        // Reset form
        setFeedbackData({
          title: '',
          message: '',
          category: 'service',
          anonymous: false
        });
        setRating(0);
        
        setTimeout(() => {
          navigate('/myreports');
        }, 3000);
      } else {
        setError(data.message || 'Failed to submit feedback');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Feedback error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = () => {
    return [...Array(5)].map((_, index) => {
      const starNumber = index + 1;
      return (
        <button
          key={starNumber}
          type="button"
          className={`text-2xl transition-colors ${
            starNumber <= (hoveredRating || rating) 
              ? 'text-yellow-400' 
              : 'text-gray-300'
          }`}
          onClick={() => setRating(starNumber)}
          onMouseEnter={() => setHoveredRating(starNumber)}
          onMouseLeave={() => setHoveredRating(0)}
        >
          <Star className="w-8 h-8 fill-current" />
        </button>
      );
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/myreports')}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </button>
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Feedback</h1>
                <p className="text-sm text-gray-600">Share your experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feedback Type Selection */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">What would you like to feedback on?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setFeedbackType('report')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                feedbackType === 'report' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <CheckCircle className={`w-6 h-6 mb-2 ${
                feedbackType === 'report' ? 'text-green-500' : 'text-gray-400'
              }`} />
              <h3 className="font-medium text-gray-900">Resolved Issue</h3>
              <p className="text-sm text-gray-600">Provide feedback on how your reported issue was resolved</p>
            </button>

            <button
              onClick={() => setFeedbackType('general')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                feedbackType === 'general' 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <MessageSquare className={`w-6 h-6 mb-2 ${
                feedbackType === 'general' ? 'text-green-500' : 'text-gray-400'
              }`} />
              <h3 className="font-medium text-gray-900">General Feedback</h3>
              <p className="text-sm text-gray-600">General suggestions or feedback about the platform</p>
            </button>
          </div>
        </div>

        {/* Resolved Reports (if report feedback selected) */}
        {feedbackType === 'report' && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Resolved Reports</h3>
            <div className="space-y-3">
              {userReports.filter(report => !report.hasFeedback).map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                    <p className="text-sm text-gray-600">Resolved on {new Date(report.resolvedDate).toLocaleDateString()}</p>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded mt-1">
                      {report.category}
                    </span>
                  </div>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Give Feedback
                  </button>
                </div>
              ))}
              
              {userReports.filter(report => report.hasFeedback).map(report => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                  <div>
                    <h4 className="font-medium text-gray-700">{report.title}</h4>
                    <p className="text-sm text-gray-500">Feedback already provided</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating (for report feedback) */}
            {feedbackType === 'report' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Rate your experience *
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars()}
                  <span className="ml-3 text-sm text-gray-600">
                    {rating > 0 && `${rating} out of 5 stars`}
                  </span>
                </div>
              </div>
            )}

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Category
              </label>
              <select
                id="category"
                name="category"
                value={feedbackData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="service">Service Quality</option>
                <option value="resolution-quality">Resolution Quality</option>
                <option value="response-time">Response Time</option>
                <option value="platform">Platform Experience</option>
                <option value="suggestion">Suggestion</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={feedbackData.title}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Brief title for your feedback"
                maxLength={100}
              />
              <p className="text-sm text-gray-500 mt-1">{feedbackData.title.length}/100 characters</p>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Your Feedback *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={feedbackData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="Please share your detailed feedback..."
                maxLength={1000}
              />
              <p className="text-sm text-gray-500 mt-1">{feedbackData.message.length}/1000 characters</p>
            </div>

            {/* Anonymous Option */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={feedbackData.anonymous}
                onChange={(e) => setFeedbackData({...feedbackData, anonymous: e.target.checked})}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                Submit feedback anonymously
              </label>
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

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Feedback
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => navigate('/myreports')}
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

export default Feedback;
