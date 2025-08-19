const express = require('express');
const { getMe, getUserById, listUsers, upsertMyProfile, upsertMyProviderProfile } = require('../controllers/userController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/me', protect, getMe);
router.get('/:id', protect, getUserById);
router.get('/', protect, authorize('admin'), listUsers);
router.put('/me/profile', protect, upsertMyProfile);
router.put('/me/provider', protect, upsertMyProviderProfile);

module.exports = router;


