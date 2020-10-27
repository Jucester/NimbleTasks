import React, { useReducer } from 'react';
import uuid from 'uuid';

import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT
} from '../../types/index';


const ProjectState = props => {

    const projects = [
        {id: 1, nombre: 'MERN Project'},
        {id: 2, nombre: 'Design Website'},
        {id: 3, nombre: 'Testing'},
        {id: 4, nombre: 'Make a e-commerce'}
    ]

    
    const initialState = {
        projects: [],
        form: false,
        errorForm : false,
        project: null
    }

    // Dispatch to execute actions
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Functions to CRUD

    const showForm = () => {
        dispatch({
            type: FORM_PROJECT
        })
    }

    // Get the ProjectState
    const getProjects = () => {
        dispatch({
            type: GET_PROJECTS,
            payload: projects
        })
    }

    // Add new project
    const addProject = (project) => {
        project.id = uuid.v4();

        // Insert project in the state

        dispatch({
            type: ADD_PROJECT,
            payload: project
        })
    }

    // Select project
    const selectProject = (projectId) => {

        dispatch({
            type: ACTUAL_PROJECT,
            payload: projectId
        })
    }

    // Validate form
    const showError = () => {
        dispatch({
            type: VALIDATE_FORM
        })
    }

    // Delete the project

    const deleteProject = (projectId) => {
        dispatch({
            type: DELETE_PROJECT,
            payload: projectId
        })
    }

    return (
        <projectContext.Provider 
            value = {{
                form: state.form,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                showForm,
                getProjects,
                addProject,
                showError,
                selectProject,
                deleteProject
            }}
        >
            { props.children }
        </projectContext.Provider>
    )

}

export default ProjectState;