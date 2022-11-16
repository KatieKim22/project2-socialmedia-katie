const router = require('express').Router();
const { Status } = require('../../models');
const withAuth = require('../../public/utils/auth');

router.get('/:id', (req, res) => {

})


// status post
router.post('/post', withAuth, async (req, res) => {

    try {
        const newStatus = await Status.create({
            title: req.body.title,
            text: req.body.text,
            user_id: req.session.user_id
        })
        newStatus.save()
        res.redirect('/profile');
    } catch (err) {
        res.render('/profile')
    }
})


router.delete('/:id', withAuth, async (req, res) => {
    try {
        const statusData = await Status.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        })

        if (!statusData) {
            res.status(400).json({ message: 'no status to delete with this id' })
            return;
        }
        res.status(200).json(statusData);
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;