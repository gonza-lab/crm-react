import RoleDB from './RoleDB';

export default interface User {
  id: number;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  country: string;
  city: string;
  locality: string;
  address: string;
  zip_code: string;
  role: RoleDB;
}
