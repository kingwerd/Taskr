const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: [2, 'Title must be greater than 2 characters']
    },
    description: {
        type: String,
        required: true,
        minlength: [10, 'Description must be greater than 10 characters']
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    priority: {
        type: Number,
        required: true,
        min: [1, 'Priority must be 1 or greater'],
        max: [6, 'Priority must be 6 or less']
    },
    completed: {
        type: Boolean,
        default: false
    },
    category_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
}, { timestamps: true });

mongoose.model('Task', TaskSchema);