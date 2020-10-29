import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import clienteAxios from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

import { SUCESSFUL_REGISTER, ERROR_REGISTER, GET_USER, SUCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT } from '../../types/index';



const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticated: null,
        user: null,
        message: null,
        loading: true
    }

    const [state, dispatch ] = useReducer(authReducer, initialState);

    // Functions
    const registerUser = async (datos) => {
        try {
            const res = await clienteAxios.post('/api/users', datos);
            console.log(res.data);

            dispatch({
                type: SUCESSFUL_REGISTER,
                payload: res.data
            })
            
            authenticatedUser();

        } catch(error) {
            console.error(error.response.data);

            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_REGISTER,
                payload: alert
            })
        }
    }

    // Return the authenticated user
    const authenticatedUser = async () => {
        // get the token
        const token = localStorage.getItem('token');
        
        // set the token in headers
        if(token) {
            tokenAuth(token);
        }
    
        try {
            const res = await clienteAxios.get('/api/login');
            console.log(res);

            dispatch({
                type: GET_USER,
                payload: res.data.user
            })
            
        } catch (error) {
            console.error(error.response)
            dispatch({
                type: ERROR_LOGIN
            })
        }
    }

    // When user logs in
    const singIn = async (datos) => {
        try {
            const res = await clienteAxios.post('/api/login', datos);
            console.log(res.data);

            dispatch({
                type: SUCESSFUL_LOGIN,
                payload: res.data
            })

            authenticatedUser();
        } catch (error) {
            console.error(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: ERROR_LOGIN,
                payload: alert
            })
        }
    }

    // To log out user
    const logOut = async () => {
        dispatch({
            type: LOG_OUT
        })
    }


    return (
        <authContext.Provider
            value={{
                token: state.token,
                authenticated: state.authenticated,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                authenticatedUser,
                singIn,
                logOut
            }}
        >

            { props.children }
        </authContext.Provider>
    )
}

export default AuthState;