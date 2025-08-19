const mongoose = require('mongoose');

const providerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    bio: { type: String },
    skills: [{ type: String, index: true }],
    coverageCity: { type: String },
    coverageRadiusKm: { type: Number, default: 25 },
    documents: [
      {
        type: { type: String }, // id_card, permit, cert
        url: { type: String },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        note: { type: String }
      }
    ],
    status: { type: String, enum: ['draft', 'review', 'approved'], default: 'draft', index: true }
  },
  { timestamps: true }
);

const ProviderProfile = mongoose.model('ProviderProfile', providerProfileSchema);
module.exports = ProviderProfile;


