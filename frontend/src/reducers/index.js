import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import dmReducer from "./dmReducer";
import alternativeReducer from "./alternativeReducers";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  dm: dmReducer,
  alternative: alternativeReducer,
  error: errorReducer,
});
