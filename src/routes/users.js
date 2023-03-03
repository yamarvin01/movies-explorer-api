const router = require('express').Router();
const { getLoggedInUser, updateProfile } = require('../controllers/users');
const { validateUpdateProfile } = require('../validation/validation');

router.get('/users/me', getLoggedInUser);
router.patch('/users/me', validateUpdateProfile(), updateProfile);

module.exports = router;
