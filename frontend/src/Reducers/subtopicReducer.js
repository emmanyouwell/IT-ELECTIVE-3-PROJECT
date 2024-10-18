import {
    ALL_SUBTOPICS_REQUEST,
    ALL_SUBTOPICS_SUCCESS,
    ALL_SUBTOPICS_FAIL,
    SUBTOPICS_DETAILS_REQUEST,
    SUBTOPICS_DETAILS_SUCCESS,
    SUBTOPICS_DETAILS_FAIL,
    ADMIN_SUBTOPICS_REQUEST,
    ADMIN_SUBTOPICS_SUCCESS,
    ADMIN_SUBTOPICS_FAIL,
    NEW_SUBTOPICS_REQUEST,
    NEW_SUBTOPICS_SUCCESS,
    NEW_SUBTOPICS_RESET,
    NEW_SUBTOPICS_FAIL,
    DELETE_SUBTOPICS_REQUEST,
    DELETE_SUBTOPICS_SUCCESS,
    DELETE_SUBTOPICS_RESET,
    DELETE_SUBTOPICS_FAIL,
    UPDATE_SUBTOPICS_REQUEST,
    UPDATE_SUBTOPICS_SUCCESS,
    UPDATE_SUBTOPICS_RESET,
    UPDATE_SUBTOPICS_FAIL,
    CLEAR_ERRORS,

} from '../constants/subtopicConstants';

export const subtopicsReducer = (state = { subtopics: [] }, action) => {
    switch (action.type) {
        case ALL_SUBTOPICS_REQUEST:
        case ADMIN_SUBTOPICS_REQUEST:
            return {
                ...state,
                loading: true,
                subtopics: []
            }
        case ALL_SUBTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                subtopics: action.payload.subtopics,
            }
        case ADMIN_SUBTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                subtopics: action.payload.subtopics,
            }
        case ALL_SUBTOPICS_FAIL:
        case ADMIN_SUBTOPICS_FAIL:
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

export const subtopicsDetailsReducer = (state = { subtopics: {} }, action) => {
    switch (action.type) {

        case SUBTOPICS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SUBTOPICS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                subtopics: action.payload
            }

        case SUBTOPICS_DETAILS_FAIL:
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

export const newSubtopicsReducer = (state = { subtopics: {} }, action) => {
    switch (action.type) {
        case NEW_SUBTOPICS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_SUBTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                subtopics: action.payload.newSubtopic
            }
        case NEW_SUBTOPICS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_SUBTOPICS_RESET:
            return {
                ...state,
                success: false
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

export const subtopicReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUBTOPICS_REQUEST:
        case UPDATE_SUBTOPICS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_SUBTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_SUBTOPICS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_SUBTOPICS_FAIL:
        case UPDATE_SUBTOPICS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_SUBTOPICS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_SUBTOPICS_RESET:
            return {
                ...state,
                isUpdated: false
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
