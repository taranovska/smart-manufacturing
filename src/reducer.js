import {
  CREATE_FACTORY_DATA,
  EDIT_FACTORY_DATA,
  DISMISS_FACTORY_DATA,
  ADD_NEW_LOCATION,
  DEACTIVATE_EXISTING_LOCATION,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
} from "./actionsType";

const initialState = {
  loading: false,
  error: null,
  data: [],
};

function reducer(state = initialState, action) {
  if (action.type === CREATE_FACTORY_DATA) {
    return { ...state, data: [...state.data, action.payload.factory] };
  }
  if (action.type === FETCH_DATA_REQUEST) {
    console.log("request");

    return {
      ...state,
      loading: true,
      error: null,
    };
  }
  if (action.type === FETCH_DATA_SUCCESS) {
    console.log("fetch");
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  }
  if (action.type === FETCH_DATA_ERROR) {
    console.log("error");
    return {
      ...state,
      loading: false,
      error: action.error,
    };
  }

  return state;
}
export default reducer;
