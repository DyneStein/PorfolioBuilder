import React, { useState, useEffect } from 'react';

const SkillsCustomization = ({ profileData, selectedSections, onBack, onNext }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [showAISuggestions, setShowAISuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Check if Skills section is selected
  const hasSkillsSection = selectedSections.some(section => section.id === 'skills');

  // If Skills section is not selected, skip this step
  useEffect(() => {
    if (!hasSkillsSection) {
      onNext({ ...profileData, skills: [] });
    }
  }, [hasSkillsSection, profileData, onNext]);

  const skillCategories = {
    'Web Developer': [
      'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'Angular', 'Node.js', 'Express.js',
      'Python', 'Django', 'Flask', 'PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'MongoDB',
      'Git', 'GitHub', 'Docker', 'AWS', 'Firebase', 'REST APIs', 'GraphQL', 'TypeScript'
    ],
    'UX Designer': [
      'Figma', 'Adobe XD', 'Sketch', 'InVision', 'Principle', 'Framer', 'Prototyping',
      'User Research', 'Wireframing', 'User Testing', 'Design Systems', 'Accessibility',
      'Photoshop', 'Illustrator', 'After Effects', 'Principle', 'Zeplin', 'Abstract'
    ],
    'Data Scientist': [
      'Python', 'R', 'SQL', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'PyTorch',
      'Jupyter', 'Tableau', 'Power BI', 'Matplotlib', 'Seaborn', 'Machine Learning',
      'Deep Learning', 'Statistics', 'Data Visualization', 'Apache Spark', 'Hadoop'
    ],
    'Marketing Manager': [
      'Google Analytics', 'Facebook Ads', 'Google Ads', 'HubSpot', 'Mailchimp',
      'Content Marketing', 'SEO', 'SEM', 'Social Media Marketing', 'Email Marketing',
      'Marketing Automation', 'CRM', 'Salesforce', 'Adobe Creative Suite', 'Canva'
    ],
    'Project Manager': [
      'Agile', 'Scrum', 'Jira', 'Trello', 'Asana', 'Microsoft Project', 'Slack',
      'Risk Management', 'Budget Planning', 'Team Leadership', 'Stakeholder Management',
      'Confluence', 'Monday.com', 'Notion', 'Microsoft Teams', 'Zoom'
    ]
  };

  const generateAISuggestions = async () => {
    setIsGenerating(true);
    
    // Simulate AI generation based on professional title
    setTimeout(() => {
      const title = profileData.professionalTitle || 'Web Developer';
      const categorySkills = skillCategories[title] || skillCategories['Web Developer'];
      
      // Get 8 random skills from the category
      const shuffled = categorySkills.sort(() => 0.5 - Math.random());
      const suggestedSkills = shuffled.slice(0, 8);
      
      setAiSuggestions(suggestedSkills);
      setIsGenerating(false);
      setShowAISuggestions(true);
    }, 1500);
  };

  const addSkill = (skill) => {
    const trimmedSkill = skill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      setSkills([...skills, trimmedSkill]);
    }
    setNewSkill('');
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const addAISuggestion = (skill) => {
    addSkill(skill);
    setShowAISuggestions(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill(newSkill);
    }
  };

  const handleNext = () => {
    onNext({ ...profileData, skills });
  };

  const handleBack = () => {
    onBack();
  };

  // Don't render if Skills section is not selected
  if (!hasSkillsSection) {
    return null;
  }

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
              <span className="text-2xl">⚡</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Add Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Skills</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcase your technical abilities and competencies. Add skills that highlight your expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Skills Input Section */}
            <div className="space-y-8">
              {/* Skills Management */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Skills & Technologies</h3>
                
                <div className="space-y-6">
                  {/* AI Suggestions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">Need suggestions?</h4>
                      <p className="text-gray-300 text-sm">Get AI-recommended skills for {profileData.professionalTitle || 'your role'}</p>
                    </div>
                    <button
                      onClick={generateAISuggestions}
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
                          <span>🤖</span>
                          <span>AI Suggestions</span>
                        </div>
                      )}
                    </button>
                  </div>

                  {/* AI Suggestions Display */}
                  {showAISuggestions && (
                    <div className="bg-blue-500/20 border border-blue-400/30 rounded-xl p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h5 className="text-blue-300 font-semibold">Suggested Skills</h5>
                        <button
                          onClick={() => setShowAISuggestions(false)}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {aiSuggestions.map((skill, index) => (
                          <button
                            key={index}
                            onClick={() => addAISuggestion(skill)}
                            className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                          >
                            + {skill}
                          </button>
                        ))}
                      </div>
                      <button
                        onClick={() => setShowAISuggestions(false)}
                        className="px-4 py-2 bg-gray-600 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  )}

                  {/* Manual Skill Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Add Skills Manually
                    </label>
                    <div className="flex space-x-3">
                      <input
                        type="text"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="e.g., React, Python, Figma..."
                        className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                      <button
                        onClick={() => addSkill(newSkill)}
                        className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* Current Skills */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">Your Skills ({skills.length})</h4>
                      {skills.length > 0 && (
                        <button
                          onClick={() => setSkills([])}
                          className="text-red-400 hover:text-red-300 text-sm font-medium"
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    
                    {skills.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">🎯</div>
                        <p>No skills added yet. Add some skills to showcase your expertise!</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg"
                          >
                            <span className="text-sm font-medium">{skill}</span>
                            <button
                              onClick={() => removeSkill(skill)}
                              className="text-white hover:text-red-200 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                    <h5 className="text-yellow-300 font-semibold mb-2">💡 Tips</h5>
                    <ul className="text-yellow-100 text-sm space-y-1">
                      <li>• Include both technical and soft skills</li>
                      <li>• Focus on skills relevant to your target role</li>
                      <li>• Aim for 5-15 skills for optimal display</li>
                      <li>• Use consistent naming (e.g., "JavaScript" not "JS")</li>
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
                  
                  {/* Skills Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Skills</h2>
                    
                    {skills.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">⚡</div>
                        <p>Your skills will appear here as badges</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-3">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-sm font-medium shadow-lg"
                          >
                            {skill}
                          </span>
                        ))}
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
              <span>Back to Bio</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
            >
              <span className="relative z-10">Next: Add Projects</span>
              
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsCustomization;
