const mongoose = require('mongoose');
const User = mongoose.model('User');
const Category = mongoose.model('Category');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../config/config');

const generateNewCategories = (user) => {
    const categories = ['Requirements', 'Design', 'Development', 'Bugs'];
    var cats = categories.forEach(async (category) => {
        var category = new Category({
            name: category,
            user_id: user._id
        })
        try {
            await category.save();
            await User.findByIdAndUpdate(user._id, { $push: { categories: category } })
        } catch (err) {
            console.log(err);
        }
    });
}

class AuthController {

    signup(req, res) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            } else {
                const user = new User({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    username: req.body.username,
                    email: req.body.email,
                    password: hash
                });
                user.save(err => {
                    if (err) {
                        res.json({'status': 'error', 'errors': err})
                    } else {
                        generateNewCategories(user);
                        var token = jwt.sign({ id: user._id }, SECRET, {
                            expiresIn: 86400
                        })
                        res.json({'success': 'registration successful', 'token': token})
                    }
                })
            }
        })
    }

    signin(req, res) {
        User.findOne({username: req.body.username})
        .exec()
        .then(user => {
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    console.log('passwords do not match')
                    return res.status(401).json({
                        failed: 'Unauthorized access'
                    })
                }
                if (result) {
                    console.log('the passwords match')
                    var token = jwt.sign({ id: user._id }, SECRET, {
                        expiresIn: 86400
                    })
                    return res.json({
                        success: 'signin successful',
                        token: token
                    })
                }
                return res.status(401).json({
                    failed: 'Unauthorized access'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
    }
}

module.exports = new AuthController();