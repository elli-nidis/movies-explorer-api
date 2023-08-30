const router = require('express').Router();

const { notFoundUrl } = require('../controllers/notFoundUrl');

router.use('*', notFoundUrl);

module.exports = router;
