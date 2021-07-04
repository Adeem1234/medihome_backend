import React from 'react';
import DashboardNav from '../navbar/DashboardNav';
import UserBoard from './UserBoard';

const Dashboard = () => {
	return (
		<div>
			<DashboardNav />
			<UserBoard />
		</div>
	);
};

export default Dashboard;
