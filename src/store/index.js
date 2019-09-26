import {createStore, applyMiddleware} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';
import {Set_Schools, Set_Students, Destroy_Student, Update_Student, Create_Student} from './consts';
import * as actions from './actions';

const store = createStore(reducer, applyMiddleware(thunk))

export default store;
export {actions}