import axios from "axios";
import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  PROJECTS_LOADING,
  UNLOAD_PROJECTS,
  PROJECT_EDITING,
  PROJECT_EDITED,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getProjects = () => (dispatch, getState) => {
  dispatch(setProjectLoading());
  axios
    .get("/api/projects", tokenConfig(getState))
    .then((res) => dispatch({ type: GET_PROJECTS, payload: res.data }))
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deleteProject = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/projects/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_PROJECT,
        payload: id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editProject = (id,project) => (dispatch, getState) => {  
  
  axios
    .put(`/api/projects/${id}`,project, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: EDIT_PROJECT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addProject = (project) => (dispatch, getState) => {
  axios
    .post("/api/projects", project, tokenConfig(getState))
    .then( (res) =>
      dispatch({
        type: ADD_PROJECT,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setProjectLoading = (project) => {
  return {
    type: PROJECTS_LOADING,
  };
};

export const projectEditing = (id) => {
  return {
    type: PROJECT_EDITING,
    payload: id,
  };
};

export const projectEdited = (project) => {
  return {
    type: PROJECT_EDITED,
  };
};

export const unLoadProjects = (project) => {
  return {
    type: UNLOAD_PROJECTS,
  };
};
