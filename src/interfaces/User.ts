export default interface User {
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  country: string;
  city: string;
  locality: string;
  address: string;
  zip_code: string;
  roleId: number;
}

export interface UserDB extends User {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
