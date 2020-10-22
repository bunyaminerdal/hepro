import axios from "axios";
import { GET_DMS, ADD_DM, DELETE_DM, DMS_LOADING, UNLOAD_DMS,DM_EDITED,DM_ADDING,DM_ADDED,DM_EDITING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getDms = (projectId) => (dispatch, getState) => {
  dispatch(setDmLoading());
  axios
    .get(`/api/dms/${projectId}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_DMS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteDm = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/dms/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_DM,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addDm = (dm, projectId) => (dispatch, getState) => {
  axios
    .post(`/api/dms/${projectId}`, dm, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_DM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status,"DM_ADD_FAIL"))
    );
};

export const setDmLoading = (dm) => {
  return {
    type: DMS_LOADING,
  };
};

export const unLoadDms = (dm) => {
  return {
    type: UNLOAD_DMS,
  };
};
export const dmEditing = (id) => {
  return {
    type: DM_EDITING,
    payload: id,
  };
};
export const dmAdding = (id) => {
  return {
    type: DM_ADDING,    
  };
};
export const dmAdded = (id) => {
  return {
    type: DM_ADDED,    
  };
};

export const dmEdited = (project) => {
  return {
    type: DM_EDITED,
  };
};