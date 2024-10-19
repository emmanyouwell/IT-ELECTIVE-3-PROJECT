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
    CLEAR_ERRORS,

} from '../constants/quizConstants';

import axios from 'axios'
// import { authenticate, getToken, logout } from '../utils/helper'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const createQuiz = (quizData, groupId) => async (dispatch) => {
    // console.log("dispatched")
    try {
        dispatch({type: NEW_QUIZ_REQUEST})
        const config = {
            headers: {          
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/group/${groupId}/quiz/new`, quizData, config)
        dispatch({
            type: NEW_QUIZ_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: NEW_QUIZ_FAIL,
            payload: error.response.data.message
        })

    }
}

export const getQuizzes = () => async (dispatch) => {
    try {
        const config = {
            headers: {
                // 'Content-Type': 'application/json', 
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        dispatch({
            type: ALL_QUIZ_REQUEST
        })
        
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/quizzes`, config)

        dispatch({
            type: ALL_QUIZ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_QUIZ_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getQuizDetails = (id) => async (dispatch) => {
    try{
        dispatch({ type: QUIZ_DETAILS_REQUEST })
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/quiz/${id}`)
        dispatch({
            type: QUIZ_DETAILS_SUCCESS,
            payload: data.quiz
        })
    }catch(error){
        dispatch({
            type: QUIZ_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateQuiz = (id, quizData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_QUIZ_REQUEST })
        const config = {
            headers: {
                // 'Authorization': `Bearer ${getToken()}`
            }
            
        }
       
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/quiz/${id}`, quizData, config)
        dispatch({
            type: UPDATE_QUIZ_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        console.log(error);
        dispatch({
            type: UPDATE_QUIZ_FAIL,
            payload: error.response.data.message
        })
    }
}
export const deleteQuiz = (id) => async (dispatch) => {
    try {
        dispatch({type: DELETE_QUIZ_REQUEST})
        const config = {
            headers: {
                // 'Content-Type': 'multipart/form-data',
                // 'Authorization': `Bearer ${getToken()}`
            }
        }
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/quiz/${id}`, config)
        dispatch({type: DELETE_QUIZ_SUCCESS, payload: data.success})
       
    } catch (error) {
        dispatch({
            type: DELETE_QUIZ_FAIL,
            payload: error.response.data.message 
        })

    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS

    })
}
