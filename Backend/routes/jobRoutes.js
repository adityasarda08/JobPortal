const express = require('express');
const router = express.Router();
const {
createJob, getAllJobs, getJobById, updateJob, deleteJob,getAdminJobs} = require('../controllers/jobController');
const {protect , employerOnly} = require('../middleware/authMiddleware');


router.get('/get', getAllJobs);
router.get('/get/:id', getJobById);
router.get('/adminjobs', protect, getAdminJobs);

router.post('/Post', protect, createJob);
router.put('/update/:id', protect, employerOnly, updateJob);
router.delete('/delete/:id', protect, employerOnly, deleteJob);


module.exports = router;