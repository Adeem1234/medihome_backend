import axios from 'axios';
const axiosURL = (axios.defaults.baseURL = 'http://127.0.0.1:8000/api');
// const axiosURL = (axios.defaults.baseURL =
// 'https://lifeoptimizer-back.codesbinary.website/api');

const axiosInstance = axios.create({
  axiosURL,
  // timeout: 10000,
  headers: {
    Accept: 'application/json',
    'Content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  mode: 'cros',
  format: 'json',
});

// instance.defaults.headers[token] = localStorage.getItem('auth-token')
export default axiosInstance;
