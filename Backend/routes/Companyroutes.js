const express = require('express');
const router = express.Router();
const {protect, employerOnly} = require('../middleware/authMiddleware');
const { companyController, getCompanyById, getAllCompanies, updateCompany } = require('../controllers/companyController');
const { singleUpload } = require('../middleware/multer');

// Register Route
router.post('/register', protect, companyController);
router.get('/getall', protect, getAllCompanies);
router.get('/get/:id', protect, getCompanyById);
router.put('/update/:id', protect, singleUpload,updateCompany); 


module.exports = router