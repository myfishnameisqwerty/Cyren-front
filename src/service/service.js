import axios from "axios";
export const getUsers = (filter = {}, sortKey = "name", sortOrder = 1) => {
  let order = sortOrder === 1 ? "ASC" : "DESC";
  let promise = new Promise((resolve, reject) => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/users?filter=${JSON.stringify(
          filter
        )}&sort=["${sortKey}","${order}"]`
      )
      .then((response) => resolve(response.data))
      .catch((error) => reject(error.message));
  });
  return promise;
};

export const deleteUser = (params) => {
  let promise = new Promise((resolve, reject) => {
    let copyParams = Array.isArray(params) ? [...params] : [params];
    copyParams.forEach((id) => {
      axios
        .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}`)
        .then(() => resolve(true))
        .catch((error) => reject(error.message));
    });
  });
  return promise;
};
export const createUser = (data) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .post(`${process.env.REACT_APP_SERVER_ADDRESS}/users`, data)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error.message));
  });
  return promise;
};
export const updateUser = (id, data) => {
  let promise = new Promise((resolve, reject) => {
    axios
      .put(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}`, data)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.message));
  });
  return promise;
};

