import React, { useState, useEffect } from 'react';

const ProjectsCustomization = ({ profileData, selectedSections, onBack, onNext }) => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState({
    name: '',
    description: '',
    url: '',
    image: ''
  });
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Check if Projects section is selected
  const hasProjectsSection = selectedSections.some(section => section.id === 'projects');

  // If Projects section is not selected, skip this step
  useEffect(() => {
    if (!hasProjectsSection) {
      onNext({ ...profileData, projects: [] });
    }
  }, [hasProjectsSection, profileData, onNext]);

  const handleInputChange = (field, value) => {
    setCurrentProject(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addProject = () => {
    if (currentProject.name.trim() && currentProject.description.trim()) {
      const newProject = {
        id: Date.now(),
        name: currentProject.name.trim(),
        description: currentProject.description.trim(),
        url: currentProject.url.trim(),
        image: currentProject.image.trim() || null
      };
      
      setProjects([...projects, newProject]);
      setCurrentProject({
        name: '',
        description: '',
        url: '',
        image: ''
      });
      setIsAddingProject(false);
    }
  };

  const removeProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  const editProject = (project) => {
    setCurrentProject({
      name: project.name,
      description: project.description,
      url: project.url,
      image: project.image || ''
    });
    removeProject(project.id);
    setIsAddingProject(true);
  };

  const handleNext = () => {
    onNext({ ...profileData, projects });
  };

  const handleBack = () => {
    onBack();
  };

  // Don't render if Projects section is not selected
  if (!hasProjectsSection) {
    return null;
  }

  const isFormValid = currentProject.name.trim() && currentProject.description.trim();

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
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Add Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Projects</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Showcase your work and achievements. Add projects that demonstrate your skills and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Projects Input Section */}
            <div className="space-y-8">
              {/* Add Project Form */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white font-poppins">Add Project</h3>
                  {!isAddingProject && (
                    <button
                      onClick={() => setIsAddingProject(true)}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                    >
                      <div className="flex items-center space-x-2">
                        <span>+</span>
                        <span>New Project</span>
                      </div>
                    </button>
                  )}
                </div>

                {isAddingProject && (
                  <div className="space-y-6">
                    {/* Project Name */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Name *
                      </label>
                      <input
                        type="text"
                        value={currentProject.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="e.g., E-commerce Website, Mobile App"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Project Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={currentProject.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Brief description of what the project does and technologies used..."
                        rows={4}
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Project URL */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project URL
                      </label>
                      <input
                        type="url"
                        value={currentProject.url}
                        onChange={(e) => handleInputChange('url', e.target.value)}
                        placeholder="https://your-project.com or https://github.com/username/repo"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                    </div>

                    {/* Project Image */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Project Image URL
                      </label>
                      <input
                        type="url"
                        value={currentProject.image}
                        onChange={(e) => handleInputChange('image', e.target.value)}
                        placeholder="https://example.com/project-image.jpg"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                      />
                      <p className="text-gray-400 text-sm mt-2">
                        Optional: Add a screenshot or logo of your project
                      </p>
                    </div>

                    {/* Form Actions */}
                    <div className="flex space-x-3">
                      <button
                        onClick={addProject}
                        disabled={!isFormValid}
                        className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                          isFormValid
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                            : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        Add Project
                      </button>
                      <button
                        onClick={() => {
                          setIsAddingProject(false);
                          setCurrentProject({
                            name: '',
                            description: '',
                            url: '',
                            image: ''
                          });
                        }}
                        className="px-6 py-3 bg-gray-600 text-gray-300 rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {/* Current Projects List */}
                <div className="mt-8">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-white">Your Projects ({projects.length})</h4>
                    {projects.length > 0 && (
                      <button
                        onClick={() => setProjects([])}
                        className="text-red-400 hover:text-red-300 text-sm font-medium"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {projects.length === 0 ? (
                    <div className="text-center py-8 text-gray-400">
                      <div className="text-4xl mb-2">🎯</div>
                      <p>No projects added yet. Add some projects to showcase your work!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {projects.map((project) => (
                        <div
                          key={project.id}
                          className="bg-white/10 border border-white/20 rounded-xl p-4"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h5 className="text-white font-semibold mb-1">{project.name}</h5>
                              <p className="text-gray-300 text-sm mb-2 line-clamp-2">{project.description}</p>
                              {project.url && (
                                <a
                                  href={project.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 text-sm"
                                >
                                  View Project →
                                </a>
                              )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => editProject(project)}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => removeProject(project.id)}
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

                {/* Tips */}
                <div className="mt-6 bg-yellow-500/20 border border-yellow-400/30 rounded-xl p-4">
                  <h5 className="text-yellow-300 font-semibold mb-2">💡 Tips</h5>
                  <ul className="text-yellow-100 text-sm space-y-1">
                    <li>• Include your best and most recent projects</li>
                    <li>• Add live links or GitHub repositories</li>
                    <li>• Use clear, descriptive project names</li>
                    <li>• Mention key technologies and achievements</li>
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
                  
                  {/* Projects Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Projects</h2>
                    
                    {projects.length === 0 ? (
                      <div className="text-center py-8 text-gray-400">
                        <div className="text-4xl mb-2">🚀</div>
                        <p>Your projects will appear here as cards</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                          >
                            {/* Project Image */}
                            {project.image && (
                              <div className="mb-4">
                                <img
                                  src={project.image}
                                  alt={project.name}
                                  className="w-full h-32 object-cover rounded-lg"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              </div>
                            )}
                            
                            {/* Project Content */}
                            <h3 className="text-lg font-bold text-gray-800 mb-2">{project.name}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                            
                            {/* Project Link */}
                            {project.url && (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                              >
                                View Project
                                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            )}
                          </div>
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
              <span>Back to Skills</span>
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCustomization;
