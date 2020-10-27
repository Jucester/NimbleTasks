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
    const { deleteTask, getTasks, changeStateTask, selectActualTask } = taskContext;

    // Function to delete task
    const onClickDelete = id => {
        deleteTask(id);
        getTasks(actual.id);
    }
    // Function to change state of task
    const changeState = task => {
        if(task.estado) {
            task.estado = false;
        } else {
            task.estado = true;
        }
        changeStateTask(task);
    }

    // Save the actual task for edit
    const saveActual = (task) => {
        selectActualTask(task);
    }

    return (  

        <li className="tarea sombra">
            <p> {task.nombre} </p>
            <div className="estado">
                {  task.estado 
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
                    onClick={() => onClickDelete(task.id)}
                > Delete </button>
            </div>
        </li>

    );
}
 
export default Task;