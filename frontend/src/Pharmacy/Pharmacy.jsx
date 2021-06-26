import React, { Component } from 'react';
import PharmacyNavBar from '../NavBar/PharmacyNavBar';
import Dashboard from './Dashboard';

class Pharmacy extends Component {
  state = {}
  render() {
    return (
      <div>
        <PharmacyNavBar />
        <Dashboard />
      </div>
    );
  }
}

export default Pharmacy;