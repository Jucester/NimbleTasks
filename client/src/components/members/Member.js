import React from 'react';

const Member = ({member}) => {
    return (  

        <div class="members-list">
            <p> {member.name} </p>
            <p> {member.role} </p>
        </div>
    );
}
 
export default Member;