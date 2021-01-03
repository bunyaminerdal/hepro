import { combineReducers } from "redux";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";
import dmReducer from "./dmReducer";
import alternativeReducer from "./alternativeReducers";
import criteriaReducer from "./criteriaReducers";

export default combineReducers({
  auth: authReducer,
  project: projectReducer,
  dm: dmReducer,
  alternative: alternativeReducer,
  criteria: criteriaReducer,
  error: errorReducer,
});
