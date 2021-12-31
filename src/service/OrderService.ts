import { ReadAllOrderResponse } from '../interfaces/ReadAllOrderResponse';
import ApiService from './ApiService';

export default class OrderService extends ApiService {
  private baseUrl = '/order';

  constructor() {
    super();
  }

  async readAll(): Promise<ReadAllOrderResponse> {
    const { data } = await this.axios.get<ReadAllOrderResponse>(this.baseUrl);
    return data;
  }
}
