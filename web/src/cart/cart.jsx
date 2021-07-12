/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import { axiosInstance, baseURL } from '../axios/axiosConfig';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col

} from 'reactstrap';


class MedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      pharmacy: {},
      medicines: [],
      pharmacyId: ''
    }
  }
  componentDidMount() {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const pharmacyId = JSON.parse(sessionStorage.getItem('pharmacy'))
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('authToken'))
    this.setState({ cart: cart, pharmacyId: pharmacyId, user: user, token: token })
    if (pharmacyId !== '') {
      axiosInstance.get('/get/pharmacy/' + pharmacyId,
        {
          headers: {
            authorization: this.props.token
          }
        })
        .then((res) => {
          console.log(res.data)
        })

    }
  }

  render() {
    console.log(this.state.pharmacy)
    return (
      <div>
        <DashboardNav />
        <div className='mt-2 d-flex align-items-flex-start mx-5 h-25 overflow-auto '>
          hello
          {/* {this.state.cart ?
            this.state.cart.map((medicine, index) => {
              const quantity = medicine.quantiy;
              const logo = medicine.logo.name;
              console.log(medicine.logo)
              return (
                <div key={index} className=' mx-3'>

                  <Card style={{ width: "fit-content", height: 'auto' }}>
                    <div></div>
                    <CardImg top width="100%" height='200' src={baseURL + 'medicines/' + logo} alt="Card image cap" />
                    <CardBody>
                      <CardTitle tag="h5" className="mt-3">{medicine.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.formula} </CardSubtitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.manufacturer} </CardSubtitle>
                      <h5 > Rs. {medicine.price}</h5>
                      <div className="mt-4 d-flex justify-content-between">
                        <div className='d-flex'>
                          <h5>Quantity</h5>
                          <input type='number' min='1' id={medicine._id} className='mx-2 py-1 px-1 w-0' max={quantity} onChange={(e) => {
                          }} ></input>
                        </div>
                        <div>
                          <Button onClick={async () => {
                            let count = 0
                            let medCount = document.getElementById(`${medicine._id}`).value
                            const cartData = this.state.cart;

                            cartData.map(cart => {
                              if (JSON.stringify(cart.medicine) === JSON.stringify(medicine._id)) {
                                count = parseInt(cart.quantity) + parseInt(medCount)
                                cartData.splice(cart)
                                console.log(count)
                              }
                            })
                            let drug = {
                              medicine: medicine._id,
                              quantity: count
                            }
                            cartData.push(drug);
                            await this.setState({ cart: cartData })
                            console.log(cartData)
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
          } */}

        </div>

      </div>
    );
  }
}

export default MedCart;