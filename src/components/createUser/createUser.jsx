import axios from "axios";
import React, { useState, useRef } from "react";
import { Button } from "@material-ui/core";
import isEmail from "validator/lib/isEmail";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";
import "../form.css";

export default function CreateUser(props) {
  const [validEmail, setValidEmail] = useState(null);
  const [validName, setValidName] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [nameError, setNameError] = useState(null);
  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const dragonsRef = useRef(null);

  function createUser() {
    if (!emailError && !nameError) {
      let newData = {};
      newData.email = emailRef.current.value;
      newData.name = nameRef.current.value;
      newData.dragons = dragonsRef.current.value;
      axios
        .post(`${process.env.REACT_APP_SERVER_ADDRESS}/users`, newData)
        .then((response) => props.history.push("/"));
    }
  }
  function checkName() {
    setValidName("invalid");
    setNameError("Name should contain only the characters: a-z ,.'-");
    if (
      nameRef.current.value &&
      /^([a-zA-Z\s.'é-]+)$/.test(nameRef.current.value)
    ) {
      setValidName("valid");
      setNameError("");
    }
  }
  function checkEmail() {
    setValidEmail("invalid");
    if (isEmail(emailRef.current.value)) {
      axios
        .get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/users?filter={"email":"${emailRef.current.value}"}`
        )
        .then((res) => {
          if (res && res.data.length === 0) {
            setEmailError(null);
            setValidEmail("valid");
          } else setEmailError("Email is allredy exists in database");
        });
    }
  }
  function getValidationColor(field) {
    if (field === "valid") return "rgb(162, 236, 144)";
    else if (field === "invalid") return "rgb(255, 164, 164)";
  }
  return (
    <div id="container">
      <NavLink to="/">
        <HomeIcon fontSize="large" />
      </NavLink>
      <h2>Create user</h2>
      <table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="email">Email</label>
            </td>
            <td>
              <input
                ref={emailRef}
                name="email"
                onBlur={checkEmail}
                style={{ backgroundColor: getValidationColor(validEmail) }}
              />
            </td>
            <td>
              <label>{emailError}</label>
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
              <input type="number" min="0" ref={dragonsRef} name="dragons" />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="buttons">
        <Button variant="contained" id="submitButton" onClick={createUser}>
          Create
        </Button>
      </div>
    </div>
  );
}
