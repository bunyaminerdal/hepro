import axios from "axios";
import {
  EDIT_ALT,
  GET_ALTS,
  ADD_ALT,
  DELETE_ALT,
  ALTS_LOADING,
  UNLOAD_ALTS,
  ALT_EDITED,
  ALT_ADDING,
  ALT_ADDED,
  ALT_EDITING,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getAlts = (projectId) => (dispatch, getState) => {
  dispatch(setAltLoading());
  axios
    .get(`/api/alternatives/${projectId}`, tokenConfig(getState))
    .then((res) => dispatch({ type: GET_ALTS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteAlt = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/alternatives/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ALT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const editAlt = (id, alt) => (dispatch, getState) => {
  axios
    .put(`/api/alternatives/${id}`, alt, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_ALT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "ALT_EDIT_FAIL")
      )
    );
};

export const addAlt = (alt, projectId) => (dispatch, getState) => {
  axios
    .post(`/api/alternatives/${projectId}`, alt, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ALT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(
        returnErrors(err.response.data, err.response.status, "DM_ADD_FAIL")
      )
    );
};

export const setAltLoading = (alt) => {
  return {
    type: ALTS_LOADING,
  };
};

export const unLoadAlts = (alt) => {
  return {
    type: UNLOAD_ALTS,
  };
};
export const altEditing = (id) => {
  return {
    type: ALT_EDITING,
    payload: id,
  };
};
export const altAdding = (id) => {
  return {
    type: ALT_ADDING,
  };
};
export const altAdded = (id) => {
  return {
    type: ALT_ADDED,
  };
};

export const altEdited = (project) => {
  return {
    type: ALT_EDITED,
  };
};
