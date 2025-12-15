import { isValidUrl, normalizeUrl } from '../utils/urlHelper.js';

/**
 * Validate URL in request body
 * Used as middleware for URL shortening endpoints
 */
export const validateUrl = (req, res, next) => {
  const { url } = req.body;

  // Check if URL is provided
  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'URL is required',
    });
  }

  // Trim and normalize URL
  const trimmedUrl = url.trim();
  const normalizedUrl = normalizeUrl(trimmedUrl);

  // Validate URL format
  if (!isValidUrl(normalizedUrl)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid URL format. Please provide a valid HTTP or HTTPS URL.',
    });
  }

  // Check URL length
  if (normalizedUrl.length > 2048) {
    return res.status(400).json({
      success: false,
      error: 'URL is too long. Maximum length is 2048 characters.',
    });
  }

  // Attach normalized URL to request for use in controller
  req.validatedUrl = normalizedUrl;

  next();
};

/**
 * Validate custom short code in request body
 */
export const validateCustomCode = (req, res, next) => {
  const { customShortCode } = req.body;

  // If no custom code provided, skip validation
  if (!customShortCode) {
    return next();
  }

  const trimmedCode = customShortCode.trim();

  // Validate format
  if (!/^[a-zA-Z0-9_-]{4,12}$/.test(trimmedCode)) {
    return res.status(400).json({
      success: false,
      error: 'Custom short code must be 4-12 characters long and contain only letters, numbers, hyphens, and underscores.',
    });
  }

  // Reserved keywords check
  const reserved = ['api', 'admin', 'analytics', 'health', 'shorten'];
  if (reserved.includes(trimmedCode.toLowerCase())) {
    return res.status(400).json({
      success: false,
      error: 'This short code is reserved. Please choose another.',
    });
  }

  next();
};

/**
 * Validate MongoDB ObjectId parameter
 */
export const validateObjectId = (paramName = 'id') => {
  return (req, res, next) => {
    const id = req.params[paramName];

    if (!id) {
      return res.status(400).json({
        success: false,
        error: `${paramName} parameter is required`,
      });
    }

    // Check if it's a valid MongoDB ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format',
      });
    }

    next();
  };
};
