import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return ( 
        <header>
            <div className="logo">
                <h1> Agile Tasks </h1>
            </div>
            <nav>
                <Link to={'/'} className="enlace-cuenta" > 
                    Home
                </Link>

                <Link to={'/'} className="enlace-cuenta" > 
                    About
                </Link>

                <Link to={'/'} className="enlace-cuenta" > 
                    Contact
                </Link>

            </nav>
        </header>
    );
}
 
export default Nav;