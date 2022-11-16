// fix routes

const router = require('express').Router();
const { Profile, Status } = require('../../models')

/* GET posts index /posts */
router.get('/', (req, res,) => {
    res.render('profile');
});

/* POST posts create /posts */


/* GET posts show /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('SHOW /post/:id');
});

/* GET posts edit /posts/:id/edit */
router.get('/:id/edit', (req, res, next) => {
    res.send('EDIT /posts/:id/edit');
});

/* PUT posts update /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('UPDATE /posts/:id');
});

/* DELETE posts destroy /posts/:id */
router.get('/:id', (req, res, next) => {
    res.send('DELETE /posts/:id');
});


module.exports = router;