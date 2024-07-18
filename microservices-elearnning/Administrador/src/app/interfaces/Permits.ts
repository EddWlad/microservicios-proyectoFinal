import { ReponseGeneric } from "./req-response";

export interface PermitResponse extends ReponseGeneric {
    data: Permit[];
  }
export interface Permit {
    per_code: string
    per_read: boolean
    per_write: boolean
    per_update: boolean
    per_delete: boolean
    per_role: PerRole
    per_module: PerModule
  }
  
  export interface PerRole {
    rol_code: string
    rol_name: string
  }
  
  export interface PerModule {
    mod_code: string
    mod_title: string
  }

  export interface PermitInsert {
    per_read: boolean
    per_write: boolean
    per_update: boolean
    per_delete: boolean
    per_role: string
    per_module: string
  }
  