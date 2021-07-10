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
    await axiosInstance
      .get('/get/laboratories', {
        headers: {
          authorization: this.props.token
        }
      })
      .then(async (res) => {
        await this.setState({ laboratories: res.data.laboratories, user: this.props.user, token: this.props.token });
        console.log(this.state)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <div className='mt-2 d-flex align-items-flex-start flex-column mx-5 h-25 '>
        <div className="mb-3">
          <h4>Latest Laboratories</h4>
        </div>
        <div className='d-flex align-items-center justify-content-space-between mb-3' id='pharmacyList'>
          {this.state.laboratories ?
            this.state.laboratories.map((laboratory, index) => {
              return (
                <div key={index} className=' bg-danger border rounded-lg w-auto d-flex pt-3 px-2  w-100
										mx-2 mb-4 d-flex align-items-center w-100'>
                  <div className='d-flex flex-column mr-5 px-2 '>
                    <p className='text-light font-weight-bold test-nowrap font-italic'>
                      {laboratory.name}
                    </p>
                    <p className='text-light text-nowrap'>
                      {laboratory.city.name}
                    </p>
                  </div>
                  <div className='mx-3  mb-4 d-flex  align-content-center'>
                    <button className='btn btn-warning text-daek font-weight-bold' id='BuyBtn' onClick={async () => {
                      // await this.setState({ surveyId: survey._id, surveyCat: survey.category, questionGet: true });
                      // this.getQuestion();
                    }}>
                      <span className='text-light'>Register test</span>
                    </button>
                  </div>
                </div>

              )
            })
            :
            <div>No Laboratories</div>
          }
        </div>
      </div >

    );
  }
}

export default LaboratoristDashboard;

