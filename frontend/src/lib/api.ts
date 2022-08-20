import axios from 'axios';

export let backendBaseUri = process.env.REACT_APP_BACKEND_URI!;
export let backendSocketUri = process.env.REACT_APP_SOCKET_URI!;

const API = axios.create({
  baseURL: backendBaseUri!,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
