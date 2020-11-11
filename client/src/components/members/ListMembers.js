import React from 'react';
import Member from './Member';

const ListMembers = () => {
    
    const members = [
        { name: 'Miguel', role: 'Project Manager'},
        { name: 'Juan', role: 'Developer'},
        { name: 'David', role: 'Guest'},
    ]
    
    return (  
        <div class="campo-project">
                <h2> Project Members </h2>
                <ul>
                    {members.length === 0 
                        ? <li className="tarea"> <p> No hay tareas </p></li>
                        : members.map(member=> (
                            <Member member={member} />
                        ))
                    }
                </ul>

        </div>

        
    );
}
 
export default ListMembers;