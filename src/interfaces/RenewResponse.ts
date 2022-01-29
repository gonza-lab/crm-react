import UserDB from './UserDB';

export default interface RenewResponse extends UserDB {
  access_token: string;
}
