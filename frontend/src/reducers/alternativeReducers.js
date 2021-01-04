import {
  GET_ALTS,
  ADD_ALT,
  DELETE_ALT,
  ALTS_LOADING,
  UNLOAD_ALTS,
  ALT_EDITING,
  ALT_ADDING,
  ALT_EDITED,
  ALT_ADDED,
  EDIT_ALT,
} from "../actions/types";

const initialState = {
  alts: [],
  altloading: false,
  altediting: false,
  altadding: false,
  selectedalt: null,
};

const alternativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALTS:
      return {
        ...state,
        alts: action.payload,
        altloading: false,
        altadding: false,
        altediting: false,
        selectedalt: null,
      };
    case UNLOAD_ALTS:
      return {
        ...state,
        alts: [],
        altloading: false,
        altadding: false,
        altediting: false,
        selectedalt: null,
      };
    case DELETE_ALT:
      return {
        ...state,
        alts: state.alts.filter((alt) => alt._id !== action.payload),
      };
    case EDIT_ALT:
      return {
        ...state,
        alts: state.alts.map((alt) => {
          return alt._id === action.payload._id ? action.payload : alt;
        }),
        altediting: false,
        selectedalt: null,
      };
    case ADD_ALT:
      return {
        ...state,
        alts: [action.payload, ...state.alts],
        altadding: false,
      };
    case ALTS_LOADING:
      return {
        ...state,
        altloading: true,
      };
    case ALT_EDITING:
      return {
        ...state,
        altediting: true,
        selectedalt: state.alts.find((alt) => alt._id === action.payload),
      };
    case ALT_ADDING:
      return {
        ...state,
        altadding: true,
      };

    case ALT_EDITED:
      return {
        ...state,
        altediting: false,
        selectedalt: null,
      };
    case ALT_ADDED:
      return {
        ...state,
        altadding: false,
      };
    default:
      return state;
  }
};
export default alternativeReducer;
