/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axios/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './doctors.css'


class DoctorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctors: []
    }
  }
  componentDidMount() {
    axiosInstance.get('/get/doctors', { headers: { authorization: this.props.token } })
      .then(async (res) => {

        await this.setState({ doctors: res.data.doctors })
      }).catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <div className='mt-2 d-flex  flex-column mx-5 h-25 '>
          <div className="mb-3">
            <h4>Doctors</h4>
          </div>
          <div className=' d-flex  flex-column align-items-center'>
            {this.state.doctors ?
              this.state.doctors.map((doctor, index) => {
                let link = `https://wa.me/${doctor.phoneNo}`
                return (
                  <>
                    <div key={index} className='  border rounded-lg w-50 d-flex py-3 px-5
										mx-2 my-1 d-flex align-items-center justify-content-between rounded-pill' id='doctors'>
                      <div className='d-flex flex-column mx-5'>
                        <p className='text-dark font-weight-bold test-nowrap font-italic'>
                          {doctor.name}
                        </p>
                        <p className='text-dark text-nowrap'>
                          {doctor.specialization}
                        </p>
                        <p className='text-dark text-nowrap'>
                          {doctor.diploma}
                        </p>
                        <p className='text-dark text-nowrap'>
                          {doctor.phoneNo}
                        </p>
                      </div>
                      <div className='ml-2 mb-4 d-flex  align-content-center'>
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"  >
                          <i class="fab fa-whatsapp fa-3x"></i>
                        </a>
                      </div>
                    </div>
                  </>
                )
              })
              :
              <div>No Doctors</div>
            }
          </div >
        </div >
      </div >
    );
  }
}

export default DoctorsList;