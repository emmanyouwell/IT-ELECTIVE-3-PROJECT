import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    GET_USER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_RESET,
    UPDATE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    CHANGE_ROLE_REQUEST,
    CHANGE_ROLE_SUCCESS,
    CHANGE_ROLE_RESET,
    CHANGE_ROLE_FAIL,
    USER_DEPARTMENT_FAIL,
    USER_DEPARTMENT_REQUEST,
    USER_DEPARTMENT_SUCCESS,
    USER_COURSE_REQUEST,
    USER_COURSE_SUCCESS,
    USER_COURSE_FAIL,
    ADD_COURSE_REQUEST,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAIL,
    ADD_COURSE_RESET,
    GET_MODULES_REQUEST,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAIL,
    CLEAR_ERRORS,
    VERIFY_LOGIN_FAIL,
    VERIFY_LOGIN_REQUEST,
    VERIFY_LOGIN_SUCCESS,
    ADD_TO_WATCH_HISTORY_REQUEST,
    ADD_TO_WATCH_HISTORY_SUCCESS,
    ADD_TO_WATCH_HISTORY_FAIL,
    ADD_TO_WATCH_HISTORY_RESET,
    GET_WATCH_HISTORY_FAIL,
    GET_WATCH_HISTORY_SUCCESS,
    GET_WATCH_HISTORY_REQUEST,
    UPDATE_EXAM_TAKEN_REQUEST,
    UPDATE_EXAM_TAKEN_SUCCESS,
    UPDATE_EXAM_TAKEN_RESET,
    UPDATE_EXAM_TAKEN_FAIL
} from '../constants/authConstants'

export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:

            return {
                ...state,
                loading: true,
                isRegistered: false
            }
        case VERIFY_LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
                isVerified: false
            }
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:

            return {
                ...state,
                loading: true,
                isAuthenticated: false,

            }


        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
        case VERIFY_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                isVerified: true,
                user: action.payload,
                
            }
        case REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isRegistered: true,
            }
        case GET_USER_SUCCESS:
            return {
                ...state,
                user: action.payload
            }
        case VERIFY_LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: action.payload.isAuthenticated,
                isVerified: action.payload.isVerified,
                error: action.payload.message
            }
        case REGISTER_USER_FAIL:
        case LOGIN_FAIL:
        case LOAD_USER_FAIL:

            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                
                user: null,
                error: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null
            }
        case LOGOUT_FAIL:
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

export const userReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
        case UPDATE_USER_REQUEST:
        case DELETE_USER_REQUEST:
        case CHANGE_ROLE_REQUEST:
        case ADD_TO_WATCH_HISTORY_REQUEST:
        case UPDATE_EXAM_TAKEN_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ADD_TO_WATCH_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                isAdded: action.payload
            }
        case UPDATE_PROFILE_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_USER_SUCCESS:
        case CHANGE_ROLE_SUCCESS:
        case UPDATE_EXAM_TAKEN_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,

            }
        case UPDATE_PROFILE_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_USER_RESET:
        case CHANGE_ROLE_RESET:
        case UPDATE_EXAM_TAKEN_RESET:
            return {
                ...state,
                isUpdated: false
            }
        case UPDATE_PROFILE_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_USER_FAIL:
        case DELETE_USER_FAIL:
        case CHANGE_ROLE_FAIL:
        case ADD_TO_WATCH_HISTORY_FAIL:
        case UPDATE_EXAM_TAKEN_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case ADD_TO_WATCH_HISTORY_RESET:
            return {
                ...state,
                isAdded: false
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

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }
        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
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

export const allUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case ALL_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload.users,
                usersCount: action.payload.usersCount,
                resPerPage: action.payload.resPerPage,
                filteredUsersCount: action.payload.filteredUsersCount
            }
        case ALL_USERS_FAIL:
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

export const userDetailsReducer = (state = { user: {}, watchHistory: [] }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
        case GET_WATCH_HISTORY_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case GET_WATCH_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                watchHistory: action.payload
            }
        case USER_DETAILS_SUCCESS:

            return {
                ...state,
                loading: false,
                user: action.payload

            }
        case USER_DETAILS_FAIL:
        case GET_WATCH_HISTORY_FAIL:
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

export const userDepartmentReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case USER_DEPARTMENT_REQUEST:

            return {
                ...state,
                loading: true,
            }
        case USER_DEPARTMENT_SUCCESS:

            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case USER_DEPARTMENT_FAIL:

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
export const userCourseReducer = (state = { users: [] }, action) => {
    switch (action.type) {

        case USER_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case USER_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }

        case USER_COURSE_FAIL:
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

export const addUserCourse = (state = {}, action) => {
    switch (action.type) {
        case ADD_COURSE_REQUEST:
        case GET_MODULES_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case ADD_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }
        case GET_MODULES_SUCCESS:
            return {
                ...state,
                loading: false,
                modules: action.payload
            }
        case ADD_COURSE_FAIL:
        case GET_MODULES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case ADD_COURSE_RESET:
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
            return state;
    }
}