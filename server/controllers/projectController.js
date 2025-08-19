const Project = require('../models/projectModel');

/**
 * POST /api/projects
 * Consumer creates a project from a service
 */
async function createProject(req, res) {
  const { serviceId, providerId, brief } = req.body;
  if (!serviceId || !providerId) return res.status(400).json({ message: 'Missing fields' });
  const project = await Project.create({
    service: serviceId,
    provider: providerId,
    consumer: req.user.id,
    brief
  });
  return res.status(201).json(project);
}

/**
 * GET /api/projects
 * List my projects by role
 */
async function listMyProjects(req, res) {
  const role = req.user.role;
  const filter = {};
  if (role === 'consumer') filter.consumer = req.user.id;
  if (role === 'provider') filter.provider = req.user.id;
  const projects = await Project.find(filter)
    .populate('service', 'title priceEUR')
    .populate('consumer', 'firstName lastName')
    .populate('provider', 'firstName lastName')
    .sort({ createdAt: -1 });
  return res.json(projects);
}

/**
 * GET /api/projects/:id
 */
async function getProjectById(req, res) {
  const project = await Project.findById(req.params.id)
    .populate('service', 'title priceEUR')
    .populate('consumer', 'firstName lastName')
    .populate('provider', 'firstName lastName');
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const involved = [project.consumer.toString(), project.provider.toString()].includes(req.user.id) || req.user.role === 'admin';
  if (!involved) return res.status(403).json({ message: 'Forbidden' });
  return res.json(project);
}

/**
 * PUT /api/projects/:id/status
 */
async function updateStatus(req, res) {
  const { status } = req.body;
  const allowed = ['requested', 'accepted', 'in_progress', 'completed', 'cancelled'];
  if (!allowed.includes(status)) return res.status(400).json({ message: 'Invalid status' });
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const isProvider = project.provider.toString() === req.user.id;
  const isConsumer = project.consumer.toString() === req.user.id;
  const isAdmin = req.user.role === 'admin';

  const canChange = isAdmin ||
    (isProvider && ['accepted', 'in_progress', 'completed', 'cancelled'].includes(status)) ||
    (isConsumer && ['cancelled'].includes(status));

  if (!canChange) return res.status(403).json({ message: 'Forbidden' });
  project.status = status;
  await project.save();
  return res.json(project);
}

/**
 * POST /api/projects/:id/messages
 */
async function addMessage(req, res) {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ message: 'Message required' });
  const project = await Project.findById(req.params.id);
  if (!project) return res.status(404).json({ message: 'Project not found' });
  const involved = [project.consumer.toString(), project.provider.toString()].includes(req.user.id) || req.user.role === 'admin';
  if (!involved) return res.status(403).json({ message: 'Forbidden' });
  project.messages.push({ sender: req.user.id, text });
  await project.save();
  return res.status(201).json(project.messages[project.messages.length - 1]);
}

module.exports = { createProject, listMyProjects, getProjectById, updateStatus, addMessage };


