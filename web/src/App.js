import React, { Component } from 'react';
import Login from './Login/login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SignUp from './Login/signup';
import Laboratorist from './Laboratorist/Laboratorist';
import Dashboard from './dashboard/dashboard.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import NotFound from './404';
import Pharmacist from './Pharmacists/pharmacist';
import Doctors from './Doctors/Doctors';
import MedCart from './cart/cart.jsx';


// import 'jquery/dist/jquery.min.js';
// import 'popper.js/dist/popper.js';
// import 'bootstrap/dist/js/bootstrap.min.js';
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			token: '',
			cart: [],
			pharmacy: {}
		}
	}
	componentDidMount() {
		const user = JSON.parse(sessionStorage.getItem('user'));
		const token = JSON.parse(sessionStorage.getItem('authToken'));
		const cart = JSON.parse(sessionStorage.getItem('cart'))
		const pharmacy = JSON.parse(sessionStorage.getItem('pharmacy'))
		this.setState({ user: user, token: token, cart: cart, pharmacy: pharmacy })
	}
	toggleUpdate = async () => {
		console.log('update Data')
		const newUser = JSON.parse(sessionStorage.getItem('user'));
		const newtoken = JSON.parse(sessionStorage.getItem('authToken'));
		const cart = JSON.parse(sessionStorage.getItem('cart'))
		const pharmacy = JSON.parse(sessionStorage.getItem('pharmacy'))
		await this.setState({ user: newUser, token: newtoken, cart: cart, pharmacy: pharmacy })
	};
	render() {
		if (this.state.token && this.state.user) {
			return (
				<React.Fragment>
					<Router>
						<Switch>
							<Route path='/' exact component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/welcome' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/pharmacies' component={(props) => <Pharmacist token={this.state.token} user={this.state.user} updateData={this.toggleUpdate} />} />
							<Route path='/dashboard' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/laboratories' component={(props) => <Laboratorist token={this.state.token} user={this.state.user} />} />
							<Route path='/doctors' component={(props) => <Doctors token={this.state.token} />} />
							<Route path='/login' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/sign-up' component={(props) => <Dashboard token={this.state.token} user={this.state.user} />} />
							<Route path='/cart' component={(props) => <MedCart token={this.state.token} user={this.state.user} cart={ this.state.cart}/>} />
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
