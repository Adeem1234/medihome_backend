import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import UserBoard from './UserBoard';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cart: []
		}
	}
	componentDidMount() {
		const cart = JSON.parse(sessionStorage.getItem('cart'))
		this.setState({ cart: cart })
	}
	render() {
		return (
			<div>
				<DashboardNav cart={this.state.cart} />
				<UserBoard token={this.props.token} user={this.props.user} />
			</div>

		);
	}
}

export default Dashboard;
