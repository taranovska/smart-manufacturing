import {
  CREATE_FACTORY_DATA,
  EDIT_FACTORY_DATA,
  DISMISS_FACTORY_DATA,
  ADD_NEW_LOCATION,
  DEACTIVATE_EXISTING_LOCATION,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_ERROR,
  SEARCH_QUERY,
  CLEAR_SEARCH_QUERY,
} from "./actionsType";

const initialState = {
  loading: false,
  error: null,
  query: "",
  data: [],
};

function reducer(state = initialState, action) {
  if (action.type === CREATE_FACTORY_DATA) {
    return { ...state, data: [...state.data, action.payload.factory] };
  }
  if (action.type === FETCH_DATA_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  }

  if (action.type === FETCH_DATA_SUCCESS) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  }
  if (action.type === FETCH_DATA_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.payload.error,
      data: [],
    };
  }
  if (action.type === CLEAR_SEARCH_QUERY) {
    return {
      ...state,
      query: "",
    };
  }
  if (action.type === SEARCH_QUERY) {
    return {
      ...state,
      query: action.payload,
    };
  }

  //     // .some(
  //     //   (item) => item.name.includes(action.payload)

  //     //item.name.includes(action.payload) === true

  //     // item.name.includes(action.payload).some((el) => el === true)
  //     // ),
  //   };
  // }

  return state;
}
export default reducer;
