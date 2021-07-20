import {
  LOGIN_USER,
  SET_LOADING,
  ERROR,
  GET_RECEIPES,
  SEARCH,
  CLEAR_SEARCH,
} from "../constants/types";

const initialState = {
  login: false,
  receipes: [],
  loading: false,
  isAdmin: null,
  error: null,
};

export const receipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        login: true,
        isAdmin: payload,
      };
    case GET_RECEIPES:
      return {
        ...state,
        receipes: payload,
      };
    case SEARCH:
      return {
        ...state,
        filter: state.receipes.filter((receipe) =>
          receipe.data.title.match(new RegExp(`${payload}`, "gi"))
        ),
      };
    case CLEAR_SEARCH:
      return {
        ...state,
        filter: null,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};
