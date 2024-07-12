import { Role } from "../../data/postgres/models/role.model";
import { CustomError } from "../errors/custom.error";

export class UserEntity {

    constructor(
        public use_code: string,
        public use_name: string,
        public use_lastname: string,
        public use_nui: string,
        public use_email: string,
        public use_emailValidated: boolean,
        public use_password: string,
        public use_status: number,
        public use_role: Role,
        public use_phone?: string,
        public use_address?: string,
        public use_img?: string,
    ){}
    static fromObject(object: { [key: string]: any }) {
        const {
            use_code,
            use_name,
            use_lastname,
            use_nui,
            use_email,
            use_emailValidated,
            use_password,
            use_status,
            use_role,
            use_phone,
            use_address,
            use_img
           } = object;

           if (!use_code) throw CustomError.badRequest("Missing id");
           if (!use_name) throw CustomError.badRequest("Missing name");
           if (!use_nui) throw CustomError.badRequest("Missing nui");
           if (!use_lastname) throw CustomError.badRequest("Missing lastname");
           if (!use_email) throw CustomError.badRequest("Missing email");
           if (!use_password) throw CustomError.badRequest("Missing password");
           if (!use_status) throw CustomError.badRequest("Missing status");
           if (!use_role) throw CustomError.badRequest("Missing role");

           return new UserEntity(
            use_code,
            use_name,
            use_lastname,
            use_nui,
            use_email,
            use_emailValidated,
            use_password,
            use_status,
            use_role,
            use_phone,
            use_address,
            use_img
           );
    }
}