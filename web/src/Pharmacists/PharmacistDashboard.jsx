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
      medicines: [],
      didChange: false,
      cart: {}
    }
    this.list = this.list.bind(this)
    this.MedicineList = this.MedicineList.bind(this)
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
  // async componentDidUpdate() {
  //   if (this.state.pharmacy !== null && this.state.didChange === false) {
  //     await this.setState({ didChange: true })
  //   }
  // }
  async componentWillUnmount() {
    await this.setState({ pharmacies: [], pharmacy: {} })
  }
  list = () => {
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
                  <div key={index} className=' bg-warning border rounded-lg w-auto d-flex pt-3 px-2
                  mx-2 d-flex align-items-center w-100'>
                    <div className='d-flex flex-column mr-5'>
                      <p className='text-light font-weight-bold test-nowrap font-italic'>
                        {pharmacy.name}
                      </p>
                      <p className='text-light text-nowrap'>
                        {pharmacy.city.name}
                      </p>
                      <p className='text-light text-nowrap'>
                        {pharmacy.area.name}
                      </p>
                    </div>
                    <div className='ml-2 mb-4 d-flex  align-content-center'>
                      <button className='btn btn-danger text-daek font-weight-bold' id='BuyBtn' onClick={async () => {
                        await this.setState({ pharmacy: pharmacy, didChange: true });
                        console.log(this.state.pharmacy)
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
  MedicineList = () => {
    return (
      <div>

      </div>
    )
  }


  render() {
    const { didChange } = this.state;
    if (!didChange) {
      return (
        <div>
          {this.list()}
        </div>
      )
    }
    else {
      return (
        <div>
          {this.MedicineList()}
        </div>
      )
    }
  }
}

export default PharmacistDashboard;

