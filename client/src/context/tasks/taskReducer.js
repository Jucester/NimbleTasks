import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATE_TASK,
    DELETE_TASK,
    TASK_STATE,
    ACTUAL_TASK,
    EDIT_TASK,
    CLEAN_TASK
} from '../../types/index';

export default(state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                taskProject: state.tasks.filter( task => task.projectId === action.payload )
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
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
                tasks: state.tasks.filter( task => task.id !== action.payload )
            }
        case EDIT_TASK:
        case TASK_STATE:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task )
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