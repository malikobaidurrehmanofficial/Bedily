import { Url } from '../models/index.js';
import { generateShortCode, isValidUrl, normalizeUrl } from '../utils/urlHelper.js';

/**
 * Create a shortened URL
 * @param {string} originalUrl - The original URL to shorten
 * @param {string} customShortCode - Optional custom short code
 * @returns {Promise<object>} - Created URL document
 */
export const createShortUrl = async (originalUrl, customShortCode = null) => {
  // Normalize URL
  const normalizedUrl = normalizeUrl(originalUrl);

  // Validate URL
  if (!isValidUrl(normalizedUrl)) {
    throw new Error('Invalid URL format');
  }

  // Check if URL already exists
  const existingUrl = await Url.findOne({ originalUrl: normalizedUrl });
  if (existingUrl) {
    return existingUrl;
  }

  // Generate or validate custom short code
  let shortCode = customShortCode;
  if (customShortCode) {
    // Validate custom short code
    if (!/^[a-zA-Z0-9_-]{4,12}$/.test(customShortCode)) {
      throw new Error('Custom short code must be 4-12 alphanumeric characters');
    }
    
    // Check if custom code is available
    const existing = await Url.findOne({ shortCode: customShortCode.toLowerCase() });
    if (existing) {
      throw new Error('Custom short code is already taken');
    }
  } else {
    // Generate unique short code
    shortCode = await generateUniqueShortCode();
  }

  // Create URL document
  const url = await Url.create({
    originalUrl: normalizedUrl,
    shortCode: shortCode.toLowerCase(),
  });

  return url;
};

/**
 * Generate a unique short code (retry if collision)
 * @param {number} maxRetries - Maximum retry attempts
 * @returns {Promise<string>} - Unique short code
 */
const generateUniqueShortCode = async (maxRetries = 5) => {
  for (let i = 0; i < maxRetries; i++) {
    const shortCode = generateShortCode();
    const existing = await Url.findOne({ shortCode });
    
    if (!existing) {
      return shortCode;
    }
  }
  
  throw new Error('Failed to generate unique short code. Please try again.');
};

/**
 * Find URL by short code
 * @param {string} shortCode - The short code
 * @returns {Promise<object>} - URL document
 */
export const findUrlByShortCode = async (shortCode) => {
  const url = await Url.findByShortCode(shortCode.toLowerCase());
  
  if (!url) {
    throw new Error('Short URL not found');
  }

  // Check if expired
  if (url.isExpired()) {
    throw new Error('Short URL has expired');
  }

  return url;
};

/**
 * Increment click count for a URL
 * @param {string} urlId - URL document ID
 * @returns {Promise<object>} - Updated URL document
 */
export const incrementUrlClicks = async (urlId) => {
  const url = await Url.findById(urlId);
  if (!url) {
    throw new Error('URL not found');
  }

  return url.incrementClicks();
};
