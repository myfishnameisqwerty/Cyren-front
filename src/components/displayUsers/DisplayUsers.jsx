import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../redux'
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import LockIcon from '@material-ui/icons/Lock';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import './displayUsers.css'

function DisplayUsers ({ userData, fetchUsers }) {
  const columns = [ 'Name', 'Email', 'Dragons', 'Actions' ]
  useEffect(() => {
    fetchUsers()
  }, [])

  

  return userData.loading ? (
    <h2>Loading</h2>
  ) : userData.error ? (
    <h2>{userData.error}</h2>
  ) : (
    <div>
      <h2>My users</h2>
      
      <div>
      
        {userData &&
          userData.users &&
          <table>
            <thead>
              <tr>
              <Button variant="contained" id='menuButton'><AddIcon/>Create user</Button>
              </tr>
              <tr>
                {columns.map((header, i) => <th key={i}>{header}</th>)}
              </tr>
            </thead>
            <tbody>
              
                {userData.users.map(user => 
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.dragons}</td>
                  <td>{user.fetched?<LockIcon/>:
                  <React.Fragment>
                    <Link to={`/users/${user.id}`}>
                    <EditIcon/>
                  </Link>
                  
                  <Link to={`/users/${user.id}`}>
                    <DeleteIcon/>
                  </Link>
                  </React.Fragment>
                  
                   }</td>
                </tr>
                )}
              

            </tbody>
          </table>
        }
          
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userData: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayUsers)
