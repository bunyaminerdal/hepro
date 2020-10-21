import {
  GET_PROJECTS,
  ADD_PROJECT,
  DELETE_PROJECT,
  EDIT_PROJECT,
  PROJECTS_LOADING,
  UNLOAD_PROJECTS,
  PROJECT_EDITING,
  PROJECT_EDITED,
} from "../actions/types";

const initialState = {
  projects: [],
  loading: false,
  projectediting: false,
  selectedproject: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        loading: false,        
      };
    case UNLOAD_PROJECTS:
      return {
        ...state,
        projects: [],
        loading: false,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          (project) => project._id !== action.payload
        ),
      };
    case EDIT_PROJECT:
      return {
        ...state,
        projects: state.projects.map(project => {
          return project._id === action.payload._id ?  action.payload : project}
      ),
      };
    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects],
      };
    case PROJECTS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case PROJECT_EDITING:
      return {
        ...state,
        projectediting: true,
        selectedproject: state.projects.find(
          (project) => project._id === action.payload
        ),
      };

    case PROJECT_EDITED:
      return {
        ...state,
        projectediting: false,
        selectedproject: null,
      };

    default:
      return state;
  }
}
