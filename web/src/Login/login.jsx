/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../axios/axiosConfig';


const Login = ({ updateData }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showErrors, setShowErrors] = useState([]);
    const [errors, setErrors] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState();

    return (!loginStatus
        ?
        <div className="container">
            <div className="d-flex justify-content-center h-100 mt-5">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign In</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group mb-2">
                                <input type="text" className="form-control" placeholder="Email" onChange={async (e) => {
                                    setEmail(e.target.value)
                                }} />
                                {errors.hasOwnProperty('email') && (<p className='err'>{errors.email}</p>)}
                                {errors.hasOwnProperty('mail') && (<p className='err'>{errors.mail}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <input type="password" className="form-control" placeholder="password" onChange={async (e) => {
                                    setPassword(e.target.value)
                                }} />
                            </div>
                            <div className="form-group mt-2">
                                <button type="submit" className="btn btn-success float-right login_btn" onClick={async (e) => {
                                    e.preventDefault();
                                    axiosInstance.post('/user/login', { email, password })
                                        .then(async (res) => {
                                            console.log(res)
                                            const { token, user } = res.data;
                                            if (user.email === email) {
                                                sessionStorage.setItem('authToken', JSON.stringify(token));
                                                sessionStorage.removeItem('user')
                                                sessionStorage.setItem('user', JSON.stringify(user));
                                                sessionStorage.setItem('cart', '[]');
                                                sessionStorage.setItem('pharmacy', '{}');
                                                // if (user.subscriptionId) {
                                                //     sessionStorage.setItem('subscription', JSON.stringify(user.subscriptionId));
                                                // } else {
                                                //     sessionStorage.setItem('subscription', '');
                                                // }
                                                // document.getElementById('updateToken').click();
                                                setLoginStatus(true)
                                                // updateData() 
                                            };
                                        }).catch((er) => {
                                            if (er.response === 422) {
                                                let errors = {};
                                                er.response.data.map((er) => {
                                                    errors[er.path[0]] = er.message;
                                                    return null;
                                                });
                                                this.setState({ errors: errors, showError: er.response.data })
                                            }
                                            if (er.response === 401) {
                                                let errors = {};
                                                errors = er.response.data;
                                                return errors;
                                            }
                                        });
                                }}>Login</button>
                                <button onClick={updateData} type="button" id='updateToken' className='d-none'> </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center ">
                            <button className="btn  btn-primary" onClick={(e) => {
                                e.preventDefault()
                            }}>
                                <Link to='/sign-up'><p className=' nav-item text-white text-decoration-none p-0 m-0'>Sign up</p></Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        :
        <div className='d-flex justify-content-center align-items-center py-5 '>
            <div className=' card border border-black w-25'>
                <div className='card-header bg-gradient-primary d-flex justify-content-center'>
                    <p className='my-0 py-0 text-light'>Welcome</p>
                </div>
                <div className='card-body d-flex justify-content-center'>
                    <div>
                        <p className='font-italic font-weight-bold'>Login Successfull</p>
                    </div>
                </div>
                <div className='card-footer bg-gradient-primary d-flex justify-content-center'>
                    {/* <Link to='/dashboard'> */}
                    <Button variant="contained" color="primary" className="d-flex float-right text-light border border-light" onClick={updateData} >Proceed </Button>
                    {/* </Link> */}
                </div>
            </div>
        </div>
    )
}

export default Login;