import axios from 'axios';
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';
import { Button } from 'react-bootstrap';

class ProfileUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      cities: [],
      areas: [],
      newCity: '',
      newArea: '',
      errors: {},
      showErrors: [],
      city: null,
      area: null,
      citiesAvailable: true,
      profileUpdated: false,
    }
    this.addLocation = this.addLocation.bind(this);
    this.addNewLocation = this.addNewLocation.bind(this);
    this.updateProfile = this.updateProfile.bind(this)
  }
  async componentDidMount() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('authToken'));
    await this.setState({ user: user, token: token })
    if (user.hasOwnProperty('city') && user.hasOwnProperty('area'))
      await this.setState({ ProfileUpdate: true })
    axios.get('/update-profile', { headers: { authorization: token } }).then(async (res) => {
      let { cities } = res.data.cities;
      await this.setState({ cities: cities })
    }).catch((err) => {
      console.log(err)
    });
  }
  addNewLocation = () => {
    const city = this.state.newCity;
    const area = this.state.newArea;
    axiosInstance.post('/add-new/location', { city, area }).then(async (res) => {
      const { user, token } = res.data;
      if (user) {
        localStorage.setItem('authToken', JSON.stringify(token));
        localStorage.setItem('user', JSON.stringify(user));
        // await updateData(user, token);
        document.getElementById('updateToken').click();
      }
    }).catch(async (error) => {
      console.error(error)
      if (error.response.status === 422) {
        let errors = [];
        error.response.data.map((error) => { errors[error.path[0]] = error.message; return null });
        await this.setState({ errors: errors, showErrors: error.response.data });
      }
      else {
        console.error(error)
      }
    })
  }

  addLocation = async () => {
    return (
      <div></div>
    );
  }
  updateProfile = async () => {
    return (
      < div >
        <div className='d-flex justify-content-center align-items-center mt-5  h-100' >
          <div className="">
            <div className="card">
              <div className="card-header">
                <h3>Update Profile</h3>
              </div>
              <div className="card-body">
                <form>
                  <div className="input-group form-group mb-2">
                    <select className="form-select" aria-label="Default select example" onChange={async (e) => {
                      const city = e.target.value;
                      await this.setState({ city: city, areas: city.areas })
                      console.log(e.target.value);
                    }}>
                      {this.state.cities ?
                        this.state.cities.map((city, index) => {
                          return (
                            <option value={city} key={index}>{city.name}</option>
                          )
                        })
                        :
                        <option >No City Available Add new</option>
                      }
                    </select>
                  </div>
                  <div className="input-group form-group mb-2">
                    <select className="form-select" aria-label="Default select example" onChange={async (e) => {
                      const area = e.target.value;
                      await this.setState({ area: area })
                      console.log(e.target.value);
                    }}>
                      {this.state.areas.map((areas, index) => {
                        return (
                          <option value={areas} key={index}>{areas.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="form-group mb-2 ">
                    <Button className="btn  btn-success float-right Signup_btn mr-2" type='submit'
                      onClick={e => {
                        e.preventDefault()
                        this.addNewLocation();
                      }}> Update</Button>
                    <Button className="btn  btn-success float-right Signup_btn ml-3" type='submit'
                      onClick={async (e) => {
                        e.preventDefault()
                        await this.setState({ citiesAvailable: false })
                        // this.addNewLocation();
                      }}> Add New</Button>
                    <button onClick={() => { }} type="button" id='updateToken' className='d-none'> </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div >
      </div >
    )
  }

  render() {
    if (this.state.citiesAvailable) {
      return this.updateProfile();
    }
    else return this.addLocation()
  }
}

export default ProfileUpdate;