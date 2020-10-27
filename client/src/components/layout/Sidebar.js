import React from 'react';
import NewProject from '../projects/NewProject';
import ListProjects from '../projects/ListProjects';

const Sidebar = () => {
    return ( 
        <aside>
            <h1> Nimble <span>Tasks</span></h1>
            
            <NewProject />

            <div className="proyectos">
                <h1> Your Projects </h1>

                <ListProjects />
                
            </div>


        </aside>
    );
}
 
export default Sidebar;