import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import PharmacistDashboard from './pharmacistDashbaord';


class Pharmacist extends Component {
  state = {}
  render() {
    return (
      <div>
        <DashboardNav />
        <PharmacistDashboard />
      </div>
    );
  }
}

export default Pharmacist;