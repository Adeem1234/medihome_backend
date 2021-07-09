import React, { Component } from 'react';
import axiosInstance from '../axios/axiosConfig';

class PharmacistDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      pharmacies: [],
      pharmacy: {},
      cart: {}
    }
  }
  async componentDidMount() {
    await this.setState({ user: this.props.user, token: this.props.token })
    axiosInstance
      .get('/get/pharmacies', {
        headers: {
          authorization: this.props.token
        }
      })
      .then(async (res) => {
        await this.setState({ pharmacies: res.data.pharmacies })
        console.log(res.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

export default PharmacistDashboard;

