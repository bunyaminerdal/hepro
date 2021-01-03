import axios from "axios";
import {
  EDIT_CRIT,
  GET_CRITS,
  ADD_CRIT,
  DELETE_CRIT,
  CRITS_LOADING,
  UNLOAD_CRITS,
  CRIT_EDITED,
  CRIT_ADDING,
  CRIT_ADDED,
  CRIT_EDITING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getCrits = (projectId) => (dispatch, getState) => {
  dispatch(setCritLoading());
  axios
    .get(`/api/criterias/${projectId}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_CRITS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteCrit = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/criterias/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_CRIT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editCrit = (id, crit) => (dispatch, getState) => {
  axios
    .put(`/api/criterias/${id}`, crit, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_CRIT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "CRIT_EDIT_FAIL")
      )
    );
};

export const addCrit = (crit, projectId) => (dispatch, getState) => {
  axios
    .post(`/api/criterias/${projectId}`, crit, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_CRIT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "DM_ADD_FAIL")
      )
    );
};

export const setCritLoading = (crit) => {
  return {
    type: CRITS_LOADING,
  };
};

export const unLoadCrits = (crit) => {
  return {
    type: UNLOAD_CRITS,
  };
};
export const critEditing = (id) => {
  return {
    type: CRIT_EDITING,
    payload: id,
  };
};
export const critAdding = (id) => {
  return {
    type: CRIT_ADDING,
  };
};
export const critAdded = (id) => {
  return {
    type: CRIT_ADDED,
  };
};

export const critEdited = (project) => {
  return {
    type: CRIT_EDITED,
  };
};
