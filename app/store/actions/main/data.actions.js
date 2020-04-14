export const SET_TASKS = '[DATA] SET TASKS';
export const SET_OPTIONS = '[DATA] SET OPTIONS';

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
