import React, { useState } from 'react';

const TemplateSelection = ({ onNext }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Clean, focused design perfect for showcasing your work with elegance and simplicity.',
      targetUser: 'Perfect for designers, developers, and creative professionals',
      emoji: '⚪',
      color: 'from-gray-100 to-gray-200',
      textColor: 'text-gray-800',
      borderColor: 'border-gray-300',
      hoverColor: 'hover:border-gray-400'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Contemporary layout with bold typography and dynamic elements for maximum impact.',
      targetUser: 'Ideal for entrepreneurs, consultants, and business professionals',
      emoji: '🔷',
      color: 'from-blue-100 to-purple-100',
      textColor: 'text-blue-800',
      borderColor: 'border-blue-300',
      hoverColor: 'hover:border-blue-400'
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Artistic and expressive design that lets your personality and creativity shine through.',
      targetUser: 'Great for artists, photographers, and creative freelancers',
      emoji: '🎨',
      color: 'from-pink-100 to-orange-100',
      textColor: 'text-pink-800',
      borderColor: 'border-pink-300',
      hoverColor: 'hover:border-pink-400'
    }
  ];

  const handleNext = () => {
    if (selectedTemplate) {
      onNext(selectedTemplate);
    }
  };

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
              <span className="text-2xl">🎯</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Choose Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Template</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Select a template that best represents your style and professional goals
            </p>
          </div>

          {/* Template Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {templates.map((template, index) => (
              <div
                key={template.id}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedTemplate === template.id ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                {/* Template Card */}
                <div className={`bg-white rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 ${
                  selectedTemplate === template.id 
                    ? 'border-purple-500 shadow-purple-500/25' 
                    : `border-gray-200 ${template.hoverColor}`
                }`}>
                  {/* Selection Indicator */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                    selectedTemplate === template.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                      : 'bg-gray-400 group-hover:bg-gray-500'
                  }`}>
                    {selectedTemplate === template.id ? '✓' : index + 1}
                  </div>

                  {/* Template Preview */}
                  <div className={`w-full h-48 rounded-2xl mb-6 bg-gradient-to-br ${template.color} flex items-center justify-center relative overflow-hidden`}>
                    {/* Template Mockup */}
                    <div className="w-32 h-20 bg-white rounded-lg shadow-lg flex flex-col p-2">
                      <div className="flex items-center space-x-1 mb-1">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-gray-100 rounded flex items-center justify-center">
                        <span className="text-2xl">{template.emoji}</span>
                      </div>
                    </div>
                    
                    {/* Floating Elements */}
                    <div className="absolute top-4 right-4 w-3 h-3 bg-white rounded-full opacity-60 animate-bounce"></div>
                    <div className="absolute bottom-4 left-4 w-2 h-2 bg-white rounded-full opacity-40 animate-bounce" style={{animationDelay: '1s'}}></div>
                  </div>

                  {/* Template Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${template.textColor} mb-2 font-poppins`}>
                        {template.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {template.description}
                      </p>
                    </div>
                    
                    <div className="pt-2">
                      <p className="text-sm text-gray-500 font-medium">
                        {template.targetUser}
                      </p>
                    </div>
                  </div>

                  {/* Selection Glow Effect */}
                  {selectedTemplate === template.id && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={!selectedTemplate}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform ${
                selectedTemplate
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1'
                  : 'text-gray-400 bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            >
              <span className="relative z-10">Next: Customize Your Portfolio</span>
              
              {selectedTemplate && (
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateSelection;