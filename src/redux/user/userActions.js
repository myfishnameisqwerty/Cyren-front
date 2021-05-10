import { getUsers } from "../../service/service";
import store from "../store"
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SORT_USERS,
  FILTER_USERS,
} from "./userTypes";

export const fetchUsers = (sortKey, sortOrder) => {
  return (dispatch) => {
    dispatch(fetchUsersRequest(sortKey, sortOrder));
    getUsers()
      .then((users) => dispatch(fetchUsersSuccess(users)))
      .catch((errorMessage) => dispatch(fetchUsersFailure(errorMessage)));
  };
};

export const filterUsers = (name) => {
  
  return {
    type: FILTER_USERS,
    payload: name,
  };
};
export const sortUsers = (key, order) => {
  return (dispatch) => {

    let {users} = store.getState().user
    users.sort((a,b) => {
      if (a[key] < b[key]) return -1 * order;
      return order;
    })
    dispatch(fetchUsersSuccess(users))
  }
};

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

export const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

export const fetchUsersFailure = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};
