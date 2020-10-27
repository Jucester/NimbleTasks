import React from 'react';
import Sidebar from '../layout/Sidebar';
import Header from '../layout/Header';
import FormTask from '../tasks/FormTask';
import ListTasks from '../tasks/ListTasks';
//import ListMembers from '../members/ListMembers';


const Projects = () => {
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