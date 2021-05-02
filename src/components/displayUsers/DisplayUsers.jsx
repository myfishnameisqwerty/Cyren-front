import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../../redux";
import { NavLink, Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import LockIcon from "@material-ui/icons/Lock";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateIcon from "@material-ui/icons/Update";
import "./displayUsers.css";
import axios from "axios";

function DisplayUsers({ userData, fetchUsers }) {
  const columns = ["Select", "Name", "Email", "Dragons", "Edit"];
  useEffect(() => {
    fetchUsers();
  }, []);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function deleteRequest() {
    userToDelete.forEach((id) => {
      axios
        .delete(`${process.env.REACT_APP_SERVER_ADDRESS}/users/${id}`)
        .then(() => fetchUsers());
    });

    handleClose();
  }

  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>My users</h2>

      <div>
        {userData && userData.users && (
          <table>
            <thead>
              <tr>
                <td>
                  <NavLink to={`/create/`}>
                    <Button variant="contained" className="menuButton">
                      <AddIcon />
                      Create user
                    </Button>
                  </NavLink>
                </td>

                <td>
                  <div onClick={handleClickOpen} className="menuButton">
                    <DeleteIcon />
                  </div>
                </td>
                <td>
                  <div onClick={fetchUsers} className="menuButton">
                    <UpdateIcon />
                  </div>
                </td>
              </tr>
              <tr>
                {columns.map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userData.users.map((user, i) => (
                <tr key={user.id}>
                  <td>
                    <input
                      type="checkbox"
                      value={user.id}
                      disabled={user.fetched}
                      onClick={(e) => {
                        let users = [...userToDelete];
                        if (e.target.checked) users.push(e.target.value);
                        else
                          users = users.filter(
                            (id) => id !== e.target.value.id
                          );
                        setUserToDelete(users);
                      }}
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dragons}</td>
                  <td>
                    {user.fetched ? (
                      <LockIcon />
                    ) : (
                      <Link to={`/users/${user.id}`}>
                        <EditIcon />
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Plese confirm your action"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you shure, that you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={() => deleteRequest()} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUsers);
