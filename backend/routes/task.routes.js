const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/task.controller');

router.get('/:user_id', TaskController.get);
router.post('/create', TaskController.create);
router.delete('/delete/:task_id', TaskController.delete);

module.exports = router;