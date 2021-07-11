import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axios/axiosConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



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
        <div className='mt-2 d-flex align-items-flex-start flex-column mx-5 h-25 '>
          <div className="mb-3">
            <h4>Doctors</h4>
          </div>
          <div>
            {this.state.doctors ?
              this.state.doctors.map((doctor, index) => {
                let link = `https://wa.me/${doctor.phoneNo}`
                return (
                  <div key={index} className=' bg-light border rounded-lg w-auto d-flex pt-3 px-2
										mx-2 d-flex align-items-center justify-content-between'>
                    <div className='d-flex flex-column mr-5'>
                      <p className='text-dark font-weight-bold test-nowrap font-italic'>
                        {doctor.name}
                      </p>
                      <p className='text-dark text-nowrap'>
                        {doctor.phoneNo}
                      </p><p className='text-dark text-nowrap'>
                        {doctor.specilization}
                      </p>
                    </div>
                    <div className='ml-2 mb-4 d-flex  align-content-center'>
                      <Link to={link} target='_blank'>
                        <i class="fa fa-whatsapp whatsapp-icon" aria-hidden="true"></i>
                        {/* <FontAwesomeIcon icon="whatsapp" /> */}

                      </Link>
                      <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"  >

                        <button className='btn btn-lg bg-success text-light'> Whatsapp</button>
                        <i class="fab fa-whatsapp"></i>
                      </a>
                    </div>
                  </div>
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