const express = require('express')
const taskController = require('../controllers/taskController')

const router = express.Router();



router.get('/', taskController.getTasks);

router.post('/addTask', taskController.postTask)

router.put('/edit/:id', taskController.updateTask)


module.exports = router;