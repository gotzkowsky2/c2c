const express = require('express');
const { createProject, listMyProjects, getProjectById, updateStatus, addMessage } = require('../controllers/projectController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createProject);
router.get('/', protect, listMyProjects);
router.get('/:id', protect, getProjectById);
router.put('/:id/status', protect, updateStatus);
router.post('/:id/messages', protect, addMessage);

module.exports = router;


