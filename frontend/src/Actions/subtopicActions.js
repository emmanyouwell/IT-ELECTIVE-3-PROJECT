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
    SHOW_FORM,
    HIDE_FORM,
    CLEAR_ERRORS,

} from '../constants/subtopicConstants';

import axios from 'axios'
// import { authenticate, getToken, logout } from '../utils/helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const createSubtopics = (subtopicData, groupId) => async (dispatch) => {
    // console.log("dispatched")
    try {
        dispatch({type: NEW_SUBTOPICS_REQUEST})
        const config = {
            headers: {          
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/group/${groupId}/subtopic/new`, subtopicData, config)
        dispatch({
            type: NEW_SUBTOPICS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_SUBTOPICS_FAIL,
            payload: error.response.data.message
        })

    }
}

export const getSubtopics = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                // 'Content-Type': 'application/json', 
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({
            type: ALL_SUBTOPICS_REQUEST
        })
        
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/subtopics`, config)

        dispatch({
            type: ALL_SUBTOPICS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_SUBTOPICS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getSubtopicDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: SUBTOPICS_DETAILS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/subtopic/${id}`)
        dispatch({
            type: SUBTOPICS_DETAILS_SUCCESS,
            payload: data.subtopic
        })
    }catch(error){
        dispatch({
            type: SUBTOPICS_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateSubtopic = (id, subtopicData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SUBTOPICS_REQUEST })
        const config = {
            headers: {
                // 'Authorization': `Bearer ${getToken()}`
            }
            
        }
        console.log('subtopic data: ', subtopicData.getAll('images'))
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/subtopic/${id}`, subtopicData, config)
        dispatch({
            type: UPDATE_SUBTOPICS_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_SUBTOPICS_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteSubtopic = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_SUBTOPICS_REQUEST})
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/subtopic/${id}`, config)
        dispatch({type: DELETE_SUBTOPICS_SUCCESS, payload: data.success})
       
    } catch (error) {
        dispatch({
            type: DELETE_SUBTOPICS_FAIL,
            payload: error.response.data.message 
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
