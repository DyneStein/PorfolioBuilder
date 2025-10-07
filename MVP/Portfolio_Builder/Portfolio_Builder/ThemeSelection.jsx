import React, { useState } from 'react';

const ThemeSelection = ({ selectedTemplate, onBack, onNext }) => {
  const [selectedTheme, setSelectedTheme] = useState(null);

  const themes = {
    minimal: [
      {
        id: 'elegant-dark',
        name: 'Elegant Dark',
        description: 'Sophisticated dark theme with subtle accents for a premium, professional look.',
        colors: {
          primary: '#1a1a1a',
          secondary: '#2d2d2d',
          accent: '#6366f1',
          text: '#ffffff',
          muted: '#a3a3a3'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        buttonStyle: 'minimal',
        preview: 'bg-gradient-to-br from-gray-900 to-gray-800'
      },
      {
        id: 'clean-light',
        name: 'Clean Light',
        description: 'Bright, airy design with plenty of white space and crisp typography.',
        colors: {
          primary: '#ffffff',
          secondary: '#f8fafc',
          accent: '#3b82f6',
          text: '#1e293b',
          muted: '#64748b'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-white to-gray-50'
      },
      {
        id: 'monochrome',
        name: 'Monochrome',
        description: 'Timeless black and white design with subtle gray variations.',
        colors: {
          primary: '#000000',
          secondary: '#ffffff',
          accent: '#6b7280',
          text: '#000000',
          muted: '#9ca3af'
        },
        fonts: {
          heading: 'Inter',
          body: 'Inter'
        },
        buttonStyle: 'square',
        preview: 'bg-gradient-to-br from-black to-gray-900'
      }
    ],
    modern: [
      {
        id: 'tech-blue',
        name: 'Tech Blue',
        description: 'Modern blue gradient theme perfect for tech professionals and startups.',
        colors: {
          primary: '#1e40af',
          secondary: '#3b82f6',
          accent: '#06b6d4',
          text: '#ffffff',
          muted: '#94a3b8'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-blue-900 to-blue-600'
      },
      {
        id: 'corporate-purple',
        name: 'Corporate Purple',
        description: 'Professional purple theme with sophisticated gradients and clean lines.',
        colors: {
          primary: '#7c3aed',
          secondary: '#a855f7',
          accent: '#ec4899',
          text: '#ffffff',
          muted: '#c4b5fd'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-purple-900 to-purple-600'
      },
      {
        id: 'executive-gray',
        name: 'Executive Gray',
        description: 'Refined gray theme with subtle color accents for executive presence.',
        colors: {
          primary: '#374151',
          secondary: '#6b7280',
          accent: '#f59e0b',
          text: '#ffffff',
          muted: '#d1d5db'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'square',
        preview: 'bg-gradient-to-br from-gray-800 to-gray-600'
      }
    ],
    creative: [
      {
        id: 'vibrant-sunset',
        name: 'Vibrant Sunset',
        description: 'Bold orange and pink gradient theme for creative professionals.',
        colors: {
          primary: '#ea580c',
          secondary: '#f97316',
          accent: '#ec4899',
          text: '#ffffff',
          muted: '#fed7aa'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-orange-600 to-pink-600'
      },
      {
        id: 'artistic-green',
        name: 'Artistic Green',
        description: 'Fresh green theme with nature-inspired colors for artists and designers.',
        colors: {
          primary: '#059669',
          secondary: '#10b981',
          accent: '#8b5cf6',
          text: '#ffffff',
          muted: '#a7f3d0'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-green-700 to-emerald-500'
      },
      {
        id: 'creative-mix',
        name: 'Creative Mix',
        description: 'Dynamic multi-color theme with vibrant gradients and playful elements.',
        colors: {
          primary: '#7c2d12',
          secondary: '#dc2626',
          accent: '#7c3aed',
          text: '#ffffff',
          muted: '#fbbf24'
        },
        fonts: {
          heading: 'Poppins',
          body: 'Inter'
        },
        buttonStyle: 'rounded',
        preview: 'bg-gradient-to-br from-red-800 via-purple-600 to-pink-600'
      }
    ]
  };

  const currentThemes = themes[selectedTemplate] || themes.minimal;

  const handleNext = () => {
    if (selectedTheme) {
      onNext(selectedTheme);
    }
  };

  const getButtonStylePreview = (style) => {
    switch (style) {
      case 'rounded':
        return 'rounded-full';
      case 'square':
        return 'rounded-none';
      case 'minimal':
        return 'rounded-lg';
      default:
        return 'rounded-lg';
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
              <span className="text-2xl">🎨</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Choose Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Theme</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Select a color scheme and style that matches your personality and brand
            </p>
          </div>

          {/* Theme Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {currentThemes.map((theme, index) => (
              <div
                key={theme.id}
                className={`relative group cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedTheme === theme.id ? 'scale-105' : ''
                }`}
                onClick={() => setSelectedTheme(theme.id)}
              >
                {/* Theme Card */}
                <div className={`bg-white rounded-3xl p-8 shadow-2xl border-2 transition-all duration-300 ${
                  selectedTheme === theme.id 
                    ? 'border-purple-500 shadow-purple-500/25' 
                    : 'border-gray-200 hover:border-gray-400'
                }`}>
                  {/* Selection Indicator */}
                  <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                    selectedTheme === theme.id 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                      : 'bg-gray-400 group-hover:bg-gray-500'
                  }`}>
                    {selectedTheme === theme.id ? '✓' : index + 1}
                  </div>

                  {/* Theme Preview */}
                  <div className={`w-full h-48 rounded-2xl mb-6 ${theme.preview} flex items-center justify-center relative overflow-hidden`}>
                    {/* Color Palette Preview */}
                    <div className="flex space-x-2 mb-4">
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: theme.colors.primary }}
                      ></div>
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: theme.colors.secondary }}
                      ></div>
                      <div 
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                        style={{ backgroundColor: theme.colors.accent }}
                      ></div>
                    </div>
                    
                    {/* Button Style Preview */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className={`px-4 py-2 text-white text-sm font-medium ${getButtonStylePreview(theme.buttonStyle)}`}
                           style={{ backgroundColor: theme.colors.accent }}>
                        Sample Button
                      </div>
                    </div>
                  </div>

                  {/* Theme Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
                        {theme.name}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {theme.description}
                      </p>
                    </div>
                    
                    {/* Theme Details */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 font-medium">Fonts:</span>
                        <span className="text-sm text-gray-700">
                          {theme.fonts.heading} / {theme.fonts.body}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500 font-medium">Buttons:</span>
                        <span className="text-sm text-gray-700 capitalize">
                          {theme.buttonStyle}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Selection Glow Effect */}
                  {selectedTheme === theme.id && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                  )}
                </div>
              </div>
            ))}
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
              <span>Back to Templates</span>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={!selectedTheme}
              className={`group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 transform ${
                selectedTheme
                  ? 'text-white bg-gradient-to-r from-purple-600 to-pink-600 shadow-2xl hover:shadow-purple-500/25 hover:scale-105 hover:-translate-y-1'
                  : 'text-gray-400 bg-gray-600 cursor-not-allowed'
              } focus:outline-none focus:ring-4 focus:ring-purple-500/50`}
            >
              <span className="relative z-10">Next: Add Your Content</span>
              
              {selectedTheme && (
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
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSelection;
