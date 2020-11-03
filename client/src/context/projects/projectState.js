import React, { useReducer } from 'react';
import projectContext from './projectContext';
import projectReducer from './projectReducer';
import { 
    FORM_PROJECT, 
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATE_FORM,
    ACTUAL_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types/index';
import clienteAxios from '../../config/axios';

const ProjectState = props => {

    const initialState = {
        projects: [],
        form: false,
        errorForm : false,
        project: null,
        message: null
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
    const getProjects = async () => {
        try {

            const res = await clienteAxios.get('/api/projects')
            console.log(res.data.projects);
            dispatch({
                type: GET_PROJECTS,
                payload: res.data.projects
            })
          
            
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Add new project
    const addProject = async (project) => {
        try {
            const res = await clienteAxios.post('/api/projects', project);
            console.log(res);

            // Insert project in state
            dispatch({
                type: ADD_PROJECT,
                payload: res.data
            })

        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
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

    const deleteProject = async (projectId) => {
        
        try {
            await clienteAxios.delete(`/api/projects/${projectId}`);

            dispatch({
                type: DELETE_PROJECT,
                payload: projectId
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    return (
        <projectContext.Provider 
            value = {{
                form: state.form,
                projects: state.projects,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
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