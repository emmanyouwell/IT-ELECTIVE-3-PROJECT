import {
    ALL_QUIZ_REQUEST,
    ALL_QUIZ_SUCCESS,
    ALL_QUIZ_FAIL,
    QUIZ_DETAILS_REQUEST,
    QUIZ_DETAILS_SUCCESS,
    QUIZ_DETAILS_FAIL,
    ADMIN_QUIZ_REQUEST,
    ADMIN_QUIZ_SUCCESS,
    ADMIN_QUIZ_FAIL,
    NEW_QUIZ_REQUEST,
    NEW_QUIZ_SUCCESS,
    NEW_QUIZ_RESET,
    NEW_QUIZ_FAIL,
    DELETE_QUIZ_REQUEST,
    DELETE_QUIZ_SUCCESS,
    DELETE_QUIZ_RESET,
    DELETE_QUIZ_FAIL,
    UPDATE_QUIZ_REQUEST,
    UPDATE_QUIZ_SUCCESS,
    UPDATE_QUIZ_RESET,
    UPDATE_QUIZ_FAIL,
    SHOW_QUIZ_FORM,
    HIDE_QUIZ_FORM,
    SHOW_QUIZ_EDIT,
    HIDE_QUIZ_EDIT,
    CLEAR_ERRORS,

} from '../constants/quizConstants';

export const showQuizReducer = (state = {isVisible: false}, action) => {
    switch (action.type) {
        case SHOW_QUIZ_FORM:
            return {
                ...state,
                isVisible: true
            }
        case HIDE_QUIZ_FORM:
            return {
                ...state,
                isVisible: false
            }
        default:
            return state;
    }
}

export const showEditQuizReducer = (state = {isVisible: false}, action) => {
    switch (action.type) {
        case SHOW_QUIZ_EDIT:
            return {
                ...state,
                isVisible: true
            }
        case HIDE_QUIZ_EDIT:
            return {
                ...state,
                isVisible: false
            }
        default:
            return state;
    }
}
export const quizzesReducer = (state = { quizzes: [] }, action) => {
    switch (action.type) {
        case ALL_QUIZ_REQUEST:
        case ADMIN_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                quizzes: []
            }
        case ALL_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quizzes: action.payload.quiz,
            }
        case ADMIN_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quizzes: action.payload.quiz,
            }
        case ALL_QUIZ_FAIL:
        case ADMIN_QUIZ_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const quizDetailsReducer = (state = { quiz: {} }, action) => {
    switch (action.type) {

        case QUIZ_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
                
            }

        case QUIZ_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.payload
            }

        case QUIZ_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const newQuizReducer = (state = { quiz: {} }, action) => {
    switch (action.type) {
        case NEW_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                
            }
        case NEW_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                
                success: action.payload.success,
                quiz: action.payload.quiz
            }
        case NEW_QUIZ_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_QUIZ_RESET:
            return {
                ...state,
                success: false,
                
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}

export const quizReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_QUIZ_REQUEST:
            return{
                ...state,
                loading:true
            }
        case UPDATE_QUIZ_REQUEST:
            return {
                ...state,
                loading: true,
                isVisible: true,
            }
        case DELETE_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_QUIZ_FAIL:
        case UPDATE_QUIZ_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_QUIZ_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_QUIZ_RESET:
            return {
                ...state,
                isUpdated: false,
                isVisible: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }

}
