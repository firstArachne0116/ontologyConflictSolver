import * as Actions from '../../actions/main/index';

const initialState = {
    
};

const auth = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.SET_USER:
        {
            return action.options;
        }
        default:
        {
            return state;
        }
    }
};

export default auth;
