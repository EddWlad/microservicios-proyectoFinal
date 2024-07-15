import { ReponseGeneric } from './req-response';

export interface UsersResponse extends ReponseGeneric {
  data: Data;
}
export interface UserResponse extends ReponseGeneric {
  data: User;
}

export interface Data {
  page: number;
  limit: number;
  total: number;
  next: string;
  prev: string;
  users: User[];
}
export interface User {
  use_code: string;
  use_name: string;
  use_lastname: string;
  use_nui: string;
  use_email: string;
  use_phone: string;
  use_address: string;
  use_status: number;
  use_route: number;
  use_settlement: number;
  use_create_at: string;
  use_role: UseRole;

}

export interface UseRole {
  rol_code: string;
  rol_name: string;
}


export interface UserTable {
  id: string;
  nui: string;
  fullname: string;
  email: string;
  role: string;
  settlement: number;
  status: string;
  create_at: string;
}

export interface UserInsert {
  use_name: string;
  use_lastname: string;
  use_email: string;
  use_password: string;
  use_phone: string;
  use_nui: string;
  use_superior: string;
  use_address: string;
  use_status: number;
  use_role: string;
  use_settlement: number;
}
