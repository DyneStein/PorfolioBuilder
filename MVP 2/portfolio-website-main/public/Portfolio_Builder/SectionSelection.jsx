import React, { useState } from 'react';

const SectionSelection = ({ profileData, onBack, onNext }) => {
  const [selectedSections, setSelectedSections] = useState({
    about: true,
    skills: true,
    projects: true,
    experience: false,
    education: false,
    contact: true
  });

  const sections = [
    {
      id: 'about',
      name: 'About Me',
      description: 'Personal introduction and professional summary',
      icon: '👋',
      color: 'from-blue-500 to-blue-600',
      recommended: true
    },
    {
      id: 'skills',
      name: 'Skills',
      description: 'Technical abilities and competencies',
      icon: '⚡',
      color: 'from-purple-500 to-purple-600',
      recommended: true
    },
    {
      id: 'projects',
      name: 'Projects',
      description: 'Portfolio of your work and achievements',
      icon: '🚀',
      color: 'from-green-500 to-green-600',
      recommended: true
    },
    {
      id: 'experience',
      name: 'Experience',
      description: 'Work history and professional background',
      icon: '💼',
      color: 'from-orange-500 to-orange-600',
      recommended: false
    },
    {
      id: 'education',
      name: 'Education',
      description: 'Academic background and certifications',
      icon: '🎓',
      color: 'from-indigo-500 to-indigo-600',
      recommended: false
    },
    {
      id: 'contact',
      name: 'Contact',
      description: 'Ways for people to reach you',
      icon: '📧',
      color: 'from-pink-500 to-pink-600',
      recommended: true
    }
  ];

  const toggleSection = (sectionId) => {
    setSelectedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleNext = () => {
    const selectedSectionsList = sections.filter(section => selectedSections[section.id]);
    if (selectedSectionsList.length > 0) {
      onNext({
        ...profileData,
        selectedSections: selectedSectionsList.map(section => ({
          id: section.id,
          name: section.name,
          description: section.description,
          icon: section.icon,
          color: section.color
        }))
      });
    }
  };

  const selectedCount = Object.values(selectedSections).filter(Boolean).length;
  const hasMinimumSections = selectedCount >= 3;

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
              <span className="text-2xl">📋</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Choose Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Sections</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Select which sections to include in your portfolio. You can always add more later.
            </p>
          </div>

          {/* Section Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sections.map((section) => (
              <div
                key={section.id}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedSections[section.id] ? 'scale-105' : ''
                }`}
                onClick={() => toggleSection(section.id)}
              >
                {/* Section Card */}
                <div className={`bg-white rounded-3xl p-6 shadow-2xl border-2 transition-all duration-300 ${
                  selectedSections[section.id] 
                    ? 'border-purple-500 shadow-purple-500/25' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}>
                  {/* Selection Indicator */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                    selectedSections[section.id] 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                      : 'bg-gray-400 group-hover:bg-gray-500'
                  }`}>
                    {selectedSections[section.id] ? '✓' : '+'}
                  </div>

                  {/* Section Icon */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} flex items-center justify-center mb-4 mx-auto`}>
                    <span className="text-3xl">{section.icon}</span>
                  </div>

                  {/* Section Info */}
                  <div className="text-center space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <h3 className="text-xl font-bold text-gray-800 font-poppins">
                        {section.name}
                      </h3>
                      {section.recommended && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                          Recommended
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Selection Glow Effect */}
                  {selectedSections[section.id] && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Selection Summary */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 border border-white/20 mb-8">
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2 font-poppins">
                Portfolio Summary
              </h3>
              <p className="text-gray-300 mb-4">
                You've selected <span className="text-purple-300 font-semibold">{selectedCount}</span> sections for your portfolio
              </p>
              
              {/* Selected Sections List */}
              <div className="flex flex-wrap justify-center gap-2">
                {sections
                  .filter(section => selectedSections[section.id])
                  .map(section => (
                    <span
                      key={section.id}
                      className="inline-flex items-center space-x-2 px-3 py-1 bg-white/20 rounded-full text-white text-sm"
                    >
                      <span>{section.icon}</span>
                      <span>{section.name}</span>
                    </span>
                  ))
                }
              </div>

              {!hasMinimumSections && (
                <p className="text-yellow-300 text-sm mt-4">
                  💡 We recommend selecting at least 3 sections for a complete portfolio
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-300 bg-gray-700 rounded-2xl hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
            >
              <svg className="mr-3 w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
              </svg>
              <span>Back to Profile</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={selectedCount === 0}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform ${
                selectedCount > 0
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1'
                  : 'text-gray-400 bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            >
              <span className="relative z-10">Next: Customize Content</span>
              
              {selectedCount > 0 && (
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionSelection;
