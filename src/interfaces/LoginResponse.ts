import UserDB from './UserDB';

export default interface LoginResponse extends UserDB {
  access_token: string;
}
