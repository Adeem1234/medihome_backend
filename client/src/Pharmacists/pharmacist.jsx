import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import PharmacistDashboard from './PharmacistDashboard';

class Pharmacist extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    const { token, user } = this.props
    return (
      <div>
        <DashboardNav />
        <PharmacistDashboard token={token} user={user} />
      </div>
    );
  }
}

export default Pharmacist;
