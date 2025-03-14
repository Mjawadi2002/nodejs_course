const express = require('express');
const router = express.Router();
const userController = require('../controllers/taskController');

router.get('/', userController.getTasks);
router.post('/create', userController.createTasks);

module.exports = router;