import {combineReducers} from 'redux';
import auth from './auth.reducer';
import data from './data.reducer';
import metaData from './metaData.reducer';

const mainReducers = combineReducers({
    auth,
    data,
    metaData
});

export default mainReducers;
