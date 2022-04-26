import {
  LOAD_FACTORIES_DATA,
  CREATE_FACTORY_DATA,
  EDIT_FACTORY_DATA,
  DISMISS_FACTORY_DATA,
  ADD_NEW_LOCATION,
  DEACTIVATE_EXISTING_LOCATION,
  FETCH_DATA_ERROR,
  FETCH_DATA_REQUEST,
  FETCH_DATA_SUCCESS,
} from "./actionsType";

export function fetchDataRequest() {
  return {
    type: FETCH_DATA_REQUEST,
  };
}

export function fetchDataSuccess(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
}

export function fetchDataError(error) {
  return {
    type: FETCH_DATA_ERROR,
    payload: { error },
  };
}
