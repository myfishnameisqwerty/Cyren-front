import axios from "axios";
import React, { useState, useRef } from "react";
import {createUser as createRequest} from '../../service/service'
import {CustomButton, CustomInput, Buttons, Table, H2} from '../../service/customStyle'
import isEmail from "validator/lib/isEmail";
import HomeIcon from "@material-ui/icons/Home";
import { NavLink } from "react-router-dom";


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
      createRequest(newData).then(()=> props.history.push("/"));
      
    }
  }
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
      <H2>Create user</H2>
      <Table>
        <tbody>
          <tr>
            <td>
              <label htmlFor="email">Email</label>
            </td>
            <td>
              <CustomInput
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
              <CustomInput
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
             
              <CustomInput type="number" min="0" ref={dragonsRef} name="dragons" />
            </td>
          </tr>
        </tbody>
      </Table>
      <Buttons>
        <CustomButton fat green onClick={createUser}>
          Create
        </CustomButton>
      </Buttons>
    </div>
  );
}
