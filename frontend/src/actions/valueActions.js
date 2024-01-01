import axios from "axios";
import {
  EDIT_VAL,
  GET_VALS,
  ADD_VAL,
  DELETE_VAL,
  VALS_LOADING,
  UNLOAD_VALS,
  VAL_EDITED,
  VAL_ADDING,
  VAL_ADDED,
  VAL_EDITING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getVals = (projectId) => (dispatch, getState) => {
  dispatch(setValLoading());
  axios
    .get(`/api/values/${projectId}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_VALS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteVal = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/values/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_VAL,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editVal = (id, val) => (dispatch, getState) => {
  axios
    .put(`/api/values/${id}`, val, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_VAL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "VAL_EDIT_FAIL")
      )
    );
};

export const addVal = (val, projectId, dmId, criteriaId, alternativeId) => (
  dispatch,
  getState
) => {
  axios
    .post(
      `/api/values/${projectId}`,
      [val, dmId, criteriaId, alternativeId],
      tokenConfig(getState)
    )
    .then((res) =>
      dispatch({
        type: ADD_VAL,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "VAL_ADD_FAIL")
      )
    );
};

export const setValLoading = (val) => {
  return {
    type: VALS_LOADING,
  };
};

export const unLoadVals = (val) => {
  return {
    type: UNLOAD_VALS,
  };
};
export const valEditing = (id) => {
  return {
    type: VAL_EDITING,
    payload: id,
  };
};
export const valAdding = (id) => {
  return {
    type: VAL_ADDING,
  };
};
export const valAdded = (id) => {
  return {
    type: VAL_ADDED,
  };
};

export const valEdited = (project) => {
  return {
    type: VAL_EDITED,
  };
};
