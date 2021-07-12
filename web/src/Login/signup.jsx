/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { axiosInstance } from '../axios/axiosConfig';
import Select from 'react-select'
import { useEffect } from 'react';


const SignUp = ({ updateData }) => {

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [phoneNo, setPhoneNo] = useState();
    const [city, setCity] = useState();
    const [cities, setCities] = useState([]);
    const [areas, setAreas] = useState([]);
    const [area, setArea] = useState();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [name, setName] = useState('');
    const [showError, setShowError] = useState([]);
    const [errors, setErrors] = useState([]);
    const [getCities, setGetCities] = useState(false);

    const handleSignUp = () => {
        axiosInstance.post('/user/register', { name, email, password, confirmPassword, city, area, phoneNo }).then(async (res) => {
            const { savedUser, token } = res.data;
            if (savedUser) {
                sessionStorage.setItem('authToken', JSON.stringify(token));
                sessionStorage.setItem('user', JSON.stringify(savedUser));
                sessionStorage.setItem('cart', '[]');
                sessionStorage.setItem('pharmacy', '');

                await updateData(savedUser, token);
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

    useEffect(() => {
        if (!getCities) {
            axiosInstance
                .get('/get/cities')
                .then(async (res) => {
                    await setCities(res.data.cities)
                    await setGetCities(true)
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    })

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
                                <select name="city" id="selectCity" className='select2 form-control' onChange={async (e) => {
                                    document.getElementById('NullCity').style.display = 'none'
                                    let index = e.target.value
                                    await setCity(cities[index]._id)
                                    await setAreas(cities[index].areas)
                                    await setArea()
                                    console.log(cities[index])
                                }}>
                                    <option defaultValue id='NullCity' ></option>
                                    {cities ?
                                        cities.map((selectCity, index) => {
                                            console.log(areas)
                                            return (
                                                <option key={index} value={index}>{selectCity.name}</option>
                                            )
                                        })
                                        :
                                        <option>No Cities Available</option>
                                    }
                                </select>
                                {errors.hasOwnProperty('city') && (<p className='err'>{errors.city}</p>)}
                            </div>
                            <div className="input-group form-group mb-2">
                                <select name="area" id="selectAreaa" className='select2 form-control' onChange={async (e) => {
                                    document.getElementById('NullArea').style.display = 'none'
                                    let index = e.target.value
                                    await setArea(areas[index]._id)
                                }}>
                                    <option defaultValue id='NullArea' ></option>
                                    {areas ?
                                        areas.map((selectArea, index) => {
                                            return (
                                                <option key={index} value={index}>{selectArea.name}</option>
                                            )
                                        })
                                        :
                                        <option>No Cities Available</option>
                                    }
                                </select>
                                {errors.hasOwnProperty('area') && (<p className='err'>{errors.area}</p>)}
                            </div>

                            {/* <div className="input-group form-group mb-2"> */}
                            <PhoneInput
                                placeholder="Enter phone number"
                                value={phoneNo}
                                className='phoneInput mb-2'
                                required
                                onChange={setPhoneNo} />
                            {/* </div> */}
                            <div className="form-group mb-2">
                                <button className="btn  btn-success float-right Signup_btn" type='submit'
                                    onClick={e => {
                                        e.preventDefault()
                                        handleSignUp()
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
        </div >
    );
}

export default SignUp;