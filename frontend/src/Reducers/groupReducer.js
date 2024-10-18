import {
    ALL_GROUPS_REQUEST,
    ALL_GROUPS_SUCCESS,
    ALL_GROUPS_FAIL,
    GROUPS_DETAILS_REQUEST,
    GROUPS_DETAILS_SUCCESS,
    GROUPS_DETAILS_FAIL,
    ADMIN_GROUPS_REQUEST,
    ADMIN_GROUPS_SUCCESS,
    ADMIN_GROUPS_FAIL,
    NEW_GROUPS_REQUEST,
    NEW_GROUPS_SUCCESS,
    NEW_GROUPS_RESET,
    NEW_GROUPS_FAIL,
    DELETE_GROUPS_REQUEST,
    DELETE_GROUPS_SUCCESS,
    DELETE_GROUPS_RESET,
    DELETE_GROUPS_FAIL,
    UPDATE_GROUPS_REQUEST,
    UPDATE_GROUPS_SUCCESS,
    UPDATE_GROUPS_RESET,
    UPDATE_GROUPS_FAIL,
    CLEAR_ERRORS,

} from '../constants/groupConstants';

export const groupsReducer = (state = { groups: [] }, action) => {
    switch (action.type) {
        case ALL_GROUPS_REQUEST:
        case ADMIN_GROUPS_REQUEST:
            return {
                ...state,
                loading: true,
                groups: []
            }
        case ALL_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: action.payload.groups,
            }
        case ADMIN_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: action.payload.groups,
            }
        case ALL_GROUPS_FAIL:
        case ADMIN_GROUPS_FAIL:
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

export const groupsDetailsReducer = (state = { groups: {} }, action) => {
    switch (action.type) {

        case GROUPS_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GROUPS_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                groups: action.payload
            }

        case GROUPS_DETAILS_FAIL:
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

export const newGroupsReducer = (state = { groups: {} }, action) => {
    switch (action.type) {
        case NEW_GROUPS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case NEW_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload.success,
                groups: action.payload.groups
            }
        case NEW_GROUPS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case NEW_GROUPS_RESET:
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

export const groupReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_GROUPS_REQUEST:
        case UPDATE_GROUPS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DELETE_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }
        case UPDATE_GROUPS_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_GROUPS_FAIL:
        case UPDATE_GROUPS_FAIL:
            return {
                ...state,
                error: action.payload
            }
        case DELETE_GROUPS_RESET:
            return {
                ...state,
                isDeleted: false
            }
        case UPDATE_GROUPS_RESET:
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
