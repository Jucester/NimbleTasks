import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    ACTUAL_TASK,
    EDIT_TASK,
    CLEAN_TASK
} from '../../types/index';

export default(state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                taskProject: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                taskProject: [action.payload, ...state.taskProject],
                errorTask: false
            }
        case VALIDATE_TASK:
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                taskProject: state.taskProject.filter( task => task._id !== action.payload )
            }
        case EDIT_TASK:
            return {
                ...state,
                taskProject: state.taskProject.map(task => task._id === action.payload._id ? action.payload : task )
            }
        case ACTUAL_TASK:
            return {
                ...state,
                selectedTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectedTask: null
            }

        default:
            return state
    }

}