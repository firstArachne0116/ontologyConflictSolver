export const SET_QUALITY = '[DATA] SET QUALITY';
export const SET_STRUCTURE = '[DATA] SET STRUCTURE';

export const set_quality = (quality) => {
  return (dispatch) => {
    dispatch({type: SET_QUALITY, payload: quality});
  };
};

export const set_structure = (structure) => {
  return (dispatch) => {
    dispatch({type: SET_STRUCTURE, payload: structure});
  };
};
