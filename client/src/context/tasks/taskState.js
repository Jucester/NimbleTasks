import React, { useReducer } from 'react';
import clienteAxios from '../../config/axios';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';


import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    EDIT_TASK,
    CLEAN_TASK
} from '../../types/index';

const TaskState = props => {

    const initialState = {
        taskProject: [],
        errorTask: false,
        selectedTask: null
    }

    // Create dispatch and state
    const [state, dispatch ] = useReducer(TaskReducer, initialState);

    // Get tasks per project
    const getTasks = async project => {

       try {
            const res = await clienteAxios.get('/api/tasks', { params : { project } });
            console.log(res);
            dispatch({
                type: TASKS_PROJECT,
                payload: res.data.tasks
            })
       } catch (error) {
           console.log(error);
       }
    }

    // Add task to the selected project
    const addTask = async (task) => {
        console.log(task);
        try {
            const res = await clienteAxios.post('/api/tasks', task);
            console.log(res);

            dispatch({
                type: ADD_TASK,
                payload: task
            })
        } catch (error) {
            console.log(error)
        }
    }
    // Validate and show error if necesary
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }
    // Delete task per id
    const deleteTask = async (id, project) => {
        try {
            
            await clienteAxios.delete(`/api/tasks/${id}`, { params: { project }})
            ;
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.error(error);
        }
    }

    // Edit the actual task
    const editTask = async (task) => {
   
        try {
            const res = await clienteAxios.put(`/api/tasks/${task._id}`, task);
            console.log(res.data.task);

            dispatch({
                type: EDIT_TASK,
                payload: res.data.task
            })
        } catch (error) {
            console.error(error);
        }
    }

    // Detect the actual task
    const selectActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

  

    // Clean the selectedTask
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <TaskContext.Provider
            value={{
    
                taskProject: state.taskProject,
                errorTask: state.errorTask,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                selectActualTask,
                editTask,
                cleanTask
            }}
        >
            {props.children}
        </TaskContext.Provider>
    )
}

export default TaskState;