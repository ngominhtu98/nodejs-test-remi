const router = require('express').Router();
const {confirmJWT} = require('../middleware')


router.use(confirmJWT);
router.use('/users', require('./users'));
router.use('/videos', require('./videoDetails'));
router.use('/notifications', require('./notifications'));


router.use('*', (req, res) => {
  res.status(404).json({
    message: 'NOT FOUND'
  });
});

module.exports = router;
