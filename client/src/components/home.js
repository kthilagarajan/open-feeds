import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import Credential from './credential'
import Dashboard from './dashboard'
const loggedin = false;
class Home extends Component {
  constructor(props) {
    super(props);
    this.isAuth = this.isAuth.bind(this)
  }
  isAuth() {
    return window.localStorage.getItem("loggedIn") && window.localStorage.getItem("loggedIn") == 'true'
  }
  render() {
    return (
      <Router history={Router.hashHistory}>
        <div>
          <Switch>
            <Route exact path="/login" component={Credential} />
            {["/", "/app"].map((path, index) =>
              <Route exact path={path} key={index} render={(props) => (
                this.isAuth()
                  ? <Dashboard {...props} />
                  : <Redirect to='/login' />
              )} />
            )}

          </Switch>
        </div>
      </Router>
    );
  }
}

export default Home;
