import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Shorten a URL
 * @param {string} url - Original URL to shorten
 * @param {string} customShortCode - Optional custom short code
 * @returns {Promise} - API response
 */
export const shortenUrl = async (url, customShortCode = null) => {
  const response = await api.post('/url/shorten', {
    url,
    customShortCode,
  });
  return response.data;
};

/**
 * Get analytics for a URL
 * @param {string} urlId - URL ID
 * @param {number} days - Number of days (default 30)
 * @returns {Promise} - API response
 */
export const getUrlAnalytics = async (urlId, days = 30) => {
  const response = await api.get(`/url/${urlId}/analytics`, {
    params: { days },
  });
  return response.data;
};

export default api;
