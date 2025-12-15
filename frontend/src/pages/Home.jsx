import { useState } from 'react';
import { Link } from 'react-router-dom';
import { shortenUrl } from '../services/api';

function Home() {
  const [url, setUrl] = useState('');
  const [customCode, setCustomCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset states
    setError('');
    setResult(null);
    setCopied(false);

    // Validate URL
    if (!url.trim()) {
      setError('Please enter a URL');
      return;
    }

    setLoading(true);

    try {
      const response = await shortenUrl(url, customCode || null);
      
      if (response.success) {
        setResult(response.data);
        setUrl('');
        setCustomCode('');
      } else {
        setError(response.error || 'Failed to shorten URL');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (result?.shortUrl) {
      try {
        await navigator.clipboard.writeText(result.shortUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side */}
            <div className="animate-fade-in-up">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-brand p-0.5 shadow-lg">
                  <img
                    src="/assets/obaid.png"
                    alt="Malik Obaid Ur Rehman"
                    className="w-full h-full rounded-full object-cover bg-white"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Built by</p>
                  <a
                    href="https://bediportfolio.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-brand-primary hover:underline"
                  >
                    Malik Obaid Ur Rehman
                  </a>
                </div>
              </div>

              <h1 className="text-5xl lg:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
                Shorten URLs.
                <br />
                <span className="bg-gradient-brand bg-clip-text text-transparent">
                  Track Performance.
                </span>
                <br />
                Grow Faster.
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Bedily is a fast, reliable URL shortener with real-time analytics and custom links.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => document.getElementById('url-form')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 py-4 bg-gradient-brand text-white font-semibold rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                </button>
                <Link
                  to="/analytics"
                  className="px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-brand-primary hover:text-brand-primary hover:shadow-lg transition-all duration-300 text-center"
                >
                  View Analytics Demo
                </Link>
              </div>
            </div>

            {/* Right Side - Mock Dashboard */}
            <div className="relative animate-fade-in-up animation-delay-200">
              <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-brand opacity-20 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-brand-secondary opacity-20 rounded-full blur-2xl"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Dashboard Preview</h3>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Live</span>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 p-4 rounded-xl">
                      <p className="text-xs text-gray-600 mb-1">Total Clicks</p>
                      <p className="text-3xl font-bold bg-gradient-brand bg-clip-text text-transparent">12,458</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-1">Links Created</p>
                        <p className="text-2xl font-bold text-gray-900">347</p>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl">
                        <p className="text-xs text-gray-600 mb-1">Avg CTR</p>
                        <p className="text-2xl font-bold text-gray-900">8.4%</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-gray-600">Recent Activity</span>
                        <span className="text-xs text-gray-400">Live</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-brand animate-pulse" style={{width: '68%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* URL Shortener Form */}
      <section id="url-form" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Create Your Short Link</h2>
            <p className="text-gray-600">Transform long URLs into short, shareable links in seconds</p>
          </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* URL Input */}
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your long URL
            </label>
            <input
              type="text"
              id="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/your-very-long-url"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300"
              disabled={loading}
            />
          </div>

          {/* Custom Short Code (Optional) */}
          <div>
            <label htmlFor="customCode" className="block text-sm font-medium text-gray-700 mb-2">
              Custom short code (optional)
            </label>
            <input
              type="text"
              id="customCode"
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              placeholder="my-link"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-primary focus:border-transparent outline-none transition-all duration-300"
              disabled={loading}
            />
            <p className="mt-1 text-sm text-gray-500">
              4-12 characters, alphanumeric with hyphens and underscores
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-brand text-white font-medium rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Shortening...
              </span>
            ) : (
              'Shorten URL'
            )}
          </button>
        </form>
      </div>

      {/* Result Display */}
      {result && (
        <div className="bg-gradient-to-r from-brand-primary to-brand-secondary rounded-2xl shadow-lg p-8 text-white animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Your shortened URL</h3>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {result.clicks} clicks
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4 hover:bg-white/15 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 mr-4">
                <p className="text-sm opacity-75 mb-1">Short URL</p>
                <a
                  href={result.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-mono hover:underline break-all"
                >
                  {result.shortUrl}
                </a>
              </div>
              <button
                onClick={handleCopy}
                className="flex-shrink-0 px-4 py-2 bg-white text-brand-primary font-medium rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300"
              >
                {copied ? '✓ Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          <div className="text-sm opacity-90 mb-4">
            <p className="mb-1">
              <span className="font-medium">Original:</span>{' '}
              <span className="break-all">{result.originalUrl}</span>
            </p>
            <p>
              <span className="font-medium">Created:</span>{' '}
              {new Date(result.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>

          {/* Analytics Link */}
          <a
            href={`/analytics?id=${result._id}`}
            className="inline-block px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-all duration-300 hover:scale-105"
          >
            View Analytics →
          </a>
        </div>
      )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Bedily?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features to help you manage and track your links effortlessly
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">⚡</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Create short links in milliseconds with our optimized infrastructure
              </p>
              <p className="text-sm text-gray-500">
                Built on modern tech stack for blazing-fast performance
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">📊</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Powerful Analytics</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Track clicks, devices, browsers, and geographic data in real-time
              </p>
              <p className="text-sm text-gray-500">
                Comprehensive insights to understand your audience better
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 bg-gradient-brand rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span className="text-white text-3xl">🔗</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Custom Links</h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Personalize your URLs with custom short codes for better branding
              </p>
              <p className="text-sm text-gray-500">
                Make your links memorable and professional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-brand-primary to-brand-secondary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Start shortening smarter today
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of users who trust Bedily for their URL management needs
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="px-10 py-4 bg-white text-brand-primary font-bold rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Create Your First Link
          </button>
        </div>
      </section>
    </div>
  );
}

export default Home;
