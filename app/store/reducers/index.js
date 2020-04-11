import {combineReducers} from 'redux';
import main from './main';

const createReducer = (asyncReducers) =>
    combineReducers({
        main,
        ...asyncReducers
    });

export default createReducer;
