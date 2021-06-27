/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios/axiosConfig';


const Login = ({ updateData }) => {
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [type, setType] = useState('User');
  let [showErrors, setShowErrors] = useState([]);
  let [errors, setErrors] = useState({});
  let [loginStatus, setLoginStatus] = useState(false);
  let [token, setToken] = useState('');
  let [user, setUser] = useState({});




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
                {errors.hasOwnProperty('password') && (<p className='err'>{errors.password}</p>)}
              </div>
              <div className="input-group form-group mb-2">
                <select className="form-select" aria-label="Default select example" onChange={async (e) => {
                  setType(e.target.value);
                }}>
                  <option defaultChecked="User">User</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="laboratorist">laboratorist</option>
                </select>
                {errors.hasOwnProperty('type') && (<p className='err'>{errors.type}</p>)}

              </div>
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-success float-right login_btn" onClick={async (e) => {
                  e.preventDefault();
                  axiosInstance.post('/login', { email, password, type })
                    .then(async (res) => {
                      const { authToken, savedUser } = res.data;
                      savedUser.token = authToken
                      setUser(savedUser);
                      setToken(authToken);
                      setLoginStatus(true);
                      // localStorage.removeItem('user')
                      console.log(loginStatus)
                      sessionStorage.setItem('user', JSON.stringify(savedUser));
                      sessionStorage.setItem('authToken', JSON.stringify(authToken));
                      // await updateData(user, token)
                      document.getElementById('updateToken').click();
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
                        // let errors = {};
                        setErrors(er.response.data);
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
              <button className="btn btn-primary" id='SignupBtn' onClick={(e) => {
                e.preventDefault()
              }}>
                <Link to='/sign-up'><p className='text-white text-decoration-none p-0 m-0'>Sign up</p></Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    :
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
            <Button variant="contained" color="primary" className="d-flex float-right" >Proceed </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login;