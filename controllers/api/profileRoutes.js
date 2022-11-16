const router = require('express').Router();
const { Status } = require('../../models');
const withAuth = require('../../public/utils/auth');

// status post
router.post('/', withAuth, async (req, res) => {
    try {
        const newStatus = await Status.create({
            ...req.body,
            user_id: req.session.user_id,
        })
        res.status(200).json(newStatus);
    } catch (err) {
        res.status(400).json(err)
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