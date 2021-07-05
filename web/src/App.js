import React, { Component } from 'react';
import Login from './Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './Login/signup';
import Subscription from './Subscription/subscription'
import Survey from './Surveys/Survey.jsx'
import Laboratorist from './Laboratorist/Laboratorist';
import Dashboard from './dashboard/dashboard.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Forms from './forms/Forms';
import NotFound from './404';

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
		const user = JSON.parse(sessionStorage.getItem('user'));
		const token = JSON.parse(sessionStorage.getItem('authToken'));
		this.setState({ user: user, token: token })
	}
	toggleUpdate = async () => {
		const newUser = JSON.parse(sessionStorage.getItem('user'));
		const newtoken = JSON.parse(sessionStorage.getItem('authToken'));
		await this.setState({ user: newUser, token: newtoken })
		console.log(this.state.user)
	};
	render() {
		if (this.state.token && this.state.user) {
			return (
				<React.Fragment>
					<Router>
						<Switch>
							<Route path='/' exact component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/welcome' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/pharmacies' component={(props) => <Laboratorist token={this.state.token} user={this.state.user} />} />
							<Route path='/dashboard' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/laboratories' component={(props) => <Laboratorist token={this.state.token} user={this.state.user} />} />
							<Route path='/login' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/sign-up' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='*' component={NotFound} />
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
