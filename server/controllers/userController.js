const User = require('../models/userModel');
const UserProfile = require('../models/userProfileModel');
const ProviderProfile = require('../models/providerProfileModel');

/**
 * GET /api/users/me
 */
async function getMe(req, res) {
  const user = await User.findById(req.user.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
}

/**
 * GET /api/users/:id
 */
async function getUserById(req, res) {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json(user);
}

/**
 * GET /api/users
 * Admin only
 */
async function listUsers(req, res) {
  const { role } = req.query;
  const filter = {};
  if (role) filter.role = role;
  const users = await User.find(filter).select('-password').sort({ createdAt: -1 });
  return res.json(users);
}

module.exports = { getMe, getUserById, listUsers };

/**
 * PUT /api/users/me/profile
 */
async function upsertMyProfile(req, res) {
  const base = { phone: req.body.phone, language: req.body.language, timeZone: req.body.timeZone, city: req.body.city, postalCode: req.body.postalCode, avatarUrl: req.body.avatarUrl };
  const prof = await UserProfile.findOneAndUpdate({ user: req.user.id }, { $set: { user: req.user.id, ...base } }, { upsert: true, new: true });
  return res.json(prof);
}

/**
 * PUT /api/users/me/provider
 */
async function upsertMyProviderProfile(req, res) {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  user.isProvider = true;
  await user.save();
  const body = {
    bio: req.body.bio,
    skills: req.body.skills,
    coverageCity: req.body.coverageCity,
    coverageRadiusKm: req.body.coverageRadiusKm,
    status: req.body.status || 'review'
  };
  const p = await ProviderProfile.findOneAndUpdate({ user: req.user.id }, { $set: { user: req.user.id, ...body } }, { upsert: true, new: true });
  return res.json(p);
}

module.exports.upsertMyProfile = upsertMyProfile;
module.exports.upsertMyProviderProfile = upsertMyProviderProfile;


