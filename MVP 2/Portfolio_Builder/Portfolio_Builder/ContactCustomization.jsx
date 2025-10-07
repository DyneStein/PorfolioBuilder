import React, { useState, useEffect } from 'react';

const ContactCustomization = ({ profileData, selectedSections, onBack, onNext }) => {
  const [contactInfo, setContactInfo] = useState({
    email: '',
    linkedin: '',
    github: '',
    resume: ''
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Check if Contact section is selected
  const hasContactSection = selectedSections.some(section => section.id === 'contact');

  // If Contact section is not selected, skip this step
  useEffect(() => {
    if (!hasContactSection) {
      onNext({ ...profileData, contact: {} });
    }
  }, [hasContactSection, profileData, onNext]);

  const handleInputChange = (field, value) => {
    setContactInfo(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateURL = (url, platform) => {
    if (!url) return true; // Optional fields
    
    const urlRegex = /^https?:\/\/.+/;
    if (!urlRegex.test(url)) {
      return `Please enter a valid ${platform} URL starting with http:// or https://`;
    }
    
    // Platform-specific validation
    switch (platform) {
      case 'linkedin':
        return url.includes('linkedin.com') ? true : 'Please enter a valid LinkedIn URL';
      case 'github':
        return url.includes('github.com') ? true : 'Please enter a valid GitHub URL';
      default:
        return true;
    }
  };

  const handleNext = () => {
    const errors = {};
    
    // Validate email (required)
    if (!contactInfo.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!validateEmail(contactInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Validate URLs (optional but must be valid if provided)
    if (contactInfo.linkedin && !validateURL(contactInfo.linkedin, 'linkedin')) {
      errors.linkedin = validateURL(contactInfo.linkedin, 'linkedin');
    }
    
    if (contactInfo.github && !validateURL(contactInfo.github, 'github')) {
      errors.github = validateURL(contactInfo.github, 'github');
    }
    
    if (contactInfo.resume && !validateURL(contactInfo.resume, 'resume')) {
      errors.resume = 'Please enter a valid resume URL';
    }
    
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      onNext({ ...profileData, contact: contactInfo });
    }
  };

  const handleBack = () => {
    onBack();
  };

  // Don't render if Contact section is not selected
  if (!hasContactSection) {
    return null;
  }

  const hasAnyContactInfo = Object.values(contactInfo).some(value => value.trim());

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
              <span className="text-2xl">📧</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Add Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Contact Info</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Share how people can reach you. Add your professional contact information and social links.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Input Section */}
            <div className="space-y-8">
              {/* Contact Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">📧</span>
                      </div>
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="your.email@example.com"
                        className={`w-full pl-12 pr-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          validationErrors.email ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                    </div>
                    {validationErrors.email && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.email}</p>
                    )}
                  </div>

                  {/* LinkedIn */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      LinkedIn URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">💼</span>
                      </div>
                      <input
                        type="url"
                        value={contactInfo.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        placeholder="https://linkedin.com/in/yourprofile"
                        className={`w-full pl-12 pr-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          validationErrors.linkedin ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                    </div>
                    {validationErrors.linkedin && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.linkedin}</p>
                    )}
                  </div>

                  {/* GitHub */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      GitHub URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">🐙</span>
                      </div>
                      <input
                        type="url"
                        value={contactInfo.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        placeholder="https://github.com/yourusername"
                        className={`w-full pl-12 pr-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          validationErrors.github ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                    </div>
                    {validationErrors.github && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.github}</p>
                    )}
                  </div>

                  {/* Resume */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Resume/CV URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-400 text-lg">📄</span>
                      </div>
                      <input
                        type="url"
                        value={contactInfo.resume}
                        onChange={(e) => handleInputChange('resume', e.target.value)}
                        placeholder="https://yourwebsite.com/resume.pdf"
                        className={`w-full pl-12 pr-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 ${
                          validationErrors.resume ? 'border-red-400' : 'border-white/30'
                        }`}
                      />
                    </div>
                    {validationErrors.resume && (
                      <p className="text-red-400 text-sm mt-1">{validationErrors.resume}</p>
                    )}
                    <p className="text-gray-400 text-sm mt-2">
                      Optional: Link to your resume or CV for download
                    </p>
                  </div>
                </div>

                {/* Tips */}
                <div className="mt-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                  <h5 className="text-yellow-300 font-semibold mb-2">💡 Tips</h5>
                  <ul className="text-yellow-100 text-sm space-y-1">
                    <li>• Use a professional email address</li>
                    <li>• Make sure your LinkedIn profile is up-to-date</li>
                    <li>• Include your best projects on GitHub</li>
                    <li>• Keep your resume current and accessible</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Live Preview Section */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Live Preview</h3>
                
                {/* Preview Container */}
                <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                  {/* Header Preview */}
                  <div className="relative p-8 bg-gradient-to-r from-gray-50 to-gray-100">
                    <div className="flex items-center space-x-6">
                      <div className="w-24 h-24 rounded-full shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white">
                        {profileData.profileImage || '👤'}
                      </div>
                      <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                          {profileData.fullName || 'Your Name'}
                        </h1>
                        <p className="text-xl text-gray-600">
                          {profileData.professionalTitle || 'Your Title'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Contact</h2>
                    
                    {!hasAnyContactInfo ? (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">📧</div>
                        <p>Your contact information will appear here</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Email */}
                        {contactInfo.email && (
                          <a
                            href={`mailto:${contactInfo.email}`}
                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">📧</span>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Email</p>
                              <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                {contactInfo.email}
                              </p>
                            </div>
                          </a>
                        )}

                        {/* LinkedIn */}
                        {contactInfo.linkedin && (
                          <a
                            href={contactInfo.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">💼</span>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">LinkedIn</p>
                              <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                View Profile
                              </p>
                            </div>
                            <svg className="ml-auto w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}

                        {/* GitHub */}
                        {contactInfo.github && (
                          <a
                            href={contactInfo.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-800 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">🐙</span>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">GitHub</p>
                              <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                View Profile
                              </p>
                            </div>
                            <svg className="ml-auto w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}

                        {/* Resume */}
                        {contactInfo.resume && (
                          <a
                            href={contactInfo.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                          >
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-lg">📄</span>
                            </div>
                            <div>
                              <p className="text-gray-600 text-sm">Resume</p>
                              <p className="text-gray-800 font-medium group-hover:text-blue-600 transition-colors">
                                Download CV
                              </p>
                            </div>
                            <svg className="ml-auto w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {/* Sample Content */}
                  <div className="p-8 bg-gray-50">
                    <div className="space-y-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
            >
              <svg className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Background</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <span className="relative z-10">Next: Final Review</span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCustomization;
