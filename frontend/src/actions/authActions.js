import axios from "axios";
import { returnErrors } from "./errorActions";

import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SELECTED_PROJECT,
  DESELECT_PROJECT,
  SELECTED_DM,
  DESELECT_DM,
} from "../actions/types";

//check token & load user
export const loadUser = () => (dispatch, getState) => {
  // User loading
  dispatch({
    type: USER_LOADING,
  });

  axios
    .get("/api/auth/user", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const selectedProject = (id) => (dispatch, getState) => {
  axios
    .get(`/api/auth/project/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SELECTED_PROJECT,
        payload: res.data._id,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
export const deselectProject = () => {
  return {
    type: DESELECT_PROJECT,
  };
};

export const selectedDm = (id) => (dispatch, getState) => {
  axios
    .get(`/api/auth/dm/${id}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: SELECTED_DM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deselectDm = () => {
  return {
    type: DESELECT_DM,
  };
};

//REGISTER USER
export const register = ({ name, email, password }) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ name, email, password });

  axios
    .post("/api/users", body, config)
    .then((res) =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({ type: REGISTER_FAIL });
    });
};

//logout User
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

//login user
export const login = ({ email, password }) => (dispatch) => {
  //HEADERS
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Request body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/auth", body, config)
    .then((res) =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({ type: LOGIN_FAIL });
    });
};

//setup config/headers and token

export const tokenConfig = (getState) => {
  //get token from localstorage
  const token = getState().auth.token;
  
  //headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  //If token, add to headers  
  if (token) {
    config.headers["x-auth-token"] = token;
  }  
  return config;
};
