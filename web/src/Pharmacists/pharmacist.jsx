/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
// import PharmacistDashboard from './PharmacistDashboard';
import { axiosInstance, baseURL } from '../axios/axiosConfig';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col

} from 'reactstrap';

class Pharmacist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      token: '',
      pharmacies: [],
      pharmacy: {},
      medicines: [],
      didChange: false,
      cart: []
    }
    this.list = this.list.bind(this)
    this.MedicineList = this.MedicineList.bind(this)
  }
  async componentDidMount() {
    const cart = JSON.parse(sessionStorage.getItem('cart'));
    if (cart) {
      // sessionStorage.removeItem('cart')
      this.setState({ cart: cart })
    }
    // sessionStorage.setItem('cart', JSON.stringify(this.state.cart))
    axiosInstance
      .get('/get/pharmacies', {
        headers: {
          authorization: this.props.token
        }
      })
      .then(async (res) => {
        const response = res.data
        await this.setState({ pharmacies: response.pharmacies, user: this.props.user, token: this.props.token })
        // console.log(res.data)

      })
      .catch((error) => {
        console.error(error);
      });
  }
  async componentDidUpdate() {
    sessionStorage.setItem('pharmacy', JSON.stringify(this.state.pharmacy))
    sessionStorage.setItem('cart', JSON.stringify(this.state.cart))
  }
  async componentWillUnmount() {
    await this.setState({
      user: {},
      token: '',
      pharmacies: [],
      pharmacy: {},
      medicines: [],
      didChange: false,
      cart: []
    })
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
                        await this.setState({ pharmacy: pharmacy, didChange: true, medicines: pharmacy.medicines });
                        // console.log(this.state.pharmacy)
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
    // console.log(this.state.pharmacy)
    // console.log(this.state.medicines)
    return (
      <div>
        <div className='mt-2 d-flex align-items-flex-start mx-5 h-100 overflow-auto '>
          {this.state.medicines ?
            this.state.medicines.map((medicines, index) => {
              const medicine = medicines.medicine;
              const quantity = medicines.quantiy;
              const logo = medicine.logo.name;
              // console.log(medicine.logo)
              return (
                <div key={index} className=' mx-3'>

                  <Card style={{ width: "auto", height: 'auto' }}>
                    <div></div>
                    <CardImg top width="150" height='200' src={baseURL + 'medicines/' + logo} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag="h5" className="mt-3">{medicine.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.formula} </CardSubtitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.manufacturer} </CardSubtitle>
                      <h5 > Rs. {medicine.price}</h5>
                      <div className="mt-4 d-flex justify-content-between">
                        <div className='d-flex mx-5'>
                          <h5>Quantity</h5>
                          <input type='number' min='1' id={medicine._id} className='mx-2 py-1 px-1 ' style={{ width: '3rem', height: '2rem' }} max={quantity} onChange={(e) => {
                          }} ></input>
                        </div>
                        <div className='mx-5 text-nowrap'>
                          <Button onClick={async () => {
                            let count = 0
                            let medCount = document.getElementById(`${medicine._id}`).value
                            const cartData = this.state.cart;

                            cartData.map(cart => {
                              if (JSON.stringify(cart.medicine) === JSON.stringify(medicine._id)) {
                                count = parseInt(cart.quantity) + parseInt(medCount)
                                cartData.splice(cart)
                                // console.log(count)
                              }
                              return null
                            })
                            console.log('medicine')
                            console.log(medicine)
                            let total = medicine.price * parseInt(count)
                            let drug = {
                              medicine: medicine._id,
                              quantity: count,
                              total: total
                            }
                            cartData.push(drug);
                            await this.setState({ cart: cartData })
                            sessionStorage.setItem('cart', JSON.stringify(this.state.cart))
                            this.props.updateData()
                            // console.log(cartData)
                          }}>Add to Cart</Button>
                        </div>


                      </div>
                    </CardBody>
                  </Card>
                </div>

              )
            })
            :
            <div>No medicines Available</div>
          }

        </div>
      </div >
    )
  }


  render() {
    const { didChange } = this.state;
    if (!didChange) {
      return (
        <div className='h-100'>
          <DashboardNav />
          {this.list()}
        </div>
      )
    }
    else {
      return (
        <div className='h-100'>
          <DashboardNav />
          {this.MedicineList()}
        </div>
      )
    }
  }
}

export default Pharmacist;
