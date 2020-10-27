import React from 'react';

const Header = () => {
    return ( 
        <header className="app-header">
            <p className="nombre-usuario"> Hi, <span> Jucester </span></p>

            <nav className="nav-principal">
                <a href="#!">Notifications </a>
                <a href="#!">Logout </a>
            </nav>
        </header>

    );
}
 
export default Header;