/* eslint-disable */
import React, { Component } from 'react';
import Login from './Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './Login/signup';
// import Subscription from './Subscription/subscription'
// import Survey from './Surveys/Survey.jsx'
// import Dashboard from './dashboard/dashboard.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
// import Forms from './forms/Forms';
// import NotFound from './404';

// import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: ''
    }
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = JSON.parse(localStorage.getItem('authToken'));
    this.setState({ user: user, token: token })
  }
  toggleUpdate = () => {
    const newUser = JSON.parse(localStorage.getItem('user'));
    const newtoken = JSON.parse(localStorage.getItem('authToken'));
    this.setState({ user: newUser, token: newtoken })
  };
  render() {
    // const { token, user } = this.state;
    // if (token && user) {
    //   if (user.type === 'Pharmacy Manager') {
    //     return this.pharmancyManager();
    //   }
    //   else if (user.type === 'Laboratory Manager') {
    //     return this.laboratoryManager();
    //   }
    //   else if (user.type === 'end User') {
    //     return this.enduser();
    //   }
    // } else {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route path="/" exact component={(props) => <Login updateData={this.toggleUpdate} />} />
            <Route path='/login' component={(props) => <Login updateData={this.toggleUpdate} />} />
            <Route path='/sign-up' component={(props) => <SignUp updateData={this.toggleUpdate} />} />
            <Route path='*' component={(props) => <Login updateData={this.toggleUpdate} />} />
          </Switch>
        </Router>
      </React.Fragment>
    )
    // }
  }
  enduser() {
    const { token, user } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {/* <Route path='/' exact component={(props) => <Subscription token={token} user={user} />} /> */}
            {/* <Route path='/welcome' component={(props) => <Subscription token={token} user={user} />} /> */}
            {/* <Route path='/dashboard' component={(props) => <Dashboard token={token} user={user} />} /> */}
            {/* <Route path='/forms' component={(props) => <Forms token={token} user={user} />} /> */}
            {/* <Route path='/login' component={(props) => <Subscription token={token} user={user} />} /> */}
            {/* <Route path='/sign-up' component={(props) => <Subscription token={token} user={user} />} /> */}
            {/* <Route path='*' component={NotFound} /> */}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
  pharmancyManager() {
    const { token, user } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {/* <Route path='/' exact component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/welcome' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/dashboard' component={(props) => <Dashboard token={token} user={user} />} />
            <Route path='/forms' component={(props) => <Forms token={token} user={user} />} />
            <Route path='/login' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/sign-up' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='*' component={NotFound} /> */}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
  laboratoryManager() {
    const { token, user } = this.state;
    return (
      <React.Fragment>
        <Router>
          <Switch>
            {/* <Route path='/' exact component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/welcome' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/dashboard' component={(props) => <Dashboard token={token} user={user} />} />
            <Route path='/forms' component={(props) => <Forms token={token} user={user} />} />
            <Route path='/login' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='/sign-up' component={(props) => <Subscription token={token} user={user} />} />
            <Route path='*' component={NotFound} /> */}
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
