import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import UserBoard from './UserBoard';

class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
	render() {
		return (
			<div>
				<DashboardNav />
				<UserBoard token={this.props.token} user={this.props.user} />
			</div>

		);
	}
}

export default Dashboard;
