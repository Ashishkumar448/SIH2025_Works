import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import { MapPin, Camera, Bell, BarChart3, Users, Shield, CheckCircle, Phone, Mail, ExternalLink } from 'lucide-react';

const Home = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate(); // Add this hook

  // Add navigation handler
  const handleUserLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-blue-900 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="font-bold text-gray-900">Government of Jharkhand</div>
                <div className="text-gray-600">Civic Tech Initiative</div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-900 hover:text-orange-600 font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-orange-600 font-medium">About</a>
              <a href="#features" className="text-gray-700 hover:text-orange-600 font-medium">Features</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Citizen Portal</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 font-medium">Admin Portal</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 font-medium">Contact</a>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
                <div className="w-6 h-0.5 bg-gray-600"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-2">
              <a href="#" className="block py-2 text-gray-900 font-medium">Home</a>
              <a href="#about" className="block py-2 text-gray-700">About</a>
              <a href="#features" className="block py-2 text-gray-700">Features</a>
              <a href="#" className="block py-2 text-gray-700">Citizen Portal</a>
              <a href="#" className="block py-2 text-gray-700">Admin Portal</a>
              <a href="#contact" className="block py-2 text-gray-700">Contact</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-white to-green-50 py-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-green-100/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-orange-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
              Empowering Citizens,
            </span>
            <br />
            <span className="text-gray-900">Enabling Change</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Report civic issues in real-time and track resolutions with transparency. 
            Building a cleaner, smarter Jharkhand together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all shadow-lg">
              Report an Issue
            </button>
            {/* Modified User Login button with navigation */}
            <button 
              onClick={handleUserLogin}
              className="bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-800 transform hover:scale-105 transition-all shadow-lg"
            >
              User Login
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Transforming Civic Engagement
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Traditional civic issue reporting faces challenges like delayed responses, lack of transparency, 
              and citizen frustration. Our digital solution bridges the gap between citizens and government.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Citizen Participation</h3>
              <p className="text-gray-700">Empowering every citizen to actively participate in improving their community</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-700">Complete visibility into issue status and resolution progress for all stakeholders</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Faster Resolution</h3>
              <p className="text-gray-700">Streamlined processes ensure quicker response times and efficient problem-solving</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Powerful Features for Everyone
            </h2>
            <p className="text-xl text-gray-700">
              Comprehensive tools designed for citizens and government officials
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Citizen Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                <span className="bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                  For Citizens
                </span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Reporting with Photos & GPS</h4>
                    <p className="text-gray-700">Capture issues with photos and automatic location tagging for precise reporting</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Track Issue Status</h4>
                    <p className="text-gray-700">Real-time updates on your reported issues from submission to resolution</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Bell className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Notifications</h4>
                    <p className="text-gray-700">Instant updates via SMS and app notifications about your issue progress</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Government Features */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  For Government
                </span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Dashboard</h4>
                    <p className="text-gray-700">Comprehensive overview of all issues with priority-based sorting and filtering</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Automated Routing</h4>
                    <p className="text-gray-700">Smart assignment of issues to appropriate departments based on type and location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Analytics & Insights</h4>
                    <p className="text-gray-700">Data-driven insights for better resource allocation and policy decisions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Live Issue Map
            </h2>
            <p className="text-xl text-gray-700">
              Real-time visualization of reported civic issues across Jharkhand
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-green-500 p-6">
              <div className="flex items-center justify-center text-white">
                <MapPin className="w-8 h-8 mr-3" />
                <span className="text-xl font-semibold">Interactive Map Coming Soon</span>
              </div>
            </div>
            <div className="h-96 bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 text-lg">Comprehensive map integration in development</p>
                <p className="text-gray-500">Showing reported issues, resolution status, and ward coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Making a Real Impact
            </h2>
            <p className="text-xl text-gray-700">
              Transforming communities across Jharkhand through civic engagement
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent mb-2">
                5,000+
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-1">Issues Resolved</div>
              <div className="text-gray-600">Across all categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent mb-2">
                100+
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-1">Wards Covered</div>
              <div className="text-gray-600">State-wide coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent mb-2">
                72hrs
              </div>
              <div className="text-xl font-semibold text-gray-900 mb-1">Average Resolution</div>
              <div className="text-gray-600">Response time</div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-2xl p-8">
            <div className="text-center">
              <blockquote className="text-xl md:text-2xl text-gray-800 italic mb-6">
                "This platform has revolutionized how we address civic issues. The transparency and efficiency 
                have restored citizens' faith in governance."
              </blockquote>
              <div className="text-lg font-semibold text-gray-900">- Municipal Commissioner</div>
              <div className="text-gray-600">Government of Jharkhand</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 via-blue-600 to-green-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Join us in building a cleaner, greener Jharkhand
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            Report civic issues today and be part of the change you want to see
          </p>
          <button className="bg-white text-gray-900 px-10 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 transform hover:scale-105 transition-all shadow-lg">
            Report Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-bold">Government of Jharkhand</div>
                  <div className="text-gray-400 text-sm">Civic Tech Initiative</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering citizens and enabling transparent governance through technology
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+91 651-2345-678</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>civic@jharkhand.gov.in</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white">Help Desk</a></li>
                <li><a href="#" className="hover:text-white">Digital India</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Government of Jharkhand. All rights reserved.</p>
            <p className="mt-2">Part of Digital India Initiative | Clean India Mission</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
