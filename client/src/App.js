/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Login from './login/login';
import SignUp from './login/signup'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Profile from './ProfileUpdate/profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      stateUpdate: false
    }
  }
  async componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('authToken'));
    await this.setState({ user: user, token: token })
  }
  async componentDidUpdate() {
    if (this.state.stateUpdate) {
      const user = JSON.parse(sessionStorage.getItem('user'));
      const token = JSON.parse(sessionStorage.getItem('authToken'));
      await this.setState({ user: user, token: token, stateUpdate: false })

    }
  }
  toggleUpdate = async () => {
    const newUser = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('authToken'));
    await this.setState({ user: newUser, token: token, stateUpdate: true })
    console.log(this.state);

  };
  render() {
    const { token, user } = this.state;
    if (token && user) {
      return (
        <React.Fragment>
          <Router>
            <Switch>
              <Route path='/' exact component={(props) => <Profile token={token} user={user} />} />
              <Route path='/welcome' component={(props) => <Profile token={token} user={user} />} />
              <Route path='/login' component={(props) => <Profile token={token} user={user} />} />
              <Route path='/sign-up' component={(props) => <Profile token={token} user={user} />} />
              {/* <Route path='*' component={NotFound} /> */}
            </Switch>
          </Router>
        </React.Fragment>
      )
    } else {
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
    }
  }
}

export default App;














// import logo from './logo.svg';
// import './App.css';

// function App() {
//   localStorage.setItem('user', 'hello new user')
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
