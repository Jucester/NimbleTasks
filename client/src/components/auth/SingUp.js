import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/authentication/authContext';

const SingUp = (props) => {

    // Extract alert context values
    const alertContext = useContext(AlertContext);
    const { alert, showAlert } = alertContext;

    // Extract sing up context values
    const authContext = useContext(AuthContext);
    const { message, authenticated, registerUser } = authContext;
    
    // Define "user" State
    const [ user, saveUser ] = useState({
        name:'',
        email: '',
        password: '',
        confirm: ''
    });

    // In case that an user if auntehticating or registered or trying to register with duplicated user
    useEffect( () => {
        if(authenticated) {
            props.history.push('/projects');
        }

        if(message) {
            showAlert(message.msg, message.category)
        }
        // eslint-disable-next-line
    }, [message, authenticated, props.history]);

    const { name, email, password, confirm } = user;

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
        if(name.trim() === '' ||
            email.trim() === '' || 
            password.trim() === '' || 
            confirm.trim() === '') {
            showAlert('All the fields are required.', 'alerta-error');
            return;
        }

        // Validate password
        if(password.length < 5) {
            showAlert('Password must have at least six characters', 'alerta-error');
            return;
        }
 
        // Check if the confirm password is the same
        if(password !== confirm) {
            showAlert('Password confirmation it\'s not the same', 'alerta-error');
            return;
        }

        // Pass the action
        registerUser({
            name,
            email,
            password
        })

    }

    return (
        <div className="form-usuario">
            <div className="contenedor-form sombra-darl">
                <h1> Register account: </h1>
                <form
                    onSubmit={onSubmit}
                >
                    { alert ? (
                        <div className={`alerta ${alert.categoria}`} > 
                            {alert.msg}
                        </div>
                    ) : null }
                    <div className="campo-form">
                        <label htmlFor="name"> Name: </label>
                        <input 
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Name..."
                            value={name}
                            onChange={onChange}
                        />
                    </div>

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
                        <label htmlFor="confirm"> Confirm password </label>
                        <input 
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Confirma la password..."
                            value={confirm}
                            onChange={onChange}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>

                </form>

                <Link to={'/login'} className="enlace-cuenta" > 
                    Iniciar sesión
                </Link>
            </div>
        </div>
    );
}
 
export default SingUp;