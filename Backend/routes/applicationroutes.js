const express = require('express');
const router = express.Router();
const {protect, employerOnly} = require('../middleware/authMiddleware');
const { applyjob, getApppliedjobs, getApplicants, updateStatus } = require('../controllers/applicationcontroller');

// Register Route
router.get('/get', protect, getApppliedjobs);
router.get('/apply/:id', protect, applyjob);
router.get('/:id/applicants',protect,getApplicants);
router.post('/status/:id/update',protect, updateStatus);



module.exports = router