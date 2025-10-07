import React, { useState } from 'react';

const StyleCustomization = ({ profileData, onBack, onNext }) => {
  const [selectedStyles, setSelectedStyles] = useState({
    buttonStyle: 'rounded',
    iconStyle: 'line',
    hoverEffects: {
      buttons: true,
      icons: true,
      scale: true,
      shadow: true,
      colorChange: true
    }
  });

  const buttonStyles = [
    {
      id: 'rounded',
      name: 'Rounded',
      description: 'Smooth rounded corners for a modern, friendly look',
      preview: 'rounded-xl',
      example: 'px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white'
    },
    {
      id: 'square',
      name: 'Square',
      description: 'Sharp edges for a clean, professional appearance',
      preview: 'rounded-none',
      example: 'px-6 py-3 rounded-none bg-gradient-to-r from-purple-600 to-pink-600 text-white'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Subtle rounded corners for an elegant, understated style',
      preview: 'rounded-lg',
      example: 'px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white'
    }
  ];

  const iconStyles = [
    {
      id: 'line',
      name: 'Line Icons',
      description: 'Clean outline icons for a modern, minimalist look',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
      strokeWidth: '2'
    },
    {
      id: 'filled',
      name: 'Filled Icons',
      description: 'Solid filled icons for a bold, impactful appearance',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
      strokeWidth: '0',
      fill: 'currentColor'
    },
    {
      id: 'brand',
      name: 'Brand Icons',
      description: 'Platform-specific icons for social links and tools',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4',
      strokeWidth: '2',
      brandStyle: true
    }
  ];

  const hoverEffects = [
    {
      id: 'scale',
      name: 'Scale Effect',
      description: 'Buttons and icons grow slightly on hover',
      enabled: selectedStyles.hoverEffects.scale
    },
    {
      id: 'shadow',
      name: 'Shadow Effect',
      description: 'Adds depth with enhanced shadows on hover',
      enabled: selectedStyles.hoverEffects.shadow
    },
    {
      id: 'colorChange',
      name: 'Color Change',
      description: 'Smooth color transitions on hover',
      enabled: selectedStyles.hoverEffects.colorChange
    }
  ];

  const handleButtonStyleChange = (styleId) => {
    setSelectedStyles(prev => ({
      ...prev,
      buttonStyle: styleId
    }));
  };

  const handleIconStyleChange = (styleId) => {
    setSelectedStyles(prev => ({
      ...prev,
      iconStyle: styleId
    }));
  };

  const handleHoverEffectToggle = (effectId) => {
    setSelectedStyles(prev => ({
      ...prev,
      hoverEffects: {
        ...prev.hoverEffects,
        [effectId]: !prev.hoverEffects[effectId]
      }
    }));
  };

  const handleNext = () => {
    onNext({ ...profileData, styles: selectedStyles });
  };

  const handleBack = () => {
    onBack();
  };

  const getButtonClasses = (style) => {
    const baseClasses = 'px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold transition-all duration-300';
    const styleClasses = style.preview;
    const hoverClasses = selectedStyles.hoverEffects.scale ? 'hover:scale-105' : '';
    const shadowClasses = selectedStyles.hoverEffects.shadow ? 'hover:shadow-lg' : '';
    const colorClasses = selectedStyles.hoverEffects.colorChange ? 'hover:from-purple-700 hover:to-pink-700' : '';
    
    return `${baseClasses} ${styleClasses} ${hoverClasses} ${shadowClasses} ${colorClasses}`;
  };

  const getIconClasses = () => {
    const baseClasses = 'w-6 h-6 transition-all duration-300';
    const scaleClasses = selectedStyles.hoverEffects.scale ? 'hover:scale-110' : '';
    const colorClasses = selectedStyles.hoverEffects.colorChange ? 'hover:text-purple-600' : '';
    
    return `${baseClasses} ${scaleClasses} ${colorClasses}`;
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
              <span className="text-2xl">🎨</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Customize Your <span className="bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">Style</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Choose button styles, icon designs, and hover effects to match your personal brand.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Style Selection Section */}
            <div className="space-y-8">
              {/* Button Styles */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Button Styles</h3>
                
                <div className="space-y-4">
                  {buttonStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedStyles.buttonStyle === style.id ? 'scale-105' : ''
                      }`}
                      onClick={() => handleButtonStyleChange(style.id)}
                    >
                      <div className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                        selectedStyles.buttonStyle === style.id 
                          ? 'border-purple-500 shadow-purple-500/25' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}>
                        {/* Selection Indicator */}
                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                          selectedStyles.buttonStyle === style.id 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                            : 'bg-gray-400'
                        }`}>
                          {selectedStyles.buttonStyle === style.id ? '✓' : buttonStyles.indexOf(style) + 1}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-bold text-gray-800">{style.name}</h4>
                            <div className={`w-4 h-4 ${style.preview} bg-gradient-to-r from-purple-500 to-pink-500`}></div>
                          </div>
                          
                          <p className="text-gray-600">{style.description}</p>
                          
                          {/* Button Preview */}
                          <div className="flex justify-center">
                            <button className={getButtonClasses(style)}>
                              Sample Button
                            </button>
                          </div>
                        </div>

                        {/* Selection Glow Effect */}
                        {selectedStyles.buttonStyle === style.id && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Icon Styles */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Icon Styles</h3>
                
                <div className="space-y-4">
                  {iconStyles.map((style) => (
                    <div
                      key={style.id}
                      className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                        selectedStyles.iconStyle === style.id ? 'scale-105' : ''
                      }`}
                      onClick={() => handleIconStyleChange(style.id)}
                    >
                      <div className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                        selectedStyles.iconStyle === style.id 
                          ? 'border-purple-500 shadow-purple-500/25' 
                          : 'border-gray-200 hover:border-gray-400'
                      }`}>
                        {/* Selection Indicator */}
                        <div className={`absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all duration-300 ${
                          selectedStyles.iconStyle === style.id 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-110' 
                            : 'bg-gray-400'
                        }`}>
                          {selectedStyles.iconStyle === style.id ? '✓' : iconStyles.indexOf(style) + 1}
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xl font-bold text-gray-800">{style.name}</h4>
                            <div className="flex space-x-2">
                              <svg className={getIconClasses()} fill={style.fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={style.strokeWidth} d={style.icon} />
                              </svg>
                              <svg className={getIconClasses()} fill={style.fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={style.strokeWidth} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </div>
                          </div>
                          
                          <p className="text-gray-600">{style.description}</p>
                        </div>

                        {/* Selection Glow Effect */}
                        {selectedStyles.iconStyle === style.id && (
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 pointer-events-none"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hover Effects */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Hover Effects</h3>
                
                <div className="space-y-4">
                  {hoverEffects.map((effect) => (
                    <div key={effect.id} className="flex items-center justify-between p-4 bg-white/10 rounded-xl">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-white">{effect.name}</h4>
                        <p className="text-gray-300 text-sm">{effect.description}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={effect.enabled}
                          onChange={() => handleHoverEffectToggle(effect.id)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-pink-600"></div>
                      </label>
                    </div>
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
                  
                  {/* Style Preview */}
                  <div className="p-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 font-poppins">Interactive Elements</h2>
                    
                    <div className="space-y-6">
                      {/* Button Examples */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Buttons</h3>
                        <div className="flex flex-wrap gap-4">
                          <button className={getButtonClasses(buttonStyles.find(s => s.id === selectedStyles.buttonStyle))}>
                            Primary Action
                          </button>
                          <button className={`px-4 py-2 bg-gray-100 text-gray-700 font-medium transition-all duration-300 ${buttonStyles.find(s => s.id === selectedStyles.buttonStyle).preview} ${selectedStyles.hoverEffects.scale ? 'hover:scale-105' : ''} ${selectedStyles.hoverEffects.shadow ? 'hover:shadow-md' : ''} ${selectedStyles.hoverEffects.colorChange ? 'hover:bg-gray-200' : ''}`}>
                            Secondary
                          </button>
                          <button className={`px-4 py-2 border-2 border-purple-600 text-purple-600 font-medium transition-all duration-300 ${buttonStyles.find(s => s.id === selectedStyles.buttonStyle).preview} ${selectedStyles.hoverEffects.scale ? 'hover:scale-105' : ''} ${selectedStyles.hoverEffects.shadow ? 'hover:shadow-md' : ''} ${selectedStyles.hoverEffects.colorChange ? 'hover:bg-purple-600 hover:text-white' : ''}`}>
                            Outline
                          </button>
                        </div>
                      </div>

                      {/* Icon Examples */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Icons</h3>
                        <div className="flex flex-wrap gap-6">
                          <div className="flex items-center space-x-2">
                            <svg className={getIconClasses()} fill={iconStyles.find(s => s.id === selectedStyles.iconStyle).fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStyles.find(s => s.id === selectedStyles.iconStyle).strokeWidth} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span className="text-gray-600">Arrow</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className={getIconClasses()} fill={iconStyles.find(s => s.id === selectedStyles.iconStyle).fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStyles.find(s => s.id === selectedStyles.iconStyle).strokeWidth} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            <span className="text-gray-600">Heart</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <svg className={getIconClasses()} fill={iconStyles.find(s => s.id === selectedStyles.iconStyle).fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStyles.find(s => s.id === selectedStyles.iconStyle).strokeWidth} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            <span className="text-gray-600">Phone</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Links Preview */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Contact Links</h3>
                        <div className="space-y-3">
                          <a href="#" className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 ${buttonStyles.find(s => s.id === selectedStyles.buttonStyle).preview} ${selectedStyles.hoverEffects.scale ? 'hover:scale-105' : ''} ${selectedStyles.hoverEffects.shadow ? 'hover:shadow-md' : ''} ${selectedStyles.hoverEffects.colorChange ? 'hover:bg-gray-100' : ''}`}>
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">📧</span>
                            </div>
                            <span className="text-gray-700">Email Contact</span>
                            <svg className={`ml-auto ${getIconClasses()}`} fill={iconStyles.find(s => s.id === selectedStyles.iconStyle).fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStyles.find(s => s.id === selectedStyles.iconStyle).strokeWidth} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                          <a href="#" className={`flex items-center space-x-3 p-3 bg-gray-50 rounded-lg transition-all duration-300 ${buttonStyles.find(s => s.id === selectedStyles.buttonStyle).preview} ${selectedStyles.hoverEffects.scale ? 'hover:scale-105' : ''} ${selectedStyles.hoverEffects.shadow ? 'hover:shadow-md' : ''} ${selectedStyles.hoverEffects.colorChange ? 'hover:bg-gray-100' : ''}`}>
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">💼</span>
                            </div>
                            <span className="text-gray-700">LinkedIn Profile</span>
                            <svg className={`ml-auto ${getIconClasses()}`} fill={iconStyles.find(s => s.id === selectedStyles.iconStyle).fill || 'none'} stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStyles.find(s => s.id === selectedStyles.iconStyle).strokeWidth} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>
                      </div>
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
              <span>Back to Contact</span>
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
              <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
              <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StyleCustomization;
