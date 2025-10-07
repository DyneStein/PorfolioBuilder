import React, { useState, useEffect } from 'react';

const BioCustomization = ({ profileData, selectedSections, onBack, onNext }) => {
  const [bio, setBio] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAISuggestion, setShowAISuggestion] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState('');

  // Check if About Me section is selected
  const hasAboutSection = selectedSections.some(section => section.id === 'about');

  // If About Me section is not selected, skip this step
  useEffect(() => {
    if (!hasAboutSection) {
      onNext({ ...profileData, bio: '' });
    }
  }, [hasAboutSection, profileData, onNext]);

  const generateAIBio = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      const suggestions = [
        `Hi, I'm ${profileData.fullName}, a passionate ${profileData.professionalTitle.toLowerCase()} with a love for creating innovative solutions. With expertise in modern technologies and a keen eye for detail, I bring ideas to life through clean, efficient code and thoughtful design. I'm always excited to take on new challenges and collaborate with amazing teams to build something extraordinary.`,
        
        `Welcome! I'm ${profileData.fullName}, a dedicated ${profileData.professionalTitle.toLowerCase()} who thrives on turning complex problems into elegant solutions. My journey in technology has been driven by curiosity and a commitment to continuous learning. I believe in the power of great design and user experience to make a real difference in people's lives.`,
        
        `Hello! I'm ${profileData.fullName}, a creative ${profileData.professionalTitle.toLowerCase()} with a passion for building digital experiences that matter. I combine technical expertise with a user-centered approach to create solutions that are both functional and beautiful. When I'm not coding, you'll find me exploring new technologies and contributing to open-source projects.`
      ];
      
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setAiSuggestion(randomSuggestion);
      setIsGenerating(false);
      setShowAISuggestion(true);
    }, 2000);
  };

  const useAISuggestion = () => {
    setBio(aiSuggestion);
    setShowAISuggestion(false);
  };

  const handleNext = () => {
    onNext({ ...profileData, bio });
  };

  const handleBack = () => {
    onBack();
  };

  // Don't render if About Me section is not selected
  if (!hasAboutSection) {
    return null;
  }

  const characterCount = bio.length;
  const maxCharacters = 500;
  const isOverLimit = characterCount > maxCharacters;

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
              <span className="text-2xl">✍️</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Write Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Bio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tell your story in a few sentences. This will be the first thing visitors see about you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Bio Input Section */}
            <div className="space-y-8">
              {/* Bio Writing */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">About Me</h3>
                
                <div className="space-y-6">
                  {/* AI Suggestion Button */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Need inspiration?</h4>
                      <p className="text-gray-300 text-sm">Get an AI-generated bio suggestion based on your profile</p>
                    </div>
                    <button
                      onClick={generateAIBio}
                      disabled={isGenerating}
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                        isGenerating
                          ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                      }`}
                    >
                      {isGenerating ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <span>✨</span>
                          <span>Generate Suggestion</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* AI Suggestion Display */}
                  {showAISuggestion && (
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="text-blue-300 font-semibold">AI Suggestion</h5>
                        <button
                          onClick={() => setShowAISuggestion(false)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-blue-100 text-sm leading-relaxed mb-4">{aiSuggestion}</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={useAISuggestion}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                        >
                          Use This Bio
                        </button>
                        <button
                          onClick={() => setShowAISuggestion(false)}
                          className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bio Textarea */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Your Bio *
                    </label>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Write a compelling bio that tells your story. Include your passion, expertise, and what makes you unique..."
                      rows={8}
                      className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none ${
                        isOverLimit ? 'border-red-400' : 'border-white/30'
                      }`}
                    />
                    
                    {/* Character Count */}
                    <div className="flex justify-between items-center mt-2">
                      <div className="text-sm text-gray-400">
                        {characterCount} / {maxCharacters} characters
                      </div>
                      {isOverLimit && (
                        <div className="text-sm text-red-400">
                          ⚠️ Bio is too long
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Writing Tips */}
                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                    <h5 className="text-yellow-300 font-semibold mb-2">💡 Writing Tips</h5>
                    <ul className="text-yellow-100 text-sm space-y-1">
                      <li>• Keep it personal but professional</li>
                      <li>• Mention your passion and expertise</li>
                      <li>• Include what makes you unique</li>
                      <li>• Aim for 2-3 sentences (under 500 characters)</li>
                    </ul>
                  </div>
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
                  
                  {/* Bio Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 font-poppins">About Me</h2>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-600 leading-relaxed">
                        {bio || 'Your bio will appear here. Write something that tells your story and showcases your personality...'}
                      </p>
                    </div>
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
              <span>Back to Sections</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!bio.trim() || isOverLimit}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform ${
                bio.trim() && !isOverLimit
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1'
                  : 'text-gray-400 bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            >
              <span className="relative z-10">Next: Add Skills</span>
              
              {bio.trim() && !isOverLimit && (
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

export default BioCustomization;
