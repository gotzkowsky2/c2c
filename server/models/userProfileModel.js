const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    phone: { type: String },
    language: { type: String, default: 'ko' },
    timeZone: { type: String, default: 'Europe/Berlin' },
    city: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    avatarUrl: { type: String }
  },
  { timestamps: true }
);

const UserProfile = mongoose.model('UserProfile', userProfileSchema);
module.exports = UserProfile;


