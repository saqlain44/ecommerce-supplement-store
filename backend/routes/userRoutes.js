const express = require('express');
const router = express.Router();

const { protect } = require('../middleware/authMiddleware');
const {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} = require('../controllers/userController');

router.post('/login', authUser);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.route('/').post(registerUser);

module.exports = router;
