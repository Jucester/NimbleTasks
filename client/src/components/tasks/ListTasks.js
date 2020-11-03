import React, { Fragment, useContext } from 'react';
import Task from './Task';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListTasks = () => {

    // Extract projects from state initial
    const projectContext = useContext(ProjectContext);
    const { project, deleteProject } = projectContext;

    // get the project tasks
    const taskContext = useContext(TaskContext);
    const { taskProject } = taskContext;


    // Verify if theres a project selected
    if(!project) return <h1> Select a project </h1>

    const [actual] = project;
  
    const onClickDelete = () => {
        deleteProject(project[0]._id);
    }

    return (  
        <Fragment>

            <h2> Project: {actual.name} </h2>
   
            <ul>
                {taskProject.length === 0 
                    ? <li className="tarea"> <p> No hay tareas </p></li>
                    : 
                    <TransitionGroup>
                            {taskProject.map(task=> (
                                <CSSTransition
                                    key={task._id}
                                    timeout={500}
                                    classNames="tarea"
                                >
                                    <Task task={task} />

                                </CSSTransition>
                            ))}
                    </TransitionGroup>
                }

                  <button 
                    type="button"   
                    className="btn btn-delete" 
                    onClick={ onClickDelete }
                > Delete Project </button>
            </ul>

          
        </Fragment>

    );
}
 
export default ListTasks;