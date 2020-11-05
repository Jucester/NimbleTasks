import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import image from './undraw_project_team_lc5a.svg';
import Nav from '../nav/Nav';

const Home = () => {
    return ( 
        <Fragment>
            <Nav />
            <div className="hero">
                <div className="contenido-header">
                    <section className="textos">
                        <h1> The Easy Project Management Tool </h1>
                        <p> Manage projects, create tasks, comunicate with your teammates, track time, and work faster. </p>
                        <div className="links">
                            <Link to={'/login'} className="link"> Login </Link>
                            <Link to={'/singup'} className="link"> Sing Up </Link>
                        </div>
                    </section>

                    <img src={image} alt="Team Illustration" />

                </div>
           </div>
        </Fragment>
    );
}
 
export default Home;