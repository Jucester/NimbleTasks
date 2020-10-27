const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const { createProject, getProjects, editProject, deleteProject } = require('../controller/projects.controller');
const auth = require('../middlewares/auth');

// /api/projects
router.post('/', 
    auth,
    [
        check('name', 'The project name it\'s required').not().isEmpty()    
    ],
    createProject
); 
router.get('/', 
    auth,
    getProjects
);
router.put('/:id',
    auth,
    [
        check('name', 'The project name it\'s required').not().isEmpty()    
    ],
    editProject
)

router.delete('/:id',
    auth,
    deleteProject
)

module.exports = router;