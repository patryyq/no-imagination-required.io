import axios from 'axios'

const isLocalhost = window.location.hostname === 'localhost'
const headers =
  !isLocalhost
    ? { 'Access-Control-Allow-Origin': 'https://no-imagination-required.io' }
    : { 'Access-Control-Allow-Origin': 'http://localhost:5000' };

// Set config defaults
const instance = axios.create({
  headers: headers,
  withCredentials: true,
  origin: true
});

export default instance;
