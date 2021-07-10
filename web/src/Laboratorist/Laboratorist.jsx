import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import LaboratoristDashboard from './LaboratoristDashboard';


class Laboratorist extends Component {
  state = {}
  render() {
    return (
      <div>
        <DashboardNav />
        <LaboratoristDashboard token={this.props.token} user={this.props.user} />
      </div>
    );
  }
}

export default Laboratorist;