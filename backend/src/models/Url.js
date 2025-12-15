import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: [true, 'Original URL is required'],
      trim: true,
      validate: {
        validator: function (url) {
          // Basic URL validation
          const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
          return urlRegex.test(url);
        },
        message: 'Please provide a valid URL',
      },
    },
    shortCode: {
      type: String,
      required: [true, 'Short code is required'],
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [4, 'Short code must be at least 4 characters'],
      maxlength: [12, 'Short code must not exceed 12 characters'],
      match: [/^[a-zA-Z0-9_-]+$/, 'Short code can only contain alphanumeric characters, hyphens, and underscores'],
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, 'Clicks cannot be negative'],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null, // null for anonymous URLs
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      default: null, // null means never expires
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

// Indexes for performance
urlSchema.index({ userId: 1, createdAt: -1 }); // For user's URL list
urlSchema.index({ createdAt: -1 }); // For recent URLs
urlSchema.index({ expiresAt: 1 }, { sparse: true }); // For TTL cleanup

// Virtual for short URL
urlSchema.virtual('shortUrl').get(function () {
  return `${process.env.BASE_URL}/${this.shortCode}`;
});

// Ensure virtuals are included in JSON
urlSchema.set('toJSON', { virtuals: true });
urlSchema.set('toObject', { virtuals: true });

// Instance method to increment clicks
urlSchema.methods.incrementClicks = async function () {
  this.clicks += 1;
  return this.save();
};

// Static method to find by short code
urlSchema.statics.findByShortCode = function (shortCode) {
  return this.findOne({ shortCode, isActive: true });
};

// Static method to check if URL is expired
urlSchema.methods.isExpired = function () {
  if (!this.expiresAt) return false;
  return new Date() > this.expiresAt;
};

const Url = mongoose.model('Url', urlSchema);

export default Url;
