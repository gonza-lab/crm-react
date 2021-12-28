import LoginResponse from '../interfaces/LoginResponse';
import RenewResponse from '../interfaces/RenewResponse';
import ApiService from './ApiService';

export default class AuthService extends ApiService {
  private baseUrl = '/user/';

  constructor() {
    super();
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<LoginResponse> {
    const { data } = await this.axios.post<LoginResponse>(
      `${this.baseUrl}login`,
      {
        email,
        password,
      }
    );

    return data;
  }

  async renew(): Promise<RenewResponse> {
    const headers = { 'x-token': localStorage.getItem('x-token') || '' };

    const { data } = await this.axios.get<RenewResponse>(
      `${this.baseUrl}renew`,
      {
        headers,
      }
    );

    return data;
  }
}
