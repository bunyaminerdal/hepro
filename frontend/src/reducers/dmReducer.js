import {
  GET_DMS,
  ADD_DM,
  DELETE_DM,
  DMS_LOADING,
  UNLOAD_DMS,
  DM_EDITING,
  DM_ADDING,
  DM_EDITED,
  DM_ADDED,
  EDIT_DM,
} from "../actions/types";

const initialState = {
  dms: [],
  loading: false,
  dmediting: false,
  dmadding: false,
  selecteddm: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_DMS:
      return {
        ...state,
        dms: action.payload,
        loading: false,
      };
    case UNLOAD_DMS:
      return {
        ...state,
        dms: null,
        loading: false,
      };
    case DELETE_DM:
      return {
        ...state,
        dms: state.dms.filter((dm) => dm._id !== action.payload),        
      };
    case EDIT_DM:
        return {
          ...state,
          dms: state.dms.map(dm => {
            return dm._id === action.payload._id ?  action.payload : dm}
        ),
          dmediting: false,
          selecteddm: null,
        };
    case ADD_DM:
      return {
        ...state,
        dms: [action.payload, ...state.dms],
        dmadding:false,
      };
    case DMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case DM_EDITING:
        return {
          ...state,
          dmediting: true,
          selecteddm: state.dms.find(
            (dm) => dm._id === action.payload
          ),
        };
    case DM_ADDING:
        return {
          ...state,
          dmadding: true,
          
        };
  
    case DM_EDITED:
        return {
          ...state,
          dmediting: false,
          selecteddm: null,
        };
    case DM_ADDED:
        return {
          ...state,
          dmadding: false,        
        };
    default:
      return state;
  }
}
