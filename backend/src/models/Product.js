import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  modelNumber: { type: String, default: '' },
  series: { type: String, default: '' },
  price: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  priceINR: { type: Number, default: 0 },
  releaseDate: { type: String, default: '' },
  popularity: { type: Number, default: 80 },
  verified: { type: Boolean, default: true },
  isUserAdded: { type: Boolean, default: false },
  rating: { type: Number, default: 4.5 },
  image: { type: String, default: '' },
  gallery: [{ type: String }],
  overview: { type: String, default: '' },
  pros: [{ type: String }],
  cons: [{ type: String }],
  specifications: { type: mongoose.Schema.Types.Mixed, default: {} },
  metrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  dataSource: { type: String, default: 'Manufacturer Verified Specifications' },
  lastUpdated: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
