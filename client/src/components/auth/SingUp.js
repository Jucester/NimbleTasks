import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SingUp = () => {
    
    // Define "user" State
    const [ user, saveUser ] = useState({
        nombre:'',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = user;

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
                <h1> Obtener una cuenta </h1>
                <form
                    onSubmit={onSubmit}
                >
                    
                    <div className="campo-form">
                        <label htmlFor="nombre"> Nombre </label>
                        <input 
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Nombre..."
                            value={nombre}
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
                        <label htmlFor="confirmar"> Confirmar password </label>
                        <input 
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirma la password..."
                            value={confirmar}
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