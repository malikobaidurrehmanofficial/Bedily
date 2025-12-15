import mongoose from 'mongoose';

const clickSchema = new mongoose.Schema(
  {
    urlId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Url',
      required: [true, 'URL reference is required'],
      index: true,
    },
    ip: {
      type: String,
      required: [true, 'IP address is required'],
      trim: true,
      validate: {
        validator: function (ip) {
          // IPv4 and IPv6 validation
          const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
          const ipv6Regex = /^([0-9a-fA-F]{0,4}:){7}[0-9a-fA-F]{0,4}$/;
          return ipv4Regex.test(ip) || ipv6Regex.test(ip);
        },
        message: 'Please provide a valid IP address',
      },
    },
    userAgent: {
      type: String,
      default: null,
      trim: true,
      maxlength: [500, 'User agent string is too long'],
    },
    referrer: {
      type: String,
      default: null,
      trim: true,
      maxlength: [500, 'Referrer URL is too long'],
    },
    country: {
      type: String,
      default: null,
      trim: true,
    },
    city: {
      type: String,
      default: null,
      trim: true,
    },
    device: {
      type: String,
      enum: ['desktop', 'mobile', 'tablet', 'unknown'],
      default: 'unknown',
    },
    browser: {
      type: String,
      default: null,
      trim: true,
    },
    os: {
      type: String,
      default: null,
      trim: true,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false }, // Only track creation time
  }
);

// Indexes for analytics queries
clickSchema.index({ urlId: 1, createdAt: -1 }); // Primary analytics index
clickSchema.index({ createdAt: -1 }); // For time-based queries
clickSchema.index({ country: 1 }); // For geographic analytics
clickSchema.index({ device: 1 }); // For device analytics

// Static method to get click count for a URL
clickSchema.statics.getClickCountByUrl = function (urlId) {
  return this.countDocuments({ urlId });
};

// Static method to get clicks in date range
clickSchema.statics.getClicksByDateRange = function (urlId, startDate, endDate) {
  return this.find({
    urlId,
    createdAt: { $gte: startDate, $lte: endDate },
  }).sort({ createdAt: -1 });
};

// Static method to get analytics summary
clickSchema.statics.getAnalyticsSummary = async function (urlId) {
  const clicks = await this.find({ urlId });
  
  const summary = {
    totalClicks: clicks.length,
    uniqueIPs: [...new Set(clicks.map((c) => c.ip))].length,
    devices: {},
    browsers: {},
    countries: {},
    referrers: {},
  };

  // Aggregate data
  clicks.forEach((click) => {
    // Device breakdown
    summary.devices[click.device] = (summary.devices[click.device] || 0) + 1;
    
    // Browser breakdown
    if (click.browser) {
      summary.browsers[click.browser] = (summary.browsers[click.browser] || 0) + 1;
    }
    
    // Country breakdown
    if (click.country) {
      summary.countries[click.country] = (summary.countries[click.country] || 0) + 1;
    }
    
    // Referrer breakdown
    if (click.referrer) {
      summary.referrers[click.referrer] = (summary.referrers[click.referrer] || 0) + 1;
    }
  });

  return summary;
};

const Click = mongoose.model('Click', clickSchema);

export default Click;
