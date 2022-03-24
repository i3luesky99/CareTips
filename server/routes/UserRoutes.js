const User = require('../models/User')
const router = require('express').Router();
const bcrypt = require('bcrypt');

//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                 $set: req.body 
            }, {new:true});
            res.status(200).json(updateUser);
        }catch (error) {
           return res.status(500).json(error);
        }
    } else {
        return res.status(403).json("You can update only your account")
    }
})  

//Get all users
router.get('/', async (req, res) => {
    const users = await User.find({});
    try {
        res.send(users);
    } catch (error) {
        res.status(500).send(error);
    }
})

//delete
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.deleteOne(req.params.i)
            res.status(200).json("Account has been deleted")
        }catch (error) {
           return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("You can delete only your account")
    }
})  

module.exports = router;
