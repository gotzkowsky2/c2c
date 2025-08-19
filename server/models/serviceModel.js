const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['anmeldung', 'visa_extension', 'translation', 'legal', 'life_coaching', 'other'], default: 'other' },
    priceEUR: { type: Number, required: true, min: 0 },
    provider: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true },
    city: { type: String, trim: true, index: true },
    postalCode: { type: String, trim: true, index: true },
    geo: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point'
      },
      coordinates: {
        type: [Number], // [lng, lat]
        index: '2dsphere',
        default: undefined
      }
    }
  },
  { timestamps: true }
);

serviceSchema.index({ title: 'text', description: 'text' });

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;


