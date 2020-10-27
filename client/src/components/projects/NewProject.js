import React, { Fragment, useContext, useState } from 'react';
import ProjectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Obtain form state
    const projectContext = useContext(ProjectContext);
    const { form, errorForm, showForm, addProject, showError } = projectContext;

    // Project State
    const [ project, saveProject ] = useState({
        nombre: ''
    });

    const { nombre } = project;

    // Read the input content
    const onChangeProject = e => {
        saveProject({
            ...project,
            [e.target.name] : e.target.value
        })
    }

    // When user submit a project
    const onSubmitProject = e => {
        e.preventDefault();

        // Validate the inputs
        if (nombre.trim() === '') {
            showError();
            return;
        }

        // Add to the state
        addProject(project);

        // Reset the form
        saveProject({
            nombre: ''
        })


    }

    const onClickForm = () => {
        showForm();
    }

    return (  
        <Fragment>

            <button 
                type="button"
                className="btn btn-primario btn-block"
                onClick = { onClickForm }
            > New Project </button>

            { 
                 form  ? 
                 (
                    <form 
                        className="formulario-nuevo-proyecto"
                        onSubmit={onSubmitProject}
                    >
        
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre del proyecto"
                            name="nombre"
                            value={nombre}
                            onChange={onChangeProject}
                        />
        
        
                        <input 
                            type="submit" 
                            className="btn btn-primario btn-block"
                            value="Agregar proyecto"
        
                        />
                    </form>
                 ) 
                 : null
            }

            { errorForm ? <p className="mensaje error"> El nombre del proyecto es obligatorio </p> : null }
        </Fragment>    

    );
}
 
export default NewProject;