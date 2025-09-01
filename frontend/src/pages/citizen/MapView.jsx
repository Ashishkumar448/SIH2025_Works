import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Map, 
  MapPin, 
  Filter, 
  Search, 
  ArrowLeft, 
  AlertCircle, 
  Clock, 
  CheckCircle, 
  Eye,
  Navigation,
  Layers
} from 'lucide-react';

const MapView = () => {
  const [issues, setIssues] = useState([]);
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all'
  });
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Mock data for demonstration
  const mockIssues = [
    {
      id: 1,
      title: "Broken Street Light",
      category: "Street Lighting",
      status: "pending",
      priority: "medium",
      location: "Main Street, Block A",
      coordinates: { lat: 23.3441, lng: 85.3096 },
      reportedDate: "2025-08-29",
      description: "Street light not working since last week"
    },
    {
      id: 2,
      title: "Road Pothole",
      category: "Road and Transportation",
      status: "in-progress",
      priority: "high",
      location: "NH-33, Near Hospital",
      coordinates: { lat: 23.3461, lng: 85.3116 },
      reportedDate: "2025-08-28",
      description: "Large pothole causing traffic issues"
    },
    {
      id: 3,
      title: "Garbage Collection",
      category: "Waste Management",
      status: "resolved",
      priority: "low",
      location: "Residential Area, Sector 5",
      coordinates: { lat: 23.3421, lng: 85.3076 },
      reportedDate: "2025-08-25",
      description: "Irregular garbage collection in the area"
    }
  ];

  const categories = [
    'all', 'Road and Transportation', 'Water Supply', 'Waste Management', 
    'Street Lighting', 'Drainage and Sewerage', 'Public Safety', 'Other'
  ];

  const statuses = ['all', 'pending', 'in-progress', 'resolved', 'rejected'];
  const priorities = ['all', 'low', 'medium', 'high', 'urgent'];

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/login');
      return;
    }

    // Load issues (in real app, this would be an API call)
    setIssues(mockIssues);
  }, [navigate]);

  const getStatusColor = (status) => {
    const colors = {
      pending: 'text-yellow-600 bg-yellow-100',
      'in-progress': 'text-blue-600 bg-blue-100',
      resolved: 'text-green-600 bg-green-100',
      rejected: 'text-red-600 bg-red-100'
    };
    return colors[status] || 'text-gray-600 bg-gray-100';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-orange-600',
      urgent: 'text-red-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const filteredIssues = issues.filter(issue => {
    return (filters.category === 'all' || issue.category === filters.category) &&
           (filters.status === 'all' || issue.status === filters.status) &&
           (filters.priority === 'all' || issue.priority === filters.priority) &&
           (searchTerm === '' || issue.title.toLowerCase().includes(searchTerm.toLowerCase()));
  });

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
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Map View</h1>
                <p className="text-sm text-gray-600">View all reported issues</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="inline w-4 h-4 mr-1" />
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Statuses' : status.replace('-', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({...filters, priority: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {priorities.map(priority => (
                  <option key={priority} value={priority}>
                    {priority === 'all' ? 'All Priorities' : priority.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="inline w-4 h-4 mr-1" />
                Search
              </label>
              <input
                type="text"
                placeholder="Search issues..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600">
            Showing {filteredIssues.length} of {issues.length} issues
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Map Area */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h3 className="text-lg font-semibold text-white flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Interactive Map
              </h3>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-blue-500" />
                </div>
                <p className="text-gray-600 text-lg mb-2">Interactive Map Integration</p>
                <p className="text-gray-500">Map will show pinned locations of all reported issues</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center mx-auto">
                  <Navigation className="w-4 h-4 mr-2" />
                  Enable Location
                </button>
              </div>
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reported Issues</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {filteredIssues.map(issue => (
                <div
                  key={issue.id}
                  className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer border-2 transition-all hover:shadow-md ${
                    selectedIssue?.id === issue.id ? 'border-blue-500 bg-blue-50' : 'border-transparent'
                  }`}
                  onClick={() => setSelectedIssue(issue)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{issue.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {issue.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {issue.location}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Category: {issue.category}</span>
                    <span className={`font-medium ${getPriorityColor(issue.priority)}`}>
                      {issue.priority.toUpperCase()} Priority
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 mt-2">
                    <Clock className="w-3 h-3 mr-1" />
                    Reported on {new Date(issue.reportedDate).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Issue Details Modal */}
        {selectedIssue && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Issue Details</h3>
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-gray-900">{selectedIssue.title}</h4>
                  <p className="text-sm text-gray-600">{selectedIssue.description}</p>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedIssue.status)}`}>
                    {selectedIssue.status.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Priority:</span>
                  <span className={`text-sm font-medium ${getPriorityColor(selectedIssue.priority)}`}>
                    {selectedIssue.priority.toUpperCase()}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Location:</span>
                  <p className="text-sm text-gray-900">{selectedIssue.location}</p>
                </div>
                
                <div>
                  <span className="text-sm text-gray-500">Reported:</span>
                  <p className="text-sm text-gray-900">{new Date(selectedIssue.reportedDate).toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  onClick={() => setSelectedIssue(null)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center">
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
