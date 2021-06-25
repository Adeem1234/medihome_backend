/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';


const SignUp = ({ updateData }) => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showError, setShowError] = useState([]);
    const [errors, setErrors] = useState([]);
    const [type, setType] = useState('User');


    const handleSignUp = () => {
        axiosInstance.post('/register', { name, email, password, confirmPassword }).then(async (res) => {
            const { savedUser, token } = res.data;
            if (savedUser) {
                localStorage.setItem('authToken', JSON.stringify(token));
                localStorage.setItem('user', JSON.stringify(savedUser));
                await updateData(savedUser, token);
                // setTimeout(() => { document.getElementById('proceedBtn').click() }, 2500);
            }
        }).catch((error) => {
            console.error(error)
            if (error.response.status === 422) {
                let errors = [];
                error.response.data.map((error) => { errors[error.path[0]] = error.message; return null });
                setErrors(errors);
                setShowError(error.response.data);
            }
        })
    };
    const nextPage = () => {
        return (
            <div className='d-flex justify-content-center align-items-center py-5 bg-black'>
                <div className=' card border border-black'>
                    <div className='card-header'>
                        <p className='my-0 py-0'>Welcome</p>
                    </div>
                    <div className='card-body'>
                        <div>
                            <p>Login Successfull</p>
                        </div>
                    </div>
                    <div className='card-footer'>
                        <Link to='/welcome'>
                            <Button variant="contained" color="primary" className="d-flex float-right" >Proceed </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className='d-flex justify-content-center align-items-center mt-5 h-100' >
            <div className="">
                <div className="card">
                    <div className="card-header">
                        <h3>Sign Up</h3>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="input-group form-group mb-2">
                                <input type="text" className="form-control" placeholder="User Name"
                                    onChange={(e) => { setName(e.target.value) }} />
                                {errors.hasOwnProperty('name') && (<p className='err'>{errors.name}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <input type="email" className="form-control" placeholder="Email"
                                    onChange={(e) => { setEmail(e.target.value) }} />
                                {errors.hasOwnProperty('email') && (<p className='err'>{errors.email}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <input type="password" className="form-control" placeholder="Password"
                                    onChange={(e) => { setpassword(e.target.value) }} />
                                {errors.hasOwnProperty('password') && (<p className='err'>{errors.password}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <input type="password" className="form-control" placeholder="Confirm Password"
                                    onChange={(e) => { setConfirmPassword(e.target.value) }} />
                                {errors.hasOwnProperty('confirmPassword') && (<p className='err'>{errors.confirmPassword}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <select className="form-select" aria-label="Default select example" onChange={async (e) => {
                                    setType(e.target.value);
                                    console.log(e.target.value);
                                }}>
                                    <option defaultChecked="User">User</option>
                                    <option value="Pharmacist">Pharmacist</option>
                                    <option value="laboratorist">laboratorist</option>
                                </select>
                                {errors.hasOwnProperty('type') && (<p className='err'>{errors.type}</p>)}

                            </div>
                            <div className="form-group mb-2">
                                <button className="btn  btn-success float-right Signup_btn" type='submit'
                                    onClick={e => {
                                        e.preventDefault()
                                        axiosInstance.post('/register', { name, email, password, confirmPassword, type }).then(async (res) => {
                                            const { user, token } = res.data;
                                            if (user) {
                                                localStorage.setItem('authToken', JSON.stringify(token));
                                                localStorage.setItem('user', JSON.stringify(user));
                                                await updateData(user, token);
                                                document.getElementById('updateToken').click();
                                            }
                                        }).catch((error) => {
                                            console.error(error)
                                            if (error.response.status === 422) {
                                                let errors = [];
                                                error.response.data.map((error) => { errors[error.path[0]] = error.message; return null });
                                                setErrors(errors);
                                                setShowError(error.response.data);
                                            }
                                            else {
                                                console.error(error)
                                            }
                                        })
                                    }}> Sign Up</button>
                                <button onClick={updateData} type="button" id='updateToken' className='d-none'> </button>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer">
                        <div className="d-flex justify-content-center ">
                            <button className="btn  btn-primary" type='submit' onClick={(e) => {
                                e.preventDefault()
                            }}>
                                <Link to='/login'><p className='text-white text-decoration-none p-0 m-0'>Login</p></Link>
                            </button>
                            <Link to='/welcome'>
                                <Button variant="contained" color="primary" className="d-none float-right" id='proceedBtn'>Proceed </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;