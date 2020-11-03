import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/projectContext';
import AlertContext from '../../context/alerts/alertContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {

    // Extract projects from state initial
    const projectContext = useContext(ProjectContext);
    const { message, projects, getProjects } = projectContext;

    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    useEffect(() => {
        // If there is an error
        if(message) {
            showAlert(message.msg, message.category);
        }
        // get all projects
        getProjects();
        // eslint-disable-next-line
    }, [message])

    // Check if projects have any data
    if ( projects.length === 0 ) return <p> There is no projects. Create one to start. </p>;


    return (  



        <ul className="listado-proyectos">
            { alert ? (
                <div className={`alerta ${alert.category}`}> {alert.msg} </div> 
            ): null }

            <TransitionGroup>
                {projects.map( project => (
                    <CSSTransition
                         key={project._id}
                         timeout={1500}
                         classNames="proyecto"
                    >
                        <Project project={project} />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>
    );
}
 
export default ListProjects;