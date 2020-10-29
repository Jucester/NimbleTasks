import React, { useReducer } from 'react';

import alertContext from './alertContext';
import alertReducer from './alertReducer';

import { SHOW_ALERT, HIDE_ALERT } from '../../types/index';


const AlertState = props => {

    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(alertReducer, initialState);

    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        // Clean the alert automatically after 5 secs
        setTimeout(() => {
            dispatch({
                type: HIDE_ALERT
            })
        }, 5000);
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            { props.children }
        </alertContext.Provider>
    )
}

export default AlertState;