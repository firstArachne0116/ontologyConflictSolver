import {combineReducers} from 'redux';
import auth from './auth.reducer';
import data from './data.reducer';

const mainReducers = combineReducers({
    auth,
    data
});

export default mainReducers;
