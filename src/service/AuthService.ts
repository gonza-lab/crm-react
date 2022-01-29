import LoginResponse from '../interfaces/LoginResponse';
import RenewResponse from '../interfaces/RenewResponse';
import UserUpdateRequest from '../interfaces/UserUpdateRequest';
import ApiService from './ApiService';

export default class AuthService extends ApiService {
  private baseUrl = '/auth';

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
      `${this.baseUrl}/login`,
      {
        email,
        password,
      }
    );

    return data;
  }

  async renew(): Promise<RenewResponse> {
    const { data } = await this.axios.get<RenewResponse>(
      `${this.baseUrl}/renew`
    );

    return data;
  }

  async update(changes: UserUpdateRequest): Promise<void> {
    await this.axios.put(`${this.baseUrl}`, changes);
  }
}
