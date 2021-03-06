import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { deleteRequest } from "../../redux";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "../form.css";
import HomeIcon from "@material-ui/icons/Home";
export default function EditUser(props) {
  const [user, setUser] = useState(null);
  const [validName, setValidName] = useState(null);
  const [nameError, setNameError] = useState(null);
  const [open, setOpen] = useState(false);
  const nameRef = useRef(null);
  const dragonsRef = useRef(null);
  function checkName() {
    setValidName("invalid");
    setNameError("Name should contain only the characters: a-z ,.'-");
    if (
      nameRef.current.value &&
      /^([a-zA-Z\s.'-]+)$/.test(nameRef.current.value)
    ) {
      setValidName("valid");
      setNameError("");
    }
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function deleteUser() {
    handleClose();
    deleteRequest(props.match.params.id).then(() => props.history.push("/"));
  }
  function getValidationColor(field) {
    if (field === "valid") return "rgb(162, 236, 144)";
    else if (field === "invalid") return "rgb(255, 164, 164)";
  }
  function submitUpdate() {
    if (!nameError && dragonsRef.current.value >= 0) {
      let newData = new Object();
      newData.name = nameRef.current.value;
      newData.dragons = dragonsRef.current.value;
      axios
        .put(
          `${process.env.REACT_APP_SERVER_ADDRESS}/users/${props.match.params.id}`,
          newData
        )
        .then(() => props.history.push("/"));
    }
  }
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/users?filter={"id":"${props.match.params.id}"}`
      )
      .then((res) => {
        setUser(res.data[0]);
      });
  }, []);
  return (
    <div>
      <NavLink to="/">
        <HomeIcon fontSize="large" />
      </NavLink>{" "}
      {user ? (
        <div id="container">
          <h2>Edit user</h2>
          <table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="email">Email</label>
                </td>
                <td>
                  <input name="email" disabled defaultValue={user.email} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="name">Name</label>
                </td>
                <td>
                  <input
                    ref={nameRef}
                    name="name"
                    onBlur={checkName}
                    defaultValue={user.name}
                    style={{ backgroundColor: getValidationColor(validName) }}
                  />
                </td>
                <td>
                  <label>{nameError}</label>
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="dragons">Dragons</label>
                </td>
                <td>
                  <input
                    type="number"
                    ref={dragonsRef}
                    name="dragons"
                    min="0"
                    defaultValue={user.dragons}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="buttons">
            <Button
              variant="contained"
              id="submitButton"
              onClick={submitUpdate}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              id="deleteButton"
              onClick={handleClickOpen}
            >
              DELETE
            </Button>
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
                  This action is irreversible. Please confirm.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  No
                </Button>
                <Button onClick={deleteUser} color="primary" autoFocus>
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
