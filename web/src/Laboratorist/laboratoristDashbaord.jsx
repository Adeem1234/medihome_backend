import React, { Component } from 'react';
import { useState } from 'react';


const LaboratoristDashboard = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [laboratories, setLaboratories] = useState()
  const [laboratory, setLaboratory] = useState()
  const [cart, setCart] = useState()

  const getLaboratories = async () => {
    await setToken(JSON.parse(sessionStorage.getItem('authToken')))
    await setUser(JSON.parse(sessionStorage.getItem('user')))
    axiosInstance
      .get('/laboratories', { headers: { token: token } })
      .then(async (res) => {
        console.log(res.data)
        const { surveyQuestions, pages } = res.data;
        await this.setState({ surveyQuestions: surveyQuestions, pages: pages, current: count });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <div className="d-flex mx-5 flex-column w-auto">
      <div className="d-flex flex-column justify-content-between">
        <div className='mb-3'>
          <h2>Laboratories</h2>


        </div>
      </div>
    </div>
  );
}

export default LaboratoristDashboard;