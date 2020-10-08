import axios from 'axios';

const buildClient = (prefix: string) => {
  return axios.create({
    baseURL: `http://localhost/api/${prefix}`,
    withCredentials: true,
  });
};

export { buildClient };
