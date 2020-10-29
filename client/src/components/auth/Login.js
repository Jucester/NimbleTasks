import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const Login = (props) => {

    // Extract alert context values
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Extract sing up context values
    const authContext = useContext(AuthContext);
    const { message, authenticated, singIn } = authContext;


    // In case that user doesnt exists or password is incorrect
    useEffect( () => {
        
        if(authenticated) {
            props.history.push('/projects');
        }

        if(message) {
            showAlert(message.msg, message.category)
        }

    }, [message, authenticated, props.history]);

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
        if(email.trim() === '' || password.trim() === '') {
            showAlert('All the fields are required.', 'alerta-error');
            return;
        }

        // Pass the data to the login (sing in) function in authstate
        singIn({
            email,
            password
        })

    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-darl">
                <h1> Iniciar sesión </h1>
                <form
                    onSubmit={onSubmit}
                >   
                     { alert ? (
                        <div className={`alerta ${alert.categoria}`} > 
                            {alert.msg}
                        </div>
                    ) : null }

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