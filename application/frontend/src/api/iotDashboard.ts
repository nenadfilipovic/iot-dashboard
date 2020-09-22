import axios from 'axios';

const iotDashboard = axios.create({
  baseURL: 'http://localhost:8080/api',
});

export { iotDashboard };
