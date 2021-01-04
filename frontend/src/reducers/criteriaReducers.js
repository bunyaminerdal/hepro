import {
  GET_CRITS,
  ADD_CRIT,
  DELETE_CRIT,
  CRITS_LOADING,
  UNLOAD_CRITS,
  CRIT_EDITING,
  CRIT_ADDING,
  CRIT_EDITED,
  CRIT_ADDED,
  EDIT_CRIT,
} from "../actions/types";

const initialState = {
  crits: [],
  critloading: false,
  critediting: false,
  critadding: false,
  selectedcrit: null,
};

const criteriaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CRITS:
      return {
        ...state,
        crits: action.payload,
        critloading: false,
        critadding: false,
        critediting: false,
        selectedcrit: null,
      };
    case UNLOAD_CRITS:
      return {
        ...state,
        crits: [],
        critloading: false,
        critadding: false,
        critediting: false,
        selectedcrit: null,
      };
    case DELETE_CRIT:
      return {
        ...state,
        crits: state.crits.filter((crit) => crit._id !== action.payload),
      };
    case EDIT_CRIT:
      return {
        ...state,
        crits: state.crits.map((crit) => {
          return crit._id === action.payload._id ? action.payload : crit;
        }),
        critediting: false,
        selectedcrit: null,
      };
    case ADD_CRIT:
      return {
        ...state,
        crits: [action.payload, ...state.crits],
        critadding: false,
      };
    case CRITS_LOADING:
      return {
        ...state,
        critloading: true,
      };
    case CRIT_EDITING:
      return {
        ...state,
        critediting: true,
        selectedcrit: state.crits.find((crit) => crit._id === action.payload),
      };
    case CRIT_ADDING:
      return {
        ...state,
        critadding: true,
      };

    case CRIT_EDITED:
      return {
        ...state,
        critediting: false,
        selectedcrit: null,
      };
    case CRIT_ADDED:
      return {
        ...state,
        critadding: false,
      };
    default:
      return state;
  }
};
export default criteriaReducer;
