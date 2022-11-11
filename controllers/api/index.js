const router = require('express').Router();
// user, profile
const userRoute = require('./userRoutes')
const profileRoute = require('./profileRoutes');

router.use('/users', userRoute);
router.use('/profiles', profileRoute);

module.exports = router;