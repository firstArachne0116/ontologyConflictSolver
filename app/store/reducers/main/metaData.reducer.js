import * as Actions from '../../actions/main/index';

const initialState = {
  quality: [],
  structure: [
    {
      id: 1,
      name: 'JavaScript',
    },
    {
      id: 2,
      name: 'Java',
    },
    {
      id: 3,
      name: 'Ruby',
    },
    {
      id: 4,
      name: 'React Native',
    },
    {
      id: 5,
      name: 'PHP',
    },
    {
      id: 6,
      name: 'Python',
    },
    {
      id: 7,
      name: 'Go',
    },
    {
      id: 8,
      name: 'Swift',
    },
  ],
};

export default (state = initialState, action) => {
  switch(action.type) {
    case Actions.SET_QUALITY:
      return {...state, quality: action.payload };
    case Actions.SET_STRUCTURE:
      console.log(action.payload);
      return {...state, structure: action.payload };
    default:
      return state;
  }
};
