import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { groupReducer, groupsDetailsReducer, groupsReducer, newGroupsReducer } from './Reducers/groupReducer';
import { newSubtopicsReducer, showEditReducer, showFormReducer, subtopicReducer, subtopicsDetailsReducer, subtopicsReducer } from './Reducers/subtopicReducer';
import { newQuizReducer, quizDetailsReducer, quizReducer, quizzesReducer, showQuizReducer } from './Reducers/quizReducer';


const reducer = combineReducers({
    groups: groupsReducer,
    groupDetails: groupsDetailsReducer,
    newGroup: newGroupsReducer,
    group: groupReducer,
    subtopics: subtopicsReducer,
    subtopicsDetails: subtopicsDetailsReducer,
    newSubtopics: newSubtopicsReducer,
    subtopic: subtopicReducer,
    form: showFormReducer,
    edit: showEditReducer,
    quizzes: quizzesReducer,
    quizDetails: quizDetailsReducer,
    newQuiz: newQuizReducer,
    quiz: quizReducer,
    quizForm: showQuizReducer,
})

let initialState = {
    user: sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "undefined" ? JSON.parse(sessionStorage.getItem('user')) : {},
    auth: sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "undefined" ? JSON.parse(sessionStorage.getItem('user')) : {},
}

const middlware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middlware))

export default store;