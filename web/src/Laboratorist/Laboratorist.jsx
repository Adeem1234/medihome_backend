import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import LaboratoristDashboard from './laboratoristDashbaord';


class Laboratorist extends Component {
  state = {}
  render() {
    return (
      <div>
        <DashboardNav />
        <LaboratoristDashboard />
      </div>
    );
  }
}

export default Laboratorist;