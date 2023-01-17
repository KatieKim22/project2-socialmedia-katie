const router = require('express').Router();
const { Status, User } = require('../../models');
const withAuth = require('../../utils/withauth');

// const sequelize = require('../../config/connection');

router.get('/', async (req, res) => {
    // render status posts

    const status = await Status.findAll()
    // let loggedUser = await User.findOne({
    //     where: { userName: req.body.userName }
    // })
    console.log(status)
    return res.render('profile', { status: status })

})


// status post
router.post('/', async (req, res) => {
    let { title, text, date_created } = req.body;

    // await sequelize.sync({ force: true });

    try {
        const newStatus = await Status.create({
            title: title,
            text: text,
            date_created: date_created
        })
        newStatus.save()
        return res.redirect('/profile');
    } catch (err) {
        console.log(err)
        return res.render('home')
    }
})

// update status

router.put('/edit/:id', withAuth, async (req, res) => {
    console.log('postID', req.params.id)

    let { title, text, date_created } = req.body;
    try {
        let updateStatus = await Status.update({
            title: title,
            text: text,
            date_created: date_created
        }, {
            where: {
                id: req.params.id
            }
        })
        return res.redirect('/profile')
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: err.message })
        return res.render('/profile')
    }
})



router.delete('/:id', withAuth, async (req, res) => {
    try {
        const statusData = await Status.destroy({
            where: {
                id: req.params.id,
            },
        })

        if (!statusData) {
            res.status(400).json({ message: 'no status to delete with this id' })
            return;
        }
        return res.redirect('/profile')
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;