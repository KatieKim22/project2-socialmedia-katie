const router = require('express').Router();
// user, profile
const userRoute = require('./userRoutes')
const profileRoute = require('./profileRoutes');

router.use('/user', userRoute);
router.use('/profile', profileRoute);

module.exports = router;