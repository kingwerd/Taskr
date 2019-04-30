const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const bcrypt = require('bcrypt');
const config = require('../config/config');

class UserController {

    profile(req, res) {
        User.findById(req.userId, { password: 0 }, (err, user) => {
            if (err) {
                return res.status(500),json({
                    message: 'there was an issue finding the user'
                })
            }
            if (!user) {
                return res.status(404).json({
                    message: 'User not found'
                })
            } else {
                Category.find({user_id: req.userId}, (err, categories) => {
                    if (err) {
                        res.json({'error': err})
                    }
                    res.json({"user": user, "categories": categories});
                })
            }
        })
    }
}

module.exports = new UserController();