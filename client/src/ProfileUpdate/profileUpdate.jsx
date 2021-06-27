/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useState, useEffect } from 'react';
import ReactLoading from 'react-loading';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';
import CardInput from './CardInput';
import './subscribe.css'

const Subscribe = () => {
  const [id, setId] = useState();
  const [didLoad, setDidLoad] = useState(false);
  const [didChange, setDidChange] = useState(false);
  const [didChange2, setDidChange2] = useState(false);
  const [checksub, setchecksub] = useState(false)
  const [token, setToken] = useState(JSON.parse(localStorage.getItem('authToken')))
  const activeUser = JSON.parse(localStorage.getItem('user'));
  const email = activeUser.email;
  const name = activeUser.name;
  const subscription_id = activeUser.subscriptionId;


  // useEffect(() => {
  // 	console.log(token)
  // 	if (!didLoad) {
  // 		axiosInstance.post('/pay/subscription_check', { subscription_id, activeUser }, { headers: { token: token } })
  // 			.then((res) => {
  // 				const { subscription, subscriptionDetails } = res.data;
  // 				console.log(subscriptionDetails)
  // 				setSubscriptionDetails(subscriptionDetails)
  // 				if (subscription) {
  // 					if (subscription.id === subscription_id) {
  // 						localStorage.setItem('subscription', JSON.stringify(subscription_id));
  // 						setchecksub(true)
  // 					}
  // 				}
  // 			}).catch((err) => {
  // 				console.error(err);
  // 			});
  // 		setDidLoad(true);
  // 	}
  // 	if (subscription_id !== '') {
  // 		localStorage.setItem('subscription', JSON.stringify(subscription_id));
  // 		setchecksub(true)
  // 	}
  // }, [activeUser, didLoad, subscription_id, token]);
  const packages = () => {
    return (
      !didChange ?
        <div className="pricing  h-100" id='pricing'>
          {/* <div className="container"> */}
          <div className="row py-5 px-5 mx-5 my-3">
            {subscriptionDetails ?
              subscriptionDetails.map((sub_details, index) => {
                return (
                  <div className="col-lg-4" key={index}>
                    <div className="card mb-5 mb-lg-0">
                      <div className="card-body rounded" >
                        <h5 className="card-title text-muted text-uppercase text-center">{sub_details.name}</h5>
                        <h6 className="card-price text-center">${sub_details.amount}
                          <span className="period">/{sub_details.interval}</span></h6>
                        <div>
                          {sub_details.details.map((detail, index) => {
                            return (
                              <div key={index}>
                                <ul className="fa-ul">
                                  <li><span className="fa-li"><i className="fas fa-check"></i></span>
                                    <strong>{detail}</strong></li>
                                </ul>
                              </div>
                            )
                          })}
                        </div>
                        <button className='btn btn-primary btn-block text-upppercase' type='button' id='#subscription_button'
                          onClick={e => {
                            e.preventDefault();
                            setId(sub_details.id);
                            setPlan(sub_details.name)
                            setDidChange(true)
                            // document.getElementById('pricing').style.display = ('none');
                            // enterDetails();
                          }}>Button</button>
                      </div>
                    </div>
                  </div>
                )
              })
              :
              <div></div>
            }
            {/* </div> */}
          </div>
        </div>
        :
        <div className=" d-flex justify-content-center align-items-center">
          <div className="subcriptionData row py-5 px-5 w-75 " id='subcriptionData'>
            <div>
              <Card className='border border-black-2'>
                <CardContent className="content" >
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNo}
                    className='phoneInput'
                    required
                    onChange={setPhoneNo} />
                  <div className="CardInput my-3">
                    <CardInput required />
                  </div>
                  <div className="buttons">
                    {!didChange2 ?
                      <Button
                        variant="contained" color="primary" className="pay_button align-self-center" id='pay_button'
                        onClick={async (e) => {
                          e.preventDefault();
                          setDidChange2(true)
                          phoneNo ?
                            await stripe.createPaymentMethod({
                              type: 'card',
                              card: elements.getElement(CardElement),
                              billing_details: {
                                email: email,
                                phone: phoneNo,
                                name: name
                              },
                            })
                              .then(async (res) => {
                                console.log(res)
                                await axiosInstance.post('/pay/subscription', {
                                  'payment_method': res.paymentMethod.id,
                                  'email': email,
                                  'subscriptionId': id,
                                  'userId': activeUser._id
                                }, { headers: { token: token } })
                                  .then(res => {
                                    const { client_secret, status, subscription, newUser } = res.data;
                                    if (status === 'requires_action') {
                                      stripe.confirmCardPayment(client_secret).then(result => {
                                        if (result.error) {
                                          console.error('There was an issue!');
                                          console.error(result.error);
                                          // Display error message in your UI.
                                          // The card was declined (i.e. insufficient funds, card has expired, etc)
                                        } else {
                                          console.log('payment Confirmed')
                                          localStorage.setItem('subscription', JSON.stringify(subscription))
                                          localStorage.removeItem('user');
                                          localStorage.setItem('user', JSON.stringify(newUser))
                                          setchecksub(true)
                                          // Show a success message to your customer
                                        }
                                      });
                                    } else {
                                      console.log('status no action required')
                                      localStorage.setItem('subscription', JSON.stringify(subscription))
                                      localStorage.removeItem('user');
                                      localStorage.setItem('user', JSON.stringify(newUser));
                                      setchecksub(true)
                                      // No additional information was needed
                                      // Show a success message to your customer
                                    }
                                  })
                                  .catch(err => console.error(err))
                              })
                              .catch(err => console.error(err))
                            :
                            null
                        }} > Pay {plan}  Plan </Button>
                      :
                      <div>
                        <div className='pay_loading' id='pay_loading'>
                          <ReactLoading type={'spin'} color={"#7446ca"} />
                        </div>
                      </div>
                    }

                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div >
    );
  };
  const nextpage = () => {
    return (
      <div className='d-flex justify-content-center align-items-center py-5 '>
        <div className=' card border border-black w-auto'>
          <div className='card-header'>
            <p className='my-0 py-0'>Welcome</p>
          </div>
          <div className='card-body'>
            <div>
              <p>Login Successfull</p>
            </div>
          </div>
          <div className='card-footer'>
            <Link to='/dashboard'>
              <Button variant="contained" color="primary" className="d-flex float-right proceedBtn" id='proceedSubscription' >Proceed </Button>
            </Link>
          </div>
        </div>
      </div>

    )
  }
  return (
    <div className='h-100' >
      {console.log(checksub)}
      {
        // If subscription Required
        // !checksub ?
        // 	packages()
        // 	:
        // 	nextpage()
        nextpage()
      }
    </div>
  );
}

export default Subscribe;