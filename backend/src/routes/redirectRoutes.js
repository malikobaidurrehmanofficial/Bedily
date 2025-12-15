import express from 'express';
import { redirectUrl } from '../controllers/urlController.js';

const router = express.Router();

/**
 * @route   GET /:shortCode
 * @desc    Redirect to original URL
 * @access  Public
 */
router.get('/:shortCode', redirectUrl);

export default router;
