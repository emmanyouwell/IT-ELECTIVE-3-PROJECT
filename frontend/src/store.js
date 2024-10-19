import { legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { groupReducer, groupsDetailsReducer, groupsReducer, newGroupsReducer } from './Reducers/groupReducer';
import { newSubtopicsReducer, showEditReducer, showFormReducer, subtopicReducer, subtopicsDetailsReducer, subtopicsReducer } from './Reducers/subtopicReducer';


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
    edit: showEditReducer
})

let initialState = {
    user: sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "undefined" ? JSON.parse(sessionStorage.getItem('user')) : {},
    auth: sessionStorage.getItem('user') && sessionStorage.getItem('user') !== "undefined" ? JSON.parse(sessionStorage.getItem('user')) : {},
}

const middlware = [thunk]
const store = createStore(reducer, initialState, applyMiddleware(...middlware))

export default store;