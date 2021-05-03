import axios from 'axios'

import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, SORT_USERS, FILTER_USERS } from './userTypes'

export const fetchUsers = (sortKey='name', sortOrder=1) => {
  let order = sortOrder===1?'ASC':'DESC'
  return (dispatch) => {
    dispatch(fetchUsersRequest())
    axios
      .get(`${process.env.REACT_APP_SERVER_ADDRESS}/users?sort=["${sortKey}","${order}"]`)
      .then(response => {
        const users = response.data
        dispatch(fetchUsersSuccess(users))
      })
      .catch(error => {
        dispatch(fetchUsersFailure(error.message))
      })
  }
}
export const deleteRequest = (params) => {
  let promise = new Promise((resolve, reject) => {

    let copyParams = Array.isArray(params) ? [...params] : [params]
    copyParams.forEach(id => {
      axios
        .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}`)
        .then(() => resolve(true))
    });

  })
  return promise


}
export const filterUsers = (name) => {
  return {
    type: FILTER_USERS,
    payload: name
  }
}
export const sortUsers = (key, order) => {
  return {
    type: SORT_USERS,
    payload: {key, order}
  }
}

export const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

export const fetchUsersSuccess = users => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  }
}

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  }
}
