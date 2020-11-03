import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authentication/authContext';

const Header = () => {

    // Extract Authentication Info
    const authContext = useContext(AuthContext);
    const { user, authenticatedUser, logOut } = authContext;

    useEffect( () => {
        authenticatedUser();
         // eslint-disable-next-line
    }, [])


    return ( 
        <header className="app-header">
            { user ?  <p className="nombre-usuario"> Hi, <span> {user.name} </span></p> : null }
           

            <nav className="nav-principal">
                <a href="#!">Notifications </a>
                <button 
                    className="btn btnl-blank cerrar-sesion"
                    onClick={() => logOut() }
                >
                    Log Out
                </button>
            </nav>
        </header>

    );
}
 
export default Header;