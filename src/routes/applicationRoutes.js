const express = require('express');
const {
  createApplication,
  getMyApplications,
  getAllApplications,
  updateApplicationStatus
} = require('../controllers/applicationController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

// Protect all routes
router.use(auth);

// Candidate routes
router.post('/', roleCheck(['candidate']), createApplication);
router.get('/my-applications', roleCheck(['candidate']), getMyApplications);

// Admin routes
router.get('/', roleCheck(['admin']), getAllApplications);
router.patch('/:id/status', roleCheck(['admin']), updateApplicationStatus);

module.exports = router;
