import * as Actions from '../../actions/main/index';

const initialState = {
  tasks: [],
  options: [],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.SET_TASKS:
      return {...state, tasks: action.payload };
    case Actions.SET_OPTIONS:
      return {...state, options: action.payload };
      case Actions.SET_APPROVE_OPTIONS:
        return {...state, approveOptions: action.payload };
    default:
      return state;
  }
};
