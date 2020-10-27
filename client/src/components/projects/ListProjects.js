import React, { useContext, useEffect } from 'react';
import Project from './Project';
import ProjectContext from '../../context/projects/projectContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListProjects = () => {

    // Extract projects from state initial
    const projectContext = useContext(ProjectContext);
    const { projects, getProjects } = projectContext;

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line
    }, [])

    // Check if projects have any data
    if ( projects.length === 0 ) return <p> There is no projects. Create one to start. </p>;


    return (  
        <ul className="listado-proyectos">
            <TransitionGroup>
                {projects.map( project => (
                    <CSSTransition
                         key={project.id}
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