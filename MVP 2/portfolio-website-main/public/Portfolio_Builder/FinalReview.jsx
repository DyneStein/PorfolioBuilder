import React, { useState, useEffect } from 'react';

const FinalReview = ({ profileData, onBack, onConfirm }) => {
  const [currentView, setCurrentView] = useState('desktop');
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample data structure (replace with actual collected data)
  const portfolioData = {
    template: 'modern',
    theme: 'elegant-dark',
    profile: {
      fullName: profileData.fullName || 'FULL_NAME',
      professionalTitle: profileData.professionalTitle || 'Professional Title',
      profileImage: profileData.profileImage || '👤',
      headerStyle: 'round'
    },
    sections: {
      about: true,
      skills: true,
      projects: true,
      experience: true,
      education: true,
      contact: true
    },
    content: {
      bio: profileData.bio || 'BIO_TEXT',
      skills: profileData.skills || ['SKILLS_LIST'],
      projects: profileData.projects || ['PROJECTS_LIST'],
      experience: profileData.experience || ['EXPERIENCE_LIST'],
      education: profileData.education || ['EDUCATION_LIST'],
      contact: profileData.contact || {
        email: 'EMAIL',
        linkedin: 'LINKEDIN_URL',
        github: 'GITHUB_URL',
        resume: 'RESUME_URL'
      }
    },
    styles: {
      buttonStyle: profileData.styles?.buttonStyle || 'BUTTON_STYLE',
      iconStyle: profileData.styles?.iconStyle || 'ICON_STYLE',
      hoverEffects: profileData.styles?.hoverEffects || {
        scale: true,
        shadow: true,
        colorChange: true
      }
    }
  };

  const getButtonClasses = (type = 'primary') => {
    const baseClasses = 'font-semibold transition-all duration-300';
    const styleClasses = portfolioData.styles.buttonStyle === 'rounded' ? 'rounded-xl' : 
                        portfolioData.styles.buttonStyle === 'square' ? 'rounded-none' : 'rounded-lg';
    const hoverClasses = portfolioData.styles.hoverEffects.scale ? 'hover:scale-105' : '';
    const shadowClasses = portfolioData.styles.hoverEffects.shadow ? 'hover:shadow-lg' : '';
    const colorClasses = portfolioData.styles.hoverEffects.colorChange ? 'hover:from-purple-700 hover:to-pink-700' : '';
    
    if (type === 'primary') {
      return `${baseClasses} px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white ${styleClasses} ${hoverClasses} ${shadowClasses} ${colorClasses}`;
    } else if (type === 'secondary') {
      return `${baseClasses} px-4 py-2 bg-gray-100 text-gray-700 ${styleClasses} ${hoverClasses} ${shadowClasses} ${portfolioData.styles.hoverEffects.colorChange ? 'hover:bg-gray-200' : ''}`;
    } else {
      return `${baseClasses} px-4 py-2 border-2 border-purple-600 text-purple-600 ${styleClasses} ${hoverClasses} ${shadowClasses} ${portfolioData.styles.hoverEffects.colorChange ? 'hover:bg-purple-600 hover:text-white' : ''}`;
    }
  };

  const getIconClasses = () => {
    const baseClasses = 'transition-all duration-300';
    const scaleClasses = portfolioData.styles.hoverEffects.scale ? 'hover:scale-110' : '';
    const colorClasses = portfolioData.styles.hoverEffects.colorChange ? 'hover:text-purple-600' : '';
    
    return `${baseClasses} ${scaleClasses} ${colorClasses}`;
  };

  const getIconProps = () => {
    if (portfolioData.styles.iconStyle === 'filled') {
      return { fill: 'currentColor', strokeWidth: '0' };
    } else {
      return { fill: 'none', strokeWidth: '2' };
    }
  };

  const handleConfirm = async () => {
    setIsGenerating(true);
    
    // Simulate portfolio generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsGenerating(false);
    onConfirm(portfolioData);
  };

  const handleBack = () => {
    onBack();
  };

  const renderPortfolio = () => {
    return (
      <div className="bg-white min-h-screen">
        {/* Header Section */}
        <header className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white">
                  {portfolioData.profile.profileImage}
                </div>
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-4 font-poppins">
                  {portfolioData.profile.fullName}
                </h1>
                <p className="text-2xl text-gray-600 mb-6">
                  {portfolioData.profile.professionalTitle}
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <button className={getButtonClasses('primary')}>
                    View My Work
                  </button>
                  <button className={getButtonClasses('outline')}>
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        {portfolioData.sections.about && (
          <section className="py-16 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center font-poppins">About Me</h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>{portfolioData.content.bio}</p>
              </div>
            </div>
          </section>
        )}

        {/* Skills Section */}
        {portfolioData.sections.skills && (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Skills & Technologies</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {portfolioData.content.skills.map((skill, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                    <div className="text-3xl mb-3">🚀</div>
                    <h3 className="font-semibold text-gray-800">{skill}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        {portfolioData.sections.projects && (
          <section className="py-16 px-8 bg-white">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolioData.content.projects.map((project, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                    <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                      <span className="text-6xl text-white">📱</span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-3">{project.name || 'Project Name'}</h3>
                      <p className="text-gray-600 mb-4">{project.description || 'Project description goes here...'}</p>
                      <div className="flex gap-3">
                        <button className={getButtonClasses('primary')}>
                          View Project
                        </button>
                        <button className={getButtonClasses('secondary')}>
                          GitHub
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Experience Section */}
        {portfolioData.sections.experience && (
          <section className="py-16 px-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Experience</h2>
              <div className="space-y-8">
                {portfolioData.content.experience.map((exp, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-md">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{exp.role || 'Job Title'}</h3>
                      <span className="text-gray-600 font-medium">{exp.duration || 'Duration'}</span>
                    </div>
                    <h4 className="text-xl text-purple-600 mb-3">{exp.company || 'Company Name'}</h4>
                    <p className="text-gray-600">{exp.description || 'Job description goes here...'}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Education Section */}
        {portfolioData.sections.education && (
          <section className="py-16 px-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Education</h2>
              <div className="space-y-8">
                {portfolioData.content.education.map((edu, index) => (
                  <div key={index} className="bg-white rounded-xl p-8 shadow-md border-l-4 border-purple-500">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h3 className="text-2xl font-bold text-gray-800">{edu.degree || 'Degree'}</h3>
                      <span className="text-gray-600 font-medium">{edu.duration || 'Duration'}</span>
                    </div>
                    <h4 className="text-xl text-purple-600">{edu.institution || 'Institution Name'}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Contact Section */}
        {portfolioData.sections.contact && (
          <section className="py-16 px-8 bg-gray-900 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-8 font-poppins">Get In Touch</h2>
              <p className="text-xl text-gray-300 mb-12">
                Ready to work together? Let's create something amazing!
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {portfolioData.content.contact.email && (
                  <a href={`mailto:${portfolioData.content.contact.email}`} className={`flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${getButtonClasses().includes('rounded-xl') ? 'rounded-xl' : getButtonClasses().includes('rounded-none') ? 'rounded-none' : 'rounded-lg'} ${portfolioData.styles.hoverEffects.scale ? 'hover:scale-105' : ''} ${portfolioData.styles.hoverEffects.shadow ? 'hover:shadow-lg' : ''}`}>
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📧</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Email</p>
                      <p className="text-white font-medium">{portfolioData.content.contact.email}</p>
                    </div>
                  </a>
                )}

                {portfolioData.content.contact.linkedin && (
                  <a href={portfolioData.content.contact.linkedin} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${getButtonClasses().includes('rounded-xl') ? 'rounded-xl' : getButtonClasses().includes('rounded-none') ? 'rounded-none' : 'rounded-lg'} ${portfolioData.styles.hoverEffects.scale ? 'hover:scale-105' : ''} ${portfolioData.styles.hoverEffects.shadow ? 'hover:shadow-lg' : ''}`}>
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💼</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">LinkedIn</p>
                      <p className="text-white font-medium">View Profile</p>
                    </div>
                    <svg className={`ml-auto w-4 h-4 text-gray-400 ${getIconClasses()}`} {...getIconProps()} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {portfolioData.content.contact.github && (
                  <a href={portfolioData.content.contact.github} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${getButtonClasses().includes('rounded-xl') ? 'rounded-xl' : getButtonClasses().includes('rounded-none') ? 'rounded-none' : 'rounded-lg'} ${portfolioData.styles.hoverEffects.scale ? 'hover:scale-105' : ''} ${portfolioData.styles.hoverEffects.shadow ? 'hover:shadow-lg' : ''}`}>
                    <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🐙</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">GitHub</p>
                      <p className="text-white font-medium">View Profile</p>
                    </div>
                    <svg className={`ml-auto w-4 h-4 text-gray-400 ${getIconClasses()}`} {...getIconProps()} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

                {portfolioData.content.contact.resume && (
                  <a href={portfolioData.content.contact.resume} target="_blank" rel="noopener noreferrer" className={`flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${getButtonClasses().includes('rounded-xl') ? 'rounded-xl' : getButtonClasses().includes('rounded-none') ? 'rounded-none' : 'rounded-lg'} ${portfolioData.styles.hoverEffects.scale ? 'hover:scale-105' : ''} ${portfolioData.styles.hoverEffects.shadow ? 'hover:shadow-lg' : ''}`}>
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📄</span>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Resume</p>
                      <p className="text-white font-medium">Download CV</p>
                    </div>
                    <svg className={`ml-auto w-4 h-4 text-gray-400 ${getIconClasses()}`} {...getIconProps()} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                )}
              </div>

              <button className={getButtonClasses('primary')}>
                Send Message
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-8 px-8">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">
              © 2024 {portfolioData.profile.fullName}. Built with ❤️ using our Portfolio Builder.
            </p>
          </div>
        </footer>
      </div>
    );
  };

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
              <span className="text-2xl">✨</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Final <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Review</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Preview your complete portfolio before finalizing. Everything looks perfect!
            </p>
          </div>

          {/* Device Preview Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentView('desktop')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentView === 'desktop' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  🖥️ Desktop
                </button>
                <button
                  onClick={() => setCurrentView('tablet')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentView === 'tablet' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  📱 Tablet
                </button>
                <button
                  onClick={() => setCurrentView('mobile')}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    currentView === 'mobile' 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  📱 Mobile
                </button>
              </div>
            </div>
          </div>

          {/* Portfolio Preview */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-12">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white font-poppins">Portfolio Preview</h3>
              <div className="text-sm text-gray-300">
                {currentView === 'desktop' && '🖥️ Desktop View'}
                {currentView === 'tablet' && '📱 Tablet View'}
                {currentView === 'mobile' && '📱 Mobile View'}
              </div>
            </div>

            {/* Preview Container */}
            <div className={`bg-white rounded-2xl overflow-hidden shadow-2xl ${
              currentView === 'desktop' ? 'w-full' :
              currentView === 'tablet' ? 'max-w-4xl mx-auto' :
              'max-w-sm mx-auto'
            }`}>
              <div className={`${
                currentView === 'desktop' ? 'h-[800px] overflow-y-auto' :
                currentView === 'tablet' ? 'h-[600px] overflow-y-auto' :
                'h-[500px] overflow-y-auto'
              }`}>
                {renderPortfolio()}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
            >
              <svg className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Style</span>
            </button>

            {/* Confirm Button */}
            <button
              onClick={handleConfirm}
              disabled={isGenerating}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="relative z-10">Generating Portfolio...</span>
                </>
              ) : (
                <>
                  <span className="relative z-10">✨ Confirm & Generate</span>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalReview;
