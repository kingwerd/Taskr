const express = require('express');
const router = express.Router();

const CategoryController = require('../controllers/category.controller');

router.post('/create', CategoryController.create);

module.exports = router;