import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
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
    CHANGE_ROLE_FAIL,
    CHANGE_ROLE_REQUEST,
    CHANGE_ROLE_SUCCESS,
    CHANGE_ROLE_RESET,
    USER_DEPARTMENT_FAIL,
    USER_DEPARTMENT_REQUEST,
    USER_DEPARTMENT_SUCCESS,
    USER_COURSE_REQUEST,
    USER_COURSE_SUCCESS,
    USER_COURSE_FAIL,
    ADD_COURSE_REQUEST,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAIL,
    GET_MODULES_REQUEST,
    GET_MODULES_SUCCESS,
    GET_MODULES_FAIL,
    VERIFY_LOGIN_FAIL,
    VERIFY_LOGIN_REQUEST,
    VERIFY_LOGIN_SUCCESS,
    ADD_TO_WATCH_HISTORY_REQUEST,
    ADD_TO_WATCH_HISTORY_SUCCESS,
    ADD_TO_WATCH_HISTORY_FAIL,
    GET_WATCH_HISTORY_REQUEST,
    GET_WATCH_HISTORY_SUCCESS,
    GET_WATCH_HISTORY_FAIL,
    UPDATE_EXAM_TAKEN_REQUEST,
    UPDATE_EXAM_TAKEN_SUCCESS,
    UPDATE_EXAM_TAKEN_FAIL,
    
    CLEAR_ERRORS
} from '../constants/authConstants'

import axios from 'axios'
import { authenticate, getToken, logout } from '../utils/helper'
import { toast } from 'react-toastify'
import { groupReducer } from '../Reducers/groupReducer'


export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_USER_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        console.log(userData.get('name'));
        console.log(userData.get('email'));
        console.log(userData.get('password'));
        console.log(userData.get('groupId'));
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, {
            name: userData.get('name'),
            email: userData.get('email'),
            password: userData.get('password'),
            groupId: userData.get('groupId'),
        }, config)
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })
        toast.success('Registered successfully')


    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message)
    }
}


export const login = (email, password, next) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },

        }

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password }, config)
        console.log(data)


        if (data.hasOwnProperty('isVerified') && !data.isVerified) {
            dispatch({
                type: VERIFY_LOGIN_FAIL,
                payload: data
            })
            toast.success(data.message, {
                position: toast.POSITION.BOTTOM_RIGHT

            })

            next('/login/?redirect=email-activation')
        }

        else {
            toast.success('Logged in', {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            dispatch({
                type: LOGIN_SUCCESS,
                payload: data.user
            })
            authenticate(data, () => { })

        }
    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
}

export const logoutUser = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },

        }

        await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`, config)
        logout(dispatch({ type: LOGOUT_SUCCESS }))



    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.message
        })
    }

}
export const getUser = () => {
    return (dispatch) => {
        if (typeof window !== 'undefined') {
            if (sessionStorage.getItem('user')) {
                dispatch({ type: 'GET_USER_SUCCESS', payload: JSON.parse(sessionStorage.getItem('user')) });
            } else {
                return false;
            }
        }
    }
}
export const getProfile = () => async (dispatch) => {
    const config = {
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`,

        },

    }
    dispatch({ type: LOAD_USER_REQUEST })
    try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`, config)
        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/password/forgot`, formData, config)


        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })
        toast.success(data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });

    } catch (error) {

        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.error
        })
        toast.error(error.response.data.error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export const resetPassword = (token, passwords) => async (dispatch) => {
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        dispatch({ type: NEW_PASSWORD_REQUEST })
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/reset/${token}`, passwords, config)
        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })
        toast.success('Password Updated', {
            position: toast.POSITION.BOTTOM_RIGHT
        });


    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.message
        })
        toast.error(error, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export const updateProfile = (userData) => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${getToken()}`
            },

        }
        dispatch({ type: UPDATE_PROFILE_REQUEST })
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/update`, userData, config)
        console.log(data)
        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })
        toast.success('Profile Updated', {
            position: toast.POSITION.BOTTOM_RIGHT
        })
        sessionStorage.setItem('user', JSON.stringify(data.user))


    } catch (error) {
        console.log(error)
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        })
    }
}

export const updatePassword = (formData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PASSWORD_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`

            }
        }

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/password/update`, formData, config)
        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })
        toast.success('Password Updated', {
            position: toast.POSITION.BOTTOM_RIGHT
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message
        })
        toast.error(error.response.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }
}

export const allUsers = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({ type: ALL_USERS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/users/all`, config)
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteUser = (id) => async (dispatch) => {

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({ type: DELETE_USER_REQUEST })
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`, config)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getAdminUsers = (currentPage = 1, keyword = '', price, category = '') => async (dispatch) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({
            type: ALL_USERS_REQUEST
        })
        let link = ''

        link = `${process.env.REACT_APP_API}/api/v1/admin/users/all/?page=${currentPage}&keyword=${keyword}`


        const { data } = await axios.get(link, config)

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}

export const updateRole = (id) => async (dispatch) => {
    try {
        dispatch({ type: CHANGE_ROLE_REQUEST })
        const config = {
            headers: {

                'Authorization': `Bearer ${getToken()}`
            },

        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}/role`, null, config)
        dispatch({
            type: CHANGE_ROLE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: CHANGE_ROLE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserPerDepartment = () => async (dispatch) => {
    try {
        dispatch({ type: USER_DEPARTMENT_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/departments/user`, config)
        dispatch({
            type: USER_DEPARTMENT_SUCCESS,
            payload: data.usersPerDepartment
        })

    } catch (error) {
        dispatch({
            type: USER_DEPARTMENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserPerCourse = () => async (dispatch) => {
    try {
        dispatch({ type: USER_COURSE_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/courses/user`, config)
        dispatch({
            type: USER_COURSE_SUCCESS,
            payload: data.usersPerCourse
        })

    } catch (error) {
        dispatch({
            type: USER_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addUserCourse = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADD_COURSE_REQUEST })
        const config = {
            headers: {

                'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/modules/add/${id}`, null, config)
        dispatch({
            type: ADD_COURSE_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: ADD_COURSE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getUserCourse = () => async (dispatch) => {
    try {
        dispatch({ type: GET_MODULES_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        }

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me/modules/downloaded`, config)
        dispatch({
            type: GET_MODULES_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: GET_MODULES_FAIL,
            payload: error.response.data.message
        })
    }
}

export const addToWatchHistory = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ADD_TO_WATCH_HISTORY_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        };

        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/watchHistory/${id}`, {}, config);

        dispatch({
            type: ADD_TO_WATCH_HISTORY_SUCCESS,
            payload: data.success
        });
    } catch (error) {
        dispatch({
            type: ADD_TO_WATCH_HISTORY_FAIL,
            payload: error.response.data.message
        });
    }
}
export const getWatchHistory = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_WATCH_HISTORY_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
        };

        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me/watchHistory`, config);

        dispatch({
            type: GET_WATCH_HISTORY_SUCCESS,
            payload: data.watchHistory
        });
    } catch (error) {
        console.log(error.message)
        dispatch({
            type: GET_WATCH_HISTORY_FAIL,
            payload: error.response.data.message
        });
    }
};

export const updateExamTaken = (examTakenUpdate) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_EXAM_TAKEN_REQUEST,
        });

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
        };

        const { data } = await axios.put(
            `${process.env.REACT_APP_API}/api/v1/me/examTaken`,
            examTakenUpdate,
            config
        );

        dispatch({
            type: UPDATE_EXAM_TAKEN_SUCCESS,
            payload: data.examTaken,
        });
        toast.success('Exam taken successfully', { autoclose: 10000 })
    } catch (error) {
        dispatch({
            type: UPDATE_EXAM_TAKEN_FAIL,
            payload: error.response.data.error,
        });
    }
};