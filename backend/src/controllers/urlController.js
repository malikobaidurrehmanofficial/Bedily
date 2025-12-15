import { createShortUrl, findUrlByShortCode, incrementUrlClicks } from '../services/urlService.js';
import { logClick, getComprehensiveAnalytics } from '../services/clickService.js';
import { getClientIp } from '../utils/analyticsHelper.js';
import { Url } from '../models/index.js';
import mongoose from 'mongoose';
import { asyncHandler } from '../middleware/errorHandler.js';

/**
 * @desc    Create shortened URL
 * @route   POST /api/url/shorten
 * @access  Public
 */
export const shortenUrl = asyncHandler(async (req, res) => {
  const { customShortCode } = req.body;
  
  // Use validated URL from middleware
  const url = req.validatedUrl || req.body.url;

  // Create short URL
  const shortUrl = await createShortUrl(url, customShortCode);

  res.status(201).json({
    success: true,
    data: {
      _id: shortUrl._id,
      originalUrl: shortUrl.originalUrl,
      shortCode: shortUrl.shortCode,
      shortUrl: shortUrl.shortUrl,
      clicks: shortUrl.clicks,
      createdAt: shortUrl.createdAt,
    },
  });
});

/**
 * @desc    Redirect to original URL and log analytics
 * @route   GET /:shortCode
 * @access  Public
 */
export const redirectUrl = asyncHandler(async (req, res) => {
  const { shortCode } = req.params;

  // Find URL by short code
  const url = await findUrlByShortCode(shortCode);

  // Log click analytics (non-blocking)
  logClick({
    urlId: url._id,
    ip: getClientIp(req),
    userAgent: req.headers['user-agent'],
    referrer: req.headers['referer'] || req.headers['referrer'],
  }).catch((err) => {
    console.error('Analytics logging error:', err.message);
  });

  // Increment click count (non-blocking)
  incrementUrlClicks(url._id).catch((err) => {
    console.error('Click increment error:', err.message);
  });

  // Redirect to original URL (HTTP 302)
  res.redirect(302, url.originalUrl);
});

/**
 * @desc    Get analytics for a URL
 * @route   GET /api/url/:id/analytics
 * @access  Public
 */
export const getAnalytics = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { days } = req.query;

  // Check if URL exists
  const url = await Url.findById(id);
  if (!url) {
    return res.status(404).json({
      success: false,
      error: 'URL not found',
    });
  }

  // Get comprehensive analytics
  const analytics = await getComprehensiveAnalytics(
    url._id,
    days ? parseInt(days) : 30
  );

  res.status(200).json({
    success: true,
    data: {
      url: {
        originalUrl: url.originalUrl,
        shortCode: url.shortCode,
        shortUrl: url.shortUrl,
        createdAt: url.createdAt,
      },
      analytics: {
        overview: {
          totalClicks: analytics.totalClicks,
          uniqueVisitors: analytics.uniqueVisitors,
        },
        clicksByDate: analytics.dateWiseClicks,
        devices: analytics.deviceStats,
        browsers: analytics.browserStats,
        topReferrers: analytics.topReferrers,
      },
    },
  });
});