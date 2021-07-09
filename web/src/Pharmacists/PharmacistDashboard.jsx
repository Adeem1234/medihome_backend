import React, { Component } from 'react';
import axiosInstance from '../axios/axiosConfig';
class PharmacistDashboard extends Component {
  state = {
    user: {},
    token: '',
    pharmacies: [],
    pharmacy: {},
    cart: {}
  }
  async componentDidMount() {
    const authToken = JSON.parse(sessionStorage.getItem('authToken'))
    const authUser = JSON.parse(sessionStorage.getItem('user'))
    await this.setState({ user: authUser, token: authToken })
    axiosInstance
      .get('/get/pharmacies', {
        headers: {
          authorization: authToken
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
    const pharmacies = async () => {
      return (
        <div className="d-flex mx-5 flex-column w-auto">
          <div className="d-flex flex-column justify-content-between">
            <div className='mb-3'>
              <h2>Pharmacies</h2>


            </div>
          </div>
        </div>
      )
    }
    const pharmacy = async () => {
      const { pharmacy } = this.state
      return (
        <div className="d-flex mx-5 flex-column w-auto">
          <div className="d-flex flex-column justify-content-between">
            <div className='mb-3'>
              <h2>{pharmacy.name}</h2>


            </div>
          </div>
        </div>
      )
    }
    return (
      !pharmacy ?
        this.pharmacies()
        :
        this.pharmacy()
    );
  }
}

export default PharmacistDashboard;

