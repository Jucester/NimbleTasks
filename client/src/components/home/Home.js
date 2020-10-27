import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//import image from './undraw_project_team_lc5a.svg';
import './Home.css';

const Home = () => {
    return ( 
        <Fragment>
           <div className="hero">
                <div className="texts">
                    <h1> Agile Tasks </h1>
                    <p> Manage projects and create tasks faster and easy </p>
                </div>

                <div className="links">
                    <Link to={'/login'} className="btn btn-primario link"> Login </Link>
                    <Link to={'/singup'} className="btn btn-primario link"> Sing Up </Link>
                </div>
           </div>
        </Fragment>
    );
}
 
export default Home;