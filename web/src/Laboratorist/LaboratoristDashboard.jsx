import React, { Component } from 'react';
import axiosInstance from '../axios/axiosConfig';
class LaboratoristDashboard extends Component {
  state = {
    user: {},
    token: '',
    laboratories: [],
    laboratory: {},
    cart: {}
  }
  async componentDidMount() {
    const authToken = JSON.parse(sessionStorage.getItem('authToken'))
    const authUser = JSON.parse(sessionStorage.getItem('user'))
    await this.setState({ user: authUser, token: authToken })
    axiosInstance
      .get('/get/laboratories', {
        headers: {
          authorization: authToken
        }
      })
      .then(async (res) => {
        console.log(res.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className="d-flex mx-5 flex-column w-auto">
        <div className="d-flex flex-column justify-content-between">
          <div className='mb-3'>
            <h2>Laboratories</h2>


          </div>
        </div>
      </div>
    );
  }
}

export default LaboratoristDashboard;

