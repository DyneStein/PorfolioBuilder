import React, { useState, useEffect } from 'react';

const ExperienceEducationCustomization = ({ profileData, selectedSections, onBack, onNext }) => {
  const [experience, setExperience] = useState([]);
  const [education, setEducation] = useState([]);
  const [currentExperience, setCurrentExperience] = useState({
    role: '',
    company: '',
    duration: '',
    description: ''
  });
  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    institution: '',
    duration: ''
  });
  const [activeTab, setActiveTab] = useState('experience');
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  const [isAddingEducation, setIsAddingEducation] = useState(false);

  // Check if Experience or Education sections are selected
  const hasExperienceSection = selectedSections.some(section => section.id === 'experience');
  const hasEducationSection = selectedSections.some(section => section.id === 'education');

  // If neither section is selected, skip this step
  useEffect(() => {
    if (!hasExperienceSection && !hasEducationSection) {
      onNext({ ...profileData, experience: [], education: [] });
    }
  }, [hasExperienceSection, hasEducationSection, profileData, onNext]);

  const handleExperienceChange = (field, value) => {
    setCurrentExperience(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEducationChange = (field, value) => {
    setCurrentEducation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExperience = () => {
    if (currentExperience.role.trim() && currentExperience.company.trim() && currentExperience.duration.trim()) {
      const newExperience = {
        id: Date.now(),
        role: currentExperience.role.trim(),
        company: currentExperience.company.trim(),
        duration: currentExperience.duration.trim(),
        description: currentExperience.description.trim()
      };
      
      setExperience([...experience, newExperience]);
      setCurrentExperience({
        role: '',
        company: '',
        duration: '',
        description: ''
      });
      setIsAddingExperience(false);
    }
  };

  const addEducation = () => {
    if (currentEducation.degree.trim() && currentEducation.institution.trim() && currentEducation.duration.trim()) {
      const newEducation = {
        id: Date.now(),
        degree: currentEducation.degree.trim(),
        institution: currentEducation.institution.trim(),
        duration: currentEducation.duration.trim()
      };
      
      setEducation([...education, newEducation]);
      setCurrentEducation({
        degree: '',
        institution: '',
        duration: ''
      });
      setIsAddingEducation(false);
    }
  };

  const removeExperience = (experienceId) => {
    setExperience(experience.filter(exp => exp.id !== experienceId));
  };

  const removeEducation = (educationId) => {
    setEducation(education.filter(edu => edu.id !== educationId));
  };

  const editExperience = (exp) => {
    setCurrentExperience({
      role: exp.role,
      company: exp.company,
      duration: exp.duration,
      description: exp.description
    });
    removeExperience(exp.id);
    setIsAddingExperience(true);
  };

  const editEducation = (edu) => {
    setCurrentEducation({
      degree: edu.degree,
      institution: edu.institution,
      duration: edu.duration
    });
    removeEducation(edu.id);
    setIsAddingEducation(true);
  };

  const handleNext = () => {
    onNext({ ...profileData, experience, education });
  };

  const handleBack = () => {
    onBack();
  };

  // Don't render if neither section is selected
  if (!hasExperienceSection && !hasEducationSection) {
    return null;
  }

  const isExperienceFormValid = currentExperience.role.trim() && currentExperience.company.trim() && currentExperience.duration.trim();
  const isEducationFormValid = currentEducation.degree.trim() && currentEducation.institution.trim() && currentEducation.duration.trim();

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
              <span className="text-2xl">💼</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Add Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Background</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Share your professional experience and educational background to showcase your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Input Section */}
            <div className="space-y-8">
              {/* Tab Navigation */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="flex space-x-1 mb-8">
                  {hasExperienceSection && (
                    <button
                      onClick={() => setActiveTab('experience')}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === 'experience'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/20 text-gray-300 hover:bg-white/30'
                      }`}
                    >
                      💼 Experience
                    </button>
                  )}
                  {hasEducationSection && (
                    <button
                      onClick={() => setActiveTab('education')}
                      className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        activeTab === 'education'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                          : 'bg-white/20 text-gray-300 hover:bg-white/30'
                      }`}
                    >
                      🎓 Education
                    </button>
                  )}
                </div>

                {/* Experience Tab */}
                {activeTab === 'experience' && hasExperienceSection && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white font-poppins">Work Experience</h3>
                      {!isAddingExperience && (
                        <button
                          onClick={() => setIsAddingExperience(true)}
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          <div className="flex items-center space-x-2">
                            <span>+</span>
                            <span>Add Experience</span>
                          </div>
                        </button>
                      )}
                    </div>

                    {isAddingExperience && (
                      <div className="space-y-6">
                        {/* Role */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Job Title *
                          </label>
                          <input
                            type="text"
                            value={currentExperience.role}
                            onChange={(e) => handleExperienceChange('role', e.target.value)}
                            placeholder="e.g., Senior Developer, Marketing Manager"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Company */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Company *
                          </label>
                          <input
                            type="text"
                            value={currentExperience.company}
                            onChange={(e) => handleExperienceChange('company', e.target.value)}
                            placeholder="e.g., Google, Microsoft, Startup Inc."
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Duration *
                          </label>
                          <input
                            type="text"
                            value={currentExperience.duration}
                            onChange={(e) => handleExperienceChange('duration', e.target.value)}
                            placeholder="e.g., Jan 2020 - Present, 2020-2022"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Description
                          </label>
                          <textarea
                            value={currentExperience.description}
                            onChange={(e) => handleExperienceChange('description', e.target.value)}
                            placeholder="Brief description of your role and key achievements..."
                            rows={3}
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                          />
                        </div>

                        {/* Form Actions */}
                        <div className="flex space-x-3">
                          <button
                            onClick={addExperience}
                            disabled={!isExperienceFormValid}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                              isExperienceFormValid
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Add Experience
                          </button>
                          <button
                            onClick={() => {
                              setIsAddingExperience(false);
                              setCurrentExperience({
                                role: '',
                                company: '',
                                duration: '',
                                description: ''
                              });
                            }}
                            className="px-6 py-3 bg-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Experience List */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Your Experience ({experience.length})</h4>
                        {experience.length > 0 && (
                          <button
                            onClick={() => setExperience([])}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Clear All
                          </button>
                        )}
                      </div>

                      {experience.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">💼</div>
                          <p>No experience added yet. Add your work history!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {experience.map((exp) => (
                            <div
                              key={exp.id}
                              className="bg-white/10 border border-white/20 rounded-xl p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold mb-1">{exp.role}</h5>
                                  <p className="text-blue-400 font-medium mb-1">{exp.company}</p>
                                  <p className="text-gray-400 text-sm mb-2">{exp.duration}</p>
                                  {exp.description && (
                                    <p className="text-gray-300 text-sm line-clamp-2">{exp.description}</p>
                                  )}
                                </div>
                                <div className="flex space-x-2 ml-4">
                                  <button
                                    onClick={() => editExperience(exp)}
                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => removeExperience(exp.id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Education Tab */}
                {activeTab === 'education' && hasEducationSection && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-white font-poppins">Education</h3>
                      {!isAddingEducation && (
                        <button
                          onClick={() => setIsAddingEducation(true)}
                          className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                        >
                          <div className="flex items-center space-x-2">
                            <span>+</span>
                            <span>Add Education</span>
                          </div>
                        </button>
                      )}
                    </div>

                    {isAddingEducation && (
                      <div className="space-y-6">
                        {/* Degree */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Degree *
                          </label>
                          <input
                            type="text"
                            value={currentEducation.degree}
                            onChange={(e) => handleEducationChange('degree', e.target.value)}
                            placeholder="e.g., Bachelor of Computer Science, MBA"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Institution */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Institution *
                          </label>
                          <input
                            type="text"
                            value={currentEducation.institution}
                            onChange={(e) => handleEducationChange('institution', e.target.value)}
                            placeholder="e.g., Stanford University, MIT"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Duration */}
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Duration *
                          </label>
                          <input
                            type="text"
                            value={currentEducation.duration}
                            onChange={(e) => handleEducationChange('duration', e.target.value)}
                            placeholder="e.g., 2018-2022, Graduated 2020"
                            className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          />
                        </div>

                        {/* Form Actions */}
                        <div className="flex space-x-3">
                          <button
                            onClick={addEducation}
                            disabled={!isEducationFormValid}
                            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                              isEducationFormValid
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Add Education
                          </button>
                          <button
                            onClick={() => {
                              setIsAddingEducation(false);
                              setCurrentEducation({
                                degree: '',
                                institution: '',
                                duration: ''
                              });
                            }}
                            className="px-6 py-3 bg-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Education List */}
                    <div className="mt-8">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-semibold text-white">Your Education ({education.length})</h4>
                        {education.length > 0 && (
                          <button
                            onClick={() => setEducation([])}
                            className="text-red-400 hover:text-red-300 text-sm font-medium"
                          >
                            Clear All
                          </button>
                        )}
                      </div>

                      {education.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">🎓</div>
                          <p>No education added yet. Add your academic background!</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {education.map((edu) => (
                            <div
                              key={edu.id}
                              className="bg-white/10 border border-white/20 rounded-xl p-4"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <h5 className="text-white font-semibold mb-1">{edu.degree}</h5>
                                  <p className="text-blue-400 font-medium mb-1">{edu.institution}</p>
                                  <p className="text-gray-400 text-sm">{edu.duration}</p>
                                </div>
                                <div className="flex space-x-2 ml-4">
                                  <button
                                    onClick={() => editEducation(edu)}
                                    className="text-blue-400 hover:text-blue-300 text-sm"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => removeEducation(edu.id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Tips */}
                <div className="mt-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                  <h5 className="text-yellow-300 font-semibold mb-2">💡 Tips</h5>
                  <ul className="text-yellow-100 text-sm space-y-1">
                    <li>• List your most recent and relevant experience first</li>
                    <li>• Include key achievements and responsibilities</li>
                    <li>• Use consistent date formats (e.g., "Jan 2020 - Present")</li>
                    <li>• Keep descriptions concise but informative</li>
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
                  
                  {/* Experience Preview */}
                  {hasExperienceSection && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Experience</h2>
                      
                      {experience.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">💼</div>
                          <p>Your experience will appear here</p>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          {experience.map((exp) => (
                            <div key={exp.id} className="border-l-4 border-purple-500 pl-6 pb-6">
                              <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-bold text-gray-800 mb-1">{exp.role}</h3>
                                <p className="text-blue-600 font-medium mb-1">{exp.company}</p>
                                <p className="text-gray-500 text-sm mb-2">{exp.duration}</p>
                                {exp.description && (
                                  <p className="text-gray-600 text-sm">{exp.description}</p>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Education Preview */}
                  {hasEducationSection && (
                    <div className="p-8">
                      <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Education</h2>
                      
                      {education.length === 0 ? (
                        <div className="text-center py-8 text-gray-400">
                          <div className="text-4xl mb-2">🎓</div>
                          <p>Your education will appear here</p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {education.map((edu) => (
                            <div key={edu.id} className="bg-gray-50 rounded-lg p-4">
                              <h3 className="text-lg font-bold text-gray-800 mb-1">{edu.degree}</h3>
                              <p className="text-blue-600 font-medium mb-1">{edu.institution}</p>
                              <p className="text-gray-500 text-sm">{edu.duration}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
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
              <span>Back to Projects</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <span className="relative z-10">Next: Contact Info</span>
              
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceEducationCustomization;
