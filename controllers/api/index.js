const router = require('express').Router();
// user, profile, register
const userRoute = require('./userRoutes')
const profileRoute = require('./profileRoutes');
const authRoutes = require('./auth')

router.use('/user', userRoute);
router.use('/profile', profileRoute);
router.use('/auth', authRoutes);

module.exports = router;