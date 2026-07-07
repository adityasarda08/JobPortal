const express = require('express');
const router = express.Router();
const {register, login, logout, updateProfile} = require('../controllers/userController');
const {protect} = require('../middleware/authMiddleware');
const { singleUpload } = require('../middleware/multer');

// Register Route
router.post('/register', singleUpload, register);
router.post('/login', login);
router.post('/logout', logout);
router.put('/profile/update', protect,singleUpload, updateProfile);


router.get('/me', protect, (req, res) => {
    res.status(200).json({ user: req.user });
});

module.exports = router