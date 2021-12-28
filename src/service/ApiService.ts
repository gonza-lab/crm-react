import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export default class ApiService {
  protected axios: AxiosInstance;

  constructor(config?: AxiosRequestConfig) {
    this.axios = Axios.create({
      ...config,
      baseURL: process.env.REACT_APP_API_URL,
    });
  }
}
