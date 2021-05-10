import React, { useState, useEffect, useRef } from "react";
import {deleteUser as deleteRequest, getUsers, updateUser} from '../../service/service'
import {CustomButton, CustomInput, Buttons, Table, H2} from '../../service/customStyle'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";

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
      updateUser(props.match.params.id, newData).then(() => props.history.push("/"))
    }
  }
  useEffect(() => {
    getUsers({id:`${props.match.params.id}`})
      .then((res) => {
        setUser(res[0]);
      });
  }, []);
  return (
    <div>
      <NavLink to="/">
        <HomeIcon fontSize="large" />
        
    
      </NavLink>{" "}
      {user ? (
        <div id="container">
          <H2>Edit user</H2>
          <Table>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="email">Email</label>
                </td>
                <td>
                  <CustomInput name="email" disabled defaultValue={user.email} />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="name">Name</label>
                </td>
                <td>
                  <CustomInput
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
                  <CustomInput
                    type="number"
                    ref={dragonsRef}
                    name="dragons"
                    min="0"
                    defaultValue={user.dragons}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
          <Buttons>
          <CustomButton green fat onClick={submitUpdate}>Edit</CustomButton>
            
            <CustomButton red fat onClick={handleClickOpen}>Delete</CustomButton>
            
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
                <CustomButton onClick={handleClose} transparent>
                  No
                </CustomButton>
                <CustomButton onClick={deleteUser} transparent autoFocus>
                  Yes
                </CustomButton>
              </DialogActions>
            </Dialog>
          </Buttons>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
