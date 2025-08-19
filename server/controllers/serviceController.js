const Service = require('../models/serviceModel');

/**
 * POST /api/services
 * Provider only
 */
async function createService(req, res) {
  const { title, description, category, priceEUR, city, postalCode, lat, lng } = req.body;
  if (!title || !description || !priceEUR) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  const service = await Service.create({
    title,
    description,
    category,
    priceEUR,
    provider: req.user.id,
    city,
    postalCode,
    geo: typeof lat === 'number' && typeof lng === 'number' ? { type: 'Point', coordinates: [lng, lat] } : undefined
  });
  return res.status(201).json(service);
}

/**
 * GET /api/services
 */
async function listServices(req, res) {
  const { q, category, provider, city, postalCode, lat, lng, radiusKm } = req.query;
  const filter = { isActive: true };
  if (q) filter.$text = { $search: q };
  if (category) filter.category = category;
  if (provider) filter.provider = provider;
  if (city) filter.city = new RegExp(`^${city}$`, 'i');
  if (postalCode) filter.postalCode = new RegExp(`^${postalCode}$`, 'i');

  // Geo search if lat/lng provided
  if (typeof lat !== 'undefined' && typeof lng !== 'undefined') {
    const parsedLat = Number(lat);
    const parsedLng = Number(lng);
    const maxDistanceMeters = Number(radiusKm || 25) * 1000; // default 25km
    const services = await Service.find({
      ...filter,
      geo: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parsedLng, parsedLat] },
          $maxDistance: maxDistanceMeters
        }
      }
    })
      .populate('provider', 'firstName lastName role')
      .sort({ createdAt: -1 });
    return res.json(services);
  }

  const services = await Service.find(filter)
    .populate('provider', 'firstName lastName role')
    .sort({ createdAt: -1 });
  return res.json(services);
}

/**
 * GET /api/services/:id
 */
async function getServiceById(req, res) {
  const service = await Service.findById(req.params.id).populate('provider', 'firstName lastName role');
  if (!service) return res.status(404).json({ message: 'Service not found' });
  return res.json(service);
}

/**
 * PUT /api/services/:id
 * Owner(provider) or admin
 */
async function updateService(req, res) {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  const isOwner = service.provider.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' });

  const fields = ['title', 'description', 'category', 'priceEUR', 'isActive', 'city', 'postalCode'];
  fields.forEach((f) => {
    if (typeof req.body[f] !== 'undefined') service[f] = req.body[f];
  });
  if (typeof req.body.lat === 'number' && typeof req.body.lng === 'number') {
    service.geo = { type: 'Point', coordinates: [req.body.lng, req.body.lat] };
  }
  await service.save();
  return res.json(service);
}

/**
 * DELETE /api/services/:id
 * Owner(provider) or admin
 */
async function deleteService(req, res) {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  const isOwner = service.provider.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';
  if (!isOwner && !isAdmin) return res.status(403).json({ message: 'Forbidden' });
  await service.deleteOne();
  return res.json({ success: true });
}

module.exports = { createService, listServices, getServiceById, updateService, deleteService };


