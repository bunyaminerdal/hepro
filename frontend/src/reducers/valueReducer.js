import {
  GET_VALS,
  ADD_VAL,
  DELETE_VAL,
  VALS_LOADING,
  UNLOAD_VALS,
  VAL_EDITING,
  VAL_ADDING,
  VAL_EDITED,
  VAL_ADDED,
  EDIT_VAL,
} from "../actions/types";

const initialState = {
  vals: [],
  valloading: false,
  valediting: false,
  valadding: false,
  selectedval: null,
};

const valueReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VALS:
      return {
        ...state,
        vals: action.payload,
        valloading: false,
        valadding: false,
        valediting: false,
        selectedval: null,
      };
    case UNLOAD_VALS:
      return {
        ...state,
        vals: [],
        valloading: false,
        valadding: false,
        valediting: false,
        selectedval: null,
      };
    case DELETE_VAL:
      return {
        ...state,
        vals: state.vals.filter((val) => val._id !== action.payload),
      };
    case EDIT_VAL:
      return {
        ...state,
        vals: state.vals.map((val) => {
          return val._id === action.payload._id ? action.payload : val;
        }),
        valediting: false,
        selectedval: null,
      };
    case ADD_VAL:
      return {
        ...state,
        vals: [action.payload, ...state.vals],
        valadding: false,
      };
    case VALS_LOADING:
      return {
        ...state,
        valloading: true,
      };
    case VAL_EDITING:
      return {
        ...state,
        valediting: true,
        selectedval: state.vals.find((val) => val._id === action.payload),
      };
    case VAL_ADDING:
      return {
        ...state,
        valadding: true,
      };

    case VAL_EDITED:
      return {
        ...state,
        valediting: false,
        selectedval: null,
      };
    case VAL_ADDED:
      return {
        ...state,
        valadding: false,
      };
    default:
      return state;
  }
};
export default valueReducer;
