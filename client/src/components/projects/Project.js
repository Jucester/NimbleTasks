import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';

import TaskContext from '../../context/tasks/taskContext';



const Project = ({ project }) => {

    // get projects state
    const projectContext = useContext(ProjectContext);
    const { selectProject } = projectContext;

    // get tasks state
    const taskContext = useContext(TaskContext);
    const { getTasks } = taskContext;

    // Function to add the actual project
    const selectActualProject = (id) => {
        selectProject(id); 
        getTasks(id);
    }

    return (  
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => selectActualProject(project._id) }
            >
             {project.name}
            </button>
        </li>
    );
}
 
export default Project;