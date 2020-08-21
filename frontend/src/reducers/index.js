import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import dmReducer from "./dmReducer";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  dm: dmReducer,
  error: errorReducer,
});
