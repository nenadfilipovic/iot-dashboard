import axios from 'axios';

const iotDashboard = axios.create({
  baseURL: 'localhost:80/api',
});

export { iotDashboard };
