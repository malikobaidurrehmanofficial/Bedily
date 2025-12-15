import express from 'express';
import { shortenUrl, getAnalytics } from '../controllers/urlController.js';
import { validateUrl, validateCustomCode, validateObjectId } from '../middleware/validators.js';
import { shortenLimiter, analyticsLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

/**
 * @route   POST /api/url/shorten
 * @desc    Create a shortened URL
 * @access  Public
 */
router.post('/shorten', shortenLimiter, validateUrl, validateCustomCode, shortenUrl);

/**
 * @route   GET /api/url/:id/analytics
 * @desc    Get analytics for a URL
 * @access  Public
 */
router.get('/:id/analytics', analyticsLimiter, validateObjectId('id'), getAnalytics);

export default router;
