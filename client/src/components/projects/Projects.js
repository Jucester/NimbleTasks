import React, { useContext, useEffect } from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
import AuthContext from '../../context/authentication/authContext';
//import ListMembers from '../members/ListMembers';


const Projects = () => {
    // Extract Authentication Info
    const authContext = useContext(AuthContext);
    const { authenticatedUser } = authContext;
    
    useEffect( () => {
        authenticatedUser();
    }, [])

    return ( 
        <div className="contenedor-app">
            <Sidebar />


            <div className="seccion-principal">
                <Header />
                <main>

                    <FormTask />

                
                    <div className="contenedor-tareas">

                       
                        <ListTasks />
                       
                    </div>

                </main>
            </div>

        </div>
    );
}
 
export default Projects;