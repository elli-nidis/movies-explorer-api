const router = require('express').Router();
const { auth } = require('../middlewares/auth');

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', auth, require('./signout'));
router.use('/users', auth, require('./users'));
router.use('/movies', auth, require('./movies'));
router.use('*', auth, require('./notFound'));

module.exports = router;
