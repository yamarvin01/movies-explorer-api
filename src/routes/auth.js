const router = require('express').Router();
const { signIn, signUp } = require('../controllers/auth');
const { validateSignUp, validateSignIn } = require('../validation/validation');

router.post('/signup', validateSignUp(), signUp);
router.post('/signin', validateSignIn(), signIn);

module.exports = router;
