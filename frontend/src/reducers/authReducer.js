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

const initialState = {
  token: localStorage.getItem("token"),
  project: localStorage.getItem("project"),
  dm: localStorage.getItem("dm"),
  isAuthenticated: null,
  isLoading: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload,
      };
    case SELECTED_PROJECT:
      localStorage.setItem("project", action.payload);
      return {
        ...state,
        project: action.payload,
      };
    case DESELECT_PROJECT:
      localStorage.removeItem("project");
      return {
        ...state,
        project: null,
      };
    case SELECTED_DM:
      localStorage.setItem("dm", action.payload._id);
      return {
        ...state,
        dm: action.payload._id,
      };
    case DESELECT_DM:
      localStorage.removeItem("dm");
      return {
        ...state,
        dm: null,
      };
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem("token", action.payload.token);

      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem("token");
      localStorage.removeItem("project");
      localStorage.removeItem("dm");
      return {
        ...state,
        token: null,
        user: null,
        project: null,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
