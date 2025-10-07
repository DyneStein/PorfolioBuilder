import React, { useState, useRef } from 'react';

const ProfileSetup = ({ selectedTemplate, selectedTheme, onBack, onNext }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    professionalTitle: '',
    profileImage: null,
    headerStyle: 'round'
  });
  
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const headerStyles = [
    {
      id: 'round',
      name: 'Round Avatar',
      description: 'Circular profile image with centered text',
      preview: 'rounded-full'
    },
    {
      id: 'square',
      name: 'Square Avatar',
      description: 'Square profile image with clean edges',
      preview: 'rounded-lg'
    },
    {
      id: 'banner',
      name: 'Banner Background',
      description: 'Full-width background with overlay text',
      preview: 'rounded-none'
    }
  ];

  const defaultAvatars = [
    { id: 'avatar1', emoji: '👨‍💼', name: 'Professional' },
    { id: 'avatar2', emoji: '👩‍💻', name: 'Developer' },
    { id: 'avatar3', emoji: '👨‍🎨', name: 'Designer' },
    { id: 'avatar4', emoji: '👩‍💼', name: 'Executive' },
    { id: 'avatar5', emoji: '👨‍🔬', name: 'Researcher' },
    { id: 'avatar6', emoji: '👩‍🚀', name: 'Innovator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
        setFormData(prev => ({
          ...prev,
          profileImage: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDefaultAvatarSelect = (avatar) => {
    setFormData(prev => ({
      ...prev,
      profileImage: avatar.emoji
    }));
    setImagePreview(null);
  };

  const handleNext = () => {
    if (formData.fullName && formData.professionalTitle) {
      onNext(formData);
    }
  };

  const isFormValid = formData.fullName && formData.professionalTitle;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
              <span className="text-2xl">👤</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Tell Us About <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Yourself</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Add your personal information and see how it looks in your portfolio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="space-y-8">
              {/* Basic Information */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Basic Information</h3>
                
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Professional Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Professional Title *
                    </label>
                    <input
                      type="text"
                      value={formData.professionalTitle}
                      onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                      placeholder="e.g., Web Developer, UX Designer, Marketing Manager"
                      className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>
                </div>
              </div>

              {/* Profile Image */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Profile Image</h3>
                
                {/* Upload Option */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Upload Your Photo
                  </label>
                  <div className="relative">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                    >
                      Choose Photo
                    </button>
                  </div>
                </div>

                {/* Default Avatars */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Or Choose a Default Avatar
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {defaultAvatars.map((avatar) => (
                      <button
                        key={avatar.id}
                        onClick={() => handleDefaultAvatarSelect(avatar)}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 ${
                          formData.profileImage === avatar.emoji
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-white/30 bg-white/10 hover:border-white/50'
                        }`}
                      >
                        <div className="text-3xl mb-2">{avatar.emoji}</div>
                        <div className="text-xs text-gray-300">{avatar.name}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Header Style */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Header Style</h3>
                
                <div className="space-y-4">
                  {headerStyles.map((style) => (
                    <label key={style.id} className="flex items-center space-x-4 cursor-pointer">
                      <input
                        type="radio"
                        name="headerStyle"
                        value={style.id}
                        checked={formData.headerStyle === style.id}
                        onChange={(e) => handleInputChange('headerStyle', e.target.value)}
                        className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium">{style.name}</div>
                        <div className="text-gray-400 text-sm">{style.description}</div>
                      </div>
                    </label>
                  ))}
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
                  <div className={`relative ${
                    formData.headerStyle === 'banner' 
                      ? 'h-64 bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'p-8 bg-gradient-to-r from-gray-50 to-gray-100'
                  }`}>
                    {formData.headerStyle === 'banner' ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          {formData.profileImage && (
                            <div className="mb-4">
                              {imagePreview ? (
                                <img 
                                  src={imagePreview} 
                                  alt="Profile" 
                                  className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg"
                                />
                              ) : (
                                <div className="w-24 h-24 rounded-full mx-auto border-4 border-white shadow-lg bg-white/20 flex items-center justify-center text-4xl">
                                  {formData.profileImage}
                                </div>
                              )}
                            </div>
                          )}
                          <h1 className="text-3xl font-bold mb-2">
                            {formData.fullName || 'Your Name'}
                          </h1>
                          <p className="text-xl opacity-90">
                            {formData.professionalTitle || 'Your Title'}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-6">
                        {formData.profileImage && (
                          <div>
                            {imagePreview ? (
                              <img 
                                src={imagePreview} 
                                alt="Profile" 
                                className={`w-24 h-24 ${formData.headerStyle === 'round' ? 'rounded-full' : 'rounded-lg'} shadow-lg`}
                              />
                            ) : (
                              <div className={`w-24 h-24 ${formData.headerStyle === 'round' ? 'rounded-full' : 'rounded-lg'} shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl text-white`}>
                                {formData.profileImage}
                              </div>
                            )}
                          </div>
                        )}
                        <div>
                          <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            {formData.fullName || 'Your Name'}
                          </h1>
                          <p className="text-xl text-gray-600">
                            {formData.professionalTitle || 'Your Title'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Sample Content */}
                  <div className="p-8">
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
              onClick={onBack}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
            >
              <svg className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Themes</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!isFormValid}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform ${
                isFormValid
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1'
                  : 'text-gray-400 bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            >
              <span className="relative z-10">Next: Add Your Projects</span>
              
              {isFormValid && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <svg className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Progress Indicator */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
