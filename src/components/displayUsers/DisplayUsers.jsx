import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {CustomButton, CustomInput, Table, H2, TH, HoverDiv} from '../../service/customStyle'
import { fetchUsers, sortUsers, filterUsers } from "../../redux";
import { NavLink, Link } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Lock as LockIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Update as UpdateIcon,
} from "@material-ui/icons";
import "./displayUsers.css";
import { deleteUser } from "../../service/service";


function DisplayUsers({ userData, fetchUsers, sortUsers, filterUsers }) {
  const columns = ["Name", "Email", "Dragons"];
  const [sort, setSort] = useState({ key: "name", order: 1 });
  
  useEffect(() => {
    fetchUsers();
  }, [])
  const findRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [dataOnPage, setDataOnPage] = useState(5)
  const [usersToDelete, setUsersToDelete] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function changeSort(key) {
    let newSort = { ...sort };
    if (sort.key === key) newSort.order *= -1;
    else newSort = { key: key, order: 1 };
    setSort(newSort);
    sortUsers(newSort.key, newSort.order);
  }
  
  return userData.loading ? (
    <H2>Loading</H2>
  ) : userData.error ? (
    <H2>{userData.error}</H2>
  ) : (
    <div>
      <H2>My users</H2>

      <div>
        {userData && userData.users && (
          <Table>
            <thead>
              <tr>
                <td>
                  <NavLink to={`/create/`}>
                    <CustomButton textSize="20px">
                      <AddIcon />
                      Create user
                    </CustomButton>
                  </NavLink>
                </td>
                <td>
                  <CustomInput
                    ref={findRef}
                    type="text"
                    name="find"
                    id="find"
                    width="150px"
                    placeholder="Find user by name"
                  />
                  <Button size="small" onClick={()=> filterUsers(findRef.current.value)}>Find</Button>
                </td>
                <td>
                  <HoverDiv onClick={fetchUsers} className="menuButton">
                    <UpdateIcon />
                  </HoverDiv>
                </td>
                <td>
                  <HoverDiv onClick={handleClickOpen} className="menuButton">
                    <DeleteIcon />
                  </HoverDiv>
                </td>
              </tr>

              <tr>
                <TH>Select</TH>
                {columns.map((header, i) => (
                  <TH key={i}>
                    <HoverDiv
                      className="sortOrder"
                      onClick={() => changeSort(header.toLocaleLowerCase())}
                    >
                      {header}
                      <span style={{paddingLeft:'10px'}}>
                        <span
                          style={{
                            color: getColor(header, 1),
                          }}
                        >
                          ▲
                        </span>
                        <span
                          style={{
                            color: getColor(header, -1),
                          }}
                        >
                          ▼
                        </span>
                      </span>
                    </HoverDiv>
                  </TH>
                ))}
                <TH >
                  <div
                    className="sortOrder"
                    onClick={() => changeSort("fetched")}
                  >
                    Edit
                    <span className="upDown">
                      <span
                        style={{
                          color: getColor("fetched", 1),
                        }}
                      >
                        ▲
                      </span>
                      <span
                        style={{
                          color: getColor("fetched", -1),
                        }}
                      >
                        ▼
                      </span>
                    </span>
                  </div>
                </TH>
              </tr>
            </thead>
            <tbody>
              
              {userData.users.map((user, i) => (
                i <= dataOnPage &&
                <tr key={i}>
                  <td>
                    <CustomInput
                      type="checkbox"
                      value={user.id}
                      disabled={user.fetched}
                      style={{width:"20px"}}
                      onClick={(e) => {
                        let users = [...usersToDelete];
                        if (e.target.checked) users.push(e.target.value);
                        else
                          users = users.filter(
                            (id) => id !== e.target.value.id
                          );
                        setUsersToDelete(users);
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
            
          </Table>
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
            This action is irreversible. Please confirm.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            onClick={() => {
              deleteUser(usersToDelete).then(() =>
              fetchUsers(sort.key, sort.order)
            );
              handleClose();
            }}
            color="primary"
            autoFocus
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  function getColor(header, order) {
    return sort.key === header.toLocaleLowerCase() && sort.order === order
      ? "black"
      : "rgb(123, 123, 123)";
  }
}

const mapStateToProps = (state) => {
  return {
    userData: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (sortKey, sortOrder) =>
      dispatch(fetchUsers(sortKey, sortOrder)),
    sortUsers: (key, order) => dispatch(sortUsers(key, order)),
    filterUsers:(name)=> dispatch(filterUsers(name))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisplayUsers);
