import React, { useContext, useEffect, useState } from 'react';
import ProjectContext from '../../context/projects/projectContext';
import TaskContext from '../../context/tasks/taskContext';



const FormTask = () => {
    // Extraer project
    const projectContext = useContext(ProjectContext);
    const { project } = projectContext;
    // get the project tasks
    const taskContext = useContext(TaskContext);
    const { errorTask, addTask, validateTask, getTasks, selectedTask, editTask, cleanTask } = taskContext;

    // Effect that detect if there's a task selected
    useEffect( () => {
      
        if(selectedTask !== null)  {
                saveTask(selectedTask);
        } else {
            saveTask({
                name: ''
            })
        }
            
    }, [selectedTask])

    // form state
    const [ task, saveTask ] = useState({
        name: ''
    });
    

    // if there's no task in the project
    if(!project) return null;

    // Array destructuring the task state from context
    const [actual] = project;

    const { name } = task;

    // Save task on state
    const handleChange = e => {
        saveTask({
            ...task,
            [e.target.name] : e.target.value
        })
    }

    // Add the nnew task
    const onSubmitTask = e => {
        e.preventDefault();

        // Validate
        if (name.trim() === '') {
            validateTask();
            return;
        }
        
        // Check if is edit or new task
        if(selectedTask === null) {
            // Pass validation
            validateTask();
            // Add task to the task state
            task.project = actual._id;
            addTask(task);

        } else {
            // Edit task
            editTask(task);
            // clean the task form
            cleanTask();
        }

        // Get all the task per project
        getTasks(actual.id)

        // Reset the form
        saveTask({
            name: ''
        })
    }

    return (  
        <div className="formulario">
            <form
                onSubmit={onSubmitTask}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Name task..."
                        name="name"
                        value={ name }
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-block btn-primario btn-submit"
                        value={ selectedTask ? "Edit Task" : "Add Task" }
                    />
                </div>
            </form>
            {errorTask ? <p className="mensaje error"> Task name are obligatory </p> : null }
        </div>
    
    );
}
 
export default FormTask;
