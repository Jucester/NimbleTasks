import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {

    // Define "user" State
    const [ user, saveUser ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    // Save the user input
    const onChange = e => {
        e.preventDefault();

        saveUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    // Sing in when user clicks the button
    const onSubmit = e => {
        e.preventDefault();

        // Validate if theres empty fields

    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-darl">
                <h1> Iniciar sesión </h1>
                <form
                    onSubmit={onSubmit}
                >

                    <div className="campo-form">
                        <label htmlFor="email"> Email </label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Email..."
                            value={email}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password"> Password </label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Password..."
                            value={password}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>

                </form>

                <Link to={'/singup'} className="enlace-cuenta" > 
                    Obtener Cuenta
                </Link>
            </div>
        </div>
    );
}
 
export default Login;