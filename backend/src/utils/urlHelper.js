import { customAlphabet } from 'nanoid';

// Custom alphabet without ambiguous characters (0, O, I, l)
const alphabet = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const generateId = customAlphabet(alphabet, 7);

/**
 * Generate a unique short code
 * @returns {string} - 7-character short code
 */
export const generateShortCode = () => {
  return generateId();
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid
 */
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Normalize URL (add protocol if missing)
 * @param {string} url - URL to normalize
 * @returns {string} - Normalized URL
 */
export const normalizeUrl = (url) => {
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    return `https://${url}`;
  }
  return url;
};
