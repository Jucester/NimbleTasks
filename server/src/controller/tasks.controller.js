const Task = require('../models/Task');
const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const controller = {};

controller.createTask = async (req, res, next) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
    }

    // Extract the project 
    const { project } = req.body;
          
    try {
        const projectConfirm = await Project.findById(project);
        if(!projectConfirm) {
            return res.status(404).json({
                msg: 'Project not found'
            })
        }
        
        // Check if the actual project belong to the authenticate user
        if(projectConfirm.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        } 

        const task = new Task(req.body);
        await task.save();
        res.status(200).json({
            msg: 'Task created successfully',
            data: task
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
      }


}
controller.getTasksPerProject = async (req, res, next) =>{

    try {
        // Extract the project 
        const { project } = req.body;

        const projectConfirm = await Project.findById(project);
        if(!projectConfirm) {
            return res.status(404).json({
                msg: 'Project not found'
            })
        }
        // Check if the actual project belong to the authenticate user
        if(projectConfirm.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        } 

        const tasks = await Task.find({ project })

        if(!tasks) {
            return res.status(401).json({
                msg: 'There is no tasks yet. Create one'
            })
        }

        res.status(200).json({
            msg: 'Received',
            tasks: tasks
        })
            
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
controller.updateTask = async (req, res, next) => {

    try {
        // Extract the project 
        const { project, name, state } = req.body;
        const { id } = req.params;

        // Check if the task exists
        let task = await Task.findById( id )
        if(!task) {
            return res.state(404).json({
                msg: 'Task not found'
            })
        }

         // Check if the actual project belong to the authenticate user
        const projectConfirm = await Project.findById(project);
        if(projectConfirm.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        }

        // Create object with new information
        const newTask = {};

        if(name) {
            newTask.name = name;
        } 
        if(state) {
            newTask.state = state;
        }
        
        // Save task
        task = await Task.findOneAndUpdate({_id : id }, newTask, { new : true });

        res.status(200).json({
            msg: 'Updated succesfully',
            data: task
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
controller.deleteTask = async (req, res, next) => {
    try {
        // Extract the project 
        const { project } = req.body;
        const { id } = req.params;

        // Check if the task exists
        let task = await Task.findById( id )
        if(!task) {
            return res.state(404).json({
                msg: 'Task not found'
            })
        }

        // Check if the actual project belong to the authenticate user
        const projectConfirm = await Project.findById(project);
        if(projectConfirm.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        }

        // Delete the task
        await Task.findOneAndRemove({ _id : id });
        
        res.status(200).json({
            msg: 'Deleted succesfully',
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}

module.exports = controller;