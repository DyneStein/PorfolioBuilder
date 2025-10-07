import React, { useState, useEffect } from 'react';

const CodeGeneration = ({ portfolioData, onBack, onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState(null);
  const [selectedFormat, setSelectedFormat] = useState('html');
  const [downloadReady, setDownloadReady] = useState(false);

  const generateHTML = () => {
    const buttonStyle = portfolioData.styles.buttonStyle;
    const iconStyle = portfolioData.styles.iconStyle;
    const hoverEffects = portfolioData.styles.hoverEffects;

    const getButtonClasses = (type = 'primary') => {
      const baseClasses = 'font-semibold transition-all duration-300';
      const styleClasses = buttonStyle === 'rounded' ? 'rounded-xl' : 
                          buttonStyle === 'square' ? 'rounded-none' : 'rounded-lg';
      const hoverClasses = hoverEffects.scale ? 'hover:scale-105' : '';
      const shadowClasses = hoverEffects.shadow ? 'hover:shadow-lg' : '';
      const colorClasses = hoverEffects.colorChange ? 'hover:from-purple-700 hover:to-pink-700' : '';
      
      if (type === 'primary') {
        return `${baseClasses} px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white ${styleClasses} ${hoverClasses} ${shadowClasses} ${colorClasses}`;
      } else if (type === 'secondary') {
        return `${baseClasses} px-4 py-2 bg-gray-100 text-gray-700 ${styleClasses} ${hoverClasses} ${shadowClasses} ${hoverEffects.colorChange ? 'hover:bg-gray-200' : ''}`;
      } else {
        return `${baseClasses} px-4 py-2 border-2 border-purple-600 text-purple-600 ${styleClasses} ${hoverClasses} ${shadowClasses} ${hoverEffects.colorChange ? 'hover:bg-purple-600 hover:text-white' : ''}`;
      }
    };

    const getIconProps = () => {
      if (iconStyle === 'filled') {
        return { fill: 'currentColor', strokeWidth: '0' };
      } else {
        return { fill: 'none', strokeWidth: '2' };
      }
    };

    const iconProps = getIconProps();

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${portfolioData.profile.fullName} - Portfolio</title>
    <meta name="description" content="Professional portfolio of ${portfolioData.profile.fullName}">
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Config -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        'inter': ['Inter', 'sans-serif'],
                        'poppins': ['Poppins', 'sans-serif'],
                    }
                }
            }
        }
    </script>
</head>
<body class="font-inter">
    <!-- Header Section -->
    <header class="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-8">
        <div class="max-w-6xl mx-auto">
            <div class="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
                <div class="flex-shrink-0">
                    <div class="w-32 h-32 rounded-full shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white">
                        ${portfolioData.profile.profileImage}
                    </div>
                </div>
                <div class="text-center md:text-left">
                    <h1 class="text-5xl font-bold text-gray-800 mb-4 font-poppins">
                        ${portfolioData.profile.fullName}
                    </h1>
                    <p class="text-2xl text-gray-600 mb-6">
                        ${portfolioData.profile.professionalTitle}
                    </p>
                    <div class="flex flex-wrap gap-4 justify-center md:justify-start">
                        <button class="${getButtonClasses('primary')}">
                            View My Work
                        </button>
                        <button class="${getButtonClasses('outline')}">
                            Download Resume
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </header>

    ${portfolioData.sections.about ? `
    <!-- About Section -->
    <section class="py-16 px-8 bg-white">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-8 text-center font-poppins">About Me</h2>
            <div class="prose prose-lg max-w-none text-gray-600 leading-relaxed">
                <p>${portfolioData.content.bio}</p>
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolioData.sections.skills ? `
    <!-- Skills Section -->
    <section class="py-16 px-8 bg-gray-50">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Skills & Technologies</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                ${portfolioData.content.skills.map(skill => `
                    <div class="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 text-center">
                        <div class="text-3xl mb-3">🚀</div>
                        <h3 class="font-semibold text-gray-800">${skill}</h3>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolioData.sections.projects ? `
    <!-- Projects Section -->
    <section class="py-16 px-8 bg-white">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Featured Projects</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${portfolioData.content.projects.map(project => `
                    <div class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
                        <div class="h-48 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                            <span class="text-6xl text-white">📱</span>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-800 mb-3">${project.name || 'Project Name'}</h3>
                            <p class="text-gray-600 mb-4">${project.description || 'Project description goes here...'}</p>
                            <div class="flex gap-3">
                                <button class="${getButtonClasses('primary')}">
                                    View Project
                                </button>
                                <button class="${getButtonClasses('secondary')}">
                                    GitHub
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolioData.sections.experience ? `
    <!-- Experience Section -->
    <section class="py-16 px-8 bg-gray-50">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Experience</h2>
            <div class="space-y-8">
                ${portfolioData.content.experience.map(exp => `
                    <div class="bg-white rounded-xl p-8 shadow-md">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h3 class="text-2xl font-bold text-gray-800">${exp.role || 'Job Title'}</h3>
                            <span class="text-gray-600 font-medium">${exp.duration || 'Duration'}</span>
                        </div>
                        <h4 class="text-xl text-purple-600 mb-3">${exp.company || 'Company Name'}</h4>
                        <p class="text-gray-600">${exp.description || 'Job description goes here...'}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolioData.sections.education ? `
    <!-- Education Section -->
    <section class="py-16 px-8 bg-white">
        <div class="max-w-4xl mx-auto">
            <h2 class="text-4xl font-bold text-gray-800 mb-12 text-center font-poppins">Education</h2>
            <div class="space-y-8">
                ${portfolioData.content.education.map(edu => `
                    <div class="bg-white rounded-xl p-8 shadow-md border-l-4 border-purple-500">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                            <h3 class="text-2xl font-bold text-gray-800">${edu.degree || 'Degree'}</h3>
                            <span class="text-gray-600 font-medium">${edu.duration || 'Duration'}</span>
                        </div>
                        <h4 class="text-xl text-purple-600">${edu.institution || 'Institution Name'}</h4>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    ` : ''}

    ${portfolioData.sections.contact ? `
    <!-- Contact Section -->
    <section class="py-16 px-8 bg-gray-900 text-white">
        <div class="max-w-4xl mx-auto text-center">
            <h2 class="text-4xl font-bold mb-8 font-poppins">Get In Touch</h2>
            <p class="text-xl text-gray-300 mb-12">
                Ready to work together? Let's create something amazing!
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                ${portfolioData.content.contact.email ? `
                    <a href="mailto:${portfolioData.content.contact.email}" class="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-105' : ''} ${hoverEffects.shadow ? 'hover:shadow-lg' : ''}">
                        <div class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <span class="text-white text-lg">📧</span>
                        </div>
                        <div>
                            <p class="text-gray-300 text-sm">Email</p>
                            <p class="text-white font-medium">${portfolioData.content.contact.email}</p>
                        </div>
                    </a>
                ` : ''}

                ${portfolioData.content.contact.linkedin ? `
                    <a href="${portfolioData.content.contact.linkedin}" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-105' : ''} ${hoverEffects.shadow ? 'hover:shadow-lg' : ''}">
                        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span class="text-white text-lg">💼</span>
                        </div>
                        <div>
                            <p class="text-gray-300 text-sm">LinkedIn</p>
                            <p class="text-white font-medium">View Profile</p>
                        </div>
                        <svg class="ml-auto w-4 h-4 text-gray-400 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-110' : ''} ${hoverEffects.colorChange ? 'hover:text-purple-600' : ''}" ${Object.entries(iconProps).map(([key, value]) => `${key}="${value}"`).join(' ')} stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                ` : ''}

                ${portfolioData.content.contact.github ? `
                    <a href="${portfolioData.content.contact.github}" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-105' : ''} ${hoverEffects.shadow ? 'hover:shadow-lg' : ''}">
                        <div class="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                            <span class="text-white text-lg">🐙</span>
                        </div>
                        <div>
                            <p class="text-gray-300 text-sm">GitHub</p>
                            <p class="text-white font-medium">View Profile</p>
                        </div>
                        <svg class="ml-auto w-4 h-4 text-gray-400 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-110' : ''} ${hoverEffects.colorChange ? 'hover:text-purple-600' : ''}" ${Object.entries(iconProps).map(([key, value]) => `${key}="${value}"`).join(' ')} stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                        </svg>
                    </a>
                ` : ''}

                ${portfolioData.content.contact.resume ? `
                    <a href="${portfolioData.content.contact.resume}" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-3 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-105' : ''} ${hoverEffects.shadow ? 'hover:shadow-lg' : ''}">
                        <div class="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <span class="text-white text-lg">📄</span>
                        </div>
                        <div>
                            <p class="text-gray-300 text-sm">Resume</p>
                            <p class="text-white font-medium">Download CV</p>
                        </div>
                        <svg class="ml-auto w-4 h-4 text-gray-400 transition-all duration-300 ${hoverEffects.scale ? 'hover:scale-110' : ''} ${hoverEffects.colorChange ? 'hover:text-purple-600' : ''}" ${Object.entries(iconProps).map(([key, value]) => `${key}="${value}"`).join(' ')} stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </a>
                ` : ''}
            </div>

            <button class="${getButtonClasses('primary')}">
                Send Message
            </button>
        </div>
    </section>
    ` : ''}

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 px-8">
        <div class="max-w-6xl mx-auto text-center">
            <p class="text-gray-400">
                © 2024 ${portfolioData.profile.fullName}. Built with ❤️ using our Portfolio Builder.
            </p>
        </div>
    </footer>
</body>
</html>`;
  };

  const generateReactProject = () => {
    return {
      'package.json': `{
  "name": "${portfolioData.profile.fullName.toLowerCase().replace(/\s+/g, '-')}-portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "14.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.0",
    "eslint": "^8.0.0",
    "eslint-config-next": "14.0.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.0.0"
  }
}`,
      'tailwind.config.js': `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}`,
      'next.config.js': `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig`,
      'pages/index.js': `import Head from 'next/head'
import Header from '../components/Header'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>${portfolioData.profile.fullName} - Portfolio</title>
        <meta name="description" content="Professional portfolio of ${portfolioData.profile.fullName}" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main>
        <Header />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
        <Footer />
      </main>
    </>
  )
}`,
      'components/Header.js': `import React from 'react'

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-12">
          <div className="flex-shrink-0">
            <div className="w-32 h-32 rounded-full shadow-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-6xl text-white">
              ${portfolioData.profile.profileImage}
            </div>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-bold text-gray-800 mb-4 font-poppins">
              ${portfolioData.profile.fullName}
            </h1>
            <p className="text-2xl text-gray-600 mb-6">
              ${portfolioData.profile.professionalTitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <button className="font-semibold transition-all duration-300 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:scale-105 hover:shadow-lg hover:from-purple-700 hover:to-pink-700">
                View My Work
              </button>
              <button className="font-semibold transition-all duration-300 px-4 py-2 border-2 border-purple-600 text-purple-600 rounded-xl hover:scale-105 hover:shadow-md hover:bg-purple-600 hover:text-white">
                Download Resume
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header`,
      'README.md': `# ${portfolioData.profile.fullName} - Portfolio

A professional portfolio website built with Next.js and Tailwind CSS.

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Portfolio Builder](https://your-portfolio-builder.com/)

## License

This project is licensed under the MIT License.`
    };
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    
    // Simulate code generation
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const files = selectedFormat === 'html' 
      ? { 'index.html': generateHTML() }
      : generateReactProject();
    
    setGeneratedFiles(files);
    setDownloadReady(true);
    setIsGenerating(false);
  };

  const handleDownload = () => {
    if (!generatedFiles) return;
    
    // Create zip file (simplified - in real implementation, use JSZip)
    const zipContent = Object.entries(generatedFiles)
      .map(([filename, content]) => `${filename}:\n${content}\n\n`)
      .join('---\n\n');
    
    const blob = new Blob([zipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${portfolioData.profile.fullName.toLowerCase().replace(/\s+/g, '-')}-portfolio.zip`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDeploy = () => {
    // In real implementation, integrate with deployment services
    alert('Deployment feature coming soon! For now, download the files and deploy manually.');
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl mb-6">
              <span className="text-2xl">🚀</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 font-poppins">
              Generate Your <span className="bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent">Portfolio</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Your portfolio is ready! Choose your preferred format and download or deploy your professional website.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Generation Options */}
            <div className="space-y-8">
              {/* Format Selection */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Choose Format</h3>
                
                <div className="space-y-4">
                  <div 
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedFormat === 'html' ? 'scale-105' : ''
                    }`}
                    onClick={() => setSelectedFormat('html')}
                  >
                    <div className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                      selectedFormat === 'html' 
                        ? 'border-green-500 shadow-green-500/25' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">HTML/CSS/JS</h4>
                          <p className="text-gray-600 mt-2">Single HTML file with embedded styles. Perfect for quick deployment.</p>
                        </div>
                        <div className="text-4xl">📄</div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                      selectedFormat === 'react' ? 'scale-105' : ''
                    }`}
                    onClick={() => setSelectedFormat('react')}
                  >
                    <div className={`bg-white rounded-2xl p-6 border-2 transition-all duration-300 ${
                      selectedFormat === 'react' 
                        ? 'border-green-500 shadow-green-500/25' 
                        : 'border-gray-200 hover:border-gray-400'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-xl font-bold text-gray-800">React/Next.js</h4>
                          <p className="text-gray-600 mt-2">Full React project with components. Great for customization and scaling.</p>
                        </div>
                        <div className="text-4xl">⚛️</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Generation Button */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Generate Code</h3>
                
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative z-10">Generating Code...</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">🔨 Generate {selectedFormat === 'html' ? 'HTML' : 'React'} Files</span>
                      
                      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    </>
                  )}
                </button>
              </div>

              {/* Download/Deploy Options */}
              {downloadReady && (
                <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Download & Deploy</h3>
                  
                  <div className="space-y-4">
                    <button
                      onClick={handleDownload}
                      className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                    >
                      <span className="relative z-10">📥 Download ZIP</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button
                      onClick={handleDeploy}
                      className="w-full group relative inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/50"
                    >
                      <span className="relative z-10">🚀 Deploy Online</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  <div className="mt-6 bg-green-500/20 border border-green-400/30 rounded-xl p-4">
                    <h5 className="text-green-300 font-semibold mb-2">✅ Success!</h5>
                    <p className="text-green-100 text-sm">
                      Your portfolio code has been generated successfully. You can now download the files or deploy them online.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Code Preview */}
            <div className="space-y-8">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Code Preview</h3>
                
                <div className="bg-gray-900 rounded-xl overflow-hidden">
                  <div className="bg-gray-800 px-4 py-2 flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-400 text-sm ml-4">
                      {selectedFormat === 'html' ? 'index.html' : 'portfolio-project'}
                    </span>
                  </div>
                  <div className="p-4 text-gray-300 text-sm font-mono overflow-x-auto">
                    {generatedFiles ? (
                      <pre className="whitespace-pre-wrap">
                        {Object.entries(generatedFiles)[0][1].substring(0, 500)}...
                      </pre>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">💻</div>
                        <p>Code preview will appear here after generation</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-6 font-poppins">Next Steps</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                    <div>
                      <h4 className="text-white font-semibold">Download Files</h4>
                      <p className="text-gray-300 text-sm">Get your complete portfolio code as a ZIP file</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                    <div>
                      <h4 className="text-white font-semibold">Deploy Online</h4>
                      <p className="text-gray-300 text-sm">Upload to Netlify, Vercel, or your preferred hosting</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                    <div>
                      <h4 className="text-white font-semibold">Customize</h4>
                      <p className="text-gray-300 text-sm">Edit colors, content, and styling to match your brand</p>
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
              <span>Back to Preview</span>
            </button>

            {/* Complete Button */}
            <button
              onClick={() => onComplete(portfolioData)}
              className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-green-500/50"
            >
              <span className="relative z-10">🎉 Complete</span>
              
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

export default CodeGeneration;
