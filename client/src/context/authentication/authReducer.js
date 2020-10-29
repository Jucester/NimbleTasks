import { SUCESSFUL_REGISTER, ERROR_REGISTER, GET_USER, SUCESSFUL_LOGIN, ERROR_LOGIN, LOG_OUT } from '../../types/index';

export default (state, action) => {
    switch(action.type) {
        case SUCESSFUL_REGISTER:
        case SUCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload.token);
            return{
                ...state,
                authenticated: true,
                message: null,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticated: true,
                user: action.payload,
                loading: false
            
            }
        case LOG_OUT:
        case ERROR_REGISTER:
        case ERROR_LOGIN:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                user: null,
                authenticated: null,
                message: action.payload,
                loading: false
            }
      

        default:
            return state
    }
}