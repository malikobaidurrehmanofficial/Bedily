/**
 * Parse user agent string to extract device, browser, and OS info
 * @param {string} userAgent - User agent string
 * @returns {object} - Parsed device info
 */
export const parseUserAgent = (userAgent) => {
  if (!userAgent) {
    return {
      device: 'unknown',
      browser: null,
      os: null,
    };
  }

  const ua = userAgent.toLowerCase();
  
  // Detect device
  let device = 'desktop';
  if (/mobile|android|iphone|ipod|blackberry|opera mini|iemobile/i.test(ua)) {
    device = 'mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    device = 'tablet';
  }

  // Detect browser
  let browser = null;
  if (ua.includes('edg/')) {
    browser = 'Edge';
  } else if (ua.includes('chrome/')) {
    browser = 'Chrome';
  } else if (ua.includes('safari/') && !ua.includes('chrome')) {
    browser = 'Safari';
  } else if (ua.includes('firefox/')) {
    browser = 'Firefox';
  } else if (ua.includes('opera') || ua.includes('opr/')) {
    browser = 'Opera';
  }

  // Detect OS
  let os = null;
  if (ua.includes('windows')) {
    os = 'Windows';
  } else if (ua.includes('mac os')) {
    os = 'macOS';
  } else if (ua.includes('linux')) {
    os = 'Linux';
  } else if (ua.includes('android')) {
    os = 'Android';
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'iOS';
  }

  return { device, browser, os };
};

/**
 * Get client IP address from request
 * @param {object} req - Express request object
 * @returns {string} - Client IP address
 */
export const getClientIp = (req) => {
  return (
    req.headers['x-forwarded-for']?.split(',')[0].trim() ||
    req.headers['x-real-ip'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    '0.0.0.0'
  );
};
