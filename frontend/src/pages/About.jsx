function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-brand bg-clip-text text-transparent">
            About Bedily
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A modern URL shortener with powerful analytics, built to showcase full-stack development skills
        </p>
      </div>

      {/* Project Overview */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">What is Bedily?</h2>
        <div className="space-y-4 text-gray-600 leading-relaxed">
          <p>
            Bedily is a feature-rich URL shortener that transforms long, unwieldy links into short, shareable URLs. 
            Beyond basic URL shortening, Bedily provides comprehensive analytics to help you understand your audience better.
          </p>
          <p>
            Track click counts, analyze user devices and browsers, identify referral sources, and visualize engagement 
            trends with beautiful charts and graphs. Whether you're sharing links on social media, in marketing campaigns, 
            or for personal use, Bedily gives you the insights you need.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">⚡</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600">Generate short links in milliseconds with collision-resistant codes</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Rich Analytics</h3>
            <p className="text-sm text-gray-600">Track clicks, devices, browsers, and geographic data in real-time</p>
          </div>

          <div className="p-6 bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-xl">
            <div className="w-12 h-12 bg-gradient-brand rounded-lg flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🎨</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Custom Links</h3>
            <p className="text-sm text-gray-600">Personalize your URLs with custom short codes for better branding</p>
          </div>
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Technology Stack</h2>
        <p className="text-gray-600 mb-6">
          Built using the MERN stack with modern best practices and production-ready architecture.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white mr-3">F</span>
              Frontend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                React 18 with Hooks
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                Vite for fast builds
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                Tailwind CSS for styling
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                React Router for navigation
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                Recharts for data visualization
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-primary rounded-full mr-3"></span>
                Axios for API calls
              </li>
            </ul>
          </div>

          {/* Backend */}
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="w-8 h-8 bg-gradient-brand rounded-lg flex items-center justify-center text-white mr-3">B</span>
              Backend
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                Node.js + Express.js
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                MongoDB with Mongoose ODM
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                RESTful API architecture
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                Rate limiting & security middleware
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                MongoDB aggregation pipelines
              </li>
              <li className="flex items-center text-gray-600">
                <span className="w-2 h-2 bg-brand-secondary rounded-full mr-3"></span>
                Nanoid for unique IDs
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Purpose Section */}
      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl shadow-lg p-8 mb-12 text-white">
        <h2 className="text-3xl font-bold mb-4">Project Purpose</h2>
        <div className="space-y-4 leading-relaxed">
          <p>
            Bedily was created as a comprehensive full-stack development project to demonstrate proficiency in modern web technologies 
            and software engineering principles.
          </p>
          <p>
            This project showcases skills in:
          </p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Building scalable REST APIs with proper architecture (MVC pattern)</li>
            <li>Database design and optimization with MongoDB</li>
            <li>Creating responsive, modern UIs with React and Tailwind CSS</li>
            <li>Implementing real-time analytics and data visualization</li>
            <li>Writing production-ready code with error handling and validation</li>
            <li>Following industry best practices for security and performance</li>
          </ul>
        </div>
      </div>

      {/* Developer Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet the Developer</h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-2xl bg-gradient-brand p-1 shadow-xl">
                <div className="w-full h-full bg-white rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/assets/obaid.png" 
                    alt="Malik Obaid Ur Rehman" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"%3E%3Cdefs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%233B4FE4;stop-opacity:0.2" /%3E%3Cstop offset="100%25" style="stop-color:%231ED4C6;stop-opacity:0.2" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width="200" height="200" fill="url(%23grad)"/%3E%3Ctext x="100" y="120" font-family="Arial, sans-serif" font-size="60" font-weight="bold" fill="%23999" text-anchor="middle"%3EMO%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Developer Info */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Malik Obaid Ur Rehman
              </h3>
              <p className="text-brand-primary font-medium mb-4">
                Full-Stack Developer
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Passionate about building scalable web applications with modern technologies. 
                Focused on creating clean, efficient code and delivering exceptional user experiences.
              </p>

              {/* Social Links */}
              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://bediportfolio.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gradient-brand text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                  View Portfolio
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
                <a
                  href="https://github.com/malikobaidurrehmanofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/malik-obaid-ur-rehman-522703280/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 hover:scale-105 transition-all duration-300 inline-flex items-center"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-12 text-center">
        <a
          href="/"
          className="inline-block px-8 py-4 bg-gradient-brand text-white rounded-lg font-medium text-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          Try Bedily Now →
        </a>
      </div>
    </div>
  );
}

export default About;
