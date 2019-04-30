const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const TaskSchema = require('./task');
const CategorySchema = require('./category');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true,
        minlength: [2, 'First name must be greater than 5 characters']
    },
    lastName: {
        type: String, 
        required: true,
        minlength: [2, 'Last name must be greater than 5 characters']
    },
    username: {
        type: String, 
        required: true,
        minlength: [3, 'Username must be greater than 5 characters'],
        unique: true
    },
    email: { 
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true,
        minlength: [8, 'Password must be greater than 8 characters']
    },
    tasks: [TaskSchema],
    categories: [CategorySchema]
}, { timestamps: true });

UserSchema.plugin(uniqueValidator);

mongoose.model('User', UserSchema);