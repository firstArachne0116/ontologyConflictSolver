import {combineReducers} from 'redux';
import auth from './auth.reducer';

const mainReducers = combineReducers({
    auth
});

export default mainReducers;
