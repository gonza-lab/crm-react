import LoginResponse from '../interfaces/LoginResponse';
import ApiService from './ApiService';

export default class AuthService extends ApiService {
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
    const { data } = await this.axios.post<LoginResponse>('/user/login', {
      email,
      password,
    });

    return data;
  }
}
