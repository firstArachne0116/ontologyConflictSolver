export const SET_TASKS = '[DATA] SET TASKS';
export const SET_OPTIONS = '[DATA] SET OPTIONS';
export const SET_APPROVE_OPTIONS = '[DATA] SET APPROVE OPTIONS';
export const SET_ADDTERM_OPTIONS = '[DATA] SET ADDTERM OPTIONS';

export const set_tasks = (tasks) => {
  return (dispatch) => {
    dispatch({type: SET_TASKS, payload: tasks});
  };
};

export const set_options = (options) => {
  return (dispatch) => {
    dispatch({type: SET_OPTIONS, payload: options});
  };
};

export const set_approve_options = (options) => {
  return (dispatch) => {
    dispatch({type: SET_APPROVE_OPTIONS, payload: options});
  };
};

export const set_addTerm_options = (options) => {
  return (dispatch) => {
    dispatch({type: SET_ADDTERM_OPTIONS, payload: options});
  };
};
