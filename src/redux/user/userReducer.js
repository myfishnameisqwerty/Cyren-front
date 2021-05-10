import { MyVeryCustomSwapMethodForAnyObject } from "../../service/service";
import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SORT_USERS,
  FILTER_USERS,
} from "./userTypes";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return Object.assign(state, {loading: true});

    case FETCH_USERS_SUCCESS:
      // return Object.assign(state, {loading: false, users: action.payload, error: ""})
      return{
        ...state,
        loading: false,
        users: action.payload,
        error: "",
      };
    case FETCH_USERS_FAILURE:
    
    return {
        
        ...state,
        loading: false,
        users: [],
        error: action.payload,
      };
    case SORT_USERS:
      const sortedUsers = [...state.users];
      const { key, order } = action.payload;
      sortedUsers.sort((a, b) => {
        if (a[key] < b[key]) return -1 * order;
        return order;
      });
      return {
        ...state,
        users: sortedUsers,
      };
    case FILTER_USERS:
      let filtredUsers = state.users.filter((user) =>
        user.name.includes(action.payload)
      );
      return { ...state, users: filtredUsers };
    default:
      return state;
  }
};

export default reducer;
