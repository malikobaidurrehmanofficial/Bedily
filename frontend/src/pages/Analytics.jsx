import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUrlAnalytics } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function Analytics() {
  const [searchParams] = useSearchParams();
  const urlId = searchParams.get('id');
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [days, setDays] = useState(30);

  useEffect(() => {
    if (urlId) {
      fetchAnalytics();
    }
  }, [urlId, days]);

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await getUrlAnalytics(urlId, days);
      
      if (response.success) {
        setData(response.data);
      } else {
        setError(response.error || 'Failed to fetch analytics');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  // Colors for charts
  const COLORS = ['#3B4FE4', '#1ED4C6', '#8B5CF6', '#F59E0B', '#EF4444'];

  if (!urlId) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-brand bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-gray-600 mb-8">
            Enter a URL ID to view analytics
          </p>
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-6 py-4 rounded-lg inline-block">
            Add <code className="bg-yellow-100 px-2 py-1 rounded">?id=YOUR_URL_ID</code> to the URL
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg inline-block">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { url, analytics } = data;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-brand bg-clip-text text-transparent">
          Analytics Dashboard
        </h1>
        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 mb-1">Short URL</p>
              <a
                href={url.shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-primary hover:underline font-medium text-lg break-all"
              >
                {url.shortUrl}
              </a>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Created</p>
              <p className="text-gray-900 font-medium">
                {new Date(url.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Original URL</p>
            <p className="text-gray-700 break-all">{url.originalUrl}</p>
          </div>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="mb-6 flex gap-2">
        {[7, 30, 90].map((d) => (
          <button
            key={d}
            onClick={() => setDays(d)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              days === d
                ? 'bg-gradient-brand text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {d} Days
          </button>
        ))}
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-brand-primary to-brand-secondary text-white rounded-2xl p-6 shadow-lg">
          <p className="text-sm opacity-90 mb-1">Total Clicks</p>
          <p className="text-5xl font-bold">{analytics.overview.totalClicks.toLocaleString()}</p>
          {analytics.overview.totalClicks === 0 && (
            <p className="text-xs opacity-75 mt-2">
              💡 Share your short link to start tracking clicks
            </p>
          )}
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Unique Visitors</p>
          <p className="text-5xl font-bold text-gray-900">{analytics.overview.uniqueVisitors.toLocaleString()}</p>
          {analytics.overview.uniqueVisitors === 0 && (
            <p className="text-xs text-gray-500 mt-2">
              Waiting for first visitor...
            </p>
          )}
        </div>
      </div>

      {/* Zero Clicks Info Banner */}
      {analytics.overview.totalClicks === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Analytics Start When Your Link Is Clicked</p>
              <p className="text-blue-700">
                Your short URL has been created successfully, but nobody has clicked it yet. Share the link to start tracking visits, devices, browsers, and referrers.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Clicks Over Time Chart */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900">Clicks Over Time</h2>
        {analytics.clicksByDate.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.clicksByDate}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis 
                dataKey="date" 
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                stroke="#6B7280"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="clicks"
                stroke="url(#colorGradient)"
                strokeWidth={3}
                dot={{ fill: '#3B4FE4', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#3B4FE4" />
                  <stop offset="100%" stopColor="#1ED4C6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500 py-8">No click data available</p>
        )}
      </div>

      {/* Device & Browser Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Device Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Devices</h2>
          {analytics.devices.length > 0 ? (
            <div className="space-y-3">
              {analytics.devices.map((item, index) => {
                const total = analytics.devices.reduce((sum, d) => sum + d.count, 0);
                const percentage = ((item.count / total) * 100).toFixed(1);
                
                return (
                  <div key={item.device}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="capitalize font-medium text-gray-700">{item.device}</span>
                      <span className="text-gray-600">{item.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          background: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No device data</p>
          )}
        </div>

        {/* Browser Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Browsers</h2>
          {analytics.browsers.length > 0 ? (
            <div className="space-y-3">
              {analytics.browsers.slice(0, 5).map((item, index) => {
                const total = analytics.browsers.reduce((sum, b) => sum + b.count, 0);
                const percentage = ((item.count / total) * 100).toFixed(1);
                
                return (
                  <div key={item.browser}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">{item.browser}</span>
                      <span className="text-gray-600">{item.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${percentage}%`,
                          background: COLORS[index % COLORS.length],
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-4">No browser data</p>
          )}
        </div>
      </div>

      {/* Top Referrers */}
      {analytics.topReferrers.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-gray-900">Top Referrers</h2>
          <div className="space-y-2">
            {analytics.topReferrers.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 px-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm text-gray-700 truncate flex-1 mr-4">
                  {item.referrer}
                </span>
                <span className="text-sm font-medium text-brand-primary">
                  {item.count} clicks
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Analytics;
