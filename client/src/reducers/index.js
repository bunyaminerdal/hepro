import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import projectReducer from "./projectReducer";
import errorReducer from "./errorReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  project: projectReducer,
  error: errorReducer,
  auth: authReducer,
});
