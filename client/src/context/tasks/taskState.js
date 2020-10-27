import React, { useReducer } from 'react';
import uuid from 'uuid';
import TaskContext from './taskContext';
import TaskReducer from './taskReducer';


import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
    ACTUAL_TASK,
    EDIT_TASK,
    CLEAN_TASK
} from '../../types/index';

const TaskState = props => {

    const initialState = {
        tasks:  [
            { id: 1, nombre: 'Finish Frontend', estado: true, projectId: 1},
            { id: 2, nombre: 'Select Database', estado: true, projectId: 3},
            { id: 3, nombre: 'Select PaaS', estado: false, projectId: 2},
            { id: 4, nombre: 'Deploy to Heroku', estado: false, projectId: 4},
            { id: 5, nombre: 'Finish Frontend', estado: true, projectId: 2},
            { id: 6, nombre: 'Select Database', estado: true, projectId: 4},
            { id: 7, nombre: 'Select PaaS', estado: false, projectId: 1},
            { id: 8, nombre: 'Deploy to Heroku', estado: false, projectId: 1}
        ],
        taskProject: null,
        errorTask: false,
        selectedTask: null
    }

    // Create dispatch and state
    const [state, dispatch ] = useReducer(TaskReducer, initialState);



    // Get tasks per project
    const getTasks = projectId => {
        dispatch({
            type: TASKS_PROJECT,
            payload: projectId
        })
    }

    // Add task to the selected project
    const addTask = task => {
        task.id = uuid.v4();
        dispatch({
            type: ADD_TASK,
            payload: task
        })
    }
    // Validate and show error if necesary
    const validateTask = () => {
        dispatch({
            type: VALIDATE_TASK
        })
    }
    // Delete task per id
    const deleteTask = id => {
        dispatch({
            type: DELETE_TASK,
            payload: id
        })
    }

    // Change the state of a task
    const changeStateTask = task => {
        dispatch({
            type: TASK_STATE,
            payload: task
        })
    }

    // Detect the actual task
    const selectActualTask = task => {
        dispatch({
            type: ACTUAL_TASK,
            payload: task
        })
    }

    // Edit the actual task
    const editTask = task => {
        dispatch({
            type: EDIT_TASK,
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
                tasks: state.tasks,
                taskProject: state.taskProject,
                errorTask: state.errorTask,
                selectedTask: state.selectedTask,
                getTasks,
                addTask,
                validateTask,
                deleteTask,
                changeStateTask,
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