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

import axios from 'axios'
// import { authenticate, getToken, logout } from '../utils/helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const createGroups = (groupData) => async (dispatch) => {
    
    try {
        dispatch({type: NEW_GROUPS_REQUEST})
        const config = {
            headers: {
                
                // 'Authorization': `Bearer ${getToken()}`
            }
        }

        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/group/new`, groupData, config)
        dispatch({
            type: NEW_GROUPS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_GROUPS_FAIL,
            payload: error.response.data.message
        })

    }
}

export const getGroups = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                // 'Content-Type': 'application/json', 
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({
            type: ALL_GROUPS_REQUEST
        })
        
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/groups`, config)

        dispatch({
            type: ALL_GROUPS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_GROUPS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getGroupDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: GROUPS_DETAILS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/group/${id}`)
        dispatch({
            type: GROUPS_DETAILS_SUCCESS,
            payload: data.group
        })
    }catch(error){
        dispatch({
            type: GROUPS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateGroup = (id, groupData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_GROUPS_REQUEST })
        const config = {
            headers: {
                // 'Authorization': `Bearer ${getToken()}`
            }
            
        }
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/group/${id}`, groupData, config)
        dispatch({
            type: UPDATE_GROUPS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: UPDATE_GROUPS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteGroup = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_GROUPS_REQUEST})
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/group/${id}`, config)
        dispatch({type: DELETE_GROUPS_SUCCESS, payload: data.success})
       
    } catch (error) {
        dispatch({
            type: DELETE_GROUPS_FAIL,
            payload: error.response.data.message 
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
