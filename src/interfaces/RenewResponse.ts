import UserDB from './UserDB';

interface RenewResponseData extends UserDB {
  jwt: string;
}

export default interface RenewResponse {
  ok: boolean;
  data: RenewResponseData;
}
