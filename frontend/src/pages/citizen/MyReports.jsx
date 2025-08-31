import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  AlertCircle, 
  Map, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Users, 
  BarChart3,
  ArrowRight,
  Shield,
  MapPin,
  FileText,
  Star
} from 'lucide-react';

const MyReports = () => {
  const [userStats, setUserStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    resolvedReports: 0,
    responseTime: '48hrs'
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Simulate loading user statistics
    setUserStats({
      totalReports: 12,
      pendingReports: 3,
      resolvedReports: 9,
      responseTime: '24hrs'
    });
  }, [navigate]);

  const handleReportIssue = () => {
    navigate('/report-issue');
  };

  const handleMapView = () => {
    navigate('/map-view');
  };

  const handleFeedback = () => {
    navigate('/feedback');
  };

  const features = [
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: "Easy Reporting",
      description: "Report civic issues with photos and GPS location"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Track the status of your reports in real-time"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Impact",
      description: "Join thousands of citizens making a difference"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">My Reports</h1>
                <p className="text-sm text-gray-600">Civic Issue Management</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/home')}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Your Civic Dashboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Report issues, track progress, and help build a better community. 
            Your voice matters in making Jharkhand cleaner and more efficient.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center border">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userStats.totalReports}</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center border">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userStats.pendingReports}</div>
            <div className="text-sm text-gray-600">Pending Reports</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center border">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userStats.resolvedReports}</div>
            <div className="text-sm text-gray-600">Resolved Reports</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center border">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{userStats.responseTime}</div>
            <div className="text-sm text-gray-600">Avg Response Time</div>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Report Issue */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
              <div className="text-center text-white">
                <AlertCircle className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold">Report Issue</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                Report civic issues in your area with photos and location details. 
                Help us identify problems that need attention.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Upload photos and videos
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  GPS location tagging
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Category classification
                </div>
              </div>
              <button
                onClick={handleReportIssue}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700 flex items-center justify-center group"
              >
                Report New Issue
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Map View */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
              <div className="text-center text-white">
                <Map className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold">Map View</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                View all reported issues on an interactive map. See what's happening 
                in your neighborhood and track resolution progress.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Interactive issue map
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Filter by category & status
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Real-time updates
                </div>
              </div>
              <button
                onClick={handleMapView}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center group"
              >
                View Map
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
              <div className="text-center text-white">
                <MessageSquare className="w-12 h-12 mx-auto mb-3" />
                <h3 className="text-xl font-bold">Feedback</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-center mb-6">
                Share your experience and provide feedback on resolved issues. 
                Help us improve our services and response quality.
              </p>
              <div className="space-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Rate resolution quality
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  Suggest improvements
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  General platform feedback
                </div>
              </div>
              <button
                onClick={handleFeedback}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center group"
              >
                Give Feedback
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-600">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Preview */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Activity</h2>
            <button className="text-orange-600 hover:text-orange-700 font-medium">
              View All Reports →
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Street Light Issue</h4>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Status: Under Review</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Road Pothole</h4>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <p className="text-sm text-gray-600">Status: Resolved</p>
              </div>
            </div>
            
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">Waste Management</h4>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
                <p className="text-sm text-gray-600">Status: In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReports;
