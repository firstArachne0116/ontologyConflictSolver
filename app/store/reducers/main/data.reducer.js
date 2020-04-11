import * as Actions from '../../actions/main/index';

const initialState = {
  systems: null,
  result: null,
  results: null,
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.GET_RESULT:
      return {...state, result: action.payload };
    case Actions.GET_ALL_RESULTS:
      return {...state, results: action.payload };
    case Actions.GET_SYSTEMS:
      return {...state, systems: action.payload };
    case Actions.REMOVE_SYSTEM:
      return {...state, systems: action.payload };
    default:
      return state;
  }
};
