const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const auth = require('../middlewares/auth');
const { createTask, getTasksPerProject, updateTask, deleteTask } = require('../controller/tasks.controller');

// /api/tasks
router.post('/', 
    auth,
    [
        check('name', 'Name is required').not().isEmpty()
    ]
    ,
    createTask
)
router.get('/',
    auth,
    getTasksPerProject
)

router.put('/:id',
    auth,
    updateTask    
)

router.delete('/:id',
    auth, 
    deleteTask
)

module.exports = router;