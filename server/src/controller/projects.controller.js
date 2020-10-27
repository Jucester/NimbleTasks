const Project = require('../models/Project');
const { validationResult } = require('express-validator');
const controller = {}

controller.getProjects = async (req, res, next) => {
    try {
       const projects = await Project.find({ creator : req.user.id }).sort({ 
        createdAt: -1
       });
       
       if(!projects) {
           res.status(200).json({
                msg: 'There is no projects get'
           })
       } else {
           res.status(200).json({
               msg: 'Received',
               data: projects
           })
       }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
controller.createProject = async (req, res, next) => {
    // Check for errors
      
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
    }
  
    // Extract the name
    const { name } = req.body;

    try {
        const project = new Project({ name });
        // save creator with JWT
        project.creator = req.user.id;
        // save project in DB
        project.save();
        res.status(200).json({
            data: project
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }

}
controller.editProject = async (req, res, next) => {
     // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() })
    }

    // Extract the name
    const { name } = req.body;
    const newProject = {};
    if(name) {
        newProject.name = name;
    }

    try {
        // Check the ID
        const { id } = req.params;
        let project = await Project.findById( id );

        // Check if the project exists
        if(!project) {
            return res.status(404).json({
                msg: 'Project not found'
            })
        }

        // Check the project creator
        if(project.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        }

        // Update the project
        project = await Project.findByIdAndUpdate({ _id: id }, { $set: newProject }, { new: true });

        res.status(200).json({
            msg: 'Updated successfully',
            data: project
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong.'
        })
    }

}
controller.deleteProject = async (req, res, next) => {
    
    try {
        // Check the ID
        const { id } = req.params;
        let project = await Project.findById( id );

        // Check if the project exists
        if(!project) {
            return res.status(404).json({
                msg: 'Project not found'
            })
        }

        // Check the project creator
        if(project.creator.toString() !== req.user.id) {
            return res.status(401).json({
                msg: 'You can\'t access this project'
            })
        }

        // Update the project
        await Project.findByIdAndRemove({ _id: id });

        res.status(200).json({
            msg: 'Deleted successfully'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Something went wrong.'
        })
    }


}

module.exports = controller;