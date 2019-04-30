const mongoose = require('mongoose');

const TaskSchema = require('./task');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, "Name must be more than 3 characters"],
    },
    user_id: {
        type: String,
        required: true
    },
    tasks: [TaskSchema]
});

mongoose.model('Category', CategorySchema);