import React from 'react'
import { Provider } from 'react-redux'
import store from './redux/store'
import DisplayUsers from './components/displayUsers/DisplayUsers'
import EditUser from './components/editUser/EditUser'
import CreateUser from './components/createUser/createUser'
import {Route, BrowserRouter as Router} from 'react-router-dom'

function App () {
  return (
    <Provider store={store}>
      <Router>
        <Route exact path="/" component={DisplayUsers}/>
        <Route path="/users/:id" component={EditUser}/>
        <Route path="/create" component={CreateUser}/>
      </Router>
    </Provider>
  )
}

export default App
