const express = require('express');
const { createService, listServices, getServiceById, updateService, deleteService } = require('../controllers/serviceController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', listServices);
router.get('/:id', getServiceById);
router.post('/', protect, authorize('provider', 'admin'), createService);
router.put('/:id', protect, authorize('provider', 'admin'), updateService);
router.delete('/:id', protect, authorize('provider', 'admin'), deleteService);

module.exports = router;


