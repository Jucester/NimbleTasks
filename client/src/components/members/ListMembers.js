import React, { Fragment } from 'react';
import Member from './Member';

const ListMembers = () => {
    
    const members = [
        { nombre: 'Miguel', role: 'Project Manager'},
        { nombre: 'Juan', role: 'Developer'},
        { nombre: 'David', role: 'Guest'},
    ]
    
    return (  
        <Fragment>
                <h2> Project Members </h2>
                <ul>
                    {members.length === 0 
                        ? <li className="tarea"> <p> No hay tareas </p></li>
                        : members.map(member=> (
                            <Member member={member} />
                        ))
                    }
                </ul>

        </Fragment>

        
    );
}
 
export default ListMembers;