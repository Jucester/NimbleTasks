import React, { useContext } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    // Extract projects from state initial
    const projectContext = useContext(ProjectContext);
    const { project } = projectContext;

    const [actual] = project;

    // get the project tasks
    const taskContext = useContext(TaskContext);
    const { deleteTask, getTasks, editTask, selectActualTask } = taskContext;

    // Function to delete task
    const onClickDelete = id => {
        deleteTask(id, actual._id);
        getTasks(actual.id);
    }
    // Function to change state of task
    const changeState = task => {
        if(task.state) {
            task.state = false;
        } else {
            task.state = true;
        }
        editTask(task);
    }

    // Save the actual task for edit
    const saveActual = (task) => {
        selectActualTask(task);
    }

    return (  

        <li className="tarea sombra">
            <p> {task.name} </p>
            <div className="estado">
                {  task.state 
                   ?    (
                        <button 
                            type="button"
                            className="completo"
                            onClick={ () => changeState(task) }
                        > Complete </button>
                        )

                   : (
                    <button 
                        type="button"
                        className="incompleto"
                        onClick={ () => changeState(task) }
                    > Inomplete </button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={ () => saveActual(task) }
                > Edit </button>

                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => onClickDelete(task._id)}
                > Delete </button>
            </div>
        </li>

    );
}
 
export default Task;