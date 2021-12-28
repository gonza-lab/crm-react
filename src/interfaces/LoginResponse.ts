import { UserDB } from './User';

interface LoginResponseData extends UserDB {
  jwt: string;
}

export default interface LoginResponse {
  ok: boolean;
  data: LoginResponseData;
}
