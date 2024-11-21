const express = require('express');
const {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
} = require('../controllers/jobController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

const router = express.Router();

router.get('/', getAllJobs);
router.get('/:id', getJob);

// Protect all routes after this middleware
router.use(auth);

router
  .route('/')
  .post(roleCheck(['admin']), createJob);

router
  .route('/:id')
  .put(roleCheck(['admin']), updateJob)
  .delete(roleCheck(['admin']), deleteJob);

module.exports = router;
