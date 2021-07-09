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
    axiosInstance
      .get('/get/pharmacies', {
        headers: {
          authorization: this.props.token
        }
      })
      .then(async (res) => {
        const response = res.data
        await this.setState({ pharmacies: response.pharmacies, user: this.props.user, token: this.props.token })
        console.log(res.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div>
        <div className='mt-2 d-flex align-items-flex-start flex-column mx-5 h-25 '>
          <div className="mb-3">
            <h4>Latest Pharmacies</h4>
          </div>
          <div className='d-flex align-items-center justify-content-space-between mb-3' id='pharmacyList'>
            {this.state.pharmacies ?
              this.state.pharmacies.map((pharmacy, index) => {
                return (
                  <div key={index} className=' bg-light border rounded-lg w-auto d-flex pt-3 px-2
										mx-2 d-flex align-items-center'>
                    <div className='d-flex flex-column mr-5'>
                      <p className='text-dark font-weight-bold test-nowrap font-italic'>
                        {pharmacy.name}
                      </p>
                      <p className='text-dark text-nowrap'>
                        {pharmacy.city.name}
                      </p>
                      <p className='text-dark text-nowrap'>
                        {pharmacy.area.name}
                      </p>
                    </div>
                    <div className='ml-2 mb-4 d-flex  align-content-center'>
                      <button className='btn btn-success text-daek font-weight-bold' id='BuyBtn' onClick={async () => {
                        // await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
                        // this.getQuestion();
                      }}>
                        <span>Buy Medicines</span>
                      </button>
                    </div>
                  </div>

                )
              })
              :
              <div>No Pharmacies</div>
            }
          </div>
        </div >

      </div>
    );
  }
}

export default PharmacistDashboard;

