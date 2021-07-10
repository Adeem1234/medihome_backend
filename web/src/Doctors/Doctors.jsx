import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import DoctorsList from './DoctorsList';

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div>
        <DashboardNav />
        <DoctorsList token={this.props.token} />
      </div>
    );
  }
}

export default Doctors;