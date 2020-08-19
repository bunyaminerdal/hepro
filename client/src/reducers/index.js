import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  error: errorReducer,
});
