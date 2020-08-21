import {
  GET_DMS,
  ADD_DM,
  DELETE_DM,
  DMS_LOADING,
  UNLOAD_DMS,
} from "../actions/types";

const initialState = {
  dms: [],
  loading: false,
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
    case ADD_DM:
      return {
        ...state,
        dms: [action.payload, ...state.dms],
      };
    case DMS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
