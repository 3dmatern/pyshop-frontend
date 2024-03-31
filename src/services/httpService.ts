import axios from 'axios';

import appConfig from '../../config.json';

const httpService = axios.create({
  baseURL: appConfig.API_ENDPOINT,
});

axios.interceptors.request.use(
  (config) => {
    console.log(config);

    return config;
  },
  (error) => {
    console.error(error);

    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);

    return response;
  },
  (error) => {
    console.error(error);

    return Promise.reject(error);
  }
);
export default httpService;
