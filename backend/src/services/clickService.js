import { Click } from '../models/index.js';
import { parseUserAgent } from '../utils/analyticsHelper.js';

/**
 * Log a click event
 * @param {object} data - Click data
 * @returns {Promise<object>} - Created click document
 */
export const logClick = async (data) => {
  const { urlId, ip, userAgent, referrer } = data;

  // Parse user agent
  const { device, browser, os } = parseUserAgent(userAgent);

  // Create click record
  const click = await Click.create({
    urlId,
    ip,
    userAgent,
    referrer: referrer || null,
    device,
    browser,
    os,
  });

  return click;
};

/**
 * Get analytics for a URL
 * @param {string} urlId - URL document ID
 * @returns {Promise<object>} - Analytics summary
 */
export const getUrlAnalytics = async (urlId) => {
  return Click.getAnalyticsSummary(urlId);
};

/**
 * Get click history for a URL
 * @param {string} urlId - URL document ID
 * @param {number} limit - Number of recent clicks to return
 * @returns {Promise<Array>} - Click documents
 */
export const getClickHistory = async (urlId, limit = 100) => {
  return Click.find({ urlId })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('ip device browser os country referrer createdAt');
};

/**
 * Get comprehensive analytics for a URL with date-wise breakdown
 * @param {string} urlId - URL document ID
 * @param {number} days - Number of days to include (default 30)
 * @returns {Promise<object>} - Comprehensive analytics data
 */
export const getComprehensiveAnalytics = async (urlId, days = 30) => {
  // Calculate date range
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  startDate.setHours(0, 0, 0, 0);

  // Aggregation pipeline for date-wise clicks
  const dateWiseClicks = await Click.aggregate([
    {
      $match: {
        urlId: urlId,
        createdAt: { $gte: startDate },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
        },
        count: { $sum: 1 },
      },
    },
    {
      $sort: { _id: 1 },
    },
    {
      $project: {
        _id: 0,
        date: '$_id',
        clicks: '$count',
      },
    },
  ]);

  // Get total clicks
  const totalClicks = await Click.countDocuments({ urlId });

  // Get device breakdown
  const deviceStats = await Click.aggregate([
    { $match: { urlId: urlId } },
    {
      $group: {
        _id: '$device',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        device: '$_id',
        count: '$count',
      },
    },
  ]);

  // Get browser breakdown
  const browserStats = await Click.aggregate([
    { $match: { urlId: urlId, browser: { $ne: null } } },
    {
      $group: {
        _id: '$browser',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        browser: '$_id',
        count: '$count',
      },
    },
  ]);

  // Get top referrers
  const topReferrers = await Click.aggregate([
    { $match: { urlId: urlId, referrer: { $ne: null } } },
    {
      $group: {
        _id: '$referrer',
        count: { $sum: 1 },
      },
    },
    {
      $sort: { count: -1 },
    },
    {
      $limit: 10,
    },
    {
      $project: {
        _id: 0,
        referrer: '$_id',
        count: '$count',
      },
    },
  ]);

  // Get unique visitors (by IP)
  const uniqueVisitors = await Click.distinct('ip', { urlId });

  return {
    totalClicks,
    uniqueVisitors: uniqueVisitors.length,
    dateWiseClicks,
    deviceStats,
    browserStats,
    topReferrers,
  };
};
