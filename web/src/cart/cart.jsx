/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import DashboardNav from '../navbar/DashboardNav';
import { axiosInstance, baseURL } from '../axios/axiosConfig';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button, Container, Row, Col

} from 'reactstrap';
import './cart.css'
import { Modal } from 'react-bootstrap';


class MedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
      pharmacy: {},
      medicines: [],
      pharmacyId: '',
      show: false
    }
  }
  componentDidMount() {
    const cart = JSON.parse(sessionStorage.getItem('cart'))
    const pharmacy = JSON.parse(sessionStorage.getItem('pharmacy'))
    const user = JSON.parse(sessionStorage.getItem('user'));
    const token = JSON.parse(sessionStorage.getItem('authToken'))
    this.setState({ cart: cart, pharmacy: pharmacy, user: user, token: token })
    if (pharmacy._id) {
      axiosInstance.get('/get/pharmacy/' + pharmacy._id,
        { headers: { authorization: this.props.token } })
        .then(async (res) => {
          this.setState({ pharmacy: res.data.pharmacy })
          const { cart } = this.state
          res.data.pharmacy.medicines.forEach(pharmacyMedicine => {
            cart.forEach(cartItem => {
              if (cartItem.medicine === pharmacyMedicine.medicine._id) { cartItem.medicine = pharmacyMedicine.medicine }
            })
          });
          await this.setState({ cart: cart })
          console.log('cart medicine')
          console.log(this.state.cart[0])
        })
    }
  }
  render() {
    let pharmacy
    if (this.state.pharmacy) {
      pharmacy = this.state.pharmacy
    }
    const handleClose = () => this.setState({ show: false });
    return (
      <div>
        <DashboardNav />
        <div className='mt-2 d-flex justify-content-center mx-5 h-25 overflow-auto '>
          {this.state.cart ?
            this.state.cart.map((cart, index) => {
              const medicine = cart.medicine;
              const quantity = cart.quantiy;
              console.log(cart.medicine)
              let total = cart.total;
              // const logo = medicine.logo.name;
              return (
                <div key={index} className=' mx-3 d-flex justify-content-center w-100'>
                  <Card style={{ width: "fit-content", height: 'auto' }}>
                    <div></div>
                    {/* <CardImg top width="100%" height='200' src={baseURL + 'medicines/' + logo} alt="Card image cap" /> */}
                    <CardBody>
                      <CardTitle tag="h5" className="mt-3">{medicine.name}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.formula} </CardSubtitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">{medicine.manufacturer} </CardSubtitle>
                      <h5 > Rs. {medicine.price}</h5>
                      <div className="mt-4 d-flex justify-content-between">
                        <div className='d-flex'>
                          <h5>Total: {cart.total}</h5>
                        </div>
                        <div>
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
          <Button id='placeOrder' className='bg-gradient-primary ' onClick={async () => {
            axiosInstance.post('/place/order', { cart: this.state.cart, pharmacy: this.state.pharmacy },
              { headers: { authorization: this.props.token } })
              .then(async (res) => {
                this.setState({ cart: [], pharmacy: {}, show: true })
                sessionStorage.setItem('cart', '[]')
                sessionStorage.setItem('pharmacy', '{}')
              }).catch(error => {
                return error
              })
          }}>Place Order</Button>
        </div>
        <Modal show={this.state.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Order Placed</Modal.Title>
          </Modal.Header>
          <Modal.Body>Your Order is placed and will be Delivered by Pharmacist Rider or TCS service</Modal.Body>
          <Modal.Footer>
            <Button variant="gradient-primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MedCart;