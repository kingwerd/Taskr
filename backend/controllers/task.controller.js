const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const Category = mongoose.model('Category');
const User = mongoose.model('User');

class TaskController {

    get(req, res) {
        Task.find({user_id: req.params.user_id}, (err, tasks) => {
            if (err) {
                res.json({
                    error: err
                })
            } else {
                res.json({
                    status: 'ok',
                    data: tasks
                })
            }
        })
    }

    create(req, res) {
        const task = new Task({
            title: req.body.title,
            description: req.body.description,
            start_date: new Date(req.body.start_date),
            end_date: new Date(req.body.end_date),
            priority: parseInt(req.body.priority),
            category_id: req.body.category_id,
            user_id: req.userId
        });
        task.save(err => {
            if (err) {
                res.json({'status': 'error', 'errors': err})
            } else {
                Category.findByIdAndUpdate(task.category_id, {$push: { tasks: task }}, err => {
                    if (err) {
                        res.json({'status': 'error', 'error': err})
                    } else {
                        User.findByIdAndUpdate(req.userId, {$push: { tasks: task }}, err => {
                            if (err) {
                                res.json({'error': err})
                            } else {
                                res.json({'success': true})
                            }
                        })
                    }
                })
            }
        })
    }

    update(req, res) {

    }

    delete(req, res) {
        // TODO: Get the task that needs to be deleted
        // TODO: Using the cat_id from the task pop it from the category task array
        // TODO: Delete the task with res.params._id

        // Get the task that needs to be deleted
        Task.findById(req.params.task_id, (err, task) => {
            if (err) {
                res.json({'error': err})
            } else {
                // Pull the task from the categories tasks array
                Category.findByIdAndUpdate(task.category_id, { $pull: { tasks : { _id: task._id } } }, err => {
                    if (err) {
                        res.json({'error updating ': err})
                    } else {
                        // Finally delete the task
                        Task.findByIdAndDelete(task._id, err => {
                            if (err) {
                                res.json({'error': err})
                            } else {
                                res.json({'success': true, 'message': `${task.title} was deleted`})
                            }
                        })
                    }
                })
            }
        })
    }

}

module.exports = new TaskController();