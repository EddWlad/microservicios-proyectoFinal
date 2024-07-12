import { ReponseGeneric } from "./req-response";

export interface RolesResponse extends ReponseGeneric {
  data: Role[];
}

export interface RoleResponse extends ReponseGeneric {
  data: Role;
}

export interface Role {
  rol_code?: string
  rol_name: string
  rol_description: string
  rol_status: number
  rol_create_at?: string
}


export interface RoleTable {
  id: string
  name: string
  description: string
  status: string
  create_at: string
}

