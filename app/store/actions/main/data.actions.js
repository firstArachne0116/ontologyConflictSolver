import api from '~/config/ApiConfig.js'
import * as actions from './message.actions';

export const GET_RESULT = '[DATA] GET RESULT';
export const GET_ALL_RESULTS = '[DATA] GET ALL RESULTS';
export const GET_SYSTEMS = '[DATA] GET SYSTEMS';
export const ADD_SYSTEM = '[DATA] ADD SYSTEM';
export const REMOVE_SYSTEM = '[DATA] REMOVE SYSTEM';
export const UPDATE_SYSTEM = '[DATA] UPDATE SYSTEM';

export const get_result = (access_token) => {
  return (dispatch) => {
    api.post('admin/get-result', {access_token})
      .then((response) => {
        dispatch({type: GET_RESULT, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get the result failed."}));
      });
  };
};

export const get_all_results = () => {
  return (dispatch) => {
    api.get('admin/get-all-results', {})
      .then((response) => {
        dispatch({type: GET_ALL_RESULTS, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get all results failed."}));
      });
  };
};

export const get_systems = () => {
  return (dispatch) => {
    api.get('admin/get-systems')
      .then((response) => {
        dispatch({type: GET_SYSTEMS, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Get systems failed."}));
      });
  };
};

export const add_system = () => {
  return (dispatch) => {
    api.post('admin/add-system',)
      .then((response) => {
        dispatch({type: GET_SYSTEMS, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Add system failed."}));
      });
  };
};

export const remove_system = (id) => {
  return (dispatch) => {
    api.post('admin/remove-system', {id})
      .then((response) => {
        dispatch({type: REMOVE_SYSTEM, payload: response.data});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Add system failed."}));
      });
  };
};

export const update_system = (updated_data) => {
  return (dispatch) => {
    api.post('admin/update-system', {updated_data})
      .then((response) => {
        dispatch({type: UPDATE_SYSTEM});
      })
      .catch((err) => {
        dispatch(actions.showMessage({message: "Add system failed."}));
      });
  };
};
