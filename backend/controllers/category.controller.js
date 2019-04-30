const mongoose = require('mongoose');
const Task = mongoose.model('Task');
const Category = mongoose.model('Category');

class CategoryController {

    create(req, res) {
        const category = new Category({
            name: req.body.name,
            user_id: req.userId
        })
        category.save(err => {
            if (err) {
                res.json({'status': 'error', 'errors': err})
            } else {
                res.json({'success': true})
            }
        })
    }

    all(req, res) {
        Category.find( {user_id: req.params.userId}, (err, categories) => {
            if (err) {
                res.json({ 'error': err })
            } else {
                res.json({ 'success': true, 'categories': categories })
            }
        })
    }
    
}

module.exports = new CategoryController();