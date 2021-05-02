import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "../form.css";
import HomeIcon from "@material-ui/icons/Home";
export default function EditUser(props) {
  const [user, setUser] = useState(null);
  const [validName, setValidName] = useState(null);
  const [nameError, setNameError] = useState(null);
  const nameRef = useRef(null);
  const dragonsRef = useRef(null);
  function checkName() {
    setValidName("invalid");
    setNameError("Name should contain only the characters: a-z ,.'-");
    if (
      nameRef.current.value &&
      /^([a-zA-Z\s\.'é-]+)$/.test(nameRef.current.value)
    ) {
      setValidName("valid");
      setNameError("");
    }
  }
  function getValidationColor(field) {
    if (field === "valid") return "rgb(162, 236, 144)";
    else if (field === "invalid") return "rgb(255, 164, 164)";
  }
  function submitUpdate() {
    if(!nameError && dragonsRef.current.value>=0){
        let newData = new Object();
        newData.name = nameRef.current.value;
        newData.dragons = dragonsRef.current.value;
        axios
          .put(
            `${process.env.REACT_APP_SERVER_ADDRESS}/users/${props.match.params.id}`,
            newData
          )
          .then((response) => props.history.push("/"));

    }
  }
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/users?filter={"id":"${props.match.params.id}"}`
      )
      .then((res) => {
        console.log(
          `${process.env.REACT_APP_SERVER_ADDRESS}/users?filter={"id":"${props.match.params.id}"}`
        );
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
          <Button variant="contained" id="submitButton" onClick={submitUpdate}>
            Edit
          </Button>
        </div>
      ) : (
        <p>loading...</p>
      )}
    </div>
  );
}
